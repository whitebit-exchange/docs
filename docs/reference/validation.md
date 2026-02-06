# Validation and Local Development

This guide covers setting up your local development environment and validating your documentation changes.

## Local Development Environment

### Prerequisites

```bash
# Install Mintlify CLI globally
npm install -g mintlify@latest

# Verify installation
mint --version
```

### Starting the Dev Server

```bash
# Navigate to project root
cd /path/to/mintlify-docs

# Start dev server (auto-reloads on file changes)
mint dev

# Server will start on http://localhost:3000
# If port 3000 is busy, it tries 3001, 3002, etc.
```

### Troubleshooting Dev Server

**Issue**: Port conflicts (ports 3000-3009 all busy)
```bash
# Solution 1: Kill existing processes
lsof -ti:3000 | xargs kill -9

# Solution 2: Specify custom port
mint dev --port 5000
```

**Issue**: Validation errors on startup
```bash
# Check terminal output for specific errors:
# - "must have required property '$ref'" → Fix schema references
# - "Failed to validate OpenAPI schema" → Run validation (see below)
```

**Issue**: Changes not reflecting
```bash
# Clear Mintlify cache
rm -rf .next
mint dev
```

## Validation and Testing

### OpenAPI Validation

**Before committing**, validate your OpenAPI specs:

```bash
# Install Redocly CLI (one-time)
npm install -g @redocly/cli

# Validate specific file
npx @redocly/cli lint openapi/private/http-trade-v4.yaml

# Validate all OpenAPI files
npx @redocly/cli lint openapi/**/*.yaml
```

### AsyncAPI Validation

```bash
# Install AsyncAPI CLI (one-time)
npm install -g @asyncapi/cli

# Validate specific file
asyncapi validate asyncapi/public/depth.yaml

# Validate all AsyncAPI files
find asyncapi -name "*.yaml" -exec asyncapi validate {} \;
```

### Testing Checklist

After making changes, verify:

- [ ] **Validation passes** (no errors in validation tools)
- [ ] **Dev server starts** without errors
- [ ] **Page renders** correctly at expected URL
- [ ] **MDX components display** (`<Warning>`, `<Note>`, `<Accordion>`)
- [ ] **Examples format correctly** (proper indentation, syntax highlighting)
- [ ] **Glossary links work** (click each link)
- [ ] **Navigation shows page** in correct location
- [ ] **Response schemas render** with proper structure

### Automation

**Pre-commit hook**: Consider adding a git hook to auto-validate. See [Git Hooks documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for setup.

## Troubleshooting

### Validation Errors

**Error**: `must have required property '$ref'`
```
Problem: Mixing inline properties with $ref
Solution: Use allOf wrapper for additional properties
```

**Error**: `Failed to validate OpenAPI schema`
```
Problem: Invalid YAML syntax or schema structure
Solution: Run npx @redocly/cli lint to see specific errors
```

**Error**: `no-dollar-ref-sibling-properties`
```
Problem: Properties alongside $ref (OpenAPI 3.0 doesn't allow this)
Solution: Move properties to allOf or separate schema
```

### Dev Server Issues

**Server won't start**:
1. Check if port is available: `lsof -i:3000`
2. Kill existing process: `kill -9 <PID>`
3. Try custom port: `mint dev --port 5000`
4. Check for validation errors in terminal output

**Page shows 404**:
1. Verify MDX frontmatter path matches spec file
2. Check HTTP method matches (GET vs POST)
3. Verify endpoint path in OpenAPI/AsyncAPI spec
4. Check docs.json includes page path

**MDX components not rendering**:
1. Ensure components are outside code blocks
2. Check for proper closing tags
3. Verify component names (case-sensitive)

**Glossary links broken**:
1. Check anchor format: lowercase, hyphens only
2. Verify term exists in `/glossary.mdx`
3. Ensure proper link format: `/glossary#term-name`

## Related Documentation

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Full contribution workflow
- [Common Pitfalls](common-pitfalls.md) - Avoid common mistakes
- [Adding New Endpoints](../guides/05-adding-new-endpoints.md) - Complete guide
