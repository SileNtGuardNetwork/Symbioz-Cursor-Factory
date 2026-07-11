# Symbioz Cursor Factory

> An open-source operating system for Cursor that helps founders and developers plan, build, verify, and ship production-grade SaaS products.

[Русская версия](README.ru.md)

## Status

**Early alpha.** The repository foundation is being assembled and is not yet ready for general installation.

The first public milestone is a verified Cursor-first workflow for:

```text
idea
-> product brief
-> architecture
-> implementation
-> design review
-> automated checks
-> browser QA
-> preview
-> release preparation
```

## What this project is

Symbioz Cursor Factory is intended to package a practical AI development workflow into reusable, versioned building blocks:

- Cursor Rules for engineering, design, security, QA, and documentation
- Agent Skills for repeatable product-development tasks
- curated MCP profiles for the full SaaS delivery cycle
- approval boundaries for production, database, secrets, and paid services
- quality gates that require evidence instead of unverified claims
- a documented Cursor setup for founders, solo developers, and small product teams
- reusable SaaS foundations and examples validated on real products

## What this project is not

- not a promise that AI can build every product without engineering judgment
- not a random collection of prompts or MCP servers
- not a replacement for security review, testing, or founder approval
- not a production-ready release yet

## Product principles

1. **Proof over claims.** A task is not complete without verification.
2. **Minimum necessary access.** Tools receive only the permissions they need.
3. **Plan before implementation.** Product intent and architecture precede code.
4. **Small controlled changes.** Avoid silent scope expansion and unrelated refactors.
5. **Human approval for irreversible actions.** Production, migrations, secrets, external cost, and destructive actions require explicit approval.
6. **Real-product validation.** Reusable workflows are extracted from working SaaS projects, not invented in isolation.
7. **Cursor-first, portable where possible.** The primary experience targets Cursor while using open formats where practical.

## Planned repository structure

```text
.cursor/
  rules/
  skills/
docs/
  product/
  setup/
  mcp/
  security/
examples/
scripts/
templates/
```

## Initial supported stack

The first verified path will focus on:

- Cursor
- GitHub
- Next.js
- TypeScript
- Supabase / PostgreSQL
- Vercel
- Figma
- shadcn/ui
- Playwright
- Chrome DevTools

Additional stacks and integrations will be added only after the core workflow is operationally verified.

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## Security

Do not commit API keys, tokens, OAuth credentials, cookies, `.env` files, or raw MCP configuration containing secrets. See [SECURITY.md](SECURITY.md).

## Contributing

The project is currently in founder-led alpha. Contributions will open gradually as the public contracts stabilize. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

## Disclaimer

Symbioz Cursor Factory is an independent open-source project. It is not affiliated with or endorsed by Cursor or Anysphere.
