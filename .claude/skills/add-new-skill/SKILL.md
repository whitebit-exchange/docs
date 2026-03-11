---
name: add-new-skill
description: >
  Creates a new skill by producing the agent-agnostic instruction file
  (ai/skills/<name>.md) and the Claude Code entry point
  (.claude/skills/<name>/SKILL.md) from canonical templates.
  Registers the skill in CLAUDE.md, AGENTS.md, and ai/agent.md.
  Use when adding a new repetitive task to the skills system.
disable-model-invocation: true
argument-hint: "[skill-name]"
---

Scaffolds a complete new skill: agent-agnostic instruction file with the
required 4-section format, Claude Code SKILL.md with correct frontmatter,
and registration in all three navigation files.

For templates, rules, and DoD checklist, read `ai/skills/add-new-skill.md`.

$ARGUMENTS
