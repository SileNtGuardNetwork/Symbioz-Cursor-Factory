---
name: architecture
description: Convert an approved product brief into an implementation-ready architecture with explicit boundaries, risks, and verification.
metadata:
  maturity: alpha
  category: engineering
---

# Architecture

## Purpose

Transform an approved product brief or bounded task into an implementation-ready architecture that defines ownership, data flow, interfaces, risk, verification, deployment impact, and stop conditions.

## Inputs

- approved product brief or task contract
- current repository structure
- supported stack and constraints
- existing modules, providers, and conventions
- data, privacy, security, cost, and release boundaries
- expected deployment environment

## Outputs

- architecture summary
- end-to-end flow
- affected packages and paths
- component, service, and data ownership boundaries
- data model impact
- external integration boundaries
- security and privacy notes
- verification plan
- deployment and rollback impact
- rejected alternatives
- ordered implementation sequence
- explicit stop condition

## Workflow

1. Inspect the existing repository before proposing new structure.
2. Map the vertical slice from user action to persisted result and observable outcome.
3. Define components, packages, interfaces, adapters, and data ownership.
4. Reuse existing patterns and reject speculative abstractions.
5. Classify decisions by reversibility, cost, and operational risk.
6. Define tests, browser verification, observability, migration, and rollback needs.
7. Identify human approvals and external blockers.
8. Break implementation into small, independently verifiable tasks.

## Approval boundaries

Human approval is required for:

- adding packages or major dependencies
- changing database schema or migration strategy
- selecting or replacing external providers
- introducing paid infrastructure
- exposing customer data to external systems
- changing production deployment or rollback strategy

## Stop conditions

Stop with `BLOCKED_ARCHITECTURE` when:

- the brief is not sufficiently bounded
- repository ownership or data flow cannot be determined
- a critical provider or platform decision is unapproved
- migration or rollback risk is unknown
- implementation would require speculative platform work outside scope

## Completion evidence

Return:

- the complete architecture
- file and package impact map
- end-to-end data flow
- verification matrix
- risk and approval list
- implementation sequence
- final status: `PASS_ARCHITECTURE` or `BLOCKED_ARCHITECTURE`
