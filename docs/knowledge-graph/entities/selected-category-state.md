---
entity: "Selected Category State"
entity_type: data
community: 76
degree: 3
---

# Selected Category State

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 3

## Description

- A state variable indicating the currently selected category for asset input (e.g., 'fixed').

## Related

- [[entities/handle-submit-function|Handle Submit Function]] — The Handle Submit Function uses the Selected Category State to determine which mutation to call.
- [[entities/change-category-button|Change Category Button]] — The Change Category Button is displayed and modifies the Selected Category State.
- [[entities/category-id|Category ID]] — A Category ID is used to update the Selected Category State when a user selects a category.

## Appears in

- `components/asset-manager.tsx`
