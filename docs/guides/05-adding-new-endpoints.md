# Adding New Endpoints

This guide walks you through adding completely new REST or WebSocket endpoints to the documentation.

## Before You Start

**Checklist**:
- [ ] Backend engineer confirmed endpoint is implemented
- [ ] You have example request/response from staging/production
- [ ] You know which file to edit (see [File Structure](../reference/file-structure.md))
- [ ] You have a similar endpoint to copy from

## REST API New Endpoint (Step-by-Step)

### Step 1: Add to OpenAPI Spec

**Find similar endpoint**: Use grep to find patterns: `grep -n "summary.*order" openapi/private/http-trade-v4.yaml`

**Key elements to add**:
- `paths` → `/api/v4/your-endpoint` → `post` or `get`
- `summary`, `description`, `tags`, `security`
- `requestBody` with parameters (see [Adding Parameters](01-adding-parameters.md))
- `responses` with `$ref` to schemas
- Add response schema in `components/schemas` if new

**Copy structure from**: Similar endpoint in target OpenAPI file

### Step 2: Validate Spec

```bash
npx @redocly/cli lint openapi/private/http-trade-v4.yaml
```

Fix any errors before continuing.

### Step 3: Create MDX File

**File**: `private/http-trade-v4/my-new-endpoint.mdx`

**Structure**:
- Frontmatter with `title` and `openapi` reference
- Optional `<Tip>` for quick guidance
- When to Use / Best Practices sections
- Auto-generated docs appear after

**Copy from**: Existing MDX file in same directory

### Step 4: Add to Navigation

Edit `docs.json` → find appropriate `group` → add page path (without `.mdx` extension)

### Step 5: Test

1. Save all files
2. Check dev server: `http://localhost:3000/private/http-trade-v4/my-new-endpoint`
3. Verify:
   - Page loads without errors
   - Description renders correctly
   - Parameters show up
   - Response schema displays
   - Examples format properly
   - Navigation shows new page

## WebSocket API New Endpoint

**Copy existing file**: `cp asyncapi/public/depth.yaml asyncapi/public/my-feature.yaml`

**Modify checklist**:
1. Update `info` → `title` and `description`
2. Update `channels` → `/ws` → `description`
3. Rename all messages (e.g., "Depth" → "MyFeature")
4. Update `operations` and method names
5. Update `components` → `messages` and `schemas`
6. Update method constants (e.g., `const: myfeature_subscribe`)

**Create MDX**: Similar structure to REST, use `asyncapi:` instead of `openapi:` in frontmatter

**Validate**: `asyncapi validate asyncapi/public/my-feature.yaml`

**Add to navigation**: `docs.json` → WebSocket API group

## Best Practices

- Always copy from similar, working endpoint
- Validate early and often
- Test in dev server before PR
- Follow existing naming conventions
- Document all parameters and errors
- Use realistic examples

## Related Guides

- [File Structure Decision Tree](../reference/file-structure.md)
- [Adding Parameters](01-adding-parameters.md)
- [Adding Descriptions](02-adding-descriptions.md)
- [Documenting Errors](04-documenting-errors.md)
- [Validation Guide](../reference/validation.md)
