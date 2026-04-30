---
entity: "Unauthorized Error (401)"
entity_type: concept
community: 89
degree: 3
---

# Unauthorized Error (401)

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 3

## Description

- An HTTP status code indicating that the request could not be authenticated.

## Related

- [[entities/get-api-handler|GET API Handler]] — The `GET API Handler` returns an `Unauthorized Error (401)` if `User Id` is missing.
- [[entities/patch-api-handler|PATCH API Handler]] — The `PATCH API Handler` returns an `Unauthorized Error (401)` if `User Id` is missing.
- [[entities/delete-api-handler|DELETE API Handler]] — The `DELETE API Handler` returns an `Unauthorized Error (401)` if `User Id` is missing.

## Appears in

- `app/api/assets/route.ts`
