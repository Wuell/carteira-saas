---
entity: "Type Labels"
entity_type: data
community: 85
degree: 2
---

# Type Labels

**Type:** data  
**Community:** [[community-85]]  
**Degree:** 2

## Description

- A constant object that maps internal asset type identifiers (e.g., 'stock_br', 'fii') to their human-readable Portuguese display labels.
- A mapping or dictionary that associates dividend payment types with their descriptive labels for display.

## Related

- [[entities/asset-table-component|Asset Table Component]] — The `Asset Table Component` uses `Type Labels` to display human-readable names for asset types.
- [[entities/form-data|Form Data]] — The `Form Data` (specifically the `type` property) is interpreted using `Type Labels` for display.

## Appears in

- `components/asset-table.tsx`
- `components/dividend-manager.tsx`
