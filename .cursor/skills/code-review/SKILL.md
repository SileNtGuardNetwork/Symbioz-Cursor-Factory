---
name: code-review
description: Review an implementation against its task contract, architecture, quality gates, and repository conventions without modifying production code.
metadata:
  maturity: alpha
  category: quality
---

# Code Review

## Purpose

Produce an independent, evidence-based review of a completed implementation without silently switching into implementation mode.

## Inputs

- task target and approved scope
- changed files or diff
- relevant architecture and repository rules
- verification commands and results
- known risks and assumptions

## Outputs

- reviewed scope
- findings by severity
- affected files and evidence
- scope-drift assessment
- verification assessment
- unresolved risks
- final review verdict

## Workflow

1. Read the task contract and relevant architecture before reviewing the diff.
2. Confirm that changed files match the approved scope.
3. Check correctness, edge cases, error handling, data flow, and interface contracts.
4. Check consistency with repository conventions and existing patterns.
5. Check whether tests and verification cover the changed behavior.
6. Check for security, privacy, secret, migration, and operational risks.
7. Separate blockers from improvements and stylistic preferences.
8. Do not modify production code unless explicitly switched to an implementation task.

## Approval boundaries

Human approval is required before:

- accepting known blocker or high-severity risk
- approving unverified production behavior
- accepting scope expansion
- accepting breaking API, schema, provider, or deployment changes
- merging or releasing the reviewed change

## Stop conditions

Stop when:

- the task contract or diff is unavailable
- verification evidence is missing for material behavior
- the review requires access to secrets or real customer data
- changed behavior cannot be mapped to the approved scope
- architecture is too ambiguous to assess correctness

## Completion evidence

Return:

- findings grouped as blocker, high, medium, low, or note
- file and line references where available
- verification gaps
- scope-drift result
- residual risks
- final status: `PASS_CODE_REVIEW`, `PASS_CODE_REVIEW_WITH_RISKS`, `FAIL_CODE_REVIEW`, or `BLOCKED_CODE_REVIEW`
