---
name: doc-review-pipeline
description: >
  Runs the full documentation review pipeline for a portal page: style review,
  findings challenge, implementation plan, task execution, and commit message.
  Stops after challenge step for human confirmation before implementing fixes.
  Use when reviewing a documentation page for style guide compliance.
disable-model-invocation: true
argument-hint: "[page-path]"
---

Orchestrates the complete doc review workflow: review → challenge → implementation
plan → task execution → task completion review → commit message → cleanup.
Stops at each pipeline gate for confirmation.

For full step-by-step instructions, gate rules, and DoD checklist, read
`ai/skills/doc-review-pipeline.md`.

$ARGUMENTS
