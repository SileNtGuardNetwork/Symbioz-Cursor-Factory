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
| Core Rules | CONFIGURED | `.cursor/rules/` | all eight Rules discovered in Cursor and behavior tested |
| Core Skills | OPERATIONALLY_VERIFIED | eight Skills discovered in Cursor UI; `product-brief` passed MiMo Code verification 003 against the synchronized local repository | native Cursor Agent invocation and controlled-implementation harmless test |
| Security boundaries | DOCUMENTED | SECURITY.md, security Rule and Skill | adversarial workflow test |
| MCP profiles | DOCUMENTED | MCP_PROFILES.md, MCP_CATALOG.md | OAuth connection and tool invocation |
| Cursor settings | DOCUMENTED | CURSOR_SETTINGS.md | settings audit on current Cursor build |
| Foundation validator | OPERATIONALLY_VERIFIED | GitHub Actions runs 29137440300 and 29137503159 | local clean-install execution |
| Environment doctor | OPERATIONALLY_VERIFIED | `npm run doctor` passed in GitHub Actions run 29137503159 | local Cursor workstation execution |
| GitHub Actions | OPERATIONALLY_VERIFIED | validation, doctor, and report artifact completed successfully | required branch check configuration |
| Installation guide | DOCUMENTED | INSTALLATION.md | clean-room installation |
| Operational protocol | DOCUMENTED | OPERATIONAL_VERIFICATION.md and ALPHA_ACCEPTANCE_TEST.md | complete remaining Cursor and MCP checks |
| Browser QA | CONFIGURED | browser QA Skill | successful Playwright and DevTools run |
| Public alpha | NOT_READY | no tagged release | complete Cursor, MCP, local, and clean-install verification |

## Verified foundation result

The repository has passed automated foundation and environment verification.

Latest successful workflow:

```text
GitHub Actions run: 29137503159
Validate foundation and environment: PASS
Validation report artifact: PASS
```

The validator confirms required files, Skill contracts, Rule contracts, local links, known secret patterns, workflow permissions, and required scripts. The doctor confirms the CI environment can execute the supported baseline without reading MCP secrets.

## Verified local discovery and external Skill execution

The current local Cursor installation discovered all eight repository Skills in its Skills menu.

MiMo Code then executed the synchronized `product-brief` Skill against a fictional product and returned:

```text
PASS_PRODUCT_BRIEF_SKILL_VERIFICATION_003
```

Evidence:

- `docs/verification/PRODUCT_BRIEF_MIMO_001.md`
- `docs/verification/PRODUCT_BRIEF_MIMO_002.md`
- `docs/verification/PRODUCT_BRIEF_MIMO_003.md`

The first test exposed duplicate output and unapproved decisions. The Skill was hardened. The third test used the synchronized current file and passed the defined external-executor checks.

This proves repository Skill discovery and successful external-agent execution. It does not prove native Cursor Agent execution because the current local Cursor plan does not provide working Agent execution.

## Current release decision

The repository is not yet `PUBLIC_ALPHA`.

Completed promotion requirements:

1. [x] foundation validator passes in CI
2. [x] environment doctor passes in CI
3. [x] validation artifact is retained for audit
4. [x] all eight Skills are discovered in the local Cursor UI
5. [x] `product-brief` completes a harmless task end to end through MiMo Code using the synchronized current Skill

Remaining promotion requirements:

6. [ ] all eight Rules are discoverable and only the core Rule is always-on
7. [ ] native Cursor Agent invocation is verified when an executable plan is available
8. [ ] `npm test` and `npm run doctor` pass on the target local workstation
9. [ ] Core MCP tools are invoked successfully with safe permissions
10. [ ] installation instructions are completed on a clean project
11. [ ] confirm no private Symbioz product data is present through final human review
12. [ ] configure branch protection and require the validation check

## Human-only verification still required

- local Cursor version and settings audit
- native Cursor Agent execution when available
- OAuth authorization for account-bound services
- real MCP tool invocation
- browser-driven verification
- clean-project installation
- repository settings for branch protection and Discussions
- founder approval before public release or production access
