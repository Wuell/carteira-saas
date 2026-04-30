---
entity: "Price"
entity_type: data
community: 88
degree: 8
---

# Price

**Type:** data  
**Community:** [[community-88]]  
**Degree:** 8

## Description

- The monetary value per unit of an asset in a transaction.
- The numerical value entered by the user in the value/price input field of the form.
- A numerical value representing the current market price of an asset, often displayed with two decimal places.
- A numerical value representing the market price of a financial instrument.

## Related

- [[entities/post-handler|POST Handler]] — The `POST Handler` receives and processes `Price` information from the request.
- [[entities/apiquote|ApiQuote]] — The `ApiQuote` endpoint returns `Price` data.
- [[entities/form|Form]] — The `Form` data structure includes a `Price` field.
- [[entities/value-price-input-field|Value Price Input Field]] — The Value Price Input Field is used to manage the Price data in the form.
- [[entities/detecttickertype|detectTickerType]] — The `detectTickerType` function returns the `Price` of a financial instrument.
- [[entities/getquote|getQuote]] — The `getQuote` function returns the `Price` of a financial instrument.
- [[entities/getbatchstockquotes|getBatchStockQuotes]] — The `getBatchStockQuotes` function returns `Price` information for multiple tickers.
- [[entities/getbatchcryptoquotes|getBatchCryptoQuotes]] — The `getBatchCryptoQuotes` function returns `Price` information for multiple cryptocurrencies.

## Appears in

- `app/api/transactions/route.ts`
- `components/asset-manager.tsx`
- `lib/quotes.ts`
