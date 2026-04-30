---
entity: "FixedLotRow"
entity_type: data
community: 68
degree: 2
---

# FixedLotRow

**Type:** data  
**Community:** [[community-68]]  
**Degree:** 2

## Description

- A data structure representing a single row of fixed lot information.
- A TypeScript type defining the structure for a single fixed lot investment, including fields like name, subType, invested value, current value, and return percentage.

## Related

- [[entities/portfolio|Portfolio]] — The `Portfolio` data structure contains an array of `FixedLotRow` objects.
- [[entities/asset-table-component|Asset Table Component]] — The `Asset Table Component` renders and displays data based on the `FixedLotRow` type.

## Appears in

- `components/asset-manager.tsx`
- `components/asset-table.tsx`
