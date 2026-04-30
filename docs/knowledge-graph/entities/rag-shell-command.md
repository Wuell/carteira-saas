---
entity: "Rag Shell Command"
entity_type: method
community: 61
degree: 8
---

# Rag Shell Command

**Type:** method  
**Community:** [[community-61]]  
**Degree:** 8

## Description

- A `rag` subcommand that initiates an interactive Read-Eval-Print Loop (REPL) for knowledge graph queries.
- A subcommand of `Rag CLI` for an interactive REPL (Read-Eval-Print Loop).

## Related

- [[entities/rag-stats-command|Rag Stats Command]] — `Rag Shell Command` allows users to invoke functionality similar to `Rag Stats Command` via an interactive command.
- [[entities/rag-cli|Rag CLI]] — The `Rag CLI` includes the `Rag Shell Command`.
- [[entities/rag-local-command|Rag Local Command]] — `Rag Shell Command` allows users to invoke functionality similar to `Rag Local Command` via an interactive command.
- [[entities/rag-global-command|Rag Global Command]] — `Rag Shell Command` allows users to invoke functionality similar to `Rag Global Command` via an interactive command.
- [[entities/interactive-repl|Interactive REPL]] — `Rag Shell Command` includes an `/exit` command to terminate the `Interactive REPL`.
- [[entities/hybrid-query|Hybrid Query]] — `Hybrid Query` is the default mode of operation within `Rag Shell Command`.
- [[entities/prompt_toolkit|Prompt_Toolkit]] — `Rag Shell Command` prefers `Prompt_Toolkit` for its interactive interface.
- [[entities/input-function|input() Function]] — `Rag Shell Command` falls back to `input() Function` if `Prompt_Toolkit` is unavailable.

## Appears in

- `RAG-INIT.md`
