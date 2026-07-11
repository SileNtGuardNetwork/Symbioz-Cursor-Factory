---
name: browser-qa
description: Verify a web interface through browser evidence, including runtime errors, network failures, responsive behavior, accessibility basics, and visual defects.
---

# Browser QA

## Required inputs

- target URL or local route
- expected critical user path
- supported viewport matrix
- authentication or synthetic test-data requirements
- approved visual direction when relevant

## Workflow

1. Open the target route with an approved browser tool.
2. Verify the page loads without uncaught runtime errors.
3. Inspect console output and critical network requests.
4. Exercise the critical path, including forms and navigation.
5. Check desktop, tablet, mobile, and narrow-mobile layouts where applicable.
6. Check horizontal overflow, clipping, broken images, missing fonts, and unreadable content.
7. Check keyboard focus, labels, obvious contrast issues, and reduced-motion behavior where applicable.
8. Capture screenshots for material visual findings.
9. Report defects by severity with reproduction steps.

## Prohibited

- Do not use real customer data.
- Do not modify production state while testing.
- Do not dismiss console or network failures without explaining impact.
- Do not approve visual quality without browser evidence.

## Required output

- routes tested
- viewports tested
- critical path result
- console result
- network result
- accessibility observations
- visual defects
- screenshots or evidence references
- final status

## Statuses

- `BLOCKED_BROWSER_UNAVAILABLE`
- `BLOCKED_TEST_DATA_REQUIRED`
- `FAIL_BROWSER_QA`
- `PASS_BROWSER_QA`