---
name: dev-ticket-pipeline
description: >
  Runs the 4-phase documentation update pipeline for a developer ticket.
  Analyzes the ticket, generates clarification questions (Phase 2 gate),
  builds an implementation plan, then executes all documentation changes.
  Use when a developer ticket requires updates to the WhiteBIT portal docs.
disable-model-invocation: true
---

Orchestrates the complete documentation update workflow for a developer ticket:
ticket analysis → clarification questions → implementation plan → task execution →
task completion review → commit message. Stops at each pipeline gate for confirmation.

For full step-by-step instructions, gate rules, and DoD checklist, read
`ai/skills/dev-ticket-pipeline.md`.
