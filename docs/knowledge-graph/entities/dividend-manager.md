---
entity: "Dividend Manager"
entity_type: concept
community: 76
degree: 15
---

# Dividend Manager

**Type:** concept  
**Community:** [[community-76]]  
**Degree:** 15

## Description

- Dividend Manager is a component used within the Proventos Page, likely managing dividends.
- The main React component responsible for managing dividend data, filters, and mutations within an application.

## Related

- [[entities/proventos-page|Proventos Page]] — The Proventos Page component renders and utilizes the Dividend Manager component.
- [[entities/components-dividend-manager|@/components/dividend-manager]] — The Dividend Manager component is imported from the path `@/components/dividend-manager`.
- [[entities/query-client|Query Client]] — The Dividend Manager component uses the Query Client to manage its data queries.
- [[entities/dividend-form-state|Dividend Form State]] — The Dividend Manager component manages the Dividend Form State for user input.
- [[entities/error-state|Error State]] — The Dividend Manager component manages the Error State to display error messages.
- [[entities/filter-state|Filter State]] — The Dividend Manager component manages the Filter State for filtering dividend data.
- [[entities/selected-dividend-id-state|Selected Dividend ID State]] — The Dividend Manager component manages the Selected Dividend ID State.
- [[entities/dividends-data|Dividends Data]] — The Dividend Manager component fetches Dividends Data for display and processing.
- [[entities/asset-options-data|Asset Options Data]] — The Dividend Manager component fetches Asset Options Data to populate selection fields.
- [[entities/add-dividend-mutation|Add Dividend Mutation]] — The Dividend Manager component executes the Add Dividend Mutation to add new dividend records.
- [[entities/delete-dividend-mutation|Delete Dividend Mutation]] — The Dividend Manager component executes the Delete Dividend Mutation to remove dividend records.
- [[entities/use-state-hook|Use State Hook]] — The Dividend Manager component uses the Use State Hook to declare and manage its various state variables.
- [[entities/use-query-hook|Use Query Hook]] — The Dividend Manager component uses the Use Query Hook to fetch Dividends Data and Asset Options Data.
- [[entities/use-mutation-hook|Use Mutation Hook]] — The Dividend Manager component uses the Use Mutation Hook to perform add and delete operations on dividend data.
- [[entities/use-query-client-hook|Use Query Client Hook]] — The Dividend Manager component uses the Use Query Client Hook to obtain the query client instance for cache invalidation.

## Appears in

- `app/(dashboard)/proventos/page.tsx`
- `components/dividend-manager.tsx`
