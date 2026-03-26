---
name: skill-creator
description: >
  Interactive guide for creating new Claude Code skills. Walks through use case
  definition, frontmatter generation, instruction writing, supporting file creation,
  and validation against the Agent Skills spec and Claude Code extensions.
  Use when the user says "create a skill", "new skill", "build a skill", or
  "I want to teach Claude to..."
disable-model-invocation: true
argument-hint: "[skill-name or description]"
---

Guides the user through 5 phases: Discovery (requirements), Classification (type
and invocation model), Build (frontmatter + instructions + supporting files),
Validation (spec compliance checklist), and Registration (CLAUDE.md + testing).

For the full creation pipeline, frontmatter rules, and validation checklist, read
`ai/skills/skill-creator/SKILL.md`.

$ARGUMENTS
