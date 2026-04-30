---
entity: "CACHE_TTL_MS"
entity_type: data
community: 67
degree: 2
---

# CACHE_TTL_MS

**Type:** data  
**Community:** [[community-67]]  
**Degree:** 2

## Description

- A constant representing the cache time-to-live in milliseconds, set to 8 hours.

## Related

- [[entities/asset-data-model|Asset Data Model]] — The `Asset Data Model` utilizes `CACHE_TTL_MS` to determine when cached prices expire.
- [[entities/get-function|Get Function]] — The `Get Function` uses `CACHE_TTL_MS` to filter assets whose cached prices have expired.

## Appears in

- `app/api/portfolio/route.ts`
