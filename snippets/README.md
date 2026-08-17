# Snippets — single-source authoring & import convention

`snippets/` holds content that more than one page reuses, so a fact has **one home**
(`ai/RULES.md §3.6` invariant 4; §3.2 source-of-truth). A page never restates a shared fact
inline — it imports the snippet and the snippet renders in place.

## Two kinds of snippet

| Kind | Extension | Import form | Use as |
|------|-----------|-------------|--------|
| Prose snippet | `.mdx` | `import Name from '/snippets/name.mdx';` (default import) | `<Name />` |
| Component snippet | `.jsx` | `import { Name } from '/snippets/name.jsx';` (named import) | `<Name />` |

Import paths are absolute from the repo root (`/snippets/...`). Place the `import` lines
directly under the page frontmatter, before the first content line. Prose snippets have **no
frontmatter** — they start with an MDX comment header.

## Authoring rules

1. **One home per fact.** Edit the value only in the snippet file. If two pages show the same
   fee-share sentence, both import the same snippet — neither restates it.
2. **Header comment.** Every prose snippet opens with a `{/* ... */}` comment naming: what the
   snippet is, its **owner**, the edit-here discipline, and the import line. Never use HTML
   comments (`<!-- -->`) — they are invalid MDX (`RULES §3.2`).
3. **Gated values stay skeletons.** A fact that needs SME / Compliance / Product / Marketing
   sign-off is written as `TODO: value gated on <owner>` with placeholder prose — never a
   guessed value. The value lands only when the owner confirms it (that is migration/authoring
   work, not standards work).
4. **Style rules still apply.** Snippet prose obeys `base.md` (no pronouns, active voice,
   sentence case) because it renders inside a page.

## Partner-program fact snippets (skeletons)

Created as part of the Partner IA Standards initiative. Bodies are placeholders; **no gated
value is filled** in this initiative.

| Snippet | Fact | Owner (value gated on) |
|---------|------|------------------------|
| `fee-share.mdx` | Program revenue-share % / tier bands | Product |
| `certifications.mdx` | Security certifications + audit bodies | Marketing (Compliance verifies) |
| `asset-counts.mdx` | Asset / trading-pair counts ("X+" format) | Marketing |
| `travel-rule-note.mdx` | Travel Rule note (links `/concepts/travel-rule`) | Compliance |
| `partner-eligibility.mdx` | KYC-reliance eligibility wording (**already exists**) | Compliance |

`partner-eligibility.mdx` predates this initiative and is referenced, not modified.

## Auto-generated snippets — never hand-edit

Two subdirectories are mechanically derived from source and must never be hand-edited
(`RULES §3.2`); changes are overwritten on the next generator run:

- `snippets/ws-data/` ← `asyncapi/**/*.yaml` via `node scripts/generate-ws-data.mjs`
- `snippets/concept-data/` ← `data/**/*.yaml` via `node scripts/generate-concept-data.mjs`

Fix the source YAML and regenerate; do not touch the generated files directly.
