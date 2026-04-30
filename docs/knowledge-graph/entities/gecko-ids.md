---
entity: "Gecko IDs"
entity_type: data
community: 87
degree: 5
---

# Gecko IDs

**Type:** data  
**Community:** [[community-87]]  
**Degree:** 5

## Description

- An array of objects, where each object contains a cryptocurrency ID and a ticker symbol, serving as input for the price fetching process.

## Related

- [[entities/ids-string|IDs String]] — The IDs String is derived from the Gecko IDs array by extracting and joining the Cryptocurrency IDs.
- [[entities/ticker-symbol|Ticker Symbol]] — Each object within Gecko IDs contains a Ticker Symbol.
- [[entities/cryptocurrency-price-fetcher|Cryptocurrency Price Fetcher]] — The Cryptocurrency Price Fetcher takes Gecko IDs as its primary input for fetching prices.
- [[entities/cryptocurrency-id|Cryptocurrency ID]] — Each object within Gecko IDs contains a Cryptocurrency ID.
- [[entities/error-handling-logic|Error Handling Logic]] — The Error Handling Logic checks if the Gecko IDs input is empty at the start, returning an empty result if so.

## Appears in

- `lib/quotes.ts`
