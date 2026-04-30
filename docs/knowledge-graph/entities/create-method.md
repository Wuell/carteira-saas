---
entity: "Create Method"
entity_type: method
community: 89
degree: 3
---

# Create Method

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 3

## Description

- A Prisma method used to insert a new record into the database.

## Related

- [[entities/get-or-create-user-function|Get Or Create User Function]] — The `getOrCreateUser` function invokes the `create` method if no existing user is found.
- [[entities/clerk-id|Clerk Id]] — The `clerkId` is provided as data for the `create` method when a new user record is created.
- [[entities/prisma-user-model|Prisma User Model]] — The `create` method operates on the `Prisma User Model` to add a new user.

## Appears in

- `lib/user.ts`
