---
entity: "Crypto Symbol Map"
entity_type: data
community: 88
degree: 9
---

# Crypto Symbol Map

**Type:** data  
**Community:** [[community-88]]  
**Degree:** 9

## Description

- A constant TypeScript `Record` that maps cryptocurrency symbols (e.g., BTC) to their respective CoinGecko IDs (e.g., 'bitcoin').

## Related

- [[entities/lib-quotests|Lib/Quotes.ts]] — The `lib/quotes.ts` file defines the `Crypto Symbol Map`.
- [[entities/detecttickertype|detectTickerType]] — The `detectTickerType` function checks the `Crypto Symbol Map` to identify known cryptocurrencies.
- [[entities/resolvetogeckoid|resolveToGeckoId]] — The `resolveToGeckoId` function uses the `Crypto Symbol Map` for initial symbol-to-ID mapping.
- [[entities/getbatchcryptoquotes|getBatchCryptoQuotes]] — The `getBatchCryptoQuotes` function uses the `Crypto Symbol Map` to resolve crypto IDs.
- [[entities/bitcoin|Bitcoin]] — The `Crypto Symbol Map` contains a mapping for `Bitcoin`.
- [[entities/ethereum|Ethereum]] — The `Crypto Symbol Map` contains a mapping for `Ethereum`.
- [[entities/solana|Solana]] — The `Crypto Symbol Map` contains a mapping for `Solana`.
- [[entities/cryptocurrency-symbol|Cryptocurrency Symbol]] — The `Crypto Symbol Map` uses `Cryptocurrency Symbol` as keys.
- [[entities/coingecko-id|Coingecko ID]] — The `Crypto Symbol Map` stores `Coingecko ID`s as values.

## Appears in

- `lib/quotes.ts`
