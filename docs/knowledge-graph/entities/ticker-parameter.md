---
entity: "Ticker Parameter"
entity_type: concept
community: 8
degree: 4
---

# Ticker Parameter

**Type:** concept  
**Community:** [[community-8]]  
**Degree:** 4

## Description

- A dynamic route parameter that represents a stock or cryptocurrency ticker symbol.

## Related

- [[entities/get-request-handler|GET Request Handler]] — The GET Request Handler extracts and processes the `ticker` parameter from the route.
- [[entities/coingecko-id|CoinGecko ID]] — A Ticker Parameter can be a CoinGecko ID for cryptocurrencies.
- [[entities/b3-code|B3 Code]] — A Ticker Parameter can be a B3 Code for stocks.
- [[entities/error-message-portuguese|Error Message (Portuguese)]] — The Portuguese error message includes the Ticker Parameter value when it is not found.

## Appears in

- `app/api/quote/[ticker]/route.ts`
