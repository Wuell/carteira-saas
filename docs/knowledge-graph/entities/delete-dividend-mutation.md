---
entity: "Delete Dividend Mutation"
entity_type: method
community: 76
degree: 5
---

# Delete Dividend Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 5

## Description

- A mutation function (`deleteMutation`) used to send a DELETE request to remove a dividend record via an API endpoint.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component executes the Delete Dividend Mutation to remove dividend records.
- [[entities/query-key|Query Key]] — The Delete Dividend Mutation invalidates data associated with a Query Key upon success to ensure fresh data is fetched.
- [[entities/dividends-data|Dividends Data]] — The Delete Dividend Mutation invalidates the cached Dividends Data upon success.
- [[entities/api-dividends-endpoint|Api Dividends Endpoint]] — The Delete Dividend Mutation sends data to the Api Dividends Endpoint.
- [[entities/on-success-callback|On Success Callback]] — The Delete Dividend Mutation configures an On Success Callback to run upon successful data deletion.

## Appears in

- `components/dividend-manager.tsx`
