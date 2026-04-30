---
entity: "Fixed Lot Row"
entity_type: data
community: 68
degree: 4
---

# Fixed Lot Row

**Type:** data  
**Community:** [[community-68]]  
**Degree:** 4

## Description

- A data type representing a row of data for a fixed-income investment lot, including name, investedValue, currentValue, and subType.

## Related

- [[entities/tesouro-direto|Tesouro Direto]] — Fixed Lot Row can have 'Tesouro Direto' as its subType.
- [[entities/cdb-lci-lca|CDB / LCI / LCA]] — Fixed Lot Row can have 'CDB / LCI / LCA' as its subType.
- [[entities/edit-fixed-modal|Edit Fixed Modal]] — Edit Fixed Modal receives an object of type Fixed Lot Row as its 'lot' prop, which provides initial data for the form.
- [[entities/editing-fixed-investment-state|Editing Fixed Investment State]] — Editing Fixed Investment State is an instance of the Fixed Lot Row type.

## Appears in

- `components/asset-manager.tsx`
