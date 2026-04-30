---
entity: "SetTickerError"
entity_type: method
community: 14
degree: 5
---

# SetTickerError

**Type:** method  
**Community:** [[community-14]]  
**Degree:** 5

## Description

- A function to update the ticker-specific error message state variable.

## Related

- [[entities/usestate|UseState]] — The `useState` hook is used to manage the `TickerError` message state through `SetTickerError`.
- [[entities/useeffect|UseEffect]] — The `useEffect` hook updates the `TickerError` state based on fetch results.
- [[entities/tickererror|TickerError]] — The `SetTickerError` method updates the `TickerError` state.
- [[entities/goback|GoBack]] — The `GoBack` method clears the `TickerError` state.
- [[entities/selectcategory|SelectCategory]] — The `SelectCategory` function calls `SetTickerError` to clear any ticker-specific error messages.

## Appears in

- `components/asset-manager.tsx`
