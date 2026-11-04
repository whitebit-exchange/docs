# Snippets — single-source authoring & import convention

`snippets/` holds content that more than one page reuses, so a fact has **one home**
(`ai/RULES.md §3.6` invariant 4; §3.2 source-of-truth). A page never restates a shared fact
inline — it imports the snippet and the snippet renders in place.

## Kinds of snippet

| Kind | Extension | Import form | Use as |
|------|-----------|-------------|--------|
| Prose snippet | `.mdx` (in `snippets/` or `snippets/text/`) | `import Name from '/snippets/name.mdx';` or `import Name from '/snippets/text/name.mdx';` (default import) | `<Name />` |
| Diagram snippet | `.mdx` (in `snippets/diagrams/`) | `import Name from '/snippets/diagrams/name.mdx';` (default import) | `<Name />` |
| Component snippet | `.jsx` | `import { Name } from '/snippets/name.jsx';` (named import) | `<Name />` |

Import paths are absolute from the repo root (`/snippets/...`). Place the `import` lines
directly under the page frontmatter, before the first content line. Prose and diagram snippets
have **no frontmatter**. A prose snippet starts with an MDX comment header; a diagram snippet
does not (rule 2).

## Authoring rules

1. **One home per fact.** Edit the value only in the snippet file. If two pages show the same
   fee-share sentence, both import the same snippet — neither restates it.
2. **Header comment.** Every prose snippet opens with a `{/* ... */}` comment naming: what the
   snippet is, its **owner**, the edit-here discipline, and the import line. Never use HTML
   comments (`<!-- -->`) — they are invalid MDX (`RULES §3.2`). **Exception:** a diagram
   snippet in `snippets/diagrams/` has no header comment and holds one mermaid fence only; its
   owner page and importing pages go in the diagram snippet registry below.
3. **Gated values stay skeletons.** A fact that needs SME / Compliance / Product / Marketing
   sign-off is written as `TODO: value gated on <owner>` with placeholder prose — never a
   guessed value. The value lands only when the owner confirms it (that is migration/authoring
   work, not standards work).
4. **Style rules still apply.** Snippet prose obeys `base.md` (no pronouns, active voice,
   sentence case) because it renders inside a page.

## Diagram snippets (`snippets/diagrams/`)

A diagram snippet holds one capability diagram that several pages show (`ai/RULES.md §3.6`,
"Shared capability diagrams").

- **One fence, nothing else.** The file is exactly one ```` ```mermaid ```` fence. Nothing goes
  outside it: no frontmatter, header comment, `import`, JSX tag, prop or `{variable}`. Mintlify
  inlines the snippet into each host page: a prop or variable compiles to an undefined name and
  blanks the whole host page while the page still returns HTTP 200. An MDX comment in any
  snippet, the header comment of a prose snippet included, reaches the host page's `.md` export
  as text; a diagram snippet carries none, so its export is the fence alone. Braces inside the
  fence are Mermaid text (decision nodes) and are allowed; `{props.`, `${` and `{/*` inside the
  fence are not.
  `node validate.mjs --mdx` checks this profile.
- **Lead-in on the host page.** The heading and the sentence above the diagram belong to the
  host page. When the diagram uses a neutral key label, that sentence names the signing key.
- **Home and use.** The flow's home is the page that owns it: the Products page where one
  exists, otherwise the platform or guide page the other pages link to. When the owner page
  shows the diagram, it imports the same snippet. A page shows a given diagram snippet at most
  once; other scenarios on that page point to it (`ai/style-guides/guide-pages.md` §5.5).
- **Labels.** Diagram labels follow `ai/style-guides/guide-pages.md` §5.5 and `base.md` 5.5.6:
  endpoint, event and object-level data names, never request-body field names.
- **An edit reaches every importing page.** `node validate.mjs --changed` adds every page that
  imports a changed snippet. Run `scripts/render-check.mjs --browser` on every importing page,
  and `scripts/check-md-export.mjs --base <preview-url>` for the `.md` export (commands in
  `CLAUDE.md`). A label below 9 px in a shared diagram always fails the browser check.
- **Registry.** Each diagram snippet has one row below, added or updated in the same commit as
  the snippet or the import.

### Diagram snippet registry

No diagram snippet exists yet.

| Snippet | Flow | Owner page | Importing pages |
|---------|------|------------|-----------------|

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
| `eu-onboarding.mdx` | EU onboarding sentence, placed wherever a page states the verification split | Compliance |

`partner-eligibility.mdx` predates this initiative and is referenced, not modified.

## Auto-generated snippets — never hand-edit

Two subdirectories are mechanically derived from source and must never be hand-edited
(`RULES §3.2`); changes are overwritten on the next generator run:

- `snippets/ws-data/` ← `asyncapi/**/*.yaml` via `node scripts/generate-ws-data.mjs`
- `snippets/concept-data/` ← `data/**/*.yaml` via `node scripts/generate-concept-data.mjs`

Fix the source YAML and regenerate; do not touch the generated files directly.
