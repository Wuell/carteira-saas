---
entity: "Not Found Error (404)"
entity_type: concept
community: 89
degree: 2
---

# Not Found Error (404)

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 2

## Description

- An HTTP status code indicating that the requested asset was not found or the user is not authorized to access it.

## Related

- [[entities/patch-api-handler|PATCH API Handler]] — The `PATCH API Handler` returns a `Not Found Error (404)` if the `Asset Object` is not found or user access is unauthorized.
- [[entities/delete-api-handler|DELETE API Handler]] — The `DELETE API Handler` returns a `Not Found Error (404)` if the `Asset Object` is not found or user access is unauthorized.

## Appears in

- `app/api/assets/route.ts`
