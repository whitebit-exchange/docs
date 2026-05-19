---
name: task-completion-review
description: >
  Runs the structured end-of-task quality review against staged changes — seven
  steps from high-level assessment to validation and learning extraction. Applies
  fixes, runs validate.mjs, invokes /task-learnings. Run before committing any
  documentation change. Use when the user says "run task completion review",
  "review before commit", or when a pipeline reaches Phase 6.
disable-model-invocation: true
---

End-of-task quality review across all staged changes. Seven steps including
detailed rule-by-rule file review, validation via `node validate.mjs`, and
learning extraction via `/task-learnings`.

For full instructions, the seven-step procedure, output format, and DoD checklist,
read `ai/skills/task-completion-review/SKILL.md` and the references it points to
(`references/review-steps.md`, `references/output-format.md`).

## Current staged changes
!`git diff --staged`
