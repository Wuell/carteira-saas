---
entity: "Tesouro Direto"
entity_type: concept
community: 68
degree: 6
---

# Tesouro Direto

**Type:** concept  
**Community:** [[community-68]]  
**Degree:** 6

## Description

- A specific type of fixed-income investment mentioned in the context of `FixedLotRow.subType`.
- A type of fixed investment (Brazilian Treasury Direct) that requires informing the annual rate and purchase date for prefixado (pre-fixed) bonds.
- A specific sub-type of fixed income investment, meaning 'Direct Treasury'.
- A specific type of investment, displayed when an investment lot's subType is 'tesouro'.

## Related

- [[entities/renda-fixa|Renda Fixa]] — Renda Fixa is a category that includes the investment type Tesouro Direto.
- [[entities/fixed-lot-row|Fixed Lot Row]] — Fixed Lot Row can have 'Tesouro Direto' as its subType.
- [[entities/annual-rate|Annual Rate]] — Tesouro Direto Prefixado investments require providing their annual rate.
- [[entities/fixed-investment|Fixed Investment]] — Fixed Investment includes Tesouro Direto as a specific type.
- [[entities/purchase-date|Purchase Date]] — Tesouro Direto Prefixado investments require providing their purchase date.
- [[entities/tipo|Tipo]] — The `Tipo` column can categorize investments as `Tesouro Direto`.

## Appears in

- `components/asset-manager.tsx`
- `components/asset-table.tsx`
