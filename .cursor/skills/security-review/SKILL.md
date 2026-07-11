---
name: security-review
description: Review authentication, authorization, data handling, secrets, dependencies, external integrations, and deployment risks without exposing sensitive values.
---

# Security Review

## Purpose
Identify security risks in changed code and configuration before release.

## Required inputs
- changed files or diff
- data-flow summary
- authentication and authorization model
- external services and permissions
- deployment target

## Workflow
1. Map trust boundaries and sensitive data paths.
2. Check authentication, authorization, validation, and error handling.
3. Check server/client separation and credential exposure.
4. Check dependency and integration risk.
5. Check logs, screenshots, examples, and docs for secret leakage.
6. Classify findings as blocker, high, medium, or low.
7. State what requires human approval.

## Prohibited actions
- Never print or request raw secrets.
- Never run destructive security tests against production.
- Never change production configuration while reviewing.
- Never claim security is guaranteed.

## Required output
- reviewed scope
- trust boundaries
- findings by severity
- evidence and affected paths
- recommended remediation
- residual risks
- verdict: PASS, PASS_WITH_RISKS, or FAIL
