---
entity: "Get Or Create User Function"
entity_type: method
community: 89
degree: 13
---

# Get Or Create User Function

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 13

## Description

- A custom function imported from `@/lib/user` that either retrieves an existing user or creates a new one based on a user ID.
- A function responsible for either retrieving an existing user or creating a new one based on a provided user ID.
- An asynchronous function designed to retrieve an existing user or create a new one based on a Clerk ID.

## Related

- [[entities/prisma|Prisma]] — The `getOrCreateUser` function interacts with the Prisma ORM for database operations.
- [[entities/app-api-assets-routets|App/Api/Assets/Route.Ts]] — The API route file imports and utilizes the `Get Or Create User Function` for user management.
- [[entities/get-api-handler|GET API Handler]] — The `GET API Handler` uses the `Get Or Create User Function` to retrieve the `User Object`.
- [[entities/lib-user-module|Lib/User Module]] — The `Lib/User Module` exports the `Get Or Create User Function`.
- [[entities/user-object|User Object]] — The `Get Or Create User Function` returns a `User Object`.
- [[entities/lib-user-module|Lib User Module]] — The `Get Or Create User Function` is imported from `Lib User Module`.
- [[entities/get-function|Get Function]] — The `Get Function` relies on `Get Or Create User Function` to obtain user information.
- [[entities/lib-userts|Lib/User.Ts]] — The `lib/user.ts` file defines the `getOrCreateUser` function.
- [[entities/clerk-id|Clerk Id]] — The `getOrCreateUser` function accepts a `clerkId` as an input parameter.
- [[entities/prisma-user-model|Prisma User Model]] — The `getOrCreateUser` function queries and potentially manipulates the `Prisma User Model`.
- [[entities/find-unique-method|Find Unique Method]] — The `getOrCreateUser` function invokes the `findUnique` method to check for an existing user.
- [[entities/create-method|Create Method]] — The `getOrCreateUser` function invokes the `create` method if no existing user is found.
- [[entities/existing-user|Existing User]] — The `Get Or Create User Function` returns the `Existing User` if found.

## Appears in

- `app/api/assets/route.ts`
- `app/api/portfolio/route.ts`
- `lib/user.ts`
