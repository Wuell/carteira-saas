---
entity: "Fixed Lots"
entity_type: data
community: 68
degree: 5
---

# Fixed Lots

**Type:** data  
**Community:** [[community-68]]  
**Degree:** 5

## Description

- A collection or list of all fixed income investment entries.
- An array of investment objects, iterated through to display table rows.
- A list of fixed lots or holdings within the portfolio.

## Related

- [[entities/fixed-income-investment|Fixed Income Investment]] — Fixed Lots is a collection that contains individual Fixed Income Investments.
- [[entities/fixed-income-table|Fixed Income Table]] — The Fixed Income Table's display is conditional on the presence of Fixed Lots.
- [[entities/investment-table|Investment Table]] — The `Investment Table` displays the data from `Fixed Lots`.
- [[entities/investment-lot|Investment Lot]] — The `Fixed Lots` array contains multiple `Investment Lot` objects.
- [[entities/portfolio-type|Portfolio Type]] — The Portfolio Type includes Fixed Lots as one of its attributes.

## Appears in

- `components/asset-manager.tsx`
- `components/asset-table.tsx`
- `components/portfolio-cards.tsx`
