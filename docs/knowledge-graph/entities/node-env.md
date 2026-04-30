---
entity: "Node Env"
entity_type: data
community: 89
degree: 2
---

# Node Env

**Type:** data  
**Community:** [[community-89]]  
**Degree:** 2

## Description

- An environment variable (`process.env.NODE_ENV`) that indicates the current operational environment of the application.

## Related

- [[entities/globalforprisma|GlobalForPrisma]] — The assignment to `globalForPrisma.prisma` is conditional based on the `Node Env`.
- [[entities/production|Production]] — The `Node Env` is checked against the value 'production'.

## Appears in

- `lib/db.ts`
