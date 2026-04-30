---
entity: "Ticker"
entity_type: data
community: 88
degree: 18
---

# Ticker

**Type:** data  
**Community:** [[community-88]]  
**Degree:** 18

## Description

- The stock or asset symbol, used to identify specific investments.
- Ticker is a stock ticker symbol, a property of a `Dividend` record.
- An input field for the ticker symbol of a stock (e.g., PETR4, MXRF11) or cryptocurrency (e.g., BTC, ETH, SOL).
- A short abbreviation used to identify publicly traded securities or cryptocurrencies, such as PETR4, MXRF11, BTC, ETH, and SOL.
- A string representing a financial instrument's identifier, used as input for fetching quotes or determining type.

## Related

- [[entities/post-handler|POST Handler]] — The `POST Handler` receives and processes `Ticker` information from the request.
- [[entities/dividend|Dividend]] — A Dividend record has a Ticker property.
- [[entities/stock-investment|Stock Investment]] — Stock Investment uses the Ticker field for data entry.
- [[entities/petr4|PETR4]] — PETR4 is an example for the Ticker field for stocks.
- [[entities/mxrf11|MXRF11]] — MXRF11 is an example for the Ticker field for stocks.
- [[entities/btc|BTC]] — BTC is an example for the Ticker field for cryptocurrencies.
- [[entities/eth|ETH]] — ETH is an example for the Ticker field for cryptocurrencies.
- [[entities/sol|SOL]] — SOL is an example for the Ticker field for cryptocurrencies.
- [[entities/fetching-price-indicator|Fetching Price Indicator]] — The Ticker input field is associated with the Fetching Price Indicator while price data is being retrieved.
- [[entities/ticker-error|Ticker Error]] — Entering an invalid ticker can trigger a Ticker Error message.
- [[entities/crypto-investment|Crypto Investment]] — Crypto Investment uses the Ticker field for data entry.
- [[entities/tickererror|TickerError]] — The `TickerError` specifically refers to issues with a `Ticker` input.
- [[entities/form|Form]] — The `Form` data structure includes a `Ticker` field.
- [[entities/detecttickertype|detectTickerType]] — The `detectTickerType` function takes a `Ticker` as an input parameter.
- [[entities/resolvetogeckoid|resolveToGeckoId]] — The `resolveToGeckoId` function takes a `Ticker` (symbol) as an input parameter.
- [[entities/getquote|getQuote]] — The `getQuote` function takes a `Ticker` as an input parameter.
- [[entities/getbatchstockquotes|getBatchStockQuotes]] — The `getBatchStockQuotes` function takes multiple `Ticker` instances as input.
- [[entities/getbatchcryptoquotes|getBatchCryptoQuotes]] — The `getBatchCryptoQuotes` function takes multiple `Ticker` instances as input.

## Appears in

- `app/api/transactions/route.ts`
- `app/api/dividends/route.ts`
- `components/asset-manager.tsx`
- `lib/quotes.ts`
