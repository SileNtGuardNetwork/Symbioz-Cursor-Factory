---
name: controlled-implementation
description: Implement an approved product or engineering task with strict scope, minimal changes, verification, and approval boundaries.
metadata:
  maturity: alpha
  category: engineering
---

# Controlled Implementation

## Purpose

Implement an approved task without silent scope expansion, unrelated refactoring, unsafe side effects, or unverified completion claims.

## Inputs

- target outcome
- approved scope
- architecture or product constraints
- writable paths
- verification commands or checks
- stop condition
- approval boundaries

## Outputs

- implemented outcome
- files changed
- verification performed
- pass or fail status
- assumptions
- risks
- blocked items
- recommended next action

## Workflow

1. Read the relevant files before editing.
2. Restate target, scope, verification, stop condition, and approval boundaries.
3. Inspect existing patterns and reuse them where appropriate.
4. Make the smallest complete change that satisfies the target.
5. Avoid unrelated refactors and speculative abstractions.
6. Run available tests, typecheck, lint, build, and focused smoke checks.
7. Compare changed files against the approved scope.
8. Report evidence, risks, and remaining work without overstating readiness.

## Approval boundaries

Human approval is required before:

- adding dependencies
- changing database schema
- changing providers or production infrastructure
- using real customer data
- creating external cost
- pushing, merging, releasing, or deploying when not explicitly authorized
- performing destructive actions

## Stop conditions

Stop when:

- scope is unclear
- required approval is missing
- a secret or private datum may be exposed
- verification cannot be performed
- a requested action would affect production outside the approved boundary
- the implementation requires architecture changes not covered by the task

## Completion evidence

Return:

- exact changed-file list
- verification commands and results
- unresolved risks
- blocked approvals
- final status: `PASS_CONTROLLED_IMPLEMENTATION`, `FAIL_IMPLEMENTATION`, `BLOCKED_SCOPE_UNCLEAR`, `BLOCKED_APPROVAL_REQUIRED`, or `BLOCKED_VERIFICATION_UNAVAILABLE`
