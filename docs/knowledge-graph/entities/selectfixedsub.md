---
entity: "SelectFixedSub"
entity_type: method
community: 14
degree: 3
---

# SelectFixedSub

**Type:** method  
**Community:** [[community-14]]  
**Degree:** 3

## Description

- A function that handles the selection of a fixed sub-category, updating related form data.

## Related

- [[entities/seterror|SetError]] — The `SelectFixedSub` function calls `SetError` to clear any general error messages.
- [[entities/fixedsub|FixedSub]] — The `SelectFixedSub` function updates the `FixedSub` state.
- [[entities/setform|SetForm]] — The `SelectFixedSub` function calls `SetForm` to modify the form, clearing ticker and price.

## Appears in

- `components/asset-manager.tsx`
