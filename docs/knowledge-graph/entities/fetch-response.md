---
entity: "Fetch Response"
entity_type: data
community: 87
degree: 3
---

# Fetch Response

**Type:** data  
**Community:** [[community-87]]  
**Degree:** 3

## Description

- The HTTP response object received after making an asynchronous request to the CoinGecko API.

## Related

- [[entities/coingecko-api|CoinGecko API]] — The CoinGecko API generates and provides the Fetch Response to the request.
- [[entities/json-data|JSON Data]] — The JSON Data is parsed from the content of the Fetch Response.
- [[entities/error-handling-logic|Error Handling Logic]] — The Fetch Response's 'ok' status is evaluated by the Error Handling Logic to detect request failures.

## Appears in

- `lib/quotes.ts`
