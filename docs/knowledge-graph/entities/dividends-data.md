---
entity: "Dividends Data"
entity_type: data
community: 76
degree: 8
---

# Dividends Data

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 8

## Description

- An array of dividend records fetched asynchronously from a backend.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component fetches Dividends Data for display and processing.
- [[entities/fetch-dividends-function|Fetch Dividends Function]] — Dividends Data is retrieved by the Fetch Dividends Function.
- [[entities/month-options-data|Month Options Data]] — Month Options Data is derived from the `paidAt` property of Dividends Data.
- [[entities/ticker-options-data|Ticker Options Data]] — Ticker Options Data is derived from the `ticker` property of Dividends Data.
- [[entities/filtered-dividends-data|Filtered Dividends Data]] — Filtered Dividends Data is derived by filtering the complete Dividends Data.
- [[entities/base-dividend-data|Base Dividend Data]] — Base Dividend Data uses Dividends Data if no filters are active.
- [[entities/delete-dividend-mutation|Delete Dividend Mutation]] — The Delete Dividend Mutation invalidates the cached Dividends Data upon success.
- [[entities/add-dividend-mutation|Add Dividend Mutation]] — The Add Dividend Mutation invalidates the cached Dividends Data upon success.

## Appears in

- `components/dividend-manager.tsx`
