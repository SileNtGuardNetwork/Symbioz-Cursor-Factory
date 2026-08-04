# Public Alpha Acceptance Test

This checklist defines the minimum evidence required before tagging `v0.1.0-alpha`.

## Repository

- [x] public repository exists
- [x] English and Russian README files exist
- [x] product, architecture, agent, security, contribution, and support contracts exist
- [x] eight baseline Rules exist
- [x] eight baseline Skills exist
- [x] foundation validation passes in GitHub Actions
- [ ] branch protection and required validation check are configured

## Local environment

- [x] `npm test` passes on the target local environment
- [x] `npm run doctor` returns `PASS_FACTORY_DOCTOR`
- [x] no secret-bearing MCP configuration is committed
- [x] `.cursorignore` is reviewed for the target project

Evidence:

- Windows workstation verification 002 passed on branch `foundation/universal-core`.
- Node.js: `v24.15.0`
- npm: `11.12.1`
- Git: `2.55.0.windows.1`
- `PASS_FOUNDATION_VALIDATION`
- `PASS_FACTORY_DOCTOR`
- exit code `0`
- clean working tree

## Cursor

- [ ] current Cursor version recorded
- [x] all eight Rules are discoverable
- [x] only the core Rule is always-on
- [x] all eight Skills are discoverable
- [ ] `product-brief` can be invoked successfully by the native Cursor Agent
- [x] `controlled-implementation` completes the harmless test task through MiMo Code
- [ ] agent consistently reports all approval boundaries and does not deploy

External execution evidence:

- MiMo Code successfully executed the synchronized current `product-brief` Skill in verification 003.
- MiMo Code completed controlled implementation 001 with positive verification, a negative Rule-count test, a separately approved commit and push, and successful remote CI.
- These results are retained as external-executor evidence and do not satisfy native Cursor Agent execution.

Evidence:

- `docs/verification/PRODUCT_BRIEF_MIMO_003.md`
- `docs/verification/CURSOR_RULES_DISCOVERY_001.md`
- `docs/verification/CONTROLLED_IMPLEMENTATION_MIMO_001.md`

## MCP

- [ ] GitHub read operation verified through the target Cursor executor
- [ ] documentation-context operation verified
- [ ] browser automation read-only operation verified
- [ ] Chrome DevTools read-only operation verified
- [ ] permission scopes recorded
- [ ] revocation method recorded
- [ ] no production customer data used

Current GitHub MCP limitation:

- Cursor starts the GitHub MCP server and displays its tools.
- MiMo Auto does not currently receive those tools in its session registry.
- Server configuration is not counted as operational invocation evidence.

## Browser QA

- [ ] Playwright critical-path check completed
- [ ] Chrome DevTools console and network inspection completed
- [ ] responsive behavior verified
- [ ] no production environment or customer data used

## Clean installation

- [ ] baseline installation payload copied
- [ ] collision review completed
- [ ] `PASS_FACTORY_INSTALLATION_VALIDATION`
- [ ] Rules and Skills discovered
- [ ] target quality gates recorded separately
- [ ] uninstall/removal path successfully tested

## Real-product proof

- [ ] Factory applied to the private Symbioz SaaS repository
- [ ] one bounded vertical slice implemented
- [ ] automated checks pass
- [ ] browser QA passes
- [ ] preview reviewed by the founder
- [ ] no production deployment occurs without explicit approval

## Public safety

- [ ] final secret scan reviewed
- [ ] final private-product provenance review completed
- [ ] third-party attributions and disclaimer reviewed
- [ ] unsupported stacks and limitations remain visible
- [ ] release notes prepared
- [ ] human owner approved public alpha

## Decision

### Pass

Use only when every required item is complete:

```text
PASS_PUBLIC_ALPHA_ACCEPTANCE
```

### Blocked

List every missing item and use:

```text
BLOCKED_PUBLIC_ALPHA_ACCEPTANCE
```

No partial checklist may be described as a completed public alpha release.
