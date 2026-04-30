---
entity: "AssetRow"
entity_type: data
community: 68
degree: 2
---

# AssetRow

**Type:** data  
**Community:** [[community-68]]  
**Degree:** 2

## Description

- A data structure representing a single row of asset information, likely used in tables or lists.
- A TypeScript type defining the structure for a single asset entry in a portfolio, including fields like ticker, type, quantity, prices, and return percentage.

## Related

- [[entities/portfolio|Portfolio]] — The `Portfolio` data structure contains an array of `AssetRow` objects.
- [[entities/asset-table-component|Asset Table Component]] — The `Asset Table Component` renders and displays data based on the `AssetRow` type.

## Appears in

- `components/asset-manager.tsx`
- `components/asset-table.tsx`
