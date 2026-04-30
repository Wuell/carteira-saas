---
entity: "Add Dividend Mutation"
entity_type: method
community: 76
degree: 8
---

# Add Dividend Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 8

## Description

- A mutation function (`addMutation`) used to send a POST request to add a new dividend record via an API endpoint.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component executes the Add Dividend Mutation to add new dividend records.
- [[entities/error-state|Error State]] — The Add Dividend Mutation updates the Error State if an error occurs during the operation.
- [[entities/handle-submit-function|Handle Submit Function]] — The Handle Submit Function triggers the Add Dividend Mutation after form validation.
- [[entities/query-key|Query Key]] — The Add Dividend Mutation invalidates data associated with a Query Key upon success to ensure fresh data is fetched.
- [[entities/dividends-data|Dividends Data]] — The Add Dividend Mutation invalidates the cached Dividends Data upon success.
- [[entities/api-dividends-endpoint|Api Dividends Endpoint]] — The Add Dividend Mutation sends data to the Api Dividends Endpoint.
- [[entities/on-success-callback|On Success Callback]] — The Add Dividend Mutation configures an On Success Callback to run upon successful data submission.
- [[entities/on-error-callback|On Error Callback]] — The Add Dividend Mutation configures an On Error Callback to run if an error occurs during data submission.

## Appears in

- `components/dividend-manager.tsx`
