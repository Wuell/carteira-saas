---
entity: "Category"
entity_type: concept
community: 14
degree: 6
---

# Category

**Type:** concept  
**Community:** [[community-14]]  
**Degree:** 6

## Description

- A data type used to represent different investment categories.
- A type representing different investment categories (e.g., 'stock', 'fixed').

## Related

- [[entities/asset-manager|Asset Manager]] — Asset Manager manages state related to Category, allowing selection and filtering.
- [[entities/selected-category|Selected Category]] — Selected Category is an instance of the Category type.
- [[entities/useeffect|UseEffect]] — The `useEffect` hook monitors changes in the `selectedCategory` state.
- [[entities/setselectedcategory|SetSelectedCategory]] — The `SetSelectedCategory` method updates the selected `Category`.
- [[entities/categories|CATEGORIES]] — The `CATEGORIES` array defines available `Category` types and their properties.
- [[entities/selectedcategory|SelectedCategory]] — The `SelectedCategory` state variable holds a value of type `Category`.

## Appears in

- `components/asset-manager.tsx`
