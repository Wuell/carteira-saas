---
entity: "Error Handling"
entity_type: concept
community: 2
degree: 4
---

# Error Handling

**Type:** concept  
**Community:** [[community-2]]  
**Degree:** 4

## Description

- The system within the API route that manages and responds to various errors, such as unauthorized access or missing data.

## Related

- [[entities/http-post-method|HTTP POST Method]] — The `HTTP POST Method` uses `Error Handling` for missing mandatory fields and unauthorized access.
- [[entities/http-patch-method|HTTP PATCH Method]] — The `HTTP PATCH Method` uses `Error Handling` for lots not found or unauthorized access.
- [[entities/http-delete-method|HTTP DELETE Method]] — The `HTTP DELETE Method` uses `Error Handling` for lots not found or unauthorized access.
- [[entities/http-status-codes|HTTP Status Codes]] — The `Error Handling` mechanism uses `HTTP Status Codes` to communicate specific error types to the client.

## Appears in

- `app/api/fixed-income/route.ts`
