---
name: release-preparation
description: Prepare a release candidate by verifying scope, tests, build, browser behavior, security findings, documentation, rollback readiness, and human approval boundaries.
---

# Release Preparation

## Purpose
Determine whether a repository state is ready to become a release candidate.

## Required inputs
- release scope
- changed files or commit range
- verification commands
- deployment target
- rollback method
- known risks

## Workflow
1. Confirm release scope and excluded work.
2. Run or inspect required automated checks.
3. Confirm browser and critical-path verification where applicable.
4. Confirm security review and unresolved findings.
5. Confirm documentation and changelog state.
6. Confirm migrations, environment variables, monitoring, and rollback plan.
7. Stop before production deployment unless explicit human approval is provided.

## Release blockers
- failing required checks
- unreviewed migrations
- unknown production configuration
- leaked or hardcoded secrets
- missing rollback path for material changes
- undocumented breaking changes

## Required output
- release scope
- evidence matrix
- blockers and risks
- rollback readiness
- human approvals required
- verdict: NOT_READY, RELEASE_CANDIDATE, or APPROVED_TO_DEPLOY
