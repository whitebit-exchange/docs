# WhiteBIT API Documentation

Official documentation for WhiteBIT's REST and WebSocket APIs, built with Mintlify.

## Prerequisites

Before you begin, make sure the following tools are installed on your machine:

| Tool | Minimum Version | Installation |
|------|----------------|--------------|
| [Node.js](https://nodejs.org/) | v18+ | [Download](https://nodejs.org/en/download/) or use [nvm](https://github.com/nvm-sh/nvm) |
| npm | v9+ (ships with Node.js) | Included with Node.js |
| [Mintlify CLI](https://mintlify.com/docs/development) | latest | `npm install -g mintlify@latest` |
| [Redocly CLI](https://redocly.com/docs/cli/) | latest | `npm install -g @redocly/cli@latest` |
| [AsyncAPI CLI](https://www.asyncapi.com/tools/cli) | latest | `npm install -g @asyncapi/cli` |

Verify your setup:

```bash
node --version    # Should print v18.x or higher
npm --version     # Should print 9.x or higher
mint --version    # Mintlify CLI
redocly --version # Redocly CLI
asyncapi --version # AsyncAPI CLI
```

## Quick Start

Get the documentation running locally in 2 minutes:

```bash
# Install Mintlify CLI (if not already installed)
npm install -g mintlify@latest

# Start dev server
mint dev

# Open http://localhost:3000
```

## Contributing

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for:
- Git workflow and branching strategy
- Commit message format
- Pull request process
- Review checklists for tech writers, DevRel engineers, and developers

## External Resources
- [OpenAPI 3.0.3 Specification](https://spec.openapis.org/oas/v3.0.3.html)
- [AsyncAPI 3.0.0 Specification](https://www.asyncapi.com/docs/reference/specification/v3.0.0)
- [Mintlify Documentation](https://mintlify.com/docs)

## Project Structure

```
mintlify-docs/
├── openapi/           # OpenAPI specifications (REST APIs)
│   ├── public/        # Public endpoints (no auth)
│   └── private/       # Private endpoints (require auth)
├── asyncapi/          # AsyncAPI specifications (WebSocket)
│   ├── public/        # Public channels
│   └── private/       # Private channels
├── api-reference/    # REST API docs (market-data, spot-trading, collateral-trading,
│                     # convert, account-wallet, sub-accounts, authentication, oauth)
├── websocket/         # WebSocket docs (overview, market-streams, account-streams)
├── platform/          # Platform feature docs (webhook, colocation, self-trade-prevention,
│                     # oauth conceptual overview)
└── docs.json          # Navigation configuration
```

## Getting Help

**For technical questions**:
- Check existing similar endpoints in the codebase
- Search OpenAPI/AsyncAPI specifications

**For style questions**:
- Ask tech writer team lead
- Check [glossary](/glossary.mdx) for terminology

**For API accuracy questions**:
- Ask backend engineering team
- Check staging environment responses
- Review internal API specifications

**For process questions**:
- Review [CONTRIBUTING.md](CONTRIBUTING.md)
- Ask DevRel team lead
- Check PR review checklists

## Validation Before Submitting

Always validate your changes before creating a PR:

```bash
# OpenAPI validation
npx @redocly/cli lint openapi/**/*.yaml

# AsyncAPI validation
find asyncapi -name "*.yaml" -exec asyncapi validate {} \;

# Test in dev server
mint dev
```

---
