---
entity: "Portfolio"
entity_type: data
community: 68
degree: 9
---

# Portfolio

**Type:** data  
**Community:** [[community-68]]  
**Degree:** 9

## Description

- Portfolio is a type definition for the data structure representing user assets, including variable assets and fixed-income lots.
- A collection of assets or investments, for which the dashboard provides an overview.
- A TypeScript type representing the overall structure of a user's investment portfolio, comprising arrays of `AssetRow` and `FixedLotRow` objects.

## Related

- [[entities/dashboard|Dashboard]] — The `Dashboard` provides a general overview of the `Portfolio`.
- [[entities/assetrow|AssetRow]] — The `Portfolio` data structure contains an array of `AssetRow` objects.
- [[entities/fixedlotrow|FixedLotRow]] — The `Portfolio` data structure contains an array of `FixedLotRow` objects.
- [[entities/allocationchart|AllocationChart]] — AllocationChart processes the fetched Portfolio data to prepare it for visualization.
- [[entities/fetchportfolio|fetchPortfolio]] — The fetchPortfolio function is typed to return a Promise resolving to a Portfolio object.
- [[entities/portfolio-assets|Portfolio Assets]] — The Portfolio data structure includes an array of Portfolio Assets.
- [[entities/portfolio-fixed-lots|Portfolio Fixed Lots]] — The Portfolio data structure includes an array of Portfolio Fixed Lots.
- [[entities/grouped-data|Grouped Data]] — The raw Portfolio data is transformed into Grouped Data by aggregating asset values.
- [[entities/fetch-portfolio|Fetch Portfolio]] — The `Fetch Portfolio` function returns data structured according to the `Portfolio` type.

## Appears in

- `components/allocation-chart.tsx`
- `app/(dashboard)/dashboard/page.tsx`
- `components/asset-table.tsx`
