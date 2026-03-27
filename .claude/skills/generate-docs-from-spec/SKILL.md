---
name: generate-docs-from-spec
description: >
  Generates a new MDX documentation page from an OpenAPI or AsyncAPI spec file.
  Reads the spec, applies the api-endpoints or websocket style guide, and creates
  the complete page in the correct portal directory.
  Use when creating a new API reference page from a spec file.
disable-model-invocation: true
argument-hint: "[spec-file-path]"
---

Creates a new MDX page from an OpenAPI or AsyncAPI operation, following portal
conventions for file placement, navigation registration, and style guide compliance.

For full instructions and DoD checklist, read `ai/skills/generate-docs-from-spec/SKILL.md`.

$ARGUMENTS
