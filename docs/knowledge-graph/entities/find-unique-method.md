---
entity: "Find Unique Method"
entity_type: method
community: 89
degree: 4
---

# Find Unique Method

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 4

## Description

- A Prisma method used to query the database for a unique record matching specified criteria.

## Related

- [[entities/get-or-create-user-function|Get Or Create User Function]] — The `getOrCreateUser` function invokes the `findUnique` method to check for an existing user.
- [[entities/clerk-id|Clerk Id]] — The `clerkId` is used as a filter criterion within the `findUnique` method.
- [[entities/prisma-user-model|Prisma User Model]] — The `findUnique` method operates on the `Prisma User Model`.
- [[entities/existing-user|Existing User]] — The `existing` variable is assigned the result of the `findUnique` method call.

## Appears in

- `lib/user.ts`
