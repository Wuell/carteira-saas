---
entity: "AskUserQuestion"
entity_type: method
community: 51
degree: 4
---

# AskUserQuestion

**Type:** method  
**Community:** [[community-51]]  
**Degree:** 4

## Description

- A specific function or action to be used when ambiguity or unexpected issues arise.
- A method used in FASE 1 to present a bundle of four questions to the user.
- A specific mechanism used within the setup wizard for interactive user prompts.

## Related

- [[entities/user|User]] — The `AskUserQuestion` function is used to interact with and ask questions to the user.
- [[entities/ambiguity|Ambiguity]] — AskUserQuestion is used to address ambiguity outside of defined phases.
- [[entities/unexpected-break|Unexpected Break]] — AskUserQuestion should be invoked if something breaks unexpectedly.
- [[entities/setup-wizard|Setup Wizard]] — The Setup Wizard uses `AskUserQuestion` for interactive prompts.

## Appears in

- `RAG-INIT.md`
