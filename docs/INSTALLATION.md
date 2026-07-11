# Installation

Symbioz Cursor Factory is currently an early alpha. Installation is manual and should be tested in a non-production repository first.

## Compatible target repository prerequisites

A compatible target repository must have:

- Git repository initialized
- Node.js 20 or newer
- target-specific `AGENTS.md` (defines how agents work in this repository)
- target-specific `PRODUCT.md` (defines the product being built)
- target-specific `ARCHITECTURE.md` (defines system architecture)
- target-specific `SECURITY.md` (defines security requirements)
- explicit project quality gates where applicable (test, lint, typecheck, build commands)
- no committed secrets or credentials

## Alpha installation payload

The following files are installed from the Factory into the target repository:

- all eight baseline Rules in `.cursor/rules/`
- all eight baseline Skills in `.cursor/skills/`
- `install/manifest.json` copied to `.symbioz/manifest.json`
- `install/validate-installation.mjs` copied to `.symbioz/validate-installation.mjs`

## Mandatory collision preflight

Before copying any file:

1. inspect every destination path
2. never overwrite an existing file silently
3. stop and review or merge when a path already exists
4. do not replace target product documentation with Factory repository documentation

## Manual installation

1. Copy the eight baseline Rules into `.cursor/rules/` in the target repository.
2. Copy the eight baseline Skills into `.cursor/skills/` in the target repository.
3. Copy `install/manifest.json` to `.symbioz/manifest.json` in the target repository.
4. Copy `install/validate-installation.mjs` to `.symbioz/validate-installation.mjs` in the target repository.
5. Review every Rule and Skill against the target project's stack and risk model.
6. Do not copy secret-bearing MCP configuration.
7. Configure only the MCP profiles required by the project.
8. Run the Factory installation validator:

```bash
node .symbioz/validate-installation.mjs
```

9. Run the target project's own test, lint, typecheck, and build commands when defined. Do not describe target `npm test` as Factory validation.
10. Open the repository in Cursor and verify that Rules and Skills are discovered.
11. Run one harmless test workflow before allowing write access to external services.

## Cursor discovery verification

After installation, verify in Cursor:

1. `.cursor/rules/00-core.mdc` is discoverable and applies to tasks
2. All eight Rules are present in the Rules panel
3. All eight Skills are available for invocation
4. The core Rule is always-on, specialist Rules activate by task scope
5. Skills can be invoked and produce expected output structure

## Recommended first test

Use the `product-brief` Skill on a non-sensitive sample product. Confirm that:

- the Skill is discoverable;
- it asks for missing inputs instead of inventing facts;
- it produces the required output structure;
- it performs no external write action.

## Manual uninstall

To remove the Factory from a target repository:

1. Remove only files listed as Factory-managed in `.symbioz/manifest.json`:
   - all eight Rules from `.cursor/rules/`
   - all eight Skills from `.cursor/skills/`
2. Remove `.symbioz/manifest.json`
3. Remove `.symbioz/validate-installation.mjs`
4. Do not delete target-owned contracts (`AGENTS.md`, `PRODUCT.md`, `ARCHITECTURE.md`, `SECURITY.md`)
5. Inspect `git diff` and `git status` after removal
6. Manually revert only reviewed merged sections if Factory guidance was merged into an existing file

## Production warning

Do not grant automatic production deployment, database migration, billing, or destructive repository permissions during initial setup. Those actions require explicit human approval.

## Current limitations

- no automatic installer yet;
- no automatic update path yet;
- MCP profiles are documented, not automatically provisioned;
- Windows, macOS, and Linux clean-room verification is not complete;
- Cursor discovery and OAuth flows require local operational testing.
