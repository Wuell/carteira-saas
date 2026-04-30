---
entity: "Edit Asset Modal Component"
entity_type: artifact
community: 76
degree: 7
---

# Edit Asset Modal Component

**Type:** artifact  
**Community:** [[community-76]]  
**Degree:** 7

## Description

- A React functional component named `EditAssetModal` that provides a modal interface for users to edit details of an `AssetRow`.
- A modal UI component (`EditAssetModal`) used for editing the details of an asset.

## Related

- [[entities/usestate-hook|useState Hook]] — The `Edit Asset Modal Component` employs the `useState Hook` to manage its internal form state.
- [[entities/asset-row-type|Asset Row Type]] — The `Edit Asset Modal Component` is designed to manage and display details of an `Asset Row Type` object.
- [[entities/edit-asset-form-type|Edit Asset Form Type]] — The `Edit Asset Modal Component` uses the `Edit Asset Form Type` for its input form data.
- [[entities/asset-quantity-data|Asset Quantity Data]] — The `Edit Asset Modal Component` manages and displays input for the `Asset Quantity Data`.
- [[entities/average-price-data|Average Price Data]] — The `Edit Asset Modal Component` manages and displays input for the `Average Price Data`.
- [[entities/edit-asset-state|Edit Asset State]] — The Edit Asset Modal Component is rendered based on the presence and content of the Edit Asset State.
- [[entities/edit-asset-mutation|Edit Asset Mutation]] — The Edit Asset Modal Component triggers the Edit Asset Mutation on save.

## Appears in

- `components/asset-manager.tsx`
