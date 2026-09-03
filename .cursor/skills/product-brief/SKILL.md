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
- facts-versus-assumptions table
- risks
- acceptance criteria
- unresolved decisions and approvals
- recommended next Skill
- one final status

## Workflow

1. Separate user-provided facts from assumptions and proposed decisions.
2. Never promote an assumption, provider, technology, integration, limit, workflow, authentication method, pricing model, or AI capability into an approved fact unless the input explicitly supports it.
3. Define the primary user and the problem being solved.
4. Define the smallest valuable end-to-end result.
5. Map the user journey from entry point to observable outcome.
6. List in-scope capabilities and explicit non-goals.
7. Identify data, privacy, security, cost, integration, and operational constraints.
8. Define measurable acceptance criteria and success signals.
9. Identify decisions that require owner approval.
10. Recommend whether the next step is research, architecture, prototyping, or rejection.
11. Return exactly one complete brief. Do not repeat, mirror, or append a second copy of the output.

## Approval boundaries

Human approval is required for:

- pricing or commercial commitments
- paid providers or new external services
- handling real customer data
- regulated or high-risk use cases
- materially expanding scope beyond the first vertical slice
- public claims about market demand or product readiness
- selecting an authentication method, database, hosting provider, analytics provider, payment provider, or AI provider when the input did not already approve it
- turning optional AI assistance into a mandatory product dependency

## Stop conditions

Stop with `BLOCKED_PRODUCT_BRIEF` when:

- the primary user cannot be identified
- the desired outcome is contradictory or not measurable
- critical business constraints are missing
- the request depends on invented evidence
- the smallest valuable slice cannot be bounded

If the brief can still be bounded without a missing decision, keep the item under unresolved decisions instead of inventing an answer.

## Completion evidence

Return:

- exactly one complete brief
- a facts-versus-assumptions table
- explicit acceptance criteria
- explicit non-goals
- unresolved decisions and approvals
- no duplicated sections or repeated full brief
- no unapproved provider or architecture decisions presented as facts
- final status: `PASS_PRODUCT_BRIEF` or `BLOCKED_PRODUCT_BRIEF`
