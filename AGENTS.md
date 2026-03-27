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
| Dev ticket pipeline | `ai/skills/dev-ticket-pipeline/SKILL.md` | On demand — processing a dev ticket |
| Ticket analysis | `ai/skills/ticket-analysis/SKILL.md` | internal — invoked by dev-ticket-pipeline (Phases 1–2) |
| Ticket impl plan | `ai/skills/ticket-impl-plan/SKILL.md` | internal — invoked by dev-ticket-pipeline (Phases 3–4) |
| Doc review pipeline | `ai/skills/doc-review-pipeline/SKILL.md` | On demand — reviewing a doc page |
| Doc style review | `ai/skills/doc-style-review/SKILL.md` | internal — invoked by doc-review-pipeline (Phases 1–2) |
| Doc review plan | `ai/skills/doc-review-plan/SKILL.md` | internal — invoked by doc-review-pipeline (Phases 3–4) |
| Integration check | `ai/skills/integration-check/SKILL.md` | internal — invoked by ticket-impl-plan and doc-review-plan |
| Task execution | `ai/skills/task-execution/SKILL.md` | internal — invoked by dev-ticket-pipeline and doc-review-pipeline (Phase 5) |
| Task completion review | `ai/skills/task-completion-review/SKILL.md` | On demand — before committing; invoked by pipelines at Phase 6 |
| Generate docs from spec | `ai/skills/generate-docs-from-spec/SKILL.md` | On demand — new MDX from spec |
| Write commit message | `ai/skills/write-commit-message/SKILL.md` | On demand — before committing |
| Create initiative spec | `ai/skills/create-initiative-spec/SKILL.md` | On demand — multi-phase work |
| Cleanup after pipeline | `ai/skills/cleanup-after-pipeline/SKILL.md` | On demand — after any pipeline |
| Create skill (interactive) | `ai/skills/skill-creator/SKILL.md` | On demand — guided skill creation with validation |
| Review skill | `ai/skills/skill-reviewer/SKILL.md` | On demand — audit a skill for quality and workflow fit |
| Task self-review | `ai/skills/task-self-review/SKILL.md` | **Automatic** — after any task completion |
| Self-improvement | `ai/skills/self-improvement/SKILL.md` | **Automatic** — after any pipeline run |
| Promote learnings | `ai/skills/promote-learnings/SKILL.md` | **Automatic** — final step of self-improvement |
| Plan review | `ai/skills/plan-review/SKILL.md` | **Automatic** — after implementation plan generated (Phase 3) |
| Task learnings | `ai/skills/task-learnings/SKILL.md` | **Automatic** — called by self-improvement for extraction |
| Learning consolidator | `ai/skills/learning-consolidator/SKILL.md` | On demand — ~weekly cleanup of ai/LESSONS.md |
| Answer partner questions | `ai/skills/answer-partner-questions/SKILL.md` | On demand — researching API capabilities for partner/client questions |

## Key Files

| File | Purpose |
|------|---------|
| `ai/RULES.md` | All binding rules for AI work on this portal |
| `ai/LESSONS.md` | Accumulated lessons (pattern-triggered entries) |
| `ai/agent.md` | Portal structure, file conventions, content map |
| `ai/skills/` | All invocable skills — entry points, orchestration, references/ content |
| `ai/style-guides/` | Writing conventions (use README.md decision tree to pick one) |
| `docs.json` | Navigation configuration — update when adding pages |

## Behavioral Expectations

These rules apply regardless of which AI agent is in use. Full rules are in `ai/RULES.md`.

- Do not blindly agree. Flag errors and bad assumptions with evidence (§1.1).
- Ask clarifying questions before starting ambiguous tasks — batch all questions at once (§1.2).
- Never run `git commit` autonomously. Generate the message; the human commits (§2.2).
- After any pipeline: run self-improvement, then promote-learnings (§4.1).
