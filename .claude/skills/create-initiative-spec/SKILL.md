---
name: create-initiative-spec
description: >
  Creates a structured initiative spec directory under ai/specs/<name>/ with
  RULES.md, requirements.md, design.md, tasks.md, progress.md, and lessons.md.
  Use only for multi-session work meeting the DD-6 threshold: 3+ phases,
  8+ files, multiple doc domains, or multiple contributors.
disable-model-invocation: true
argument-hint: "[initiative-name]"
---

Creates a complete initiative spec following the docs portal spec format.
Only use when work meets the DD-6 threshold (see ai/RULES.md). For smaller
tasks, run the relevant pipeline skill directly.

For the spec structure, file templates, and DoD checklist, read
`ai/skills/create-initiative-spec/SKILL.md`.

$ARGUMENTS
