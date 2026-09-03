# Symbioz Cursor Factory

[![Validate Foundation](https://github.com/SileNtGuardNetwork/Symbioz-Cursor-Factory/actions/workflows/validate.yml/badge.svg)](https://github.com/SileNtGuardNetwork/Symbioz-Cursor-Factory/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> An open-source operating system for Cursor that helps founders and developers plan, build, verify, and ship production-grade SaaS products.

[Русская версия](README.ru.md)

## Status

**Early alpha.** The repository contains a working foundation, but the complete installation and MCP workflow are not yet operationally verified on a clean external machine.

Current readiness:

| Layer | Status |
|---|---|
| Product and architecture contracts | Documented |
| Universal Cursor Rules | Implemented |
| Initial Agent Skills | Implemented |
| Repository validator | Implemented |
| GitHub Actions validation | Configured, verification pending |
| Cursor discovery | Local verification pending |
| MCP connections | Documentation only, OAuth verification pending |
| Public release | Not ready |

The first public milestone must prove this Cursor-first workflow:

```text
idea
-> product brief
-> architecture
-> controlled implementation
-> code and security review
-> automated checks
-> browser QA
-> documentation sync
-> release preparation
```

## What this project is

Symbioz Cursor Factory packages a practical AI-development workflow into reusable, versioned building blocks:

- Cursor Rules for architecture, engineering, design, security, QA, and documentation
- Agent Skills for repeatable product-development tasks
- curated MCP profiles for the full SaaS delivery cycle
- approval boundaries for production, databases, secrets, paid services, and destructive actions
- quality gates that require evidence instead of unverified claims
- a documented Cursor setup for founders, solo developers, and small product teams
- reusable project contracts and examples validated on real SaaS products

## What this project is not

- not a promise that AI can build every product without engineering judgment
- not a random collection of prompts or MCP servers
- not a replacement for security review, testing, legal review, or founder approval
- not a production-ready stable release yet

## Included in the current branch

### Cursor Rules

- core operating contract
- architecture
- controlled implementation
- independent review
- QA
- design
- security
- documentation

### Agent Skills

- product brief
- architecture
- controlled implementation
- browser QA
- code review
- security review
- documentation sync
- release preparation

### Operational documentation

- [Installation](docs/INSTALLATION.md)
- [Cursor settings](docs/CURSOR_SETTINGS.md)
- [MCP profiles](docs/MCP_PROFILES.md)
- [MCP catalog](docs/MCP_CATALOG.md)
- [FAQ](docs/FAQ.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Release checklist](docs/RELEASE_CHECKLIST.md)
- [Example project contract](examples/PROJECT_CONTRACT.md)

## Quick validation

Requirements:

- Git
- Node.js 20 or newer
- Cursor for local discovery tests

```bash
git clone https://github.com/SileNtGuardNetwork/Symbioz-Cursor-Factory.git
cd Symbioz-Cursor-Factory
npm test
```

A successful repository validation ends with:

```text
PASS_FOUNDATION_VALIDATION
```

For current alpha installation into another project, follow [docs/INSTALLATION.md](docs/INSTALLATION.md). Do not copy secret-bearing MCP configuration into Git.

## Product principles

1. **Proof over claims.** A task is not complete without verification.
2. **Minimum necessary access.** Tools receive only the permissions they need.
3. **Plan before implementation.** Product intent and architecture precede code.
4. **Small controlled changes.** Avoid silent scope expansion and unrelated refactors.
5. **Human approval for irreversible actions.** Production, migrations, secrets, external cost, and destructive actions require explicit approval.
6. **Real-product validation.** Reusable workflows are extracted from working SaaS projects, not invented in isolation.
7. **Cursor-first, portable where possible.** The primary experience targets Cursor while using open formats where practical.

## Initial supported stack

The first verified path focuses on:

- Cursor
- GitHub
- Next.js
- TypeScript
- Supabase or PostgreSQL
- Vercel
- Figma
- shadcn/ui
- Playwright
- Chrome DevTools

Additional stacks and integrations will be added only after the core workflow is operationally verified.

## Documentation map

| Document | Purpose |
|---|---|
| [PRODUCT.md](PRODUCT.md) | Product definition, audience, scope, and non-goals |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Repository and workflow architecture |
| [AGENTS.md](AGENTS.md) | Universal agent operating contract |
| [ROADMAP.md](ROADMAP.md) | Evidence-based path to public release |
| [SECURITY.md](SECURITY.md) | Security reporting and secret-handling rules |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution expectations |

## Security

Do not commit API keys, tokens, OAuth credentials, cookies, `.env` files, customer data, private source code, or raw MCP configuration containing secrets. See [SECURITY.md](SECURITY.md).

## Contributing

The project is currently in founder-led alpha. Contributions will open gradually as the public contracts stabilize. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## License

MIT. See [LICENSE](LICENSE).

## Disclaimer

Symbioz Cursor Factory is an independent open-source project. It is not affiliated with or endorsed by Cursor or Anysphere.
