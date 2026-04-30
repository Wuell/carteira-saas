---
entity: "Base Dividend Data"
entity_type: data
community: 76
degree: 3
---

# Base Dividend Data

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 3

## Description

- A data set for summary calculations, which is either `Filtered Dividends Data` or `Dividends Data` depending on active filters.

## Related

- [[entities/dividends-data|Dividends Data]] — Base Dividend Data uses Dividends Data if no filters are active.
- [[entities/filtered-dividends-data|Filtered Dividends Data]] — Base Dividend Data uses Filtered Dividends Data if filters are active.
- [[entities/dividends-by-month-summary|Dividends By Month Summary]] — Dividends By Month Summary is derived by aggregating data from Base Dividend Data.

## Appears in

- `components/dividend-manager.tsx`
