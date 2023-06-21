import { getCrossRate } from "./currencies.js"
import { Mono } from "./Main.js"
import { PrismaClient } from "@prisma/client"
import { DateTime } from "luxon"

export function dateForStatement(dateFrom,dateTo){
  dateTo = DateTime.fromISO(dateTo).toUnixInteger() || DateTime.now().toUnixInteger();
  dateFrom = DateTime.fromISO(dateFrom).toUnixInteger() || DateTime.now().minus({ days: 30 }).toUnixInteger()
  return{
    dateFrom: dateFrom,
    dateTo: dateTo
  }
}

export async function getAccountId(account){
  if(account){
    return account
  } else {
    const accountId = await Mono.getNotNullAccount()
    return accountId[1].id
  }
}

export async function fundsTurnoverExchange(currency,fundsTurnover){
  let currencyInfo = await Mono.getCurrencyExchangeRate(currency);
  if(currencyInfo){
    let rate = getCrossRate(currencyInfo,Mono.currencyByCode.UAH);
    fundsTurnover.expenses *= rate;
    fundsTurnover.earnings *= rate;
    return fundsTurnover
  }else{ return "Sorry, no currency found"}  
}
  