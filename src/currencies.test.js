import { getCrossRate } from "./currencies.js";

const currencyInfo = {
    currencyCodeA:980,
    currencyCodeB: 840,
    rateSale: 5,
    rateBuy: 2,
    rateCross: 0
}

test('returns crossRate', () => {
    expect(getCrossRate(currencyInfo, 980)).toBe(2);
  });