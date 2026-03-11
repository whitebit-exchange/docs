# WhiteBIT Documentation Portal — AI Agent Reference

> Entry point for non-Claude AI agents (Kiro, Cursor, and others).
> For Claude Code, see `CLAUDE.md`. For binding rules, read `ai/RULES.md`.

## Project

Mintlify documentation portal for the WhiteBIT cryptocurrency exchange. Covers REST API
(v1/v2/v4), WebSocket API, OAuth, platform guides, user guides, FAQ, changelog, and
glossary. Read `ai/agent.md` for the full portal structure, file conventions, and content
map.

## First — Read the Rules

Load `ai/RULES.md` before starting any task. It contains:
- §1 AI Behavior — critical thinking, clarification requirements, discussion protocol
- §2 Pipeline Governance — pipeline gates, commit protocol, validation
- §3 Content Rules — style guides, fabrication prohibition, navigation
- §4 Self-Improvement — when to run, when to write to LESSONS.md

## Skills

Load the relevant skill file and follow its steps and DoD checklist.
Automatic skills run after every pipeline without being explicitly asked.

| Skill | File | When |
|-------|------|------|
| Dev ticket pipeline | `ai/skills/dev-ticket-pipeline.md` | On demand — processing a dev ticket |
| Doc review pipeline | `ai/skills/doc-review-pipeline.md` | On demand — reviewing a doc page |
| Generate docs from spec | `ai/skills/generate-docs-from-spec.md` | On demand — new MDX from spec |
| Write commit message | `ai/skills/write-commit-message.md` | On demand — before committing |
| Create initiative spec | `ai/skills/create-initiative-spec.md` | On demand — multi-phase work |
| Cleanup after pipeline | `ai/skills/cleanup-after-pipeline.md` | On demand — after any pipeline |
| Add new skill | `ai/skills/add-new-skill.md` | On demand — creating a new skill |
| Task self-review | `ai/skills/task-self-review.md` | **Automatic** — after any task completion |
| Self-improvement | `ai/skills/self-improvement.md` | **Automatic** — after any pipeline run |
| Promote learnings | `ai/skills/promote-learnings.md` | **Automatic** — final step of self-improvement |

## Key Files

| File | Purpose |
|------|---------|
| `ai/RULES.md` | All binding rules for AI work on this portal |
| `ai/LESSONS.md` | Accumulated lessons (pattern-triggered entries) |
| `ai/agent.md` | Portal structure, file conventions, content map |
| `ai/prompts/` | Pipeline prompt files (inputs/outputs for AI tools) |
| `ai/skills/` | Skill files — invocable task workflows with DoD checklists |
| `ai/style-guides/` | Writing conventions (use README.md decision tree to pick one) |
| `docs.json` | Navigation configuration — update when adding pages |

## Behavioral Expectations

These rules apply regardless of which AI agent is in use. Full rules are in `ai/RULES.md`.

- Do not blindly agree. Flag errors and bad assumptions with evidence (§1.1).
- Ask clarifying questions before starting ambiguous tasks — batch all questions at once (§1.2).
- Never run `git commit` autonomously. Generate the message; the human commits (§2.2).
- After any pipeline: run self-improvement, then promote-learnings (§4.1).
