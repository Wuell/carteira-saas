---
entity: "UseEffect"
entity_type: concept
community: 14
degree: 6
---

# UseEffect

**Type:** concept  
**Community:** [[community-14]]  
**Degree:** 6

## Description

- A React hook used to perform side effects in functional components, such as data fetching or subscriptions.

## Related

- [[entities/category|Category]] — The `useEffect` hook monitors changes in the `selectedCategory` state.
- [[entities/form|Form]] — The `useEffect` hook monitors changes in the `Form` (specifically `form.ticker`) to trigger actions.
- [[entities/settickererror|SetTickerError]] — The `useEffect` hook updates the `TickerError` state based on fetch results.
- [[entities/fetch|Fetch]] — The `useEffect` hook initiates a `Fetch` request to an API.
- [[entities/setfetchingprice|SetFetchingPrice]] — The `useEffect` hook updates the `FetchingPrice` state during API calls.
- [[entities/setform|SetForm]] — The `useEffect` hook updates the `Form` state, specifically the price field.

## Appears in

- `components/asset-manager.tsx`
