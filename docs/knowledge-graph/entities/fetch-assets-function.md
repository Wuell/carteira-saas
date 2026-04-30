---
entity: "Fetch Assets (Function)"
entity_type: method
community: 70
degree: 2
---

# Fetch Assets (Function)

**Type:** method  
**Community:** [[community-70]]  
**Degree:** 2

## Description

- An asynchronous function that fetches an array of `AssetOption` objects from the `/api/portfolio` endpoint, specifically filtering for `stock_br` and `fii` types.

## Related

- [[entities/portfolio-api-endpoint|Portfolio API Endpoint]] — The `fetchAssets` function retrieves asset data from the Portfolio API Endpoint.
- [[entities/asset-option-type|Asset Option (Type)]] — The `fetchAssets` function is designed to retrieve data conforming to the `Asset Option` type.

## Appears in

- `components/dividend-manager.tsx`
