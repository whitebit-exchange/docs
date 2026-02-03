# Documenting Errors

This guide explains how to document error responses and error codes in your API documentation.

## Error Schema (Define Once)

**Location**: `components` → `schemas` → `ErrorResponse`

**Check first**: Search for existing `ErrorResponse` schema in file before adding.

**Structure**: Object with `code` (integer), `message` (string), `errors` (object with field-specific arrays)

**Copy from**: See existing error schemas in `openapi/private/http-trade-v4.yaml`

## Adding Error Responses to Endpoint

**Pattern**:
- `'200'`: Success with `$ref` to success schema
- `'400'`: Validation errors with `$ref` to `ErrorResponse` + examples
- `'422'`: Business logic errors with examples
- `'503'`: Service unavailable (no body needed)

**Copy structure from**: Similar endpoint in your OpenAPI file

### Example Pattern

```yaml
responses:
  '200':
    description: Success
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/SuccessResponse'
  '400':
    description: Bad request - validation failed
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'
        examples:
          missingField:
            summary: Required field missing
            value:
              code: 30
              message: "Validation failed"
              errors:
                market: ["Market field is required."]
```

## Error Documentation in Description

Use `<Accordion title="Error Codes">` to list errors by status code.

**Format**: `code` - Description (when it occurs)

**Example template**: See `openapi/private/http-trade-v4.yaml` → `/api/v4/order/new`

### Example

```yaml
description: |
  Endpoint explanation here.
  
  <Accordion title="Error Codes">
  **Status 400** (Client errors):
  - `30` - General validation failure
  - `31` - Market validation failed
  
  **Status 422** (Business logic errors):
  - `10` - Insufficient balance
  </Accordion>
```

## Common Error Codes

See [Quick Reference](../reference/quick-reference.md#common-error-codes) for the full list of error codes.

## Best Practices

- Always document all possible error codes
- Group errors by HTTP status code
- Provide realistic error examples
- Link to related error scenarios
- Use `<Accordion>` for more than 5 error codes

## Related Guides

- [Adding Descriptions](02-adding-descriptions.md)
- [Quick Reference](../reference/quick-reference.md)
- [Common Pitfalls](../reference/common-pitfalls.md)
