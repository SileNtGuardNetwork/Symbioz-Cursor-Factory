---
name: controlled-implementation
description: Implement an approved product or engineering task with strict scope, minimal changes, verification, and approval boundaries.
---

# Controlled Implementation

Use this Skill only after the target and approach are clear.

## Required inputs

- target outcome
- approved scope
- relevant architecture or product constraints
- writable paths
- verification commands or checks
- stop condition
- approval boundary

## Workflow

1. Read the relevant files before editing.
2. Restate target, scope, verification, stop condition, and approval boundary.
3. Inspect existing patterns and reuse them where appropriate.
4. Make the smallest complete change that satisfies the target.
5. Do not perform unrelated refactors.
6. Do not add dependencies, change providers, modify production infrastructure, alter database schema, or deploy without explicit approval.
7. Run available tests, typecheck, lint, build, and focused smoke checks.
8. Report changed files, evidence, risks, and remaining work.

## Required output

- outcome
- files changed
- verification performed
- pass/fail status
- assumptions
- risks
- blocked items
- next recommended action

## Failure statuses

- `BLOCKED_SCOPE_UNCLEAR`
- `BLOCKED_APPROVAL_REQUIRED`
- `BLOCKED_VERIFICATION_UNAVAILABLE`
- `FAIL_IMPLEMENTATION`
- `PASS_CONTROLLED_IMPLEMENTATION`

Never claim completion if verification was skipped or failed.