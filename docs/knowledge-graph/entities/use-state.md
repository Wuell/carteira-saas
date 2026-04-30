---
entity: "Use State"
entity_type: method
community: 70
degree: 4
---

# Use State

**Type:** method  
**Community:** [[community-70]]  
**Degree:** 4

## Description

- A React hook used by components to declare and manage state variables.
- Use State is a React hook used to add state to functional components.

## Related

- [[entities/asset-manager|Asset Manager]] — Asset Manager extensively uses Use State to manage various aspects of its UI and data, including selectedCategory, fixedSub, form, error, sort, editAsset, and editFixed.
- [[entities/edit-fixed-modal|Edit Fixed Modal]] — Edit Fixed Modal utilizes Use State to manage the form data.
- [[entities/react|React]] — The `useState` hook is a feature provided by the React library.
- [[entities/queryprovider|QueryProvider]] — The QueryProvider component uses the `useState` hook to manage the `QueryClient` instance.

## Appears in

- `components/asset-manager.tsx`
- `components/query-provider.tsx`
