---
entity: "Loading State"
entity_type: data
community: 75
degree: 2
---

# Loading State

**Type:** data  
**Community:** [[community-75]]  
**Degree:** 2

## Description

- A boolean state variable (`isLoading`) indicating whether data, such as fixed income investments, is currently being loaded.
- A conceptual state indicating that data is being fetched or processed, which can cause the `Table Display` to show a "Carregando..." (Loading...) message.
- A boolean state (`isLoading`) indicating whether dividend data is currently being fetched from the backend.

## Related

- [[entities/fixed-income-table|Fixed Income Table]] — The Loading State affects whether the Fixed Income Table or a loading message is displayed.
- [[entities/table-display|Table Display]] — The `Loading State` determines whether a "Carregando..." message is shown in the `Table Display`.

## Appears in

- `components/asset-manager.tsx`
- `components/dividend-manager.tsx`
