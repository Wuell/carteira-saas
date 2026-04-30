---
entity: "Month Options Data"
entity_type: data
community: 76
degree: 2
---

# Month Options Data

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 2

## Description

- A sorted list of unique month keys derived from `Dividends Data`, used to populate the month filter dropdown.

## Related

- [[entities/dividends-data|Dividends Data]] — Month Options Data is derived from the `paidAt` property of Dividends Data.
- [[entities/to-month-key-function|To Month Key Function]] — Month Options Data uses the To Month Key Function to generate unique month keys.

## Appears in

- `components/dividend-manager.tsx`
