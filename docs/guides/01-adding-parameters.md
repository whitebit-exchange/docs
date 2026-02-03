# Adding Parameters to Requests

This guide explains how to add parameters to REST API and WebSocket API endpoints.

## REST API Parameters

### Decision: What type of parameter?

- **Query parameters** → Public APIs (GET requests)
- **Body parameters** → Private APIs (POST requests with JSON)
- **Path parameters** → Rare (used in URLs like `/api/v4/market/{market_name}`)

### A. Query Parameters (Public APIs)

**Copy from existing**: Search `openapi/public/http-v4.yaml` for `in: query`

**Key fields**: `name`, `in: query`, `required`, `description`, `schema` (with `type`, `minimum`, `maximum`, `default`, `example`)

**Example location**: Look at any public endpoint in `openapi/public/http-v4.yaml`

### B. Body Parameters (Private APIs)

**Copy from existing**: See [`openapi/private/http-trade-v4.yaml`](../../openapi/private/http-trade-v4.yaml) POST `/api/v4/order/new` for complete parameter structure.

**Key pattern**:
- Define `requestBody` with `application/json` content
- Include `required` array for mandatory fields
- **Always include** `request` and `nonce` fields for private APIs
- Use `enum` for fixed value options
- Add glossary links for domain terms

**⚠️ Private API Checklist**:
- [ ] Includes `request` field
- [ ] Includes `nonce` field
- [ ] Has `security: - ApiKeyAuth: []` in operation
- [ ] All required fields in `required` array

## WebSocket API Parameters

**Copy from existing**: See [`asyncapi/public/depth.yaml`](../../asyncapi/public/depth.yaml) → `DepthSubscribeRequest` schema

**Key pattern**:
- Define message object with `id`, `method`, `params`
- Use `const` for method names (e.g., `myfeature_subscribe`)
- Document array params with position-based descriptions
- Specify `minItems` and `maxItems` for validation

**Find examples**:
- Simple params: `asyncapi/public/lastprice.yaml`
- Complex params: `asyncapi/public/depth.yaml`
- Event updates: `asyncapi/private/orders_pending.yaml`

## Related Guides

- [Adding Overview Descriptions](02-adding-descriptions.md)
- [Parameter Exceptions](03-parameter-exceptions.md)
- [Style Guide](../reference/style-guide.md)
