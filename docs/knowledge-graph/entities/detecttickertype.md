---
entity: "detectTickerType"
entity_type: method
community: 88
degree: 10
---

# detectTickerType

**Type:** method  
**Community:** [[community-88]]  
**Degree:** 10

## Description

- An asynchronous TypeScript function that determines if a given `Ticker` represents a crypto, FII, or Brazilian stock, and attempts to fetch its price.

## Related

- [[entities/ticker|Ticker]] — The `detectTickerType` function takes a `Ticker` as an input parameter.
- [[entities/price|Price]] — The `detectTickerType` function returns the `Price` of a financial instrument.
- [[entities/lib-quotests|Lib/Quotes.ts]] — The `lib/quotes.ts` file defines the `detectTickerType` function.
- [[entities/crypto-symbol-map|Crypto Symbol Map]] — The `detectTickerType` function checks the `Crypto Symbol Map` to identify known cryptocurrencies.
- [[entities/resolvetogeckoid|resolveToGeckoId]] — The `detectTickerType` function utilizes `resolveToGeckoId` to determine cryptocurrency types.
- [[entities/coingecko-api|Coingecko API]] — The `detectTickerType` function interacts with the `Coingecko API` to fetch cryptocurrency data.
- [[entities/brapi-api|Brapi API]] — The `detectTickerType` function interacts with the `Brapi API` to fetch stock data.
- [[entities/crypto-type|Crypto (Type)]] — The `detectTickerType` function can classify a `Ticker` as a `Crypto (Type)`.
- [[entities/fii|FII]] — The `detectTickerType` function can classify a `Ticker` as an `FII`.
- [[entities/stock_br|Stock_BR]] — The `detectTickerType` function can classify a `Ticker` as a `Stock_BR`.

## Appears in

- `lib/quotes.ts`
