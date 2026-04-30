---
entity: "Get Batch Crypto Quotes Function"
entity_type: method
community: 67
degree: 4
---

# Get Batch Crypto Quotes Function

**Type:** method  
**Community:** [[community-67]]  
**Degree:** 4

## Description

- A function designed to fetch market quotes for multiple cryptocurrency tickers in a single batch operation.

## Related

- [[entities/get-function|Get Function]] — The `Get Function` uses `Get Batch Crypto Quotes Function` to fetch cryptocurrency prices.
- [[entities/lib-quotes-module|Lib Quotes Module]] — The `Get Batch Crypto Quotes Function` is imported from `Lib Quotes Module`.
- [[entities/stale-crypto-tickers|Stale Crypto Tickers]] — `Stale Crypto Tickers` are passed as an argument to `Get Batch Crypto Quotes Function` to get fresh prices.
- [[entities/fresh-prices|Fresh Prices]] — The `Get Batch Crypto Quotes Function` provides `Fresh Prices` for cryptocurrencies.

## Appears in

- `app/api/portfolio/route.ts`
