---
entity: "Paid At Date"
entity_type: data
community: 82
degree: 3
---

# Paid At Date

**Type:** data  
**Community:** [[community-82]]  
**Degree:** 3

## Description

- The specific date and time when a dividend payment was received.

## Related

- [[entities/dividends|Dividends]] — Each record within `Dividends` has a `Paid At Date` property.
- [[entities/to-month-key-method|To Month Key Method]] — The `To Month Key Method` processes the `Paid At Date` to generate a `Month Key`.
- [[entities/parse-local-date-method|Parse Local Date Method]] — The `Parse Local Date Method` is used to parse the `Paid At Date` string into a date object.

## Appears in

- `components/dividend-manager.tsx`
