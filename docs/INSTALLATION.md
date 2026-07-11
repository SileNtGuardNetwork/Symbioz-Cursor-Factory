# Installation

Symbioz Cursor Factory is currently an early alpha. Installation is manual and should be tested in a non-production repository first.

## Requirements

- Cursor
- Git
- Node.js 20 or newer
- a project under version control

## Manual installation

1. Copy `.cursor/rules/` into the target repository.
2. Copy selected folders from `.cursor/skills/` into the target repository.
3. Review every Rule and Skill against the target project's stack and risk model.
4. Do not copy secret-bearing MCP configuration.
5. Configure only the MCP profiles required by the project.
6. Run:

```bash
npm test
```

7. Open the repository in Cursor and verify that Rules and Skills are discovered.
8. Run one harmless test workflow before allowing write access to external services.

## Recommended first test

Use the `product-brief` Skill on a non-sensitive sample product. Confirm that:

- the Skill is discoverable;
- it asks for missing inputs instead of inventing facts;
- it produces the required output structure;
- it performs no external write action.

## Production warning

Do not grant automatic production deployment, database migration, billing, or destructive repository permissions during initial setup. Those actions require explicit human approval.

## Current limitations

- no installer yet;
- no automatic update path yet;
- MCP profiles are documented, not automatically provisioned;
- Windows, macOS, and Linux clean-room verification is not complete;
- Cursor discovery and OAuth flows require local operational testing.
