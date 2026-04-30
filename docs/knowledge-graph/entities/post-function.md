---
entity: "POST Function"
entity_type: method
community: 89
degree: 10
---

# POST Function

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 10

## Description

- The POST function handles HTTP POST requests, responsible for creating a new dividend record for an authenticated user.

## Related

- [[entities/auth|Auth]] — The POST function uses the Auth method to authenticate requests.
- [[entities/nextrequest|NextRequest]] — The POST function receives request data via NextRequest.
- [[entities/nextresponse|NextResponse]] — The POST function returns a NextResponse containing the created dividend or an error.
- [[entities/prisma|Prisma]] — The POST function uses Prisma to create new dividend records.
- [[entities/app-api-dividends-routets|App/Api/Dividends/Route.ts]] — The file `app/api/dividends/route.ts` defines the POST function.
- [[entities/getorcreateuser|GetOrCreateUser]] — The POST function uses GetOrCreateUser to manage user sessions.
- [[entities/no-autorizado|Não Autorizado]] — The POST function returns a "Não Autorizado" error if the UserId is missing.
- [[entities/dividend|Dividend]] — The POST function creates a new Dividend record.
- [[entities/campos-obrigatrios-ausentes|Campos Obrigatórios Ausentes]] — The POST function returns a "Campos Obrigatórios Ausentes" error if required fields are missing.
- [[entities/http-post-request|HTTP POST Request]] — The POST function is responsible for handling HTTP POST requests.

## Appears in

- `app/api/dividends/route.ts`
