# WhiteBIT API Documentation

Official documentation for WhiteBIT's REST and WebSocket APIs, built with Mintlify.

## About this portal

WhiteBIT is one of Europe's largest cryptocurrency exchanges. This repository
is the source for its public developer documentation portal — the canonical
reference for anyone integrating with WhiteBIT's REST and WebSocket APIs. The
portal is built with [Mintlify](https://mintlify.com).

### What's documented

- **REST API** — v4 is the primary version (public market data, private
  trading, account & wallet, sub-accounts, OAuth). v1 and v2 are maintained for
  backward compatibility (public endpoints + legacy v1 trading).
- **WebSocket API** — public market streams (depth, kline, trades, last price)
  and private account streams (balances, orders, positions).
- **OAuth** — third-party account access flow and endpoint reference.
- **Platform features** — colocation, self-trade prevention, webhooks, WhiteBIT
  Codes, Convert.
- **Product overviews & quickstarts** — Spot, Margin, Futures, Lending,
  Sub-Accounts, Mining Pool, Market Data.
- **Integration guides** — first API call, trading bot, account monitoring,
  payment integration, Fireblocks, market maker, broker.
- **Institutional & B2B** — onboarding and compliance content.
- **Resources** — FAQ, glossary, SDKs, changelog.

### Who it's for

- **Individual developers** building bots, scripts, and integrations against
  WhiteBIT.
- **Institutional & B2B clients** — market makers, brokers, payment
  integrators, Fireblocks users.
- **Partners and evaluators** assessing API capabilities before committing to
  integration work.

### How this repo relates to other systems

The OpenAPI specs under `openapi/` and AsyncAPI specs under `asyncapi/` are the
single source of truth for endpoint and channel definitions — the MDX pages in
`api-reference/` and `websocket/` provide narrative context, while the spec
itself is rendered automatically by Mintlify. An SDK is auto-generated
downstream from these OpenAPI specs, so spec accuracy is treated as a
release-blocking concern.

### Contributing

The portal is maintained jointly by tech writers, DevRel, and backend engineers
(for spec updates). Contributor process and review checklists live in
[CONTRIBUTING.md](CONTRIBUTING.md). The repository also includes an AI-assisted
authoring pipeline — entry points are in [CLAUDE.md](CLAUDE.md) and
[ai/agent.md](ai/agent.md).

## Prerequisites

Before you begin, make sure the following tools are installed on your machine:

| Tool | Minimum Version | Installation |
|------|----------------|--------------|
| [Node.js](https://nodejs.org/) | v18+ | [Download](https://nodejs.org/en/download/) or use [nvm](https://github.com/nvm-sh/nvm) |
| npm | v9+ (ships with Node.js) | Included with Node.js |
| [Mintlify CLI](https://mintlify.com/docs/installation) | latest | `npm install -g mintlify@latest` |
| [Redocly CLI](https://redocly.com/docs/cli/) | latest | `npm install -g @redocly/cli@latest` |
| [AsyncAPI CLI](https://www.asyncapi.com/tools/cli) | latest | `npm install -g @asyncapi/cli` |

Verify your setup:

```bash
node --version    # Should print v18.x or higher
npm --version     # Should print 9.x or higher
mintlify --version    # Mintlify CLI
redocly --version # Redocly CLI
asyncapi --version # AsyncAPI CLI
```

## Quick Start

With Prerequisites installed, start the dev server:

```bash
mintlify dev

# Open http://localhost:3000
```

## Running with Docker

Run the docs portal in a container without installing any tools locally (requires [Docker](https://docs.docker.com/get-docker/)):

```bash
# Build and start
docker compose up --build

# Open http://localhost:3000
```

The volume mount in `docker-compose.yml` syncs local file changes into the container in real time, so edits are reflected without restarting.

To run without live editing (static copy baked into the image):

```bash
docker build -t whitebit-docs .
docker run -p 3000:3000 whitebit-docs
```

> **Note:** On first start, `npx mintlify dev` downloads the Mintlify client from `releases.mintlify.com`. Network access is required.

## Validation

Always validate your changes before opening a PR:

```bash
# OpenAPI specs
npx @redocly/cli lint openapi/**/*.yaml

# AsyncAPI specs
find asyncapi -name "*.yaml" -exec asyncapi validate {} \;

# Local preview
mintlify dev
```

See [CONTRIBUTING.md](CONTRIBUTING.md#validation) for the full review process.

## Project Structure

```
mintlify-docs/
├── openapi/          # OpenAPI specifications (REST APIs)
│   ├── public/       # Public endpoints (no auth)
│   └── private/      # Private endpoints (require auth)
├── asyncapi/         # AsyncAPI specifications (WebSocket)
│   ├── public/       # Public channels
│   └── private/      # Private channels
├── api-reference/    # REST API docs
├── websocket/        # WebSocket docs
├── platform/         # Platform feature docs (webhooks, colocation, STP, OAuth)
├── products/         # Product overviews and quickstarts
├── guides/           # Integration guides
├── institutional/    # Institutional & B2B content
├── best-practices/   # Cross-cutting best practices
├── concepts/         # Conceptual reference pages
├── data/             # Shared YAML data sources for snippets
├── snippets/         # Reusable MDX/JSX snippets
├── components/       # Custom Mintlify components
├── images/           # Image assets (plus logo/)
├── scripts/          # Build and codegen scripts
├── ai/               # AI-assisted authoring pipeline (skills, rules, style guides)
└── docs.json         # Navigation configuration
```

## External Resources

- [OpenAPI 3.0.3 Specification](https://spec.openapis.org/oas/v3.0.3.html)
- [AsyncAPI 3.0.0 Specification](https://www.asyncapi.com/docs/reference/specification/v3.0.0)
- [Mintlify Documentation](https://mintlify.com/docs)

---
