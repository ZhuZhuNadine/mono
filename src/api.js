import fetch from "node-fetch";
import { DateTime } from "luxon";
const headers = {
  webhook: {
      headers: {
        "X-Token":"",
        "Content-Type": "application/json",
      },
      method: "POST"
  },
  infoAndStatement: {
      headers: {
        "X-Token":""
      }    
  }, 
  /**
   * @param {"sting"} token
   */
  set token(token){
    this.webhook.headers["X-Token"] = token
    this.infoAndStatement.headers["X-Token"] = token
  }
}

const urlMono ={
  main: "https://api.monobank.ua",
  info : "https://api.monobank.ua/personal/client-info",
  statement : "https://api.monobank.ua/personal/statement/",
  currency : "https://api.monobank.ua/bank/currency",
  webhook: "https://api.monobank.ua/personal/webhook"
}

function getStatementUrl(dateFrom ,dateTo, account = "0"){
  dateTo = DateTime.fromISO(dateTo).toUnixInteger() || DateTime.now().toUnixInteger();
  dateFrom = DateTime.fromISO(dateFrom).toUnixInteger() || DateTime.now().minus({ days: 30 }).toUnixInteger()
  console.log(urlMono.statement + account  + '/' + dateFrom + '/' + dateTo)
  return urlMono.statement + account  + '/' + dateFrom + '/' + dateTo
}

async function monoRequest(path,options){
  let response 
  try{
    response = await fetch(path,options)
  } catch(er){console.error(er)}
  let responseObj = response.json(); 
  return (response.ok) ? 
  responseObj: console.log("Error - " + response.status + " " + response.statusText)
}
// headers.token = "uolskPHgyXlFFF4DRgXogewpgGJJQ6JNPpYgYpiwS-wc"
// let b = await monoRequest(urlMono.currency)
// console.log(b)

export {headers,urlMono,monoRequest, getStatementUrl}