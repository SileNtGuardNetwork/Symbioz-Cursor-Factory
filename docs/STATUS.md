# Project Status

Last updated: 2026-07-11

## Readiness model

- `DOCUMENTED`: intent exists in version control
- `CONFIGURED`: configuration or implementation exists
- `OPERATIONALLY_VERIFIED`: executed successfully in a real environment
- `PUBLIC_ALPHA`: useful for early adopters with explicit limitations
- `PUBLIC_BETA`: verified across multiple projects and clean installations
- `PUBLIC_RELEASE_READY`: broadly distributable within documented boundaries

## Source-of-truth hierarchy

1. `docs/verification/*.md` for executed tests and observed evidence
2. this file for the current consolidated status
3. `ROADMAP.md` for future sequence and targets
4. README files for public summary

A roadmap checkbox or configured integration is not proof of operational execution.

## Current matrix

| Area | Status | Evidence | Next proof |
|---|---|---|---|
| Product definition | DOCUMENTED | `PRODUCT.md`, README files | external user comprehension test |
| Architecture | DOCUMENTED | `ARCHITECTURE.md`, `AGENTS.md` | clean-project application |
| Core Rules | CONFIGURED | static audit 002 passed; 8/8 discovered in native Cursor UI; safety boundaries observed through MiMo | complete Core Rule protocol without prompt scaffolding |
| Core Skills | OPERATIONALLY_VERIFIED | 8/8 discovered; `product-brief` verification 003 passed; controlled implementation 001 passed through MiMo | native Cursor Agent execution when available |
| Controlled implementation | OPERATIONALLY_VERIFIED | bounded validator change, positive test, negative test, publication, and remote CI passed | repeat on a real product vertical slice |
| Security boundaries | DOCUMENTED | `SECURITY.md`, security Rule and Skill; dependency/provider boundaries observed | adversarial workflow test |
| MCP profiles | DOCUMENTED | `MCP_PROFILES.md`, `MCP_CATALOG.md` | successful bounded invocation from the target Cursor executor |
| Cursor settings | DOCUMENTED | `CURSOR_SETTINGS.md` | current Cursor build and settings audit |
| Foundation validator | OPERATIONALLY_VERIFIED | Windows verification 002; Rules audit 002; exact Rule-count positive and negative tests; GitHub Actions run `29161089891` | clean-project execution |
| Environment doctor | OPERATIONALLY_VERIFIED | Windows verification 002 and successful CI execution | clean-project execution |
| GitHub Actions | OPERATIONALLY_VERIFIED | latest head run `29161089891` succeeded | required branch check configuration |
| Installation guide | DOCUMENTED | `INSTALLATION.md` | clean-room installation |
| Browser QA | CONFIGURED | browser QA Skill and QA Rule | successful Playwright and Chrome DevTools run |
| Public alpha | NOT_READY | no tagged release | complete MCP, clean-install, provenance, branch protection, and founder approval |

## Verified foundation

The repository foundation and environment checks execute successfully on the target Windows workstation and in GitHub Actions.

Local evidence:

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

Evidence:

- `docs/verification/LOCAL_FOUNDATION_WINDOWS_001.md`
- `docs/verification/LOCAL_FOUNDATION_WINDOWS_002.md`

## Verified Rules and Skills discovery

Cursor displayed all eight Factory Rules and all eight repository Skills.

Rules result:

```text
PASS_CURSOR_RULES_DISCOVERY_001
FACTORY_RULES_FOUND: 8/8
```

Only `00-core.mdc` is configured as always-on. The seven specialist Rules are conditional.

Evidence:

- `docs/verification/CURSOR_RULES_AUDIT_002.md`
- `docs/verification/CURSOR_RULES_DISCOVERY_001.md`

The synchronized `product-brief` Skill also passed external execution through MiMo Code:

```text
PASS_PRODUCT_BRIEF_SKILL_VERIFICATION_003
```

Evidence:

- `docs/verification/PRODUCT_BRIEF_MIMO_001.md`
- `docs/verification/PRODUCT_BRIEF_MIMO_002.md`
- `docs/verification/PRODUCT_BRIEF_MIMO_003.md`

Native Cursor Agent execution remains unverified because the current local Cursor plan does not expose a working native Agent executor.

## Verified controlled implementation

MiMo Code completed a bounded implementation task through the repository workflow:

- changed only `scripts/validate-foundation.mjs`
- added exact enforcement for eight `.mdc` Rule files
- passed `npm test`
- passed `git diff --check`
- passed a negative test with a ninth temporary Rule
- published only after separate explicit approval
- pushed commit `1201d16e734d0fe8da9378a879a997b6b631e0c6`
- remote GitHub Actions run `29161089891` completed successfully

Result:

```text
PASS_CONTROLLED_IMPLEMENTATION_001
PASS_RULE_COUNT_NEGATIVE_TEST_001
PASS_CONTROLLED_IMPLEMENTATION_PUBLISH_001
REMOTE_CI: PASS
```

Evidence:

- `docs/verification/CONTROLLED_IMPLEMENTATION_MIMO_001.md`

This proves controlled implementation through the available MiMo executor. It does not yet prove a full SaaS vertical slice or native Cursor Agent execution.

## Live Rule behavior status

Three minimal-prompt behavior tests produced useful but incomplete evidence.

Confirmed:

- important dependency and provider approval boundaries influenced behavior
- read-only and no-edit restrictions were respected
- most task-contract fields appeared by test 002

Still incomplete:

- source-of-truth selection was inconsistent in test 003
- full Core Rule completion reporting was not consistently automatic
- plan-only requests were initially treated too broadly

Evidence:

- `docs/verification/CURSOR_RULE_BEHAVIOR_MIMO_001.md`
- `docs/verification/CURSOR_RULE_BEHAVIOR_MIMO_002.md`
- `docs/verification/CURSOR_RULE_BEHAVIOR_MIMO_003.md`

## MCP status

Cursor successfully starts the configured GitHub MCP server after Docker Desktop is running and displays its tool catalog. However, MiMo Auto sessions do not currently receive the GitHub MCP tools in their tool registry.

Therefore:

```text
GITHUB MCP SERVER: CONFIGURED
GITHUB MCP TOOL DISCOVERY IN CURSOR: PASS
GITHUB MCP INVOCATION THROUGH MIMO: BLOCKED
```

No MCP read operation is marked operationally verified yet.

## Current release decision

The repository is not yet `PUBLIC_ALPHA`.

Completed promotion requirements:

1. [x] foundation validator passes locally and in CI
2. [x] environment doctor passes locally and in CI
3. [x] validation artifact is retained for audit
4. [x] all eight Skills are discovered in Cursor UI
5. [x] `product-brief` completes a harmless workflow through MiMo Code
6. [x] all eight Rules pass the static contract audit
7. [x] all eight Rules are discovered in native Cursor UI
8. [x] only the core Rule is configured always-on
9. [x] a bounded controlled-implementation task passes positive, negative, publication, and remote CI verification
10. [x] key safety and approval boundaries influence minimal-prompt MiMo behavior

Remaining promotion requirements:

11. [ ] current Cursor version and settings audit recorded
12. [ ] complete Core Rule protocol proven consistently
13. [ ] native Cursor Agent invocation verified when available
14. [ ] Core MCP tools invoked successfully with safe permissions
15. [ ] Playwright and Chrome DevTools browser QA executed successfully
16. [ ] Factory installed into a clean compatible project
17. [ ] one real Symbioz vertical slice completed to preview
18. [ ] final private-product provenance review completed
19. [ ] branch protection requires validation
20. [ ] founder approves public alpha

No partial checklist may be described as a completed public alpha release.
