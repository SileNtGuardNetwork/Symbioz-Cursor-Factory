# Product Definition

## Product

Symbioz Cursor Factory is an open-source operating system for Cursor that helps founders and developers plan, build, verify, and prepare SaaS products for release through reusable Rules, Agent Skills, MCP profiles, quality gates, and documented approval boundaries.

## Primary users

- solo founders building SaaS products with Cursor
- developers who want a repeatable AI-assisted workflow
- small product teams standardizing architecture, implementation, review, QA, and release preparation
- agencies that need a controlled development baseline across client projects

## Core problem

Cursor can write code, but a configured editor alone does not provide a complete product-development system. Users still need to decide:

- what should be built first
- how architecture and data ownership should be defined
- which tools need access and which permissions are safe
- how implementation scope is controlled
- how UI, browser behavior, security, and documentation are verified
- what evidence is required before release

Without a shared operating model, AI-assisted development becomes inconsistent, difficult to review, and risky around production systems.

## Value proposition

Symbioz Cursor Factory turns Cursor from an unstructured coding assistant into a controlled, evidence-based workflow for shipping digital products.

## First supported outcome

The first verified release should allow a user to:

1. add the Factory foundation to a compatible repository
2. confirm that Cursor discovers the Rules and Skills
3. create a bounded product brief
4. design implementation-ready architecture
5. complete one controlled implementation task
6. run code, security, and browser QA workflows
7. synchronize documentation
8. prepare a release candidate with explicit evidence and approvals

## Initial supported stack

- Cursor
- GitHub
- Node.js
- Next.js
- TypeScript
- PostgreSQL or Supabase
- Vercel
- Figma
- shadcn/ui
- Playwright
- Chrome DevTools

The workflow may be useful outside this stack, but unsupported combinations must not be presented as verified.

## Product principles

1. Evidence is stronger than agent claims.
2. Human approval is required for irreversible or high-risk actions.
3. Tools receive minimum necessary permissions.
4. Product intent and architecture precede implementation.
5. Changes remain bounded and independently verifiable.
6. Reusable workflows are extracted from real projects.
7. Configuration is not considered operational until executed successfully.
8. Public documentation must state limitations clearly.

## Non-goals for the first release

- fully autonomous production deployment
- support for every framework, language, cloud, or database
- installing every available MCP server
- replacing engineering, legal, security, or product judgment
- promising that AI can build any product without supervision
- shipping many templates that have not been tested on real projects
- storing user credentials or proxying paid provider access

## Success criteria for public alpha

Public alpha requires:

- repository validation passes in CI
- all documented Rules and Skills are discovered by a current Cursor installation
- at least one harmless workflow completes end to end
- required MCP tools are connected and invoked with safe permissions
- installation succeeds in a clean project
- no secrets or private product data are included
- limitations and unsupported behavior are documented

## Primary product metric

The primary metric is not GitHub stars alone.

The most useful activation metric is:

> A user installs the Factory, passes validation, invokes a workflow, and produces a verified implementation or release artifact.

Supporting metrics include:

- installation success rate
- time to first verified workflow
- Skill completion rate
- validation pass rate
- active repositories
- returning users
- external contributions and reproducible issue reports
