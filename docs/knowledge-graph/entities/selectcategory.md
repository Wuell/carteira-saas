---
entity: "SelectCategory"
entity_type: method
community: 14
degree: 6
---

# SelectCategory

**Type:** method  
**Community:** [[community-14]]  
**Degree:** 6

## Description

- A function that handles the selection of an investment category, updating related state variables and form data.

## Related

- [[entities/setfixedsub|SetFixedSub]] — The `SelectCategory` function calls `SetFixedSub` to reset the fixed sub-category.
- [[entities/categories|CATEGORIES]] — The `SelectCategory` function references `CATEGORIES` to find the appropriate API type.
- [[entities/seterror|SetError]] — The `SelectCategory` function calls `SetError` to clear any general error messages.
- [[entities/settickererror|SetTickerError]] — The `SelectCategory` function calls `SetTickerError` to clear any ticker-specific error messages.
- [[entities/selectedcategory|SelectedCategory]] — The `SelectCategory` function updates the `SelectedCategory` state.
- [[entities/setform|SetForm]] — The `SelectCategory` function calls `SetForm` to initialize transaction form data.

## Appears in

- `components/asset-manager.tsx`
