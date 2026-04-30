---
entity: "Asset"
entity_type: data
community: 88
degree: 3
---

# Asset

**Type:** data  
**Community:** [[community-88]]  
**Degree:** 3

## Description

- A data entity representing an investment asset held by a user, tracked by `ticker`, `type`, `quantity`, and `average price`.

## Related

- [[entities/post-handler|POST Handler]] — The POST Handler queries existing Asset records to find a matching asset for the user and ticker.
- [[entities/user|User]] — A `User` owns `Asset` records in their portfolio.
- [[entities/average-price|Average Price]] — An `Asset` record includes an `Average Price` property.

## Appears in

- `app/api/transactions/route.ts`
