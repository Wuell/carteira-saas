---
entity: "Asset Table Component"
entity_type: artifact
community: 68
degree: 9
---

# Asset Table Component

**Type:** artifact  
**Community:** [[community-68]]  
**Degree:** 9

## Description

- A component used within the `DashboardPage Component` for displaying an asset table.
- A React functional component named `AssetTable` that is responsible for rendering the user's investment portfolio, displaying both volatile assets and fixed income investments in separate tables.

## Related

- [[entities/assetrow|AssetRow]] — The `Asset Table Component` renders and displays data based on the `AssetRow` type.
- [[entities/fixedlotrow|FixedLotRow]] — The `Asset Table Component` renders and displays data based on the `FixedLotRow` type.
- [[entities/dashboard-page-file|Dashboard Page File]] — The `Dashboard Page File` imports the `Asset Table Component` to include its functionality.
- [[entities/dashboard-page-component|Dashboard Page Component]] — The `Dashboard Page Component` integrates and renders the `Asset Table Component`.
- [[entities/use-query-hook|Use Query Hook]] — The `Asset Table Component` uses the `Use Query Hook` to fetch and manage its data.
- [[entities/format-brl|Format BRL]] — The `Asset Table Component` utilizes the `Format BRL` function to format currency values for display.
- [[entities/type-labels|Type Labels]] — The `Asset Table Component` uses `Type Labels` to display human-readable names for asset types.
- [[entities/stocks-fiis-and-crypto-section|Stocks, FIIs, And Crypto Section]] — The `Asset Table Component` includes a section for displaying stocks, FIIs, and cryptocurrencies.
- [[entities/fixed-income-section|Fixed Income Section]] — The `Asset Table Component` includes a section for displaying fixed income investments.

## Appears in

- `app/(dashboard)/dashboard/page.tsx`
- `components/asset-table.tsx`
