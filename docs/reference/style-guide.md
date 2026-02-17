# Documentation Style Guide

Guidelines for writing consistent, clear, and professional API documentation.

## Tone and Voice

**DO**: Clear, professional, helpful (not casual or vague)

**Good example**: "This endpoint creates limit orders with advanced execution options."

**Bad example**: "This thing lets you create orders. Pretty cool, right?"

## Terminology Standards

Check `/glossary.mdx` for correct terms:
- ✅ "limit order" not "limited order"
- ✅ "order book" not "orderbook"  
- ✅ "stock currency" / "money currency" (WhiteBIT-specific terms)

## MDX Components Usage

- `<Warning>` = Critical info (rate limits, breaking changes)
- `<Note>` = Helpful context (caching, format notes)
- `<Tip>` = Best practices
- `<Accordion>` = Long lists (>5 items)

### When to Use Each Component

| Component | Use When | Don't Use For |
|-----------|----------|---------------|
| `<Warning>` | Rate limits, security warnings, breaking changes, data loss risks | Minor notes, helpful tips |
| `<Note>` | Caching behavior, response formats, update intervals | Critical warnings |
| `<Tip>` | Performance optimization, recommended patterns | Required information |
| `<Accordion>` | Error codes (>5), multiple examples, long specifications | Short lists (&lt;5 items) |

## Content Guidelines

**Summaries**: 1 sentence, 10-15 words
```yaml
summary: Create limit order with advanced execution options
```

**Descriptions**: 2-4 paragraphs
- Paragraph 1: What it does (1-2 sentences)
- Paragraph 2: Key features (bullet list)
- Paragraph 3: Important notes (`<Warning>`, rate limits)
- Paragraph 4 (optional): Common use cases

**Parameters**: 1-3 sentences
- Sentence 1: What it is
- Sentence 2 (optional): Valid values or constraints
- Sentence 3 (optional): Important note

**Examples**: Use realistic values (`BTC_USDT` not `XXX_YYY`), include required fields

### Example Quality

**Good**:
```yaml
example:
  market: "BTC_USDT"
  side: "buy"
  amount: "0.001"
  price: "45000"
```

**Bad**:
```yaml
example:
  market: "string"
  side: "string"
  amount: 0
```

## Glossary Links

Link first occurrence: `[limit order](/glossary#limit-order)`

Don't overlink common words (order, market, update)

### Linking Rules

- **DO**: Link specialized terms on first occurrence
- **DON'T**: Link the same term multiple times in one section
- **DON'T**: Link generic terms like "create", "update", "delete"

## Writing for Different Audiences

### Technical Writers
Focus on: Clear language, consistent terminology, proper grammar

### Developers  
Focus on: Technical accuracy, realistic examples, edge cases

### DevRel Engineers
Focus on: Use cases, best practices, common scenarios

## Related Documentation

- [Quick Reference](quick-reference.md) - MDX components, file patterns
- [Common Pitfalls](common-pitfalls.md) - Avoid mistakes
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Review checklists
