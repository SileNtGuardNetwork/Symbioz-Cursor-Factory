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
| Foundation validator | OPERATIONALLY_VERIFIED | GitHub Actions run 29137440300 and validation artifact | local clean-install execution |
| GitHub Actions | OPERATIONALLY_VERIFIED | `Validate Foundation` completed successfully | required branch check configuration |
| Installation guide | DOCUMENTED | INSTALLATION.md | clean-room installation |
| Browser QA | CONFIGURED | browser QA Skill | successful Playwright and DevTools run |
| Public alpha | NOT_READY | no tagged release | complete Cursor and MCP verification |

## Verified foundation result

The current branch produced:

```text
PASS_FOUNDATION_VALIDATION
Checked 41 required files.
Checked 8 skills.
Checked 8 rules.
Checked 40 text files for secrets and local links.
```

This proves repository consistency for the checked contracts. It does not prove local Cursor discovery or external MCP operation.

## Current release decision

The repository is not yet `PUBLIC_ALPHA`.

Completed promotion requirement:

1. [x] foundation validator passes in CI

Remaining promotion requirements:

2. [ ] Cursor discovers all Rules and Skills
3. [ ] at least one Skill completes a harmless task end to end
4. [ ] Core MCP tools are invoked successfully with safe permissions
5. [ ] installation instructions are completed on a clean project
6. [ ] confirm no private Symbioz product data is present through final human review

## Human-only verification still required

- local Cursor installation and current settings audit
- OAuth authorization for account-bound services
- real MCP tool invocation
- browser-driven verification
- clean-project installation
- founder approval before public release or production access
