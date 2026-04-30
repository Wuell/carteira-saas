---
entity: "Stack Detection"
entity_type: method
community: 51
degree: 13
---

# Stack Detection

**Type:** method  
**Community:** [[community-51]]  
**Degree:** 13

## Description

- A process within the setup wizard to identify the technology stack of the user's project.

## Related

- [[entities/pyprojecttoml|Pyproject.toml]] — Stack Detection uses `pyproject.toml` to identify the project stack.
- [[entities/project-root|Project Root]] — Stack Detection explores directory structures relative to the project root.
- [[entities/packagejson|Package.json]] — Stack Detection uses `package.json` to identify the project stack.
- [[entities/cargotoml|Cargo.toml]] — Stack Detection uses `Cargo.toml` to identify the project stack.
- [[entities/gomod|Go.mod]] — Stack Detection uses `go.mod` to identify the project stack.
- [[entities/requirementstxt|Requirements.txt]] — Stack Detection uses `requirements.txt` to identify the project stack.
- [[entities/app-directory|App Directory]] — Stack Detection checks for the `app/` directory.
- [[entities/src-directory|Src Directory]] — Stack Detection checks for the `src/` directory.
- [[entities/components-directory|Components Directory]] — Stack Detection checks for the `components/` directory.
- [[entities/convex-directory|Convex Directory]] — Stack Detection checks for the `convex/` directory.
- [[entities/prisma-directory|Prisma Directory]] — Stack Detection checks for the `prisma/` directory.
- [[entities/docs-directory|Docs Directory]] — Stack Detection checks for the `docs/` directory.
- [[entities/pre-requisites-detection|Pre-Requisites Detection]] — Pre-Requisites Detection includes the method for stack detection.

## Appears in

- `RAG-INIT.md`
