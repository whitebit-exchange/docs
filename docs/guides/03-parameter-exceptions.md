# Adding Parameter Exceptions

This guide explains how to document optional, conditional, and mutually exclusive parameters.

## Marking Optional Parameters

**Method 1**: Exclude from `required` array (parameter is optional if not listed)

**Method 2**: Add "**Optional.**" note in description with `<Tip>` or `<Warning>` for constraints

### Example

```yaml
properties:
  clientOrderId:  # Not in 'required' array = optional
    type: string
    description: |
      **Optional.** Custom order identifier.
      
      <Tip>
      Recommended for tracking orders in your system.
      </Tip>
```

## Conditional Requirements

Use `<Warning>` blocks to document when requirements change based on context:
- Example: "For buy market orders: Amount in money currency (USDT)"
- Include minimum/maximum values per context

### Example

```yaml
amount:
  type: string
  description: |
    Order amount.
    
    <Warning>
    **For buy market orders:** Amount in money currency (USDT)
    **For sell market orders:** Amount in stock currency (BTC)
    **For limit orders:** Always in stock currency
    </Warning>
```

## Mutually Exclusive Parameters

Document conflicts with `<Warning>`: "Cannot be combined with `otherParam` flag. Error code X if both are true."

### Example

```yaml
postOnly:
  type: boolean
  default: false
  description: |
    Maker-only order flag.
    
    <Warning>
    Cannot be combined with `ioc` flag.
    Error code 37 if both are true.
    </Warning>
```

## Best Practices

- Always be explicit about optional vs required
- Document all conditional logic
- Link to error codes when conflicts occur
- Use consistent formatting across all parameters

## Related Guides

- [Adding Parameters](01-adding-parameters.md)
- [Documenting Errors](04-documenting-errors.md)
- [Style Guide](../reference/style-guide.md)
