---
entity: "Get Batch Stock Quotes Function"
entity_type: method
community: 67
degree: 4
---

# Get Batch Stock Quotes Function

**Type:** method  
**Community:** [[community-67]]  
**Degree:** 4

## Description

- A function designed to fetch market quotes for multiple stock tickers in a single batch operation.

## Related

- [[entities/get-function|Get Function]] — The `Get Function` uses `Get Batch Stock Quotes Function` to fetch stock prices.
- [[entities/fresh-prices|Fresh Prices]] — The `Get Batch Stock Quotes Function` provides `Fresh Prices` for stocks.
- [[entities/lib-quotes-module|Lib Quotes Module]] — The `Get Batch Stock Quotes Function` is imported from `Lib Quotes Module`.
- [[entities/stale-stock-tickers|Stale Stock Tickers]] — `Stale Stock Tickers` are passed as an argument to `Get Batch Stock Quotes Function` to get fresh prices.

## Appears in

- `app/api/portfolio/route.ts`
