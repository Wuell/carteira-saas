---
entity: "Average Price"
entity_type: data
community: 88
degree: 4
---

# Average Price

**Type:** data  
**Community:** [[community-88]]  
**Degree:** 4

## Description

- The calculated average cost of an `Asset` held by a user.
- The mean price at which an investment asset was acquired.

## Related

- [[entities/post-handler|POST Handler]] — The `POST Handler` calculates and updates the `Average Price` for assets during buy operations.
- [[entities/asset|Asset]] — An `Asset` record includes an `Average Price` property.
- [[entities/investment-asset|Investment Asset]] — An Investment Asset has an Average Price.
- [[entities/brazilian-real-formatting-function|Brazilian Real Formatting Function]] — The Brazilian Real Formatting Function is applied to format the Average Price.

## Appears in

- `app/api/transactions/route.ts`
- `components/asset-manager.tsx`
