---
entity: "Active Filters Indicator"
entity_type: concept
community: 75
degree: 2
---

# Active Filters Indicator

**Type:** concept  
**Community:** [[community-75]]  
**Degree:** 2

## Description

- A boolean concept (`hasFilter`) that indicates whether any filters are currently active, influencing the display of filtered results count and total.

## Related

- [[entities/history-section|History Section]] — The `History Section` conditionally displays filter-related information based on the `Active Filters Indicator`.
- [[entities/table-display|Table Display]] — The `Table Display` shows a "no results" message based on `Active Filters Indicator` and `Filtered Records List` length.

## Appears in

- `components/dividend-manager.tsx`
