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
| Foundation validator | OPERATIONALLY_VERIFIED | GitHub Actions runs 29137440300 and 29137503159 | local clean-install execution |
| Environment doctor | OPERATIONALLY_VERIFIED | `npm run doctor` passed in GitHub Actions run 29137503159 | local Cursor workstation execution |
| GitHub Actions | OPERATIONALLY_VERIFIED | validation, doctor, and report artifact completed successfully | required branch check configuration |
| Installation guide | DOCUMENTED | INSTALLATION.md | clean-room installation |
| Operational protocol | DOCUMENTED | OPERATIONAL_VERIFICATION.md and ALPHA_ACCEPTANCE_TEST.md | execute in current Cursor build |
| Browser QA | CONFIGURED | browser QA Skill | successful Playwright and DevTools run |
| Public alpha | NOT_READY | no tagged release | complete Cursor, MCP, and clean-install verification |

## Verified foundation result

The repository has passed automated foundation and environment verification.

Latest successful workflow:

```text
GitHub Actions run: 29137503159
Validate foundation and environment: PASS
Validation report artifact: PASS
```

The validator confirms required files, Skill contracts, Rule contracts, local links, known secret patterns, workflow permissions, and required scripts. The doctor confirms the CI environment can execute the supported baseline without reading MCP secrets.

This does not prove local Cursor discovery or external MCP operation.

## Current release decision

The repository is not yet `PUBLIC_ALPHA`.

Completed promotion requirements:

1. [x] foundation validator passes in CI
2. [x] environment doctor passes in CI
3. [x] validation artifact is retained for audit

Remaining promotion requirements:

4. [ ] Cursor discovers all Rules and Skills
5. [ ] at least one Skill completes a harmless task end to end
6. [ ] Core MCP tools are invoked successfully with safe permissions
7. [ ] installation instructions are completed on a clean project
8. [ ] confirm no private Symbioz product data is present through final human review
9. [ ] configure branch protection and require the validation check

## Human-only verification still required

- local Cursor installation and current settings audit
- OAuth authorization for account-bound services
- real MCP tool invocation
- browser-driven verification
- clean-project installation
- repository settings for branch protection and Discussions
- founder approval before public release or production access
