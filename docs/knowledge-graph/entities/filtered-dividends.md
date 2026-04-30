---
entity: "Filtered Dividends"
entity_type: data
community: 82
degree: 3
---

# Filtered Dividends

**Type:** data  
**Community:** [[community-82]]  
**Degree:** 3

## Description

- A collection of dividend records that have been filtered based on specific criteria like month or ticker.

## Related

- [[entities/dividends|Dividends]] — The `Dividends` collection is filtered to produce the `Filtered Dividends` based on user-defined criteria.
- [[entities/filtered-total|Filtered Total]] — The `Filtered Total` is calculated by aggregating the `Amount` property of all `Filtered Dividends`.
- [[entities/filters|Filters]] — The `Filters` are applied to the `Dividends` to determine the `Filtered Dividends`.

## Appears in

- `components/dividend-manager.tsx`
