---
name: architecture
description: Convert an approved product brief into an implementation-ready architecture with explicit boundaries, risks, and verification.
metadata:
  maturity: alpha
  category: engineering
---

# Architecture

Use only after the product brief or task contract is sufficiently clear.

## Required inputs

- approved brief or task contract
- current repository structure
- supported stack and constraints
- existing modules and providers
- security, data, cost, and release boundaries

## Workflow

1. Inspect the existing repository before proposing new structure.
2. Map the vertical slice from user action to persisted result and observable outcome.
3. Define components, packages, data ownership, API boundaries, and external adapters.
4. Reuse existing patterns and avoid speculative abstractions.
5. Classify decisions by reversibility and risk.
6. Define tests, browser verification, observability, migration, and rollback needs.
7. Record open approvals and blockers.

## Output

- architecture summary
- end-to-end flow
- affected packages and paths
- component and service boundaries
- data model impact
- external integration boundaries
- security and privacy notes
- quality gates
- deployment and rollback impact
- rejected alternatives
- implementation sequence
- explicit stop condition

## Prohibited

- dependency installation
- database migration execution
- production deployment
- secret or credential output
- unapproved provider changes

## Completion proof

Architecture is ready only when implementation can proceed in small tasks without guessing ownership, data flow, verification, or approval boundaries.