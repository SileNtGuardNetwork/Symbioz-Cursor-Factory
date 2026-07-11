# Project Status

Last updated: 2026-07-11

## Readiness model

- `DOCUMENTED`: intent exists in version control
- `CONFIGURED`: configuration or implementation exists
- `OPERATIONALLY_VERIFIED`: executed successfully in a real environment
- `PUBLIC_ALPHA`: useful for early adopters with explicit limitations
- `PUBLIC_BETA`: verified across multiple projects and clean installations
- `PUBLIC_RELEASE_READY`: broadly distributable within documented boundaries

## Current matrix

| Area | Status | Evidence | Next proof |
|---|---|---|---|
| Product definition | DOCUMENTED | PRODUCT.md, README files | external user comprehension test |
| Architecture | DOCUMENTED | ARCHITECTURE.md, AGENTS.md | clean project application |
| Core Rules | CONFIGURED | `.cursor/rules/` | Cursor discovery and behavior test |
| Core Skills | CONFIGURED | `.cursor/skills/` | manual invocation and trigger test |
| Security boundaries | DOCUMENTED | SECURITY.md, security Rule and Skill | adversarial workflow test |
| MCP profiles | DOCUMENTED | MCP_PROFILES.md, MCP_CATALOG.md | OAuth connection and tool invocation |
| Cursor settings | DOCUMENTED | CURSOR_SETTINGS.md | settings audit on current Cursor build |
| Foundation validator | CONFIGURED | `scripts/validate-foundation.mjs` | successful local and CI execution |
| GitHub Actions | CONFIGURED | `.github/workflows/validate.yml` | successful workflow run |
| Installation guide | DOCUMENTED | INSTALLATION.md | clean-room installation |
| Browser QA | CONFIGURED | browser QA Skill | successful Playwright and DevTools run |
| Public alpha | NOT_READY | no tagged release | complete operational verification |

## Current release decision

The repository is not yet `PUBLIC_ALPHA`.

The next promotion requires all of the following:

1. foundation validator passes locally or in CI
2. Cursor discovers all Rules and Skills
3. at least one Skill completes a harmless task end to end
4. Core MCP tools are invoked successfully with safe permissions
5. installation instructions are completed on a clean project
6. no secrets or private Symbioz product data are present

## Human-only verification still required

- local Cursor installation and current settings audit
- OAuth authorization for account-bound services
- real MCP tool invocation
- browser-driven verification
- founder approval before public release or production access
