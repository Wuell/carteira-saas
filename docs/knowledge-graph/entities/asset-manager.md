---
entity: "Asset Manager"
entity_type: method
community: 85
degree: 19
---

# Asset Manager

**Type:** method  
**Community:** [[community-85]]  
**Degree:** 19

## Description

- A component imported and rendered within the Transacoes Page.
- A React functional component that manages investment assets, handling state for categories, forms, errors, sorting, and editing assets.

## Related

- [[entities/app-dashboard-transacoes-pagetsx|App/(Dashboard)/Transacoes/Page.tsx]] — The file `App/(Dashboard)/Transacoes/Page.tsx` imports the `Asset Manager` component.
- [[entities/transacoes-page|Transacoes Page]] — The `Transacoes Page` component renders the `Asset Manager` component.
- [[entities/use-query-client|Use Query Client]] — Asset Manager utilizes Use Query Client for managing data queries.
- [[entities/use-state|Use State]] — Asset Manager extensively uses Use State to manage various aspects of its UI and data, including selectedCategory, fixedSub, form, error, sort, editAsset, and editFixed.
- [[entities/use-ref|Use Ref]] — Asset Manager utilizes Use Ref for managing a debounce timer.
- [[entities/category|Category]] — Asset Manager manages state related to Category, allowing selection and filtering.
- [[entities/fixed-sub|Fixed Sub]] — Asset Manager manages state related to Fixed Sub, for specific fixed investment sub-types.
- [[entities/asset-row|Asset Row]] — Asset Manager manages state for editing an Asset Row.
- [[entities/sort-key|Sort Key]] — Asset Manager manages sorting using a Sort Key to determine the sorting criteria.
- [[entities/selected-category|Selected Category]] — Asset Manager manages the currently selected investment category via the Selected Category state.
- [[entities/fixed-subtype-selection|Fixed Subtype Selection]] — Asset Manager manages the selected fixed-income subtype via the Fixed Subtype Selection state.
- [[entities/asset-manager-form-state|Asset Manager Form State]] — Asset Manager manages the form data for new asset entry via the Asset Manager Form State.
- [[entities/asset-manager-error|Asset Manager Error]] — Asset Manager manages general error messages via the Asset Manager Error state.
- [[entities/ticker-error|Ticker Error]] — Asset Manager manages ticker-specific error messages via the Ticker Error state.
- [[entities/fetching-price-flag|Fetching Price Flag]] — Asset Manager manages the flag indicating price fetching status via the Fetching Price Flag state.
- [[entities/debounce-timer-reference|Debounce Timer Reference]] — Asset Manager uses the Debounce Timer Reference to manage its debounce timeout.
- [[entities/asset-sort-order|Asset Sort Order]] — Asset Manager manages the sorting order of assets via the Asset Sort Order state.
- [[entities/editing-asset-state|Editing Asset State]] — Asset Manager manages the asset currently being edited via the Editing Asset State.
- [[entities/editing-fixed-investment-state|Editing Fixed Investment State]] — Asset Manager manages the fixed investment currently being edited via the Editing Fixed Investment State.

## Appears in

- `app/(dashboard)/transacoes/page.tsx`
- `components/asset-manager.tsx`
