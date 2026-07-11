---
name: release-preparation
description: Prepare a release candidate by verifying scope, tests, build, browser behavior, security findings, documentation, rollback readiness, and human approval boundaries.
metadata:
  maturity: alpha
  category: release
---

# Release Preparation

## Purpose

Determine whether a repository state is ready to become a release candidate without performing an unapproved production deployment.

## Inputs

- release scope
- changed files or commit range
- required verification commands
- deployment target
- rollback method
- migration and environment-variable impact
- known risks and unresolved findings

## Outputs

- release scope
- evidence matrix
- blockers and residual risks
- migration readiness
- monitoring and rollback readiness
- documentation and changelog status
- required human approvals
- final release verdict

## Workflow

1. Confirm the release scope and excluded work.
2. Run or inspect required automated checks.
3. Confirm browser and critical-path verification where applicable.
4. Confirm code review and security review status.
5. Confirm documentation, changelog, and version state.
6. Confirm migrations, environment variables, monitoring, and rollback plan.
7. Confirm no secrets or private data were introduced.
8. Produce a release evidence matrix.
9. Stop before production deployment unless explicit human approval is provided.

## Approval boundaries

Human approval is required before:

- creating a public release
- merging into a protected release branch
- applying production migrations
- changing production environment variables
- incurring external cost
- deploying or rolling back production
- accepting unresolved material risk

## Stop conditions

Stop when:

- required checks fail or are missing
- migrations are unreviewed
- production configuration is unknown
- a secret or private datum may be exposed
- rollback is unavailable for a material change
- breaking changes are undocumented
- browser or critical-path verification is missing where required

## Completion evidence

Return:

- release evidence matrix
- exact checks and results
- blockers and residual risks
- rollback and monitoring readiness
- outstanding approvals
- final status: `RELEASE_CANDIDATE`, `NOT_READY`, `BLOCKED_RELEASE_PREPARATION`, or `APPROVED_TO_DEPLOY` only when explicit human approval exists
