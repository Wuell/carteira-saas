---
entity: "Total Received"
entity_type: concept
community: 82
degree: 2
---

# Total Received

**Type:** concept  
**Community:** [[community-82]]  
**Degree:** 2

## Description

- The cumulative sum of all dividend amounts processed by the system.

## Related

- [[entities/dividends|Dividends]] — The `Total Received` is calculated by aggregating all `Amount` values from `Dividends`.
- [[entities/cards-summary-ui-section|Cards Summary UI Section]] — The `Total Received` amount is displayed in the `Cards Summary UI Section`.

## Appears in

- `components/dividend-manager.tsx`
