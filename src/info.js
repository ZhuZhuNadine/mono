import { PrismaClient } from "@prisma/client"
import { Currencies } from "./currencies.js"
const prisma = new PrismaClient()

export async function getBalance(){
  let accountCurrencies = await prisma.account.findUnique({
    where:{
      currencyCode: true
    }
  })  
  console.log(accountCurrencies)
  // return clientInfo.accounts.reduce((accum, el)=>{
  //     if(accum[Currencies.fromISO4217(el.currencyCode)]){
  //       accum[Currencies.fromISO4217(el.currencyCode)]+= el.balance / 100
  //     } else {
  //       accum[Currencies.fromISO4217(el.currencyCode)] = el.balance / 100
  //     }
  //     return accum
  //   },{})
}
