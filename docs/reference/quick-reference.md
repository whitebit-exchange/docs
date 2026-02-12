# Quick Reference

Handy reference tables for common patterns, components, and configurations.

## Project-Specific References

### MDX Components

- `<Warning>` = Critical info (rate limits, breaking changes)
- `<Note>` = Helpful context (caching, format notes)
- `<Tip>` = Best practices
- `<Accordion>` = Collapsible content (>5 items)

### File Locations

- OpenAPI Public: `openapi/public/http-v{N}.yaml`
- OpenAPI Private: `openapi/private/{feature}-v{N}.yaml`
- AsyncAPI: `asyncapi/{public|private}/{feature}.yaml`
- MDX Pages: Match spec structure (e.g., `private/http-trade-v4/*.mdx`)

### Glossary Links

Format: `[term](/glossary#term-with-hyphens)`

**Rule**: Link first occurrence only

## Common Error Codes

| Code | Type | Description |
|------|------|-------------|
| 30 | Validation | General validation error |
| 31 | Validation | Market validation failed |
| 32 | Validation | Amount validation failed |
| 33 | Validation | Price validation failed |
| 36 | Validation | clientOrderId validation failed |
| 37 | Validation | Conflicting flags (postOnly + ioc) |
| 10 | Business Logic | Insufficient balance |
| 11 | Business Logic | Market not available |
| 12 | Business Logic | Order size below minimum |

## Key Patterns

### Authentication

- **Public APIs**: No auth, use `GET`
- **Private APIs**: `ApiKeyAuth`, use `POST`, require `request` + `nonce` fields

### Data Types

Use `string` for prices/amounts (avoid floating-point issues)

```yaml
amount:
  type: string  # Not number!
  example: "0.00123456"
```

### WebSocket Messages

- `integer` ID for requests
- `null` ID for push updates
- Method pattern: `{feature}_subscribe`, `{feature}_update`, `{feature}_unsubscribe`

## HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Validation errors, malformed requests |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Valid auth but insufficient permissions |
| 404 | Not Found | Endpoint or resource doesn't exist |
| 422 | Unprocessable Entity | Business logic errors (e.g., insufficient balance) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side errors |
| 503 | Service Unavailable | Maintenance or temporary outage |

## Validation Commands

### OpenAPI

```bash
# Single file
npx @redocly/cli lint openapi/private/http-trade-v4.yaml

# All files
npx @redocly/cli lint openapi/**/*.yaml
```

### AsyncAPI

```bash
# Single file
asyncapi validate asyncapi/public/depth.yaml

# All files
find asyncapi -name "*.yaml" -exec asyncapi validate {} \;
```

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| OpenAPI Public | `http-v{N}.yaml` | `http-v4.yaml` |
| OpenAPI Private | `{feature}-v{N}.yaml` | `http-trade-v4.yaml`, `main_api_v4.yaml` |
| AsyncAPI | `{feature}.yaml` | `depth.yaml`, `kline.yaml` |
| MDX Files | `{endpoint-name}.mdx` | `create-limit-order.mdx` |

## Required Fields by API Type

### Public REST

- `paths`, `info`, `openapi`
- Parameters: `name`, `in`, `schema`

### Private REST

- Same as public, plus:
- `security` definitions
- Body parameters must include `request` and `nonce`

### WebSocket (Public/Private)

- `channels`, `operations`, `components`
- Messages: `id`, `method`, `params`

## Related Documentation

- [Style Guide](style-guide.md) - Detailed writing guidelines
- [File Structure](file-structure.md) - Which file to edit
- [Validation Guide](validation.md) - Testing your changes
- [Common Pitfalls](common-pitfalls.md) - Avoid mistakes
