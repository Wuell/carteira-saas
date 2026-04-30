---
entity: "getBatchCryptoQuotes"
entity_type: method
community: 88
degree: 9
---

# getBatchCryptoQuotes

**Type:** method  
**Community:** [[community-88]]  
**Degree:** 9

## Description

- An asynchronous TypeScript function that fetches market prices for an array of cryptocurrency `Tickers` from the `Coingecko API`.

## Related

- [[entities/ticker|Ticker]] — The `getBatchCryptoQuotes` function takes multiple `Ticker` instances as input.
- [[entities/price|Price]] — The `getBatchCryptoQuotes` function returns `Price` information for multiple cryptocurrencies.
- [[entities/lib-quotests|Lib/Quotes.ts]] — The `lib/quotes.ts` file defines the `getBatchCryptoQuotes` function.
- [[entities/crypto-symbol-map|Crypto Symbol Map]] — The `getBatchCryptoQuotes` function uses the `Crypto Symbol Map` to resolve crypto IDs.
- [[entities/coingecko-api|Coingecko API]] — The `getBatchCryptoQuotes` function queries the `Coingecko API` for crypto prices.
- [[entities/brl-brazilian-real|BRL (Brazilian Real)]] — The `getBatchCryptoQuotes` function requests prices in `BRL (Brazilian Real)`.
- [[entities/getquote|getQuote]] — The `getQuote` function delegates cryptocurrency quote fetching to `getBatchCryptoQuotes`.
- [[entities/tickers-parameter|Tickers (Parameter)]] — The `getBatchCryptoQuotes` function takes `Tickers (Parameter)` as an input.
- [[entities/coingecko-simple-price-api-endpoint|CoinGecko Simple Price API Endpoint]] — The `getBatchCryptoQuotes` function utilizes the `CoinGecko Simple Price API Endpoint`.

## Appears in

- `lib/quotes.ts`
