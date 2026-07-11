---
name: browser-qa
description: Verify a web interface through browser evidence, including runtime errors, network failures, responsive behavior, accessibility basics, and visual defects.
metadata:
  maturity: alpha
  category: quality
---

# Browser QA

## Purpose

Verify a web interface through direct browser evidence rather than code inspection alone.

## Inputs

- target URL or local route
- expected critical user path
- supported viewport matrix
- authentication or synthetic test-data requirements
- approved visual direction when relevant
- known browser or device constraints

## Outputs

- routes tested
- viewports tested
- critical-path result
- console result
- network result
- accessibility observations
- visual defects by severity
- screenshots or evidence references
- final QA status

## Workflow

1. Open the target route with an approved browser tool.
2. Confirm the page loads without uncaught runtime errors.
3. Inspect console output and critical network requests.
4. Exercise the critical path, including forms and navigation.
5. Check desktop, tablet, mobile, and narrow-mobile layouts where applicable.
6. Check horizontal overflow, clipping, broken images, missing fonts, and unreadable content.
7. Check keyboard focus, labels, obvious contrast issues, and reduced-motion behavior where applicable.
8. Capture screenshots for material findings.
9. Report defects with severity and reproduction steps.
10. Re-run the affected path after fixes when requested.

## Approval boundaries

Human approval is required before:

- using real customer accounts or data
- modifying production state
- running destructive tests
- testing paid or rate-limited external services at material cost
- accepting a material visual deviation from approved direction

## Stop conditions

Stop when:

- no approved browser tool is available
- required test data or credentials are missing
- the target environment is unstable or unrelated to the reviewed change
- the test would mutate production state
- a blocker prevents completion of the critical path

## Completion evidence

Return:

- tested routes and viewports
- console and network evidence
- critical-path result
- accessibility and visual findings
- screenshot references
- final status: `PASS_BROWSER_QA`, `FAIL_BROWSER_QA`, `BLOCKED_BROWSER_UNAVAILABLE`, or `BLOCKED_TEST_DATA_REQUIRED`
