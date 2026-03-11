---
name: cleanup-after-pipeline
description: >
  Removes pasted content from ai/inputs/ files and deletes output artifacts
  from ai/outputs/review/ after a pipeline run completes. Prevents stale
  inputs from contaminating the next pipeline run.
  Use after completing any dev-ticket or doc-review pipeline.
disable-model-invocation: true
argument-hint: "[dev-ticket|doc-review] [page-slug?]"
---

Cleans up pipeline inputs and outputs after a completed run. For dev-ticket:
clears ai/inputs/issue_description.md and ai/inputs/sme_answers.md. For
doc-review: also deletes ai/outputs/review/<page-slug>/ and clears
ai/inputs/review_target.md.

For full cleanup steps and confirmation requirements, read
`ai/skills/cleanup-after-pipeline.md`.

$ARGUMENTS
