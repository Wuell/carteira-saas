---
entity: "resolveToGeckoId"
entity_type: method
community: 88
degree: 7
---

# resolveToGeckoId

**Type:** method  
**Community:** [[community-88]]  
**Degree:** 7

## Description

- An asynchronous TypeScript function that attempts to resolve a cryptocurrency symbol to its CoinGecko ID.

## Related

- [[entities/ticker|Ticker]] — The `resolveToGeckoId` function takes a `Ticker` (symbol) as an input parameter.
- [[entities/lib-quotests|Lib/Quotes.ts]] — The `lib/quotes.ts` file defines the `resolveToGeckoId` function.
- [[entities/crypto-symbol-map|Crypto Symbol Map]] — The `resolveToGeckoId` function uses the `Crypto Symbol Map` for initial symbol-to-ID mapping.
- [[entities/coingecko-id|Coingecko ID]] — The `resolveToGeckoId` function returns a `Coingecko ID`.
- [[entities/detecttickertype|detectTickerType]] — The `detectTickerType` function utilizes `resolveToGeckoId` to determine cryptocurrency types.
- [[entities/coingecko-search-api-endpoint|CoinGecko Search API Endpoint]] — The `resolveToGeckoId` function utilizes the `CoinGecko Search API Endpoint`.
- [[entities/coingecko-api|Coingecko API]] — The `resolveToGeckoId` function interacts with the `Coingecko API` to resolve symbols.

## Appears in

- `lib/quotes.ts`
