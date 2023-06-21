import { headers,monoRequest,getStatementUrl,urlMono } from "./api.js"
import { Currencies, currencyExchange} from "./currencies.js"
import { fundsTurnoverExchange, dateForStatement, getAccountId} from "./statement.js";
import { getBalance } from "./info.js";
import { clientInfo, currenciesSql, statementSql, prismaDisconnect } from "./sql.js";
import { PrismaClient } from "@prisma/client"
import { currencyExchange, fundsTurnover } from "./sql.js";

const prisma = new PrismaClient()

class Mono {
  static currencyByCode = Currencies.byCode;
  static currencyByCounty = Currencies.byCountry;
   /**
   * @param {string} token you can grab your Token here https://api.monobank.ua/
   */
  static setToken (token){
    headers.token = token
  };
  /**
   * @returns {Promise} Promise which consist info about all accounts
   * @example let info = await getClientInfo()
  {
  clientId: 'string',
  name: 'string',
  webHookUrl: 'string',
  permissions: 'string',
  accounts: [
    {
      id: 'string',
      sendId: 'string',
      currencyCode: number,
      cashbackType: 'string',
      balance: number,
      creditLimit: number,
      maskedPan: [Array],
      type: 'string',
      iban: 'string'
    }
   */
  static async addClientInfo(){
    let client = await monoRequest(urlMono.info,headers.infoAndStatement)
    clientInfo(client) 
  };
  static async addStatement(dateFrom, dateTo, account){
    const dates = dateForStatement(dateFrom, dateTo)
    const accountId =  await getAccountId(account)
    let statement = await monoRequest(getStatementUrl(dates.dateFrom,dates.dateTo, accountId),headers.infoAndStatement)
    statementSql(statement, accountId)
  };
  static async addCurrencies(){
    let currencies = await monoRequest(urlMono.currency)
    currenciesSql(currencies).then(prismaDisconnect())
  };
  static async getClientInfo(){
    
  };
   /**
   * @param {string} dateFrom Date in format "2023-05-13" max 30 days(Default parameter set to a week ago)
   * @param {string} dateTo Date in format "2023-05-13" max 30 days(Default parameter set to till now)
   * @param {string} account account ID (Default parameter set to main account)
   * @returns {Promise<Array>} Promise wich consists array of transactions
   * @example let satetment = await getStatement(2023-05-13,2023-05-14,'CMHKI6Xe9BgeNK836TyCPQ')
   * console.log(statment) 
    [{
    id: 'String',
    time: Number,
    description: 'String',
    mcc: Number,
    originalMcc: Number,
    amount: Number,
    operationAmount: Number,
    currencyCode: Number,
    commissionRate: Number,
    cashbackAmount: Number,
    balance: Number,
    hold: true
  }]
   */
  static async getStatement(dateFrom,dateTo,account){
    const dates = dateForStatement(dateFrom,dateTo)
    return await prisma.statement.findMany({
      where:{
        accountId: await getAccountId(account),
        AND:[
          {time:{
            lte: dates.dateTo
          }
        },{
          time:{
            gte: dates.dateFrom
          }
        }
        ]
      }
    })
  };
  /**
 * @returns {Promise<object>}
 * @example 
  {
  currencies: [
    {
      currencyCodeA: 840,
      currencyCodeB: 980,
      date: 1685743273,
      rateBuy: 36.65,
      rateCross: 0,
      rateSell: 37.4406
    }
  ...]
  }
  */
  static async getExangeRates(){
    return prisma.currency.findMany()
  };
  static async getCurrencyExchangeRate(currency){
    return await prisma.currency.findFirst({
      where:{
        AND:[{
          currencyCodeA: currency
        },{
          currencyCodeB: Mono.currencyByCode.UAH
        }]
      }
    })
  };
   /**
   * @param {number} amount amount you want to convert
   * @param {number} currencyIn Enter currency you want to convert in format ISO4217 
   * /Default parameter set to 980
   * @param {string} currencyOut Enter currency to which you want to convert in format in format ISO4217  
   * /Default parameter set to 840
   * @returns {Promise<number | "no such currency found">} Promise with number
   * @example let uahToUsd = currencyExchange(100, 980, 840) or
   * let uahToUsd = currencyExchange(100, Mono.currencyByCode.UAH, Mono.currencyByCode.USD)
 */
  static async currencyExchange(amount,currencyIn,currencyOut){
    return await currencyExchange(amount,currencyIn,currencyOut)
  };
   /**
    * @param {string} dateFrom Date in format "2023-05-13" max 30 days(Default parameter set to a week ago)
    * @param {string} dateTo Date in format "2023-05-13" max 30 days(Default parameter set to till now)
    * @param {string} account account ID (Default parameter set to main account)
    * @returns {Promise} returns Promise wich consists object with sum of expences and sum of earnings 
    * @example let turnover = await getStatement(2023-05-13,2023-05-14,'CMHKI6Xe9BgeNK836TyCPQ')
    * console.log(turnover) //{expenses:0, earnings:0}
    */
  static async fundsTurnoverPerPeriod(dateFrom,dateTo,account){
  return await fundsTurnover(dateFrom,dateTo,account)
  };
  static async fundsTurnoverPerPeriodExchange(currency,dateFrom,dateTo,account){
    const fundsTurnover = await Mono.fundsTurnoverPerPeriod(dateFrom,dateTo,account)
    return await fundsTurnoverExchange(currency,fundsTurnover)
  };
  static async getBalance(){
    return await getBalance()
  };
  static async getNotNullAccount(){
    return await prisma.account.findMany({
      where:{
        balance:{
          not: 0
        } 
      },
      select:{
        id: true
      }
    })
  }
}

export { Mono }
