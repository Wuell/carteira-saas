---
entity: "Selected Fixed Income ID"
entity_type: data
community: 68
degree: 4
---

# Selected Fixed Income ID

**Type:** data  
**Community:** [[community-68]]  
**Degree:** 4

## Description

- An identifier (`selectedFixedId`) that tracks the currently selected fixed income investment in the user interface.

## Related

- [[entities/editar-button|Editar Button]] — The Selected Fixed Income ID determines if the Editar Button is enabled for interaction.
- [[entities/remover-button|Remover Button]] — The Selected Fixed Income ID determines if the Remover Button is enabled for interaction.
- [[entities/selected-status|Selected Status]] — The Selected Status is determined by comparing the Selected Fixed Income ID with a Lot ID.
- [[entities/delete-fixed-income-mutation|Delete Fixed Income Mutation]] — The Delete Fixed Income Mutation uses the Selected Fixed Income ID to perform its operation.

## Appears in

- `components/asset-manager.tsx`
