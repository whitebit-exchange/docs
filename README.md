# WhiteBIT API Documentation

Official documentation for WhiteBIT's REST and WebSocket APIs, built with Mintlify.

## Quick Start

Get the documentation running locally in 2 minutes:

```bash
# Install Mintlify CLI
npm install -g mintlify@latest

# Start dev server
mint dev

# Open http://localhost:3000
```

**Full setup instructions** → [Validation Guide](docs/reference/validation.md)

## Documentation Tasks

Contributing to the API docs? Choose your task:

### Common Tasks
- **[Adding Parameters](docs/guides/01-adding-parameters.md)** - Add query, body, or WebSocket parameters
- **[Adding Descriptions](docs/guides/02-adding-descriptions.md)** - Write endpoint overviews and descriptions
- **[Parameter Exceptions](docs/guides/03-parameter-exceptions.md)** - Document optional, conditional, or exclusive parameters
- **[Documenting Errors](docs/guides/04-documenting-errors.md)** - Add error codes and error responses
- **[Adding New Endpoints](docs/guides/05-adding-new-endpoints.md)** - Complete workflow for new REST or WebSocket endpoints

## Contributing

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for:
- Git workflow and branching strategy
- Commit message format
- Pull request process
- Review checklists for tech writers, DevRel engineers, and developers

## Reference Documentation

### Quick Access
- **[File Structure Decision Tree](docs/reference/file-structure.md)** - Which file should I edit?
- **[Style Guide](docs/reference/style-guide.md)** - Writing standards and best practices
- **[Quick Reference](docs/reference/quick-reference.md)** - Tables, patterns, error codes
- **[Common Pitfalls](docs/reference/common-pitfalls.md)** - Avoid frequent mistakes
- **[Validation Guide](docs/reference/validation.md)** - Local dev environment and testing

### External Resources
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
├── public/            # MDX docs for public APIs
├── private/           # MDX docs for private APIs
├── docs/              # Internal documentation
│   ├── guides/        # Step-by-step task guides
│   └── reference/     # Reference materials
└── docs.json          # Navigation configuration
```

## Getting Help

**For technical questions**:
- Check existing similar endpoints in the codebase
- See [Validation Guide](docs/reference/validation.md)
- Search OpenAPI/AsyncAPI specifications

**For style questions**:
- Consult [Style Guide](docs/reference/style-guide.md)
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

See [Validation Guide](docs/reference/validation.md) for detailed instructions.

---

**Last Updated**: 2026-01-30  
**Maintainers**: Technical Writing Team, DevRel Team  
**Questions?**: Contact team leads or post in #documentation-help
