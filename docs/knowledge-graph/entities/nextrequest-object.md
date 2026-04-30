---
entity: "NextRequest Object"
entity_type: data
community: 2
degree: 3
---

# NextRequest Object

**Type:** data  
**Community:** [[community-2]]  
**Degree:** 3

## Description

- An object representing the incoming HTTP request, providing access to request body and headers.

## Related

- [[entities/http-post-method|HTTP POST Method]] — The `HTTP POST Method` processes data from the `NextRequest Object` to create new fixed income lots.
- [[entities/http-patch-method|HTTP PATCH Method]] — The `HTTP PATCH Method` processes update data from the `NextRequest Object`.
- [[entities/http-delete-method|HTTP DELETE Method]] — The `HTTP DELETE Method` processes the ID from the `NextRequest Object` to identify the lot for deletion.

## Appears in

- `app/api/fixed-income/route.ts`
