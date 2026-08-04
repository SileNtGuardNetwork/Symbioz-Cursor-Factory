---
name: security-review
description: Review authentication, authorization, data handling, secrets, dependencies, external integrations, and deployment risks without exposing sensitive values.
metadata:
  maturity: alpha
  category: security
---

# Security Review

## Purpose

Identify security risks in changed code, configuration, workflows, and external integrations before release without exposing sensitive values or claiming absolute safety.

## Inputs

- changed files or diff
- data-flow summary
- authentication and authorization model
- external services and permission scopes
- deployment target
- known sensitive data classes
- relevant threat assumptions

## Outputs

- reviewed scope
- trust-boundary map
- findings by severity
- affected paths and evidence
- recommended remediation
- residual risks
- required approvals
- final security verdict

## Workflow

1. Map trust boundaries and sensitive data paths.
2. Check authentication, authorization, validation, and error handling.
3. Check server and client separation and credential exposure.
4. Check logs, screenshots, examples, and docs for secret leakage.
5. Check dependency, supply-chain, webhook, and integration risks.
6. Check least-privilege configuration and destructive tool access.
7. Classify findings as blocker, high, medium, low, or informational.
8. State limitations and what was not tested.

## Approval boundaries

Human approval is required before:

- accepting blocker or high-severity findings
- exposing customer data to an external service
- granting write or admin scopes to tools
- changing authentication or authorization behavior
- running intrusive tests against production
- releasing with unresolved material risk

## Stop conditions

Stop when:

- review requires raw secrets or credentials
- the data flow or authorization model is unknown
- production testing would be destructive or unapproved
- required scope or diff is unavailable
- a likely active credential leak is found

## Completion evidence

Return:

- trust boundaries
- findings with severity and affected paths
- verification performed
- untested areas
- residual risks and approvals
- final status: `PASS_SECURITY_REVIEW`, `PASS_SECURITY_REVIEW_WITH_RISKS`, `FAIL_SECURITY_REVIEW`, or `BLOCKED_SECURITY_REVIEW`
