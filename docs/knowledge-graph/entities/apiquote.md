---
entity: "ApiQuote"
entity_type: concept
community: 14
degree: 2
---

# ApiQuote

**Type:** concept  
**Community:** [[community-14]]  
**Degree:** 2

## Description

- An API endpoint (`/api/quote/`) used to fetch real-time price quotes for a given ticker and type.

## Related

- [[entities/price|Price]] — The `ApiQuote` endpoint returns `Price` data.
- [[entities/fetch|Fetch]] — The `Fetch` method sends a request to the `ApiQuote` endpoint.

## Appears in

- `components/asset-manager.tsx`
