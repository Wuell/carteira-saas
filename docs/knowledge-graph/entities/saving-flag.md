---
entity: "Saving Flag"
entity_type: data
community: 4
degree: 2
---

# Saving Flag

**Type:** data  
**Community:** [[community-4]]  
**Degree:** 2

## Description

- A boolean property or state (`saving`) indicating whether a save operation is currently in progress, often used to disable interactive elements.

## Related

- [[entities/edit-fixed-modal|Edit Fixed Modal]] — The Edit Fixed Modal component receives a Saving Flag as a prop to control the disabled state of the save button.
- [[entities/salvar-button|Salvar Button]] — The Salvar Button is disabled based on the value of the Saving Flag.

## Appears in

- `components/asset-manager.tsx`
