---
entity: "DetectTickerType Function"
entity_type: method
community: 8
degree: 4
---

# DetectTickerType Function

**Type:** method  
**Community:** [[community-8]]  
**Degree:** 4

## Description

- A function imported from `@/lib/quotes` used to automatically determine the type of a given ticker symbol.

## Related

- [[entities/get-request-handler|GET Request Handler]] — The GET Request Handler calls `detectTickerType` if the type parameter is not provided.
- [[entities/lib-quotes-module|Lib/Quotes Module]] — The DetectTickerType Function is imported from the Lib/Quotes Module.
- [[entities/coingecko-id|CoinGecko ID]] — The DetectTickerType Function can identify tickers as CoinGecko IDs.
- [[entities/b3-code|B3 Code]] — The DetectTickerType Function can identify tickers as B3 Codes.

## Appears in

- `app/api/quote/[ticker]/route.ts`
