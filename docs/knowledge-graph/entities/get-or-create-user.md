---
entity: "Get Or Create User"
entity_type: method
community: 88
degree: 3
---

# Get Or Create User

**Type:** method  
**Community:** [[community-88]]  
**Degree:** 3

## Description

- A function responsible for either retrieving an existing user or creating a new user record in the database.

## Related

- [[entities/post-handler|POST Handler]] — The `POST Handler` uses `Get Or Create User` to obtain the `User` object for the given `User ID`.
- [[entities/get-handler|GET Handler]] — The `GET Handler` uses `Get Or Create User` to obtain the `User` object for the given `User ID`.
- [[entities/lib-user|Lib/User]] — The Get Or Create User function is defined and exported in the Lib/User module.

## Appears in

- `app/api/transactions/route.ts`
