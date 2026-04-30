---
entity: "Filtered Dividends Data"
entity_type: data
community: 76
degree: 4
---

# Filtered Dividends Data

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 4

## Description

- An array of dividend records that have been filtered based on the current `Filter State`.

## Related

- [[entities/filter-state|Filter State]] — Filtered Dividends Data uses the Filter State to apply filtering conditions.
- [[entities/dividends-data|Dividends Data]] — Filtered Dividends Data is derived by filtering the complete Dividends Data.
- [[entities/to-month-key-function|To Month Key Function]] — Filtered Dividends Data uses the To Month Key Function for month-based filtering.
- [[entities/base-dividend-data|Base Dividend Data]] — Base Dividend Data uses Filtered Dividends Data if filters are active.

## Appears in

- `components/dividend-manager.tsx`
