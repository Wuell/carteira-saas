---
entity: "Error State"
entity_type: data
community: 76
degree: 8
---

# Error State

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 8

## Description

- A state variable used to store and display error messages to the user.
- A state variable (`error`) used to store and display error messages related to form submissions or API calls.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component manages the Error State to display error messages.
- [[entities/add-mutation|Add Mutation]] — The Add Mutation updates the Error State with an error message if the operation fails.
- [[entities/edit-asset-mutation|Edit Asset Mutation]] — The Edit Asset Mutation updates the Error State with an error message if the operation fails.
- [[entities/edit-fixed-mutation|Edit Fixed Mutation]] — The Edit Fixed Mutation updates the Error State with an error message if the operation fails.
- [[entities/delete-asset-mutation|Delete Asset Mutation]] — The Delete Asset Mutation updates the Error State with an error message if the operation fails.
- [[entities/delete-fixed-mutation|Delete Fixed Mutation]] — The Delete Fixed Mutation updates the Error State with an error message if the operation fails.
- [[entities/handle-submit-function|Handle Submit Function]] — The Handle Submit Function updates the Error State if form validation fails.
- [[entities/add-dividend-mutation|Add Dividend Mutation]] — The Add Dividend Mutation updates the Error State if an error occurs during the operation.

## Appears in

- `components/asset-manager.tsx`
- `components/dividend-manager.tsx`
