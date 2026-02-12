# Adding Overview Descriptions

This guide explains how to write effective descriptions for REST and WebSocket endpoints.

## Writing Effective Descriptions

**Format**:
1. **First line**: What it does (1 sentence)
2. **Features**: Bullet list of key capabilities
3. **Constraints**: `<Warning>` for rate limits, `<Note>` for caching
4. **Errors**: `<Accordion>` for error codes (if >5 codes)

## REST Endpoint Description

**Location**: Under `post:` or `get:` → `description:`

**Structure**:
1. Opening sentence (what + when to use)
2. `<Note>` for caching, `<Warning>` for rate limits
3. Key Features bullet list
4. `<Accordion>` for error codes (if >5 errors)

**Find examples**:
- Simple: `openapi/public/http-v4.yaml` → `/api/v4/public/markets`
- Complex: `openapi/private/http-trade-v4.yaml` → `/api/v4/order/new`

## WebSocket Channel Description

**Location**: `channels` → `/ws` → `description`

**Structure**:
1. Feature description
2. Subscription flow (4 steps)
3. `<Note>` for snapshot behavior
4. `<Warning>` for limits

**Find examples**: `asyncapi/public/depth.yaml`, `asyncapi/private/balance_spot.yaml`

## Best Practices

- Keep summaries to 10-15 words
- Use bullet lists for features
- Always document rate limits
- Use MDX components appropriately (see [Style Guide](../reference/style-guide.md))
- Link to glossary terms on first use

## Related Guides

- [Style Guide](../reference/style-guide.md)
- [Documenting Errors](04-documenting-errors.md)
- [Adding Parameters](01-adding-parameters.md)
