import {data,currencyCodes,currencies} from "./const.js"
import {fundsTurnoverPerPeriod,getClientInfo,getCurrenciesExangeRates,getBalance,getStatementUrl,currencyExchange,getNotNullAccountsInfo} from "./functions.js"


const mono = {
  currencyCodes : currencyCodes,
  currencies: currencies,
  getCurrenciesExangeRates: async function(){
    return await getCurrenciesExangeRates() 
  },
  /**
   * @param {string} currency Enter currency in format "UAH","USD" or use mono.currencies 
   */
  getCurrencyExchangeRate: async function(currency){
    
  },
  /**
   * @param {string} token you can grab your Token here https://api.monobank.ua/
   */
   setToken: function token (token){
    data.token = token
  },
   /**
   * @returns {Promise} Promise which consist info about all accounts
   */
    getClientInfo: async function (){
      return await getClientInfo()
  },
  /**
   * @param {string} dateFrom Date in format "2023-05-13" max 30 days(Default parameter set to a week ago)
   * @param {string} dateTo Date in format "2023-05-13" max 30 days(Default parameter set to till now)
   * @param {string} account account ID (Default parameter set to main account)
   * @returns {Promise} Promise wich consists array of transactions[{
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
    getStatement : async function getStatement(dateFrom,dateTo,account){
      return await monoRequest(getStatementUrl(dateFrom,dateTo,account),data.infoAndStatement)
    },
    /**
   * @returns {Promise} Promise which consists object with balance through all accounts by currencies  
   */
    getBalance: async function(){
      return await getBalance()
    },
    /**
   * @param {number} amount amount you want to convert
   * @param {string} currencyIn Enter currency you want to convert in format "UAH","USD" or use mono.currencies 
   * /Default parameter set to "UAH"
   * @param {string} currencyOut Enter currency to which you want to convert in format "UAH","USD" or use mono.currencies 
   * /Default parameter set to "USD"
   * @returns {Promise} Promise with number
   */
    currencyExange : async function(amount,currencyIn,currencyOut){
      return await currencyExchange(amount,currencyIn,currencyOut)
    },
    /**
    * @param {string} dateFrom Date in format "2023-05-13" max 30 days(Default parameter set to a week ago)
    * @param {string} dateTo Date in format "2023-05-13" max 30 days(Default parameter set to till now)
    * @param {string} account account ID (Default parameter set to main account)
    * @returns {Promise} returns Promise wich consists object with sum of expences and sum of earnings {expenses:0, earnings:0}
    */
    fundsTurnoverPerPeriod : async function(dateFrom,dateTo,account){
      return await fundsTurnoverPerPeriod(dateFrom,dateTo,account)
    },
    /**
    * @returns {Promise} returns Promise which consists array of object with info about accouts with balance !==0
    */
    getNotNullAccountsInfo : async function(){
      return await getActiveAccountsInfo()
    }
}

export { mono }