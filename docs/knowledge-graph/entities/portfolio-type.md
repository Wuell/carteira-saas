---
entity: "Portfolio Type"
entity_type: concept
community: 68
degree: 9
---

# Portfolio Type

**Type:** concept  
**Community:** [[community-68]]  
**Degree:** 9

## Description

- A TypeScript type definition representing a collection of financial instruments, comprising an array of `AssetRow` and an array of `FixedLotRow`.
- A TypeScript type definition specifying the structure of portfolio data, including total value, total invested, return percentage, assets, and fixed lots.

## Related

- [[entities/return-percentage|Return Percentage]] — The Portfolio Type includes Return Percentage as one of its attributes.
- [[entities/fixed-lots|Fixed Lots]] — The Portfolio Type includes Fixed Lots as one of its attributes.
- [[entities/asset-row-type|Asset Row Type]] — The `Portfolio Type` is composed of an array of `Asset Row Type` objects.
- [[entities/fixed-lot-row-type|Fixed Lot Row Type]] — The `Portfolio Type` is composed of an array of `Fixed Lot Row Type` objects.
- [[entities/fetch-portfolio-method|Fetch Portfolio Method]] — The `Fetch Portfolio Method` is designed to return data conforming to the `Portfolio Type`.
- [[entities/total-value|Total Value]] — The Portfolio Type includes Total Value as one of its attributes.
- [[entities/total-invested|Total Invested]] — The Portfolio Type includes Total Invested as one of its attributes.
- [[entities/portfolio-assets|Portfolio Assets]] — The Portfolio Type includes Portfolio Assets as one of its attributes.
- [[entities/fetch-portfolio-function|Fetch Portfolio Function]] — The Fetch Portfolio Function is designed to return data structured according to the Portfolio Type.

## Appears in

- `components/asset-manager.tsx`
- `components/portfolio-cards.tsx`
