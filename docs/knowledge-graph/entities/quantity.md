---
entity: "Quantity"
entity_type: data
community: 88
degree: 5
---

# Quantity

**Type:** data  
**Community:** [[community-88]]  
**Degree:** 5

## Description

- The numerical amount of units involved in a transaction or held in an asset.
- An input field for the number of units bought or sold, applicable to stock and crypto investments.
- The numerical value entered by the user in the quantity input field of the form.
- The number of units for an investment asset.

## Related

- [[entities/post-handler|POST Handler]] — The `POST Handler` receives and processes `Quantity` information from the request.
- [[entities/investment-asset|Investment Asset]] — An Investment Asset has a Quantity.
- [[entities/stock-investment|Stock Investment]] — Stock Investment uses the Quantity field for data entry.
- [[entities/crypto-investment|Crypto Investment]] — Crypto Investment uses the Quantity field for data entry.
- [[entities/quantity-input-field|Quantity Input Field]] — The Quantity Input Field is used to manage the Quantity data in the form.

## Appears in

- `app/api/transactions/route.ts`
- `components/asset-manager.tsx`
