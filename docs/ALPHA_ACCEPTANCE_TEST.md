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
- [ ] all eight Rules are discoverable
- [ ] only the core Rule is always-on
- [x] all eight Skills are discoverable
- [ ] `product-brief` can be invoked successfully by the native Cursor Agent
- [ ] `controlled-implementation` completes the harmless test task
- [ ] agent reports approval boundaries and does not deploy

External execution evidence:

- MiMo Code successfully executed the synchronized current `product-brief` Skill in verification 003.
- This is retained as external-executor evidence and does not satisfy the native Cursor Agent item above.

## MCP

- [ ] GitHub read operation verified
- [ ] documentation-context operation verified
- [ ] browser automation read-only operation verified
- [ ] Chrome DevTools read-only operation verified
- [ ] permission scopes recorded
- [ ] revocation method recorded
- [ ] no production customer data used

## Clean installation

- [ ] Factory added to a clean compatible project
- [ ] existing files not overwritten without review
- [ ] validation passes after installation
- [ ] Rules and Skills discovered after installation
- [ ] uninstall or removal path tested

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
