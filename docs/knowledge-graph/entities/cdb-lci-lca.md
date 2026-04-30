---
entity: "CDB / LCI / LCA"
entity_type: concept
community: 68
degree: 5
---

# CDB / LCI / LCA

**Type:** concept  
**Community:** [[community-68]]  
**Degree:** 5

## Description

- Common types of fixed-income investments mentioned in the context of `FixedLotRow.subType`.
- A type of fixed investment that requires informing the accumulated yield from a banking application.
- Specific sub-types of fixed income investments, including Certificates of Deposit, Real Estate Credit Bills, and Agribusiness Credit Bills.
- A category of investment types, displayed when an investment lot's subType is not 'tesouro'.

## Related

- [[entities/renda-fixa|Renda Fixa]] — Renda Fixa is a category that includes the investment types CDB / LCI / LCA.
- [[entities/fixed-lot-row|Fixed Lot Row]] — Fixed Lot Row can have 'CDB / LCI / LCA' as its subType.
- [[entities/fixed-investment|Fixed Investment]] — Fixed Investment includes CDB / LCI / LCA as a specific type.
- [[entities/accumulated-yield|Accumulated Yield]] — CDB / LCI / LCA investments require providing their accumulated yield.
- [[entities/tipo|Tipo]] — The `Tipo` column can categorize investments as `CDB / LCI / LCA`.

## Appears in

- `components/asset-manager.tsx`
- `components/asset-table.tsx`
