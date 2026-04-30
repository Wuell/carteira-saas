---
entity: "getQuote"
entity_type: method
community: 88
degree: 8
---

# getQuote

**Type:** method  
**Community:** [[community-88]]  
**Degree:** 8

## Description

- An asynchronous TypeScript function that retrieves the market price for a single financial `Ticker` based on its specified `Type`.

## Related

- [[entities/ticker|Ticker]] — The `getQuote` function takes a `Ticker` as an input parameter.
- [[entities/price|Price]] — The `getQuote` function returns the `Price` of a financial instrument.
- [[entities/lib-quotests|Lib/Quotes.ts]] — The `lib/quotes.ts` file defines the `getQuote` function.
- [[entities/crypto-type|Crypto (Type)]] — The `getQuote` function takes `Crypto (Type)` as a parameter to specify the instrument type.
- [[entities/fii|FII]] — The `getQuote` function takes `FII` as a parameter to specify the instrument type.
- [[entities/stock_br|Stock_BR]] — The `getQuote` function takes `Stock_BR` as a parameter to specify the instrument type.
- [[entities/getbatchcryptoquotes|getBatchCryptoQuotes]] — The `getQuote` function delegates cryptocurrency quote fetching to `getBatchCryptoQuotes`.
- [[entities/getbatchstockquotes|getBatchStockQuotes]] — The `getQuote` function delegates stock quote fetching to `getBatchStockQuotes`.

## Appears in

- `lib/quotes.ts`
