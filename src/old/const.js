const data = {
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
  cur = [
    {
      currencyCodeA: 840,
      currencyCodeB: 980,
      date: 1685656873,
      rateBuy: 36.65,
      rateCross: 0,
      rateSell: 37.4406
    },
    {
      currencyCodeA: 978,
      currencyCodeB: 980,
      date: 1685726173,
      rateBuy: 39.3,
      rateCross: 0,
      rateSell: 40.5006
    },
    {
      currencyCodeA: 978,
      currencyCodeB: 840,
      date: 1685726173,
      rateBuy: 1.064,
      rateCross: 0,
      rateSell: 1.078
    },
    {
      currencyCodeA: 826,
      currencyCodeB: 980,
      date: 1685735730,
      rateBuy: 0,
      rateCross: 46.9244,
      rateSell: 0
    },
    {
      currencyCodeA: 392,
      currencyCodeB: 980,
      date: 1685735211,
      rateBuy: 0,
      rateCross: 0.2706,
      rateSell: 0
    },
    {
      currencyCodeA: 756,
      currencyCodeB: 980,
      date: 1685735714,
      rateBuy: 0,
      rateCross: 41.3511,
      rateSell: 0
    },
    {
      currencyCodeA: 156,
      currencyCodeB: 980,
      date: 1685735673,
      rateBuy: 0,
      rateCross: 5.2944,
      rateSell: 0
    },
    {
      currencyCodeA: 784,
      currencyCodeB: 980,
      date: 1685735656,
      rateBuy: 0,
      rateCross: 10.1965,
      rateSell: 0
    },
    {
      currencyCodeA: 971,
      currencyCodeB: 980,
      date: 1663425223,
      rateBuy: 0,
      rateCross: 0.4252,
      rateSell: 0
    },
    {
      currencyCodeA: 8,
      currencyCodeB: 980,
      date: 1685735651,
      rateBuy: 0,
      rateCross: 0.3693,
      rateSell: 0
    },
    {
      currencyCodeA: 51,
      currencyCodeB: 980,
      date: 1685735496,
      rateBuy: 0,
      rateCross: 0.097,
      rateSell: 0
    },
    {
      currencyCodeA: 973,
      currencyCodeB: 980,
      date: 1685373606,
      rateBuy: 0,
      rateCross: 0.0668,
      rateSell: 0
    },
    {
      currencyCodeA: 32,
      currencyCodeB: 980,
      date: 1685735718,
      rateBuy: 0,
      rateCross: 0.1554,
      rateSell: 0
    },
    {
      currencyCodeA: 36,
      currencyCodeB: 980,
      date: 1685735350,
      rateBuy: 0,
      rateCross: 24.654,
      rateSell: 0
    },
    {
      currencyCodeA: 944,
      currencyCodeB: 980,
      date: 1685735293,
      rateBuy: 0,
      rateCross: 22.0826,
      rateSell: 0
    },
    {
      currencyCodeA: 50,
      currencyCodeB: 980,
      date: 1685734936,
      rateBuy: 0,
      rateCross: 0.3489,
      rateSell: 0
    },
    {
      currencyCodeA: 975,
      currencyCodeB: 980,
      date: 1685735730,
      rateBuy: 0,
      rateCross: 20.5189,
      rateSell: 0
    },
    {
      currencyCodeA: 48,
      currencyCodeB: 980,
      date: 1685735068,
      rateBuy: 0,
      rateCross: 99.3152,
      rateSell: 0
    }]
  
  const urlMono ={
    main: "https://api.monobank.ua",
    info : "https://api.monobank.ua/personal/client-info",
    statement : "https://api.monobank.ua/personal/statement/",
    currency : "https://api.monobank.ua/bank/currency",
    webhook: "https://api.monobank.ua/personal/webhook"
  }
  
const currencyCodes = {
  "AED":784,"AFN":971,"MRO":478,"ZMW":894,"TMM": 795,"VEF":937, "ZMW": 894,"ALL":8,"AMD":51,"ANG":532,"AOA":973,"ARS":32,"AUD":36,"AWG":533,"AZN":944,"BAM":977,"BBD":52,"BDT":50,"BGN":975,"BHD":48,"BIF":108,"BMD":60,"BND":96,"BOB":68,"BOV":984,"BRL":986,"BSD":44,"BTN":64,"BWP":72,"BYN":933,"BZD":84,"CAD":124,"CDF":976,"CHE":947,"CHF":756,"CHW":948,"CLF":990,"CLP":152,"CNY":156,"COP":170,"COU":970,"CRC":188,"CUC":931,"CUP":192,"CVE":132,"CZK":203,"DJF":262,"DKK":208,"DOP":214,"DZD":12,"EGP":818,"ERN":232,"ETB":230,"EUR":978,"FJD":242,"FKP":238,"GBP":826,"GEL":981,"GHS":936,"GIP":292,"GMD":270,"GNF":324,"GTQ":320,"GYD":328,"HKD":344,"HNL":340,"HRK":191,"HTG":332,"HUF":348,"IDR":360,"ILS":376,"INR":356,"IQD":368,"IRR":364,"ISK":352,"JMD":388,"JOD":400,"JPY":392,"KES":404,"KGS":417,"KHR":116,"KMF":174,"KPW":408,"KRW":410,"KWD":414,"KYD":136,"KZT":398,"LAK":418,"LBP":422,"LKR":144,"LRD":430,"LSL":426,"LYD":434,"MAD":504,"MDL":498,"MGA":969,"MKD":807,"MMK":104,"MNT":496,"MOP":446,"MRU":929,"MUR":480,"MVR":462,"MWK":454,"MXN":484,"MXV":979,"MYR":458,"MZN":943,"NAD":516,"NGN":566,"NIO":558,"NOK":578,"NPR":524,"NZD":554,"OMR":512,"PAB":590,"PEN":604,"PGK":598,"PHP":608,"PKR":586,"PLN":985,"PYG":600,"QAR":634,"RON":946,"RSD":941,"RUB":643,"RWF":646,"SAR":682,"SBD":90,"SCR":690,"SDG":938,"SEK":752,"SGD":702,"SHP":654,"SLL":694,"SOS":706,"SRD":968,"SSP":728,"STN":930,"SVC":222,"SYP":760,"SZL":748,"THB":764,"TJS":972,"TMT":934,"TND":788,"TOP":776,"TRY":949,"TTD":780,"TWD":901,"TZS":834,"UAH":980,"UGX":800,"USD":840,"USN":997,"UYI":940,"UYU":858,"UYW":927,"UZS":860,"VES":928,"VND":704,"VUV":548,"WST":882,"XAF":950,"XAG":961,"XAU":959,"XBA":955,"XBB":956,"XBC":957,"XBD":958,"XCD":951,"XDR":960,"XOF":952,"XPD":964,"XPF":953,"XPT":962,"XSU":994,"XTS":963,"XUA":965,"XXX":999,"YER":886,"ZAR":710,"ZMW":967,"ZWL":932,
  getCurrency(ISO4217){
    let currency
    for (const key in this){
      if (this[key] == ISO4217){
        currency = key
      }
    }
    if(currency){
      return currency
    } else {
      return ISO4217}
    }
  }
  
const currencies = {"AED":"AED","TMM": "TMM","VEF":"VEF", "ZMW": "ZMW","AFN":"AFN","ALL":"ALL","AMD":"AMD","ANG":"ANG","AOA":"AOA","ARS":"ARS","AUD":"AUD","AWG":"AWG","AZN":"AZN","BAM":"BAM","BBD":"BBD","BDT":"BDT","BGN":"BGN","BHD":"BHD","BIF":"BIF","BMD":"BMD","BND":"BND","BOB":"BOB","BOV":"BOV","BRL":"BRL","BSD":"BSD","BTN":"BTN","BWP":"BWP","BYN":"BYN","BZD":"BZD","CAD":"CAD","CDF":"CDF","CHE":"CHE","CHF":"CHF","CHW":"CHW","CLF":"CLF","CLP":"CLP","CNY":"CNY","COP":"COP","COU":"COU","CRC":"CRC","CUC":"CUC","CUP":"CUP","CVE":"CVE","CZK":"CZK","DJF":"DJF","DKK":"DKK","DOP":"DOP","DZD":"DZD","EGP":"EGP","ERN":"ERN","ETB":"ETB","EUR":"EUR","FJD":"FJD","FKP":"FKP","GBP":"GBP","GEL":"GEL","GHS":"GHS","GIP":"GIP","GMD":"GMD","GNF":"GNF","GTQ":"GTQ","GYD":"GYD","HKD":"HKD","HNL":"HNL","HRK":"HRK","HTG":"HTG","HUF":"HUF","IDR":"IDR","ILS":"ILS","INR":"INR","IQD":"IQD","IRR":"IRR","ISK":"ISK","JMD":"JMD","JOD":"JOD","JPY":"JPY","KES":"KES","KGS":"KGS","KHR":"KHR","KMF":"KMF","KPW":"KPW","KRW":"KRW","KWD":"KWD","KYD":"KYD","KZT":"KZT","LAK":"LAK","LBP":"LBP","LKR":"LKR","LRD":"LRD","LSL":"LSL","LYD":"LYD","MAD":"MAD","MDL":"MDL","MGA":"MGA","MKD":"MKD","MMK":"MMK","MNT":"MNT","MOP":"MOP","MRU":"MRU","MUR":"MUR","MVR":"MVR","MWK":"MWK","MXN":"MXN","MXV":"MXV","MYR":"MYR","MZN":"MZN","NAD":"NAD","NGN":"NGN","NIO":"NIO","NOK":"NOK","NPR":"NPR","NZD":"NZD","OMR":"OMR","PAB":"PAB","PEN":"PEN","PGK":"PGK","PHP":"PHP","PKR":"PKR","PLN":"PLN","PYG":"PYG","QAR":"QAR","RON":"RON","RSD":"RSD","RUB":"RUB","RWF":"RWF","SAR":"SAR","SBD":"SBD","SCR":"SCR","SDG":"SDG","SEK":"SEK","SGD":"SGD","SHP":"SHP","SLL":"SLL","SOS":"SOS","SRD":"SRD","SSP":"SSP","STN":"STN","SVC":"SVC","SYP":"SYP","SZL":"SZL","THB":"THB","TJS":"TJS","TMT":"TMT","TND":"TND","TOP":"TOP","TRY":"TRY","TTD":"TTD","TWD":"TWD","TZS":"TZS","UAH":"UAH","UGX":"UGX","USD":"USD","USN":"USN","UYI":"UYI","UYU":"UYU","UYW":"UYW","UZS":"UZS","VES":"VES","VND":"VND","VUV":"VUV","WST":"WST","XAF":"XAF","XAG":"XAG","XAU":"XAU","XBA":"XBA","XBB":"XBB","XBC":"XBC","XBD":"XBD","XCD":"XCD","XDR":"XDR","XOF":"XOF","XPD":"XPD","XPF":"XPF","XPT":"XPT","XSU":"XSU","XTS":"XTS","XUA":"XUA","XXX":"XXX","YER":"YER","ZAR":"ZAR","ZMW":"ZMW","ZWL":"ZWL"}


class Currencies {
  constructor(){
    this.currencies 
  }
  set currencySet(currency){
    this.currencies = currency
  }
  getCurrentCur(cur){
  
  }
}

  export {data,urlMono, Currencies,currencyCodes, currencies}