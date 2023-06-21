import { PrismaClient } from "@prisma/client"
import { DateTime } from "luxon"
const prisma = new PrismaClient()
import { Mono } from "./src/Main.js"
const token = "uolskPHgyXlFFF4DRgXogewpgGJJQ6JNPpYgYpiwS-wc"
Mono.setToken(token)
console.log(await Mono.getBalance())

//  console.log(DateTime.now().minus({ days: 30 }).toUnixInteger())
// let b = await Mono.getClientInfo()
// const bbb = new Promise(resolve=>{
//     let bal = mono.getActiveAccountsInfo()
//     resolve(bal)
// })
// bbb.then(data=>mono.getStatement(data[0].id)).then(data=>console.log(data))