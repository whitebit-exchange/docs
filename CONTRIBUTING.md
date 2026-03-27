# Contributing to WhiteBIT API Documentation

This guide covers everything needed to contribute to the WhiteBIT docs portal — branching strategy, commit format, pull request process, and review checklists by role.

---

## Team

| Role | Responsibilities |
|------|-----------------|
| **DevRel** | Portal ownership, content governance, final approval for all PRs, sole authority to merge `stage → main` |
| **Tech Writer** | Documentation authoring, style compliance, PR review for content quality |
| **Backend Engineer** | API accuracy, OpenAPI/AsyncAPI spec changes, SME answers for documentation tickets |

---

## Branching Strategy

```
main
 └── stage  ← base branch for all work
      └── docs/your-branch
```

**Rules:**

- **All branches are cut from `stage`.** Never branch from `main` directly.
- **All pull requests target `stage`.** When a PR is merged, changes are immediately available in the preview environment: [https://whitebit-stage.mintlify.app](https://whitebit-stage.mintlify.app).
- **`stage → main` promotions:** Any Dev can open a PR from `stage` into `main`. Only DevRel can merge it. This controls what goes to production.

### Branch naming

```
docs/<TICKET-ID-or-ISSUE-ID>_brief-description
```

Examples:
```
docs/DV-21_add-mining-pool-endpoints
docs/CEX-2739_sub-account-transfer-params
docs/DR-64_extend-rpi-documentation
```

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/). Run `/write-commit-message` in Claude Code to generate the message from your staged diff.

**Format:**

```
<type>(<scope>): <short description>

[optional body]
```

**Types:** `docs`, `fix`, `feat`, `chore`

**Scopes:** `api`, `websocket`, `guide`, `faq`, `changelog`, `style`, `ai`

**Examples:**

```
docs(api): add mining pool endpoints to market data
fix(websocket): correct depth channel subscription example
chore(ai): update docs.json navigation for sub-accounts
```

---

## Pull Request Process

### Opening a PR

1. Cut a branch from `stage` using the naming convention above.
2. Make your changes. Validate before pushing (see [Validation](#validation)).
3. Open a PR targeting `stage`.
4. Fill in the PR description: what changed and why.
5. Request review from the appropriate reviewer (see [Review checklists](#review-checklists) below).

### Merging to `stage`

- At least one approval required before merging.
- DevRel or Tech Writer can approve and merge feature PRs into `stage`.
- Merged changes appear in preview at [https://whitebit-stage.mintlify.app](https://whitebit-stage.mintlify.app).

### Promoting `stage → main`

- Any Dev can open the PR from `stage` into `main`.
- Only DevRel can merge it.
- DevRel runs a final content and accuracy review before merging.

---

## Validation

Always validate your changes before opening a PR:

```bash
# OpenAPI specs
npx @redocly/cli lint openapi/**/*.yaml

# AsyncAPI specs
find asyncapi -name "*.yaml" -exec asyncapi validate {} \;

# Local preview
mint dev
```

---

## Review Checklists

### DevRel

- [ ] API accuracy — parameters, types, constraints, and examples match the actual API behavior
- [ ] No undocumented breaking changes
- [ ] Commit messages follow conventional commits format
- [ ] Appropriate scope and type for the changes
- [ ] For `stage → main`: all content is production-ready

### Tech Writer

- [ ] Style guide compliance — check `ai/style-guides/` for the relevant guide
- [ ] No pronouns in any documentation content (base rule 3.2)
- [ ] Consistent terminology with the glossary
- [ ] Examples are present and correct
- [ ] Navigation updated in `docs.json` if new pages were added

### Backend Engineer

- [ ] OpenAPI/AsyncAPI spec changes are valid (`npx @redocly/cli lint` and `asyncapi validate` pass)
- [ ] Parameter names, types, and constraints match the actual implementation
- [ ] Response schemas reflect real API responses
- [ ] SME answers provided in `ai/inputs/sme_answers.md` if a documentation ticket is being processed

---

## Documentation Workflow

The docs portal uses an AI-assisted pipeline for processing dev tickets and reviewing pages.
Use Claude Code skills as the entry points:

| Task | Command |
|------|---------|
| Process a dev ticket | `/dev-ticket-pipeline` |
| Review an existing page | `/doc-review-pipeline <page-path>` |
| Generate docs from a spec | `/generate-docs-from-spec <spec-path>` |
| Write a commit message | `/write-commit-message` |

See `ai/how-to/playbook.md` for full workflow details.

---

## Getting Help

| Question type | Contact |
|--------------|---------|
| Style and content | Tech Writer team lead |
| API accuracy | Backend Engineering team |
| Process and workflow | DevRel team lead |
| Portal setup | Check `README.md` |
