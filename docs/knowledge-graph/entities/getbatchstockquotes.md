---
entity: "getBatchStockQuotes"
entity_type: method
community: 88
degree: 8
---

# getBatchStockQuotes

**Type:** method  
**Community:** [[community-88]]  
**Degree:** 8

## Description

- An asynchronous TypeScript function that fetches market prices for an array of stock `Tickers` from the `Brapi API`.

## Related

- [[entities/ticker|Ticker]] — The `getBatchStockQuotes` function takes multiple `Ticker` instances as input.
- [[entities/price|Price]] — The `getBatchStockQuotes` function returns `Price` information for multiple tickers.
- [[entities/lib-quotests|Lib/Quotes.ts]] — The `lib/quotes.ts` file defines the `getBatchStockQuotes` function.
- [[entities/brapi_token|BRAPI_TOKEN]] — The `getBatchStockQuotes` function uses the `BRAPI_TOKEN` for API authentication.
- [[entities/brapi-api|Brapi API]] — The `getBatchStockQuotes` function queries the `Brapi API` for stock prices.
- [[entities/brapi-quote-api-endpoint|Brapi Quote API Endpoint]] — The `getBatchStockQuotes` function utilizes the `Brapi Quote API Endpoint`.
- [[entities/getquote|getQuote]] — The `getQuote` function delegates stock quote fetching to `getBatchStockQuotes`.
- [[entities/tickers-parameter|Tickers (Parameter)]] — The `getBatchStockQuotes` function takes `Tickers (Parameter)` as an input.

## Appears in

- `lib/quotes.ts`
