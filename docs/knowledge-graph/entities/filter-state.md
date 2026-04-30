---
entity: "Filter State"
entity_type: data
community: 76
degree: 6
---

# Filter State

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 6

## Description

- A state variable (`filters`) that holds the current criteria for filtering dividend data, including `month` and `ticker`.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component manages the Filter State for filtering dividend data.
- [[entities/month-filter-dropdown|Month Filter Dropdown]] — The Month Filter Dropdown modifies the Filter State when its value changes.
- [[entities/ticker-filter-dropdown|Ticker Filter Dropdown]] — The Ticker Filter Dropdown modifies the Filter State when its value changes.
- [[entities/clear-filters-button|Clear Filters Button]] — The Clear Filters Button resets the Filter State to its initial empty values.
- [[entities/filtered-dividends-data|Filtered Dividends Data]] — Filtered Dividends Data uses the Filter State to apply filtering conditions.
- [[entities/filters-type|Filters Type]] — The Filter State is typed using the Filters Type, defining its internal structure.

## Appears in

- `components/dividend-manager.tsx`
