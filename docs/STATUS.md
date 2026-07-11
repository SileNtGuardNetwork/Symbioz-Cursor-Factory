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
| Core Rules | CONFIGURED | eight Rules passed static audit 002 and were discovered 8/8 in native Cursor UI; only `00-core.mdc` is configured always-on | live Rule behavior test |
| Core Skills | OPERATIONALLY_VERIFIED | eight Skills discovered in Cursor UI; `product-brief` passed MiMo Code verification 003 against the synchronized local repository | native Cursor Agent invocation and controlled-implementation harmless test |
| Security boundaries | DOCUMENTED | SECURITY.md, security Rule and Skill | adversarial workflow test |
| MCP profiles | DOCUMENTED | MCP_PROFILES.md, MCP_CATALOG.md | OAuth connection and tool invocation |
| Cursor settings | DOCUMENTED | CURSOR_SETTINGS.md | settings audit on current Cursor build |
| Foundation validator | OPERATIONALLY_VERIFIED | GitHub Actions runs 29137440300 and 29137503159; Windows local verification 002; Rules audit 002 | clean-project execution |
| Environment doctor | OPERATIONALLY_VERIFIED | GitHub Actions run 29137503159; Windows local verification 002; Rules audit 002 | clean-project execution |
| GitHub Actions | OPERATIONALLY_VERIFIED | validation, doctor, and report artifact completed successfully | required branch check configuration |
| Installation guide | DOCUMENTED | INSTALLATION.md | clean-room installation |
| Operational protocol | DOCUMENTED | OPERATIONAL_VERIFICATION.md and ALPHA_ACCEPTANCE_TEST.md | complete remaining Cursor and MCP checks |
| Browser QA | CONFIGURED | browser QA Skill and QA Rule | successful Playwright and DevTools run |
| Public alpha | NOT_READY | no tagged release | complete Cursor behavior, MCP, and clean-install verification |

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

## Verified local Windows foundation

After fixing CRLF handling, Windows npm discovery, and the package test chain, the target local workstation completed:

```text
PASS_FOUNDATION_VALIDATION
PASS_FACTORY_DOCTOR
PASS_LOCAL_FOUNDATION_VERIFICATION_002
```

Environment:

- Windows `win32 x64`
- Node.js `v24.15.0`
- npm `11.12.1`
- Git `2.55.0.windows.1`
- `npm test` exit code `0`
- clean Git working tree after execution

Evidence:

- `docs/verification/LOCAL_FOUNDATION_WINDOWS_001.md`
- `docs/verification/LOCAL_FOUNDATION_WINDOWS_002.md`

This proves local foundation and doctor execution on the target Windows workstation. It does not prove clean-project installation or external MCP operation.

## Verified Rules contract audit

All eight Rules passed the remediated static audit on the target Windows workstation:

```text
PASS_CURSOR_RULES_AUDIT_002
PASS_FOUNDATION_VALIDATION
PASS_FACTORY_DOCTOR
```

The audit confirmed:

- exactly eight Rule files exist
- all frontmatter contracts contain `description`, `globs`, and `alwaysApply`
- only `00-core.mdc` has `alwaysApply: true`
- Reviewer Rule contains explicit globs
- QA Rule contains complete responsibilities, verification sequence, boundaries, browser evidence requirements, and completion evidence
- responsibilities remain separated
- safety and approval boundaries remain intact
- `npm test` exited `0`
- Git working tree remained clean

Evidence:

- `docs/verification/CURSOR_RULES_AUDIT_002.md`

This proves the repository Rule contracts and activation configuration statically.

## Verified native Cursor Rules discovery

Cursor Settings displayed all eight Factory Rules:

```text
00-core
01-architecture
02-builder
03-reviewer
04-qa
05-design
06-security
07-documentation
```

The UI rendered `00-core` as the non-conditional Factory Rule and rendered file-pattern labels for all seven non-core Factory Rules. Additional `context7` and `AGENTS` entries were visible but are not part of the eight Factory Rules.

Evidence:

- `docs/verification/CURSOR_RULES_DISCOVERY_001.md`

Result:

```text
PASS_CURSOR_RULES_DISCOVERY_001
FACTORY_RULES_FOUND: 8/8
```

This proves native Cursor discovery and UI rendering of the configured activation model. It does not yet prove live behavioral enforcement by every Rule.

## Current release decision

The repository is not yet `PUBLIC_ALPHA`.

Completed promotion requirements:

1. [x] foundation validator passes in CI
2. [x] environment doctor passes in CI
3. [x] validation artifact is retained for audit
4. [x] all eight Skills are discovered in the local Cursor UI
5. [x] `product-brief` completes a harmless task end to end through MiMo Code using the synchronized current Skill
6. [x] `npm test` and the environment doctor pass on the target Windows workstation
7. [x] all eight Rules pass the static contract audit and only the core Rule is configured always-on
8. [x] all eight Factory Rules are discovered in native Cursor UI and the activation configuration renders as expected

Remaining promotion requirements:

9. [ ] live Rule behavior is verified through an available Cursor model
10. [ ] native Cursor Agent invocation is verified when an executable plan is available
11. [ ] Core MCP tools are invoked successfully with safe permissions
12. [ ] installation instructions are completed on a clean project
13. [ ] confirm no private Symbioz product data is present through final human review
14. [ ] configure branch protection and require the validation check

## Human-only verification still required

- local Cursor version and settings audit
- live Cursor Rule behavior test
- native Cursor Agent execution when available
- OAuth authorization for account-bound services
- real MCP tool invocation
- browser-driven verification
- clean-project installation
- repository settings for branch protection and Discussions
- founder approval before public release or production access
