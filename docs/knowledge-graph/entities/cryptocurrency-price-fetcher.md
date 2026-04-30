---
entity: "Cryptocurrency Price Fetcher"
entity_type: method
community: 87
degree: 4
---

# Cryptocurrency Price Fetcher

**Type:** method  
**Community:** [[community-87]]  
**Degree:** 4

## Description

- A function designed to fetch cryptocurrency prices from the CoinGecko API, process them, and return them mapped by ticker symbol in Brazilian Real (BRL).

## Related

- [[entities/gecko-ids|Gecko IDs]] — The Cryptocurrency Price Fetcher takes Gecko IDs as its primary input for fetching prices.
- [[entities/coingecko-api|CoinGecko API]] — The Cryptocurrency Price Fetcher interacts with the CoinGecko API to retrieve price data.
- [[entities/output-result|Output Result]] — The Cryptocurrency Price Fetcher produces the Output Result containing the processed cryptocurrency prices.
- [[entities/error-handling-logic|Error Handling Logic]] — The Cryptocurrency Price Fetcher incorporates Error Handling Logic to manage potential issues during execution.

## Appears in

- `lib/quotes.ts`
