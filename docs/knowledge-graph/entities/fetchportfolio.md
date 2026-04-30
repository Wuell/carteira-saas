---
entity: "fetchPortfolio"
entity_type: method
community: 68
degree: 3
---

# fetchPortfolio

**Type:** method  
**Community:** [[community-68]]  
**Degree:** 3

## Description

- fetchPortfolio is an asynchronous function that fetches portfolio data from the `/api/portfolio` endpoint.

## Related

- [[entities/portfolio|Portfolio]] — The fetchPortfolio function is typed to return a Promise resolving to a Portfolio object.
- [[entities/usequery|useQuery]] — The useQuery hook calls the fetchPortfolio function to retrieve data.
- [[entities/api-portfolio-endpoint|API Portfolio Endpoint]] — The fetchPortfolio function accesses the API Portfolio Endpoint to retrieve portfolio data.

## Appears in

- `components/allocation-chart.tsx`
