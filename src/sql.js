import { PrismaClient } from "@prisma/client"
import { Currencies } from "./currencies"

const prisma = new PrismaClient()

export async function clientInfoSql(client) {
  await prisma.clientInfo.create({
    data: {
      clientId: client.clientId,
      name: client.name,
      webHookUrl: client.webHookUrl,
      permissions: client.webHookUrl,
      accounts:{
        createMany :{
          data:
           client.accounts.map((el)=>{
            return {
              id: el.id,
              sendId: el.sendId,
              balance: el.balance,
              creditLimit: el.creditLimit,
              type: el.type,
              currencyCode: el.currencyCode,
              cashbackType: el.cashbackType,
              iban: el.iban
            }
          })
        }
      }
    }
  })
}

export async function statementSql(statement, accountId){
  statement.forEach(async el=>{
    await prisma.statement.create({
      data:{
        accountId: accountId,
        id: el.id,
        time: el.time,
        description: el.description,
        mcc: el.mcc,
        originalMcc: el.originalMcc,
        amount: el.amount,
        operationAmount: el.operationAmount,
        currencyCode: el.currencyCode,
        commissionRate: el.commissionRate,
        cashbackAmount: el.cashbackAmount,
        balance: el.balance,
        hold: el.hold
      }
    })
  })
  

}

export async function currenciesSql(currencies){
  currencies.forEach(async element => {
    await prisma.currency.create({
      data:{
        currencyCodeA: element.currencyCodeA,
        currencyCodeB: element.currencyCodeB,
        date: element.date,
        rateBuy: element.rateBuy,
        rateCross: element.rateCross,
        rateSell: element.rateSell  
      }
    }   
    )
  });
} 

export async function prismaDisconnect(){
  await prisma.$disconnect()
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    }
  )
}

export async function currencyExchange(amount, currencyIn = Currencies.byCode.UAH,currencyOut= Currencies.byCode.USD){
  let rate
  let currencyMatch = await prisma.currency.findFirst({
    where: {AND: [
      {
        currencyCodeA: {
          in:[currencyIn,currencyOut]
        },
      },
      {
        currencyCodeB: {
          in: [currencyIn,currencyOut]
        },
      },
    ]
    } 
  })
  if(currencyMatch){
    rate = getCrossRate(currencyMatch, currencyIn, currencyOut)
  }else{
    let currencyInMatch = await prisma.currency.findFirst({
      where: {AND: [
        {
          currencyCodeA: currencyIn
        },
        {
          currencyCodeB: Currencies.byCode.UAH
        },
      ]
      } 
    })
    let currencyOutMatch = await prisma.currency.findFirst({
      where: {AND: [
        {
          currencyCodeA: currencyOut
        },
        {
          currencyCodeB: Currencies.byCode.UAH
        },
      ]
      } 
    })
    if(!(currencyInMatch&&currencyOutMatch)){
      return "no such currency found" }
    
    let currencyInCrossRate = getCrossRate(currencyInMatch,currencyIn);
    let currencyOutCrossRate = getCrossRate(currencyOutMatch,Currencies.byCode.UAH);
    rate = currencyInCrossRate * currencyOutCrossRate
  }
  return amount * rate
}


export async function fundsTurnover(dateFrom,dateTo,account){
  const accountId = await getAccountId(account)
  const dates = dateForStatement(dateFrom,dateTo)
  let earnings = await prisma.statement.aggregate({
    _sum:{
      amount: true,
    },
    where:{
      accountId: accountId,
      AND:[
        {time:{
          lte: dates.dateTo
        }
      },{
        time:{
          gte: dates.dateFrom
        }
      },{
        amount:{
          gte: 0
        }
      }
      ]
    }
  })
  let expenses = await prisma.statement.aggregate({
    _sum:{
      amount: true,
    },
    where:{
      accountId: accountId,
      AND:[
        {
          time: {
            lte: dates.dateTo
            }
        },{
          time:{
            gte: dates.dateFrom
          }
        },{
          amount:{
            lte: 0
          }
        }
      ]
    }
  })
  return {
    earnings: earnings._sum.amount / 100,
    expenses: expenses._sum.amount / 100
  }
}


