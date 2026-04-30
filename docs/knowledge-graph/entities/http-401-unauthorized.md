---
entity: "HTTP 401 Unauthorized"
entity_type: concept
community: 88
degree: 2
---

# HTTP 401 Unauthorized

**Type:** concept  
**Community:** [[community-88]]  
**Degree:** 2

## Description

- An HTTP status code (401) returned when authentication fails or is missing, accompanied by the message 'Não autorizado'.

## Related

- [[entities/get-handler|GET Handler]] — The `GET Handler` returns `HTTP 401 Unauthorized` if the `User ID` is not found.
- [[entities/post-handler|POST Handler]] — The `POST Handler` returns `HTTP 401 Unauthorized` if the `User ID` is not found.

## Appears in

- `app/api/transactions/route.ts`
