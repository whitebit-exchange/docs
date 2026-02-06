# Common Pitfalls and Solutions

Learn from common mistakes when documenting APIs to avoid errors and save time.

## 1. Missing Required Fields

**Pitfall**: Forgetting `request` and `nonce` in private API bodies

```yaml
# ❌ WRONG - Missing auth fields
properties:
  market:
    type: string
  amount:
    type: string
```

**Solution**: Always include for private APIs

```yaml
# ✅ CORRECT
properties:
  market:
    type: string
  amount:
    type: string
  request:
    type: string
    description: Request signature
  nonce:
    type: string
    description: Unique request identifier
```

**Why it matters**: Private APIs won't work without authentication fields. This is the most common mistake that causes API calls to fail.

## 2. Invalid `$ref` Usage

**Pitfall**: Inline properties alongside `$ref`

```yaml
# ❌ WRONG - Can't mix $ref with other properties
schema:
  $ref: '#/components/schemas/OrderResponse'
  nullable: true  # This is ignored!
```

**Solution**: Use `allOf` wrapper

```yaml
# ✅ CORRECT
schema:
  allOf:
    - $ref: '#/components/schemas/OrderResponse'
  nullable: true
```

**Why it matters**: OpenAPI 3.0 specification doesn't allow sibling properties with `$ref`. The validator will reject your schema.

**Related error**: `no-dollar-ref-sibling-properties`

## 3. Unescaped Special Characters in YAML Strings

**Pitfall**: Special characters break YAML parsing

```yaml
description: This is a string with: colons and {braces}  # ERROR
```

**Solution**: Quote strings with special characters

```yaml
description: "This is a string with: colons and {braces}"
# Or use multiline
description: |
  This is a string with: colons and {braces}
```

**Why it matters**: Colons, braces, and brackets have special meaning in YAML. Unquoted strings cause parsing errors.

**Special characters to watch**: `:`, `{`, `}`, `[`, `]`, `#`, `&`, `*`, `!`, `|`, `>`, `'`, `"`, `%`, `@`, `` ` ``

## 4. Missing Tag Descriptions

**Pitfall**: Using tags without defining them

```yaml
paths:
  /api/v4/endpoint:
    post:
      tags:
        - Spot Trading  # Used but not defined!
```

**Solution**: Define all tags at bottom of file

```yaml
tags:
  - name: Spot Trading
    description: Endpoints for spot trading operations
  - name: Collateral Trading
    description: Endpoints for collateral/margin trading operations
```

**Why it matters**: Undefined tags cause validation warnings and may not render properly in documentation.

## Quick Checklist Before Committing

- [ ] Private APIs include `request` and `nonce`
- [ ] No inline properties alongside `$ref` (use `allOf`)
- [ ] Special characters in strings are quoted
- [ ] All tags are defined in `tags:` section
- [ ] Validation passes (`npx @redocly/cli lint`)
- [ ] Dev server runs without errors

## Related Documentation

- [Validation Guide](validation.md) - How to validate your changes
- [Adding Parameters](../guides/01-adding-parameters.md) - Parameter best practices
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Full workflow
