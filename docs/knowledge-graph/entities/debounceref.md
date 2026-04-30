---
entity: "DebounceRef"
entity_type: data
community: 12
degree: 2
---

# DebounceRef

**Type:** data  
**Community:** [[community-12]]  
**Degree:** 2

## Description

- A mutable ref object used to store and manage the ID of a timeout for debouncing API calls.

## Related

- [[entities/useref|UseRef]] — The `useRef` hook is used to manage the `DebounceRef` object.
- [[entities/settimeout|SetTimeout]] — The `DebounceRef` stores the ID returned by `setTimeout` to manage the debounced function.

## Appears in

- `components/asset-manager.tsx`
