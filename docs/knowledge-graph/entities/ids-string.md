---
entity: "IDs String"
entity_type: data
community: 87
degree: 2
---

# IDs String

**Type:** data  
**Community:** [[community-87]]  
**Degree:** 2

## Description

- A comma-separated string of cryptocurrency identifiers, constructed by mapping and joining IDs from the Gecko IDs.

## Related

- [[entities/gecko-ids|Gecko IDs]] — The IDs String is derived from the Gecko IDs array by extracting and joining the Cryptocurrency IDs.
- [[entities/coingecko-api|CoinGecko API]] — The IDs String is used as a query parameter in the URL for the CoinGecko API request.

## Appears in

- `lib/quotes.ts`
