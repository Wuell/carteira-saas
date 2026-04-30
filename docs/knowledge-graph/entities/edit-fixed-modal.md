---
entity: "Edit Fixed Modal"
entity_type: method
community: 4
degree: 13
---

# Edit Fixed Modal

**Type:** method  
**Community:** [[community-4]]  
**Degree:** 13

## Description

- A React functional component responsible for rendering a modal to edit fixed-income investment details.

## Related

- [[entities/edit-fixed-form|Edit Fixed Form]] — Edit Fixed Modal uses Edit Fixed Form as a type for its internal state and for the onSave callback parameter.
- [[entities/fixed-lot-row|Fixed Lot Row]] — Edit Fixed Modal receives an object of type Fixed Lot Row as its 'lot' prop, which provides initial data for the form.
- [[entities/use-state|Use State]] — Edit Fixed Modal utilizes Use State to manage the form data.
- [[entities/cancelar-button|Cancelar Button]] — Edit Fixed Modal renders a Cancelar Button allowing users to close the modal.
- [[entities/salvar-button|Salvar Button]] — Edit Fixed Modal renders a Salvar Button to save the edited investment details.
- [[entities/editar-investimento-text|Editar Investimento Text]] — Edit Fixed Modal displays the Editar Investimento Text as its title.
- [[entities/nome-input-field|Nome Input Field]] — Edit Fixed Modal includes a Nome Input Field for the investment's name.
- [[entities/valor-investido-input-field|Valor Investido Input Field]] — Edit Fixed Modal includes a Valor Investido Input Field for the investment's invested value.
- [[entities/valor-atual-input-field|Valor Atual Input Field]] — Edit Fixed Modal includes a Valor Atual Input Field for the investment's current value.
- [[entities/on-close-handler|On Close Handler]] — The Edit Fixed Modal component accepts an On Close Handler as a prop to handle modal dismissal.
- [[entities/on-save-handler|On Save Handler]] — The Edit Fixed Modal component accepts an On Save Handler as a prop to handle saving form data.
- [[entities/saving-flag|Saving Flag]] — The Edit Fixed Modal component receives a Saving Flag as a prop to control the disabled state of the save button.
- [[entities/edit-fixed-form-state|Edit Fixed Form State]] — The Edit Fixed Modal manages its internal form data using the Edit Fixed Form State.

## Appears in

- `components/asset-manager.tsx`
