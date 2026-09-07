# WhiteBIT API Documentation

Source for the WhiteBIT developer documentation portal — the REST and WebSocket
API reference for building on WhiteBIT, one of Europe's largest cryptocurrency
exchanges.

**Read the docs:** https://docs.whitebit.com

## Quick start

New to the WhiteBIT API? Start here:

- **Make your first API call** — https://docs.whitebit.com/guides/first-api-call
- **Stream data over WebSocket** — https://docs.whitebit.com/guides/websocket-quickstart
- **Full API reference** — https://docs.whitebit.com

Public market data needs no API key. Private endpoints are authenticated with
HMAC-SHA512 request signing — see
[Authentication](https://docs.whitebit.com/api-reference/authentication).

## What's documented

- **REST API** — v4 is primary (public market data, private trading, account &
  wallet, sub-accounts, OAuth). v1 and v2 remain for backward compatibility.
- **WebSocket API** — public market streams (depth, kline, trades, last price),
  private account streams (balances, orders, positions), and order management.
- **OAuth** — third-party account access flow and endpoint reference.
- **Platform features** — colocation, self-trade prevention, webhooks, WhiteBIT
  Codes, Convert, Fireblocks.
- **Products** — Spot, Margin, Futures, Lending, Sub-Accounts, Mining Pool, and
  Market Data, each with an overview and quickstart.
- **Guides & recipes** — first API call, WebSocket quickstart, trading bot, price
  dashboard, account monitoring, and more.
- **Resources** — FAQ, glossary, SDKs, changelog.

## How the specs work

The OpenAPI specs under `openapi/` and the AsyncAPI specs under `asyncapi/` are
the single source of truth for endpoint and channel definitions. The MDX pages in
`api-reference/` and `websocket/` add narrative context, and Mintlify renders the
spec itself. An SDK is generated downstream from the OpenAPI specs, so spec
accuracy is treated as release-blocking.

## Browse the docs locally

Preview the portal on your machine with the [Mintlify CLI](https://mintlify.com/docs/installation):

```bash
npm install -g mint   # one-time
mint dev              # serves http://localhost:3000
```

Or run it in Docker, with no local tooling:

```bash
docker compose up --build   # serves http://localhost:3000
```

## Contributing

Contributor process, branching strategy, and review checklists are in
[CONTRIBUTING.md](CONTRIBUTING.md).

## Project structure

```
openapi/        # OpenAPI specs (REST) — public/ and private/
asyncapi/       # AsyncAPI specs (WebSocket) — public/ and private/
api-reference/  # REST API docs
websocket/      # WebSocket docs
platform/       # Platform features (webhooks, colocation, STP, OAuth)
products/       # Product overviews and quickstarts
guides/         # Integration guides and recipes
concepts/       # Conceptual reference
institutional/  # Institutional & B2B content
best-practices/ # Cross-cutting best practices
snippets/       # Reusable MDX/JSX snippets
docs.json       # Navigation configuration
```

## External resources

- [OpenAPI 3.0.3 Specification](https://spec.openapis.org/oas/v3.0.3.html)
- [AsyncAPI 3.0.0 Specification](https://www.asyncapi.com/docs/reference/specification/v3.0.0)
- [Mintlify Documentation](https://mintlify.com/docs)
