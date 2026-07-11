---
name: product-brief
description: Turn a product idea into a bounded, testable product brief before architecture or implementation begins.
metadata:
  maturity: alpha
  category: product
---

# Product Brief

## Purpose

Convert an unstructured product idea, feature request, or business opportunity into a clear brief that another agent can use without guessing the primary user, desired outcome, scope, or acceptance criteria.

## Inputs

- problem or opportunity
- target user
- desired business and user outcome
- known evidence and assumptions
- commercial constraints
- technical constraints
- privacy, security, cost, and operational constraints

## Outputs

- one-sentence product definition
- target user and job to be done
- value proposition
- first valuable vertical slice
- in-scope capabilities
- explicit non-goals
- end-to-end user journey
- core entities and integrations
- assumptions and risks
- acceptance criteria
- unresolved decisions
- recommended next Skill

## Workflow

1. Separate verified facts from assumptions.
2. Define the primary user and the problem being solved.
3. Define the smallest valuable end-to-end result.
4. Map the user journey from entry point to observable outcome.
5. List in-scope capabilities and explicit non-goals.
6. Identify data, privacy, security, cost, integration, and operational constraints.
7. Define measurable acceptance criteria and success signals.
8. Identify decisions that require owner approval.
9. Recommend whether the next step is research, architecture, prototyping, or rejection.

## Approval boundaries

Human approval is required for:

- pricing or commercial commitments
- paid providers or new external services
- handling real customer data
- regulated or high-risk use cases
- materially expanding scope beyond the first vertical slice
- public claims about market demand or product readiness

## Stop conditions

Stop with `BLOCKED_PRODUCT_BRIEF` when:

- the primary user cannot be identified
- the desired outcome is contradictory or not measurable
- critical business constraints are missing
- the request depends on invented evidence
- the smallest valuable slice cannot be bounded

## Completion evidence

Return:

- the complete brief
- a facts-versus-assumptions table
- explicit acceptance criteria
- explicit non-goals
- unresolved approvals
- final status: `PASS_PRODUCT_BRIEF` or `BLOCKED_PRODUCT_BRIEF`
