---
entity: "DELETE Function"
entity_type: method
community: 89
degree: 10
---

# DELETE Function

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 10

## Description

- The DELETE function handles HTTP DELETE requests, responsible for deleting a specific dividend record belonging to an authenticated user.

## Related

- [[entities/auth|Auth]] — The DELETE function uses the Auth method to authenticate requests.
- [[entities/nextrequest|NextRequest]] — The DELETE function receives request data via NextRequest.
- [[entities/nextresponse|NextResponse]] — The DELETE function returns a NextResponse indicating success or an error.
- [[entities/prisma|Prisma]] — The DELETE function uses Prisma to delete dividend records.
- [[entities/app-api-dividends-routets|App/Api/Dividends/Route.ts]] — The file `app/api/dividends/route.ts` defines the DELETE function.
- [[entities/getorcreateuser|GetOrCreateUser]] — The DELETE function uses GetOrCreateUser to manage user sessions.
- [[entities/dividend|Dividend]] — The DELETE function deletes a Dividend record.
- [[entities/no-autorizado|Não Autorizado]] — The DELETE function returns a "Não Autorizado" error if the UserId is missing.
- [[entities/registro-no-encontrado|Registro Não Encontrado]] — The DELETE function returns a "Registro Não Encontrado" error if the dividend is not found or owned by the user.
- [[entities/http-delete-request|HTTP DELETE Request]] — The DELETE function is responsible for handling HTTP DELETE requests.

## Appears in

- `app/api/dividends/route.ts`
