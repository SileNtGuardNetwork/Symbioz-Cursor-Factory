---
name: documentation-sync
description: Synchronize repository documentation with verified implementation changes, decisions, environment variables, limitations, and release status.
---

# Documentation Sync

## Purpose
Keep public and internal documentation aligned with verified repository state.

## Required inputs
- completed task contract
- changed files
- verification results
- affected architecture, setup, security, or user workflows

## Workflow
1. Compare implementation with README, roadmap, architecture, setup, and security docs.
2. Update only documentation affected by verified changes.
3. Record limitations and deferred work explicitly.
4. Update environment examples without adding secret values.
5. Repair stale links and status labels.
6. Avoid documenting behavior that has not been operationally verified.

## Quality gates
- no secret values
- no false readiness claims
- commands match repository scripts
- status terminology follows ROADMAP.md
- links and file paths are current

## Required output
- files updated
- facts synchronized
- deferred documentation
- verification performed
- final documentation status
