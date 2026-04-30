---
entity: "Investment Lot"
entity_type: data
community: 68
degree: 8
---

# Investment Lot

**Type:** data  
**Community:** [[community-68]]  
**Degree:** 8

## Description

- An object representing a single investment, containing properties like name, type, and financial values.

## Related

- [[entities/return-percentage|Return Percentage]] — An `Investment Lot` has a `Return Percentage` indicating its financial performance.
- [[entities/fixed-lots|Fixed Lots]] — The `Fixed Lots` array contains multiple `Investment Lot` objects.
- [[entities/nome|Nome]] — Each `Investment Lot` provides data for the `Nome` column.
- [[entities/tipo|Tipo]] — Each `Investment Lot` provides data for the `Tipo` column.
- [[entities/valor-investido|Valor Investido]] — Each `Investment Lot` provides data for the `Valor Investido` column.
- [[entities/valor-atual|Valor Atual]] — Each `Investment Lot` provides data for the `Valor Atual` column.
- [[entities/rentabilidade|Rentabilidade]] — Each `Investment Lot` provides data for the `Rentabilidade` column.
- [[entities/subtype|SubType]] — An `Investment Lot` possesses a `SubType` attribute that categorizes it.

## Appears in

- `components/asset-table.tsx`
