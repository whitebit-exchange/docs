---
name: write-commit-message
description: >
  Generates a conventional commit message by analyzing staged git changes and
  recent commit history to match the project's commit style. Presents the message
  for user approval — never commits automatically.
  Use when staging changes for commit or when asked to generate a commit message.
disable-model-invocation: true
---

Generates a conventional commit message following the `docs:`, `fix:`, `feat:`,
or `chore:` format with scope. Presents the message to the user for approval.
Never performs `git commit` — that is the user's responsibility.

For full instructions and format rules, read `ai/skills/write-commit-message.md`.

## Current staged changes
!`git diff --staged`

## Recent commits (style reference)
!`git log --oneline -10`
