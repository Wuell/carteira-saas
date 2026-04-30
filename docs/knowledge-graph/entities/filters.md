---
entity: "Filters"
entity_type: data
community: 82
degree: 2
---

# Filters

**Type:** data  
**Community:** [[community-82]]  
**Degree:** 2

## Description

- Criteria (e.g., month, ticker) used to refine the set of displayed dividend records.

## Related

- [[entities/filtered-dividends|Filtered Dividends]] — The `Filters` are applied to the `Dividends` to determine the `Filtered Dividends`.
- [[entities/has-filter-status|Has Filter Status]] — The `Has Filter Status` is determined by whether any `Filters` (month or ticker) are active.

## Appears in

- `components/dividend-manager.tsx`
