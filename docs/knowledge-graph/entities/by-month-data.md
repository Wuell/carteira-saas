---
entity: "By Month Data"
entity_type: data
community: 82
degree: 2
---

# By Month Data

**Type:** data  
**Community:** [[community-82]]  
**Degree:** 2

## Description

- An intermediate data structure (a record or map) used to accumulate total dividend amounts and date information, grouped by month, before being sorted and mapped into `Month Summary Data`.

## Related

- [[entities/dividends|Dividends]] — The `Dividends` collection is processed and aggregated to populate the `By Month Data` object.
- [[entities/month-summary-data|Month Summary Data]] — The `By Month Data` is transformed, sorted, and sliced to create the `Month Summary Data` for display.

## Appears in

- `components/dividend-manager.tsx`
