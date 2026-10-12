# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Layout

This is a single-context repository:

- `GLOSSARY.md` at the repository root defines domain vocabulary.
- `docs\adr\` holds architecture decision records.

## Before exploring, read these

Read the root `GLOSSARY.md` and ADRs in `docs\adr\` relevant to the area being explored.

If the repository later introduces `GLOSSARY-MAP.md`, read it and each glossary relevant to the topic. Also check `src\<context>\docs\adr\` for context-scoped decisions.

If these documents do not exist, proceed silently. Do not flag their absence or suggest creating them upfront. The `/domain-modeling` skill, reached via `/grill-with-docs` and `/improve-codebase-architecture`, creates them lazily when terms or decisions are resolved.

## Use the glossary's vocabulary

When naming a domain concept in an issue, refactor proposal, hypothesis, or test, use the term defined in `GLOSSARY.md`. Do not drift to synonyms the glossary explicitly avoids.

If a needed concept is missing, reconsider whether it belongs to this project or note a real gap for `/domain-modeling`.

## Flag ADR conflicts

Surface contradictions with existing ADRs explicitly rather than silently overriding them. Identify the ADR and explain why the decision is worth reopening.
