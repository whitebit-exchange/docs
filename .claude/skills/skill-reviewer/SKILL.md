---
name: skill-reviewer
description: >
  Review and audit Claude Code skills against the Agent Skills spec and Claude Code docs.
  Evaluates frontmatter compliance, invocation model, description quality, progressive
  disclosure, instruction effectiveness, and workflow placement. Use when the user says
  "review skill", "audit skill", "check my skill", or "where does this skill fit?"
disable-model-invocation: true
argument-hint: "[skill-name or path-to-SKILL.md]"
---

Runs in two modes: Review Mode (quality audit against the Agent Skills spec — structural
compliance, description, invocation model, progressive disclosure, composability) and
Placement Mode (workflow taxonomy and pipeline integration for this project).

For the full review criteria and report format, read `ai/skills/skill-reviewer/SKILL.md`.

$ARGUMENTS
