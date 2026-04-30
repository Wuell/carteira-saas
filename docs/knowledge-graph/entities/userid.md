---
entity: "UserId"
entity_type: data
community: 89
degree: 4
---

# UserId

**Type:** data  
**Community:** [[community-89]]  
**Degree:** 4

## Description

- UserId is an identifier for an authenticated user, used for authorization and linking dividend records.

## Related

- [[entities/auth|Auth]] — The Auth function provides the UserId for authenticated users.
- [[entities/user|User]] — A User is identified by a UserId.
- [[entities/getorcreateuser|GetOrCreateUser]] — The GetOrCreateUser function uses UserId to find or create a User.
- [[entities/dividend|Dividend]] — A Dividend record is associated with a UserId, indicating ownership.

## Appears in

- `app/api/dividends/route.ts`
