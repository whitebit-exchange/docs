# File Structure Decision Tree

Quick reference for determining which files to edit when documenting endpoints.

## Which OpenAPI file should I edit?

```
Is it a public endpoint (no authentication)?
├─ YES: Is it a new API version?
│  ├─ YES: Create new file openapi/public/http-vX.yaml
│  └─ NO: Which version?
│     ├─ v1 → openapi/public/http-v1.yaml
│     ├─ v2 → openapi/public/http-v2.yaml
│     └─ v4 → openapi/public/http-v4.yaml
│
└─ NO (requires authentication): What type?
   ├─ Trading operations (orders, positions)
   │  ├─ v1 → openapi/private/http-trade-v1.yaml
   │  └─ v4 → openapi/private/http-trade-v4.yaml
   │
   ├─ Main account operations (deposits, withdrawals, balances)
   │  └─ v4 → openapi/private/main_api_v4.yaml
   │
   └─ OAuth operations
      └─ openapi/oauth2.yaml
```

## Which AsyncAPI file should I edit?

```
What type of WebSocket endpoint?
├─ Public (no auth) → asyncapi/public/<feature>.yaml
│  Examples: depth.yaml, kline.yaml, trades.yaml
│
└─ Private (requires auth) → asyncapi/private/<feature>.yaml
   Examples: balance_spot.yaml, orders_pending.yaml

Creating new WebSocket feature?
└─ Copy existing file with similar structure as template
   (e.g., copy depth.yaml for new market data feature)
```

## MDX File Locations

### REST API

- **api-reference/**: `api-reference/<category>/<endpoint-name>.mdx`
  - Example: `api-reference/market-data/market-info.mdx`
  - Example: `api-reference/spot-trading/create-limit-order.mdx`
  - Example: `api-reference/account-wallet/create-withdraw-request.mdx`

### WebSocket API

- **Market Streams** (public): `websocket/market-streams/<feature>.mdx`
  - Example: `websocket/market-streams/depth.mdx`
- **Account Streams** (private): `websocket/account-streams/<feature>.mdx`
  - Example: `websocket/account-streams/balance-spot.mdx`

## Navigation Configuration

All page references go in `docs.json` at the root:

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "API Reference",
        "groups": [
          {
            "group": "Spot Trading",
            "pages": [
              "api-reference/spot-trading/create-limit-order",
              "api-reference/spot-trading/cancel-order"
            ]
          }
        ]
      },
      {
        "tab": "WebSocket",
        "groups": [
          {
            "group": "Market Streams",
            "pages": [
              "websocket/market-streams/depth",
              "websocket/market-streams/trades"
            ]
          }
        ]
      }
    ]
  }
}
```

**Note**: Paths in `docs.json` omit the `.mdx` extension.

## Quick Decision Flowchart

1. **Is it REST or WebSocket?**
   - REST → Choose OpenAPI file
   - WebSocket → Choose AsyncAPI file

2. **Is it public or private?**
   - Public → `openapi/public/` or `asyncapi/public/`
   - Private → `openapi/private/` or `asyncapi/private/`

3. **Which API version?**
   - v1, v2, v4 → Use corresponding file
   - New version → Create new file

4. **What's the feature type?** (for private REST)
   - Trading → `http-trade-v4.yaml`
   - Account ops → `main_api_v4.yaml`
   - OAuth → `oauth2.yaml`

## Related Documentation

- [Adding New Endpoints](../guides/05-adding-new-endpoints.md)
- [Quick Reference](quick-reference.md)
