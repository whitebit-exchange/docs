---
name: self-improvement
description: >
  Evaluates the completed pipeline run for lessons, patterns, and workflow gaps.
  Decides whether to write to ai/LESSONS.md (pattern-triggered) or the initiative
  spec lessons.md (always, if spec exists). Then calls promote-learnings.
  Run automatically after every completed pipeline. Never skip.
disable-model-invocation: true
---

Captures lessons from the current pipeline run. Always runs after any completed
pipeline. Writes to ai/LESSONS.md only when a pattern recurred ≥2 times or a
structural gap was found. Always writes to initiative lessons.md if a spec exists.

For the decision tree and output format, read `ai/skills/self-improvement.md`.
