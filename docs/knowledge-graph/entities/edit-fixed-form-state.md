---
entity: "Edit Fixed Form State"
entity_type: data
community: 4
degree: 4
---

# Edit Fixed Form State

**Type:** data  
**Community:** [[community-4]]  
**Degree:** 4

## Description

- The internal state variable `form` within `EditFixedModal`, holding the editable values (name, investedValue, currentValue) for a fixed investment.

## Related

- [[entities/edit-fixed-modal|Edit Fixed Modal]] — The Edit Fixed Modal manages its internal form data using the Edit Fixed Form State.
- [[entities/nome-input-field|Nome Input Field]] — The Nome Input Field updates and is bound to the name property of the Edit Fixed Form State.
- [[entities/valor-investido-input-field|Valor Investido Input Field]] — The Valor Investido Input Field updates and is bound to the investedValue property of the Edit Fixed Form State.
- [[entities/valor-atual-input-field|Valor Atual Input Field]] — The Valor Atual Input Field updates and is bound to the currentValue property of the Edit Fixed Form State.

## Appears in

- `components/asset-manager.tsx`
