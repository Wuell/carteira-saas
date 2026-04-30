---
entity: "Asset Options Data"
entity_type: data
community: 76
degree: 3
---

# Asset Options Data

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 3

## Description

- An array of asset records fetched asynchronously, used for populating ticker selection options.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component fetches Asset Options Data to populate selection fields.
- [[entities/fetch-assets-function|Fetch Assets Function]] — Asset Options Data is retrieved by the Fetch Assets Function.
- [[entities/handle-ticker-select-function|Handle Ticker Select Function]] — The Handle Ticker Select Function uses Asset Options Data to determine the asset type.

## Appears in

- `components/dividend-manager.tsx`
