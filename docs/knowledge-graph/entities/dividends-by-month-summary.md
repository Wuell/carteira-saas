---
entity: "Dividends By Month Summary"
entity_type: data
community: 76
degree: 3
---

# Dividends By Month Summary

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 3

## Description

- A summarized object (`byMonth`) containing total dividend amounts per month and year, derived from `Base Dividend Data`.

## Related

- [[entities/base-dividend-data|Base Dividend Data]] — Dividends By Month Summary is derived by aggregating data from Base Dividend Data.
- [[entities/to-month-key-function|To Month Key Function]] — Dividends By Month Summary uses the To Month Key Function for grouping dividends by month.
- [[entities/parse-local-date-function|Parse Local Date Function]] — Dividends By Month Summary uses the Parse Local Date Function to extract year and month information.

## Appears in

- `components/dividend-manager.tsx`
