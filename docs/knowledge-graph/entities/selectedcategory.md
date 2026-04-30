---
entity: "SelectedCategory"
entity_type: data
community: 14
degree: 3
---

# SelectedCategory

**Type:** data  
**Community:** [[community-14]]  
**Degree:** 3

## Description

- A state variable holding the currently selected investment category.

## Related

- [[entities/category|Category]] — The `SelectedCategory` state variable holds a value of type `Category`.
- [[entities/goback|GoBack]] — The `GoBack` function resets the `SelectedCategory` state to null.
- [[entities/selectcategory|SelectCategory]] — The `SelectCategory` function updates the `SelectedCategory` state.

## Appears in

- `components/asset-manager.tsx`
