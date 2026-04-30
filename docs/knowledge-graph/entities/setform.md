---
entity: "SetForm"
entity_type: method
community: 14
degree: 4
---

# SetForm

**Type:** method  
**Community:** [[community-14]]  
**Degree:** 4

## Description

- A function provided by `useState` to update the `Form` state variable.

## Related

- [[entities/form|Form]] — The `SetForm` function updates the `Form` state variable.
- [[entities/useeffect|UseEffect]] — The `useEffect` hook updates the `Form` state, specifically the price field.
- [[entities/selectcategory|SelectCategory]] — The `SelectCategory` function calls `SetForm` to initialize transaction form data.
- [[entities/selectfixedsub|SelectFixedSub]] — The `SelectFixedSub` function calls `SetForm` to modify the form, clearing ticker and price.

## Appears in

- `components/asset-manager.tsx`
