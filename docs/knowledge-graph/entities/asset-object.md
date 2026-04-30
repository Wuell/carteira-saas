---
entity: "Asset Object"
entity_type: data
community: 17
degree: 12
---

# Asset Object

**Type:** data  
**Community:** [[community-17]]  
**Degree:** 12

## Description

- A singular financial instrument or holding, represented as an object with properties like ticker, type, quantity, and price.
- An object representing a single asset record in the database, with properties like ID, quantity, and average price.

## Related

- [[entities/selected-asset-id|Selected Asset ID]] — The `id` property of an Asset Object is used to determine the Selected Asset ID.
- [[entities/assets-list|Assets List]] — The Assets List is composed of individual Asset Objects.
- [[entities/asset-ticker|Asset Ticker]] — Each Asset Object is identified by an Asset Ticker.
- [[entities/asset-type|Asset Type]] — Each Asset Object has a classification indicating its Asset Type.
- [[entities/asset-quantity|Asset Quantity]] — Each Asset Object includes its numerical Asset Quantity for display in the table.
- [[entities/asset-average-price|Asset Average Price]] — Each Asset Object includes its Asset Average Price.
- [[entities/asset-current-price|Asset Current Price]] — Each Asset Object includes its Asset Current Price.
- [[entities/asset-current-value|Asset Current Value]] — Each Asset Object includes its Asset Current Value.
- [[entities/asset-return-percentage-pl|Asset Return Percentage (P&L)]] — Each Asset Object includes its Asset Return Percentage (P&L).
- [[entities/set-edit-asset-method|Set Edit Asset Method]] — The Set Edit Asset Method is invoked with a specific Asset Object to prepare it for editing.
- [[entities/asset-id|Asset Id]] — The `Asset Object` includes the `Asset Id` as a property.
- [[entities/user-id|User Id]] — The `Asset Object` includes a `User Id` to link it to its owner.

## Appears in

- `components/asset-manager.tsx`
- `app/api/assets/route.ts`
