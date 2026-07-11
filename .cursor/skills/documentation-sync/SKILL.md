---
name: documentation-sync
description: Synchronize repository documentation with verified implementation changes, decisions, environment variables, limitations, and release status.
metadata:
  maturity: alpha
  category: documentation
---

# Documentation Sync

## Purpose

Keep public and internal documentation aligned with verified repository state without documenting unproven behavior or exposing secrets.

## Inputs

- completed task contract
- changed files or diff
- verification results
- affected architecture, setup, security, or user workflows
- current readiness status

## Outputs

- documentation files updated
- facts synchronized
- limitations recorded
- deferred documentation
- repaired links or commands
- final documentation status

## Workflow

1. Compare implementation with README, roadmap, architecture, setup, security, and release docs.
2. Update only documentation affected by verified changes.
3. Record limitations and deferred work explicitly.
4. Update environment examples without adding secret values.
5. Repair stale links, commands, file paths, and status labels.
6. Keep readiness terminology aligned with ROADMAP.md and STATUS.md.
7. Avoid claiming operational verification when only configuration exists.
8. Run available link and repository validation checks.

## Approval boundaries

Human approval is required before:

- changing product positioning or public promises
- publishing pricing, legal, compliance, or security claims
- marking a release as public-ready
- documenting private customer or internal infrastructure details
- removing material warnings or limitations

## Stop conditions

Stop when:

- implementation status is unclear
- verification evidence conflicts with documentation
- required facts would expose secrets or private data
- a public claim requires owner approval
- referenced behavior has not been implemented or verified

## Completion evidence

Return:

- exact documentation files changed
- facts added, changed, or removed
- validation performed
- unresolved documentation gaps
- final status: `PASS_DOCUMENTATION_SYNC`, `PASS_DOCUMENTATION_SYNC_WITH_GAPS`, or `BLOCKED_DOCUMENTATION_SYNC`
