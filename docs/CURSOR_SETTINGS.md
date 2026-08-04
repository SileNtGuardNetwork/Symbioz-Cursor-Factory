# Cursor Settings Baseline

This document defines the settings areas that must be reviewed before Symbioz Cursor Factory can be considered operational on a local machine.

## Status model

- `DOCUMENTED` — recommendation exists
- `CONFIGURED` — setting is applied locally
- `OPERATIONALLY_VERIFIED` — the expected workflow was executed successfully

## Required review areas

### Account and privacy

- Confirm the active Cursor account and plan.
- Review privacy and data-sharing settings against project requirements.
- Do not expose private repositories or customer data to unapproved external services.

### Models and Agent

- Select models based on task requirements rather than one permanent default.
- Keep approval enabled for sensitive tool calls.
- Avoid autonomous production, database, billing, or destructive actions.

### Rules and Skills

- Confirm project Rules are discovered from `.cursor/rules/`.
- Confirm Skills are discovered from `.cursor/skills/`.
- Only the core governance Rule should be broad and always-on.
- Specialist Rules should activate by task or file scope.

### MCP and plugins

- Install only reviewed official or trusted integrations.
- Use least-privilege credentials and read-only access where practical.
- Keep credentials outside the repository.
- Verify each server with a harmless real invocation before marking it operational.

### Indexing and exclusions

- Ensure source, tests, and architecture documentation are indexed.
- Exclude generated output, dependencies, build artifacts, logs, credentials, large binaries, and private data.
- Keep `.gitignore` and Cursor exclusions aligned where practical.

### Terminal and shell

- Detect the active operating system and shell.
- Use shell-compatible commands.
- Never require users to paste commands containing secrets.
- Treat deployment, migration, package installation, and destructive commands as approval-bound actions.

### Git

- Use branches and pull requests for non-trivial changes.
- Check working tree and current branch before writes.
- Avoid direct production-branch changes unless explicitly approved.
- Never force-push or rewrite history by default.

### Browser verification

- Confirm Playwright or another approved browser tool can open a local route.
- Confirm console and network diagnostics are available.
- Verify screenshots can be produced without exposing sensitive data.

## Local acceptance checklist

- [ ] Rules discovered
- [ ] Skills discovered
- [ ] approved MCP servers visible
- [ ] OAuth connections completed where required
- [ ] one harmless tool invocation succeeds for every required MCP
- [ ] browser route opens
- [ ] console inspection works
- [ ] Git repository can be read safely
- [ ] no secret values are printed
- [ ] production actions still require explicit approval

This guide is a baseline. Exact setting names may change between Cursor versions and must be verified against the installed version.