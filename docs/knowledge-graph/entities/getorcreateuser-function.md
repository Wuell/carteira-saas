---
entity: "getOrCreateUser Function"
entity_type: method
community: 2
degree: 6
---

# getOrCreateUser Function

**Type:** method  
**Community:** [[community-2]]  
**Degree:** 6

## Description

- A function from the `User Utility Module` that either retrieves an existing user or creates a new one based on a given `userId`.

## Related

- [[entities/user-utility-module|User Utility Module]] — The `User Utility Module` contains the `getOrCreateUser Function`.
- [[entities/http-post-method|HTTP POST Method]] — The `HTTP POST Method` calls the `getOrCreateUser Function` to associate new lots with a user.
- [[entities/http-get-method|HTTP GET Method]] — The `HTTP GET Method` calls the `getOrCreateUser Function` to manage user sessions.
- [[entities/http-patch-method|HTTP PATCH Method]] — The `HTTP PATCH Method` calls the `getOrCreateUser Function` to verify user ownership before updating lots.
- [[entities/http-delete-method|HTTP DELETE Method]] — The `HTTP DELETE Method` calls the `getOrCreateUser Function` to verify user ownership before deleting lots.
- [[entities/user-data-model|User Data Model]] — The `getOrCreateUser Function` manages the creation and retrieval of `User Data Model` instances.

## Appears in

- `app/api/fixed-income/route.ts`
