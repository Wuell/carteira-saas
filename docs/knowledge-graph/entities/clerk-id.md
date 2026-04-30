---
entity: "Clerk Id"
entity_type: data
community: 89
degree: 4
---

# Clerk Id

**Type:** data  
**Community:** [[community-89]]  
**Degree:** 4

## Description

- A string identifier used as a unique key to find or create a user record in the database.
- A unique string identifier (`clerkId`) attribute within the User model.

## Related

- [[entities/get-or-create-user-function|Get Or Create User Function]] — The `getOrCreateUser` function accepts a `clerkId` as an input parameter.
- [[entities/find-unique-method|Find Unique Method]] — The `clerkId` is used as a filter criterion within the `findUnique` method.
- [[entities/create-method|Create Method]] — The `clerkId` is provided as data for the `create` method when a new user record is created.
- [[entities/user-model|User Model]] — The User Model uses `clerkId` as a unique identifier for each user.

## Appears in

- `lib/user.ts`
- `prisma/schema.prisma`
