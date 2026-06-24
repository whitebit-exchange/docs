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
Every skill is model-invocable by default — the model runs it automatically when its
trigger/scope conditions (the "When" column) are met. Two skills stay **user-triggered**
(never model-invoked): `write-commit-message` (command-only) and `close-out-session` (does
autonomous `git add`; its body forbids auto-invoke). Internal skills run automatically as steps inside
their parent skill.

| Skill | File | When |
|-------|------|------|
| Dev ticket pipeline | `ai/skills/dev-ticket-pipeline/SKILL.md` | **Automatic** — processing a dev ticket; not on quick fixes |
| Ticket analysis | `ai/skills/ticket-analysis/SKILL.md` | internal — invoked by dev-ticket-pipeline (Phases 1–2) |
| Ticket impl plan | `ai/skills/ticket-impl-plan/SKILL.md` | internal — invoked by dev-ticket-pipeline (Phases 3–4) |
| Doc review pipeline | `ai/skills/doc-review-pipeline/SKILL.md` | **Automatic** — reviewing a doc page; not on quick edits |
| Humanize review | `ai/skills/humanize-review/SKILL.md` | **Automatic** — Phase 0.6 of doc-review-pipeline for `guides/**`, `institutional/**`, `best-practices/**`, and `products/**`; AI-voice audit, findings only; skip via `--no-humanize` |
| Humanize rewrite | `ai/skills/humanize-rewrite/SKILL.md` | **Automatic** — rewrite a guide, institutional, best-practices, or product page to remove AI-voice tells while preserving every style-guide rule |
| Doc style review | `ai/skills/doc-style-review/SKILL.md` | internal — invoked by doc-review-pipeline (Phases 1–2) |
| Doc review plan | `ai/skills/doc-review-plan/SKILL.md` | internal — invoked by doc-review-pipeline (Phases 3–4) |
| Integration check | `ai/skills/integration-check/SKILL.md` | internal — invoked by ticket-impl-plan and doc-review-plan |
| Cross-document impact | `ai/skills/cross-document-impact/SKILL.md` | internal — **automatic** post-edit ripple check; invoked by task-completion-review (Step 2.5) and task-self-review (Step 5) |
| Task execution | `ai/skills/task-execution/SKILL.md` | internal — invoked by dev-ticket-pipeline and doc-review-pipeline (Phase 5) |
| Task completion review | `ai/skills/task-completion-review/SKILL.md` | **Automatic** — before committing; invoked by pipelines at Phase 6 |
| Close-out session | `ai/skills/close-out-session/SKILL.md` | **User-triggered** — composite end-of-session ritual: TCR → autonomous `git add` → commit message. Body forbids auto-invoke; never runs `git commit` (RULES §2.2) |
| Generate docs from spec | `ai/skills/generate-docs-from-spec/SKILL.md` | **Automatic** — new MDX from spec; not on edits to existing pages |
| Write commit message | `ai/skills/write-commit-message/SKILL.md` | **Command only** — the sole manually-invoked skill; the model never auto-runs it (RULES §2.2) |
| Create initiative spec | `ai/skills/create-initiative-spec/SKILL.md` | **Automatic** — multi-phase work (DD-6 threshold) |
| Cleanup after pipeline | `ai/skills/cleanup-after-pipeline/SKILL.md` | **Automatic** (invocation) — after any pipeline; still confirms before deleting `ai/inputs/` & `ai/outputs/` (audit-trail safeguard) |
| Create skill (interactive) | `ai/skills/skill-creator/SKILL.md` | **Automatic** — guided skill creation with validation |
| Review skill | `ai/skills/skill-reviewer/SKILL.md` | **Automatic** — audit a skill for quality and workflow fit |
| Task self-review | `ai/skills/task-self-review/SKILL.md` | **Automatic** — after any task completion |
| Self-improvement | `ai/skills/self-improvement/SKILL.md` | **Automatic** — after any pipeline run |
| Promote learnings | `ai/skills/promote-learnings/SKILL.md` | **Automatic** — final step of self-improvement |
| Plan review | `ai/skills/plan-review/SKILL.md` | **Automatic** — after implementation plan generated (Phase 3) |
| Task learnings | `ai/skills/task-learnings/SKILL.md` | **Automatic** — called by self-improvement for extraction |
| Learning consolidator | `ai/skills/learning-consolidator/SKILL.md` | **Automatic** (invocation) — ~weekly cleanup of ai/LESSONS.md; retains its consolidation-plan approval gate before executing (RULES §4.1) |
| Answer partner questions | `ai/skills/answer-partner-questions/SKILL.md` | **Automatic** — researching API capabilities for partner/client questions |
| CR adversarial review | `ai/skills/cr-adversarial-review/SKILL.md` | **Automatic** — adversarial review of a CR with on-disk evidence; bakes in the 2026-05-12 LESSONS cluster; consolidates Open Questions back into the host CR per owner |
| Session retrospective | `ai/skills/session-retrospective/SKILL.md` | **Automatic** — cross-session pattern analysis; needs the on-disk multi-session corpus |
| AI changelog | `ai/skills/ai-changelog/SKILL.md` | internal — called after AI infrastructure changes by skill-creator, task-learnings, learning-consolidator |
| AI improvement tracker | `ai/skills/ai-improvement-tracker/SKILL.md` | internal — called after ai-changelog to record testable improvement hypotheses |
| Docker local rebuild | `ai/skills/docker-local-rebuild/SKILL.md` | **Automatic** — rebuild and start the portal in Docker for local testing |

## Key Files

| File | Purpose |
|------|---------|
| `ai/RULES.md` | All binding rules for AI work on this portal |
| `ai/LESSONS.md` | Accumulated lessons (pattern-triggered entries). **Do NOT read at task start** — it is a write-path file owned by the self-improvement skills (`task-learnings`, `promote-learnings`, `learning-consolidator`), which load it themselves when they run. Reading it proactively on every task wastes ~13K tokens; binding guidance lives in `ai/RULES.md`, not here. |
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
