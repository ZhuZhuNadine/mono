import { DateTime} from 'luxon'
import fetch from "node-fetch"
import {data,urlMono,Currencies ,currencies,currencyCodes} from "./const.js"


async function setWebhook(){
  return await monoRequest(urlMono.webhook,data.webhook)
}

function getStatementUrl(dateFrom,dateTo,account){
  account = account||"0";
  dateTo = DateTime.fromISO(dateTo).toUnixInteger() || DateTime.now().toUnixInteger();
  dateFrom = DateTime.fromISO(dateFrom).toUnixInteger()|| DateTime.now().minus({ days: 7 }).toUnixInteger()
  return urlMono.statement + account  + '/' + dateFrom + '/' + dateTo
}


async function monoRequest(path,options){
  let response 
  try{
    response = await fetch(path,options)
  } catch(er){console.error(er)}
  let responseObj = response.json(); 
  return (response.status !== 200) ? 
  console.log("Error - " + response.status + " " + response.statusText): responseObj
}

async function getBalance(){
  let clientInfo = await getClientInfo()
  return clientInfo.accounts.reduce((accum, el)=>{
    if(accum[currencyCodes.getCurrency(el.currencyCode)]){
      accum[currencyCodes.getCurrency(el.currencyCode)]+= el.balance / 100
    } else {
      accum[currencyCodes.getCurrency(el.currencyCode)] = el.balance / 100
    }
    return accum
  },{})
}


async function getClientInfo(){
  return await monoRequest(urlMono.info,data.infoAndStatement)
}

async function getCurrenciesExangeRates(){
  let allCurrencies = new Currencies()
  allCurrencies.currencySet = await monoRequest(urlMono.currency)
  return allCurrencies
}

function checkResult(result){
 result = [...arguments]
 let flag = true
 result.forEach(el=>{
  if(!el){
    flag = false
  }
 })
 return flag
}

 // 2 функции с UAH и без
 async function currencyExchange (amount, currencyIn = currencies.USD,currencyOut= currencies.UAH){
  let currencyInfo = await getCurrenciesExangeRates()
  let rate
  let currencyMatch = currencyInfo.currencies.find(element=>
    (element.currencyCodeA === currencyCodes[currencyIn] && element.currencyCodeB === currencyCodes[currencyOut]) || 
    ((element.currencyCodeA === currencyCodes[currencyOut]) && (element.currencyCodeB === currencyCodes[currencyIn]))
  )
  if(currencyMatch){
    rate = getCrossRate(currencyMatch, currencyIn, currencyOut)
  }else{
    let currencyInMatch = currencyInfo.currencies.find((el)=>
      (el.currencyCodeA === currencyCodes[currencyIn]) && (el.currencyCodeB === currencyCodes.UAH)
    );
    let currencyOutMatch = currencyInfo.currencies.find((el)=>
      (el.currencyCodeA == currencyCodes[currencyOut] && el.currencyCodeB == currencyCodes.UAH)
    );
    
    if(!(currencyInMatch&&currencyOutMatch)){
      return "no such currency found" }
    
    let currencyInCrossRate = getCrossRate(currencyInMatch,currencyIn);
    let currencyOutCrossRate = getCrossRate(currencyOutMatch,currencyCodes.UAH);
    rate = currencyInCrossRate * currencyOutCrossRate
  }
  return amount * rate
}

function getCrossRate(currencyInfo, currencyIn){
  let crossRate
  if(currencyInfo.currencyCodeA === currencyCodes[currencyIn]){
    crossRate = currencyInfo.rateBuy || currencyInfo.rateCross
  } else {
    crossRate = 1 / (currencyInfo.rateSell || currencyInfo.rateCross)
  }
  return crossRate
}

async function fundsTurnoverPerPeriod(dateFrom,dateTo,account){
  let statement = await getStatement(dateFrom,dateTo,account)
  return statement.reduce((accum,el)=>{
    if(el.amount > 0){
      accum.earnings+= el.amount / 100
    } else {
      accum.expenses+= (el.amount * (-1)) / 100
    }
    return accum
  },{expenses:0, earnings:0}) 
}

async function getNotNullAccountsInfo(){
  let clientInfo = await getClientInfo()
  return clientInfo.accounts.reduce((accum,el)=>{
    if(el.balance){
      let info = {
        id: el.id,
        currency: currencyCodes.getCurrency(el.currencyCode),
        balance: el.balance / 100,
        creditLimit: el.creditLimit / 100,
        type: el.type,
        iban: el.iban
      }
      accum.push(info)
    }
    return accum
  },[])
}

export {monoRequest, fundsTurnoverPerPeriod,getClientInfo,getCurrenciesExangeRates,getBalance,getStatementUrl,currencyExchange,getNotNullAccountsInfo}