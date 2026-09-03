# Product Definition

## Product

Symbioz Cursor Factory is an open-source Cursor development operating system for founders and developers who need a controlled way to plan, build, verify, preview, and prepare SaaS products for release.

It packages reusable Cursor Rules, Agent Skills, MCP profiles, quality gates, evidence requirements, and human approval boundaries.

It is not a separate SaaS generator. The product is the configured development environment and operating process itself.

## Operating model

```text
Founder and product architecture
  -> repository product contract
  -> Cursor Rules and Skills
  -> bounded implementation
  -> automated and browser verification
  -> evidence report
  -> founder approval
  -> preview or release
```

Product-specific authentication, billing, AI, analytics, admin, and integration modules are built inside real SaaS repositories when required. Reusable code is extracted only after repeated use proves that a shared implementation is justified.

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
- what evidence is required before preview or release

Without a shared operating model, AI-assisted development becomes inconsistent, difficult to review, and risky around production systems.

## Value proposition

Symbioz Cursor Factory turns Cursor from an unstructured coding assistant into a controlled, evidence-based workflow for shipping digital products under explicit founder supervision.

## First supported outcome

The first verified release should allow a user to:

1. add the Factory foundation to a compatible repository
2. confirm that Cursor discovers the Rules and Skills
3. create a bounded product brief
4. design implementation-ready architecture
5. complete one controlled implementation vertical slice
6. run code, security, and browser QA workflows
7. produce preview evidence without automatic production deployment
8. synchronize documentation
9. prepare a release candidate with explicit evidence and approvals

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
6. Development proceeds through complete vertical slices rather than disconnected layers.
7. Reusable workflows and code are extracted from real products.
8. Configuration is not considered operational until executed successfully.
9. Public documentation must state limitations clearly.

## Non-goals for the first release

- building a separate Factory SaaS, dashboard, or visual constructor
- prebuilding a universal SaaS core, owner panel, billing abstraction, AI workspace, or large component library before a real product requires it
- fully autonomous production deployment
- support for every framework, language, cloud, database, or provider
- installing every available MCP server
- replacing engineering, legal, security, or product judgment
- promising that AI can build any product without supervision
- shipping many templates that have not been tested on real projects
- storing user credentials or proxying paid provider access

## Success criteria for the personal working suit

The working suit is operational when:

- Rules and Skills are discovered in the local Cursor installation
- the available executor follows scope and approval boundaries
- Core MCP tools are invoked with safe permissions
- one controlled implementation vertical slice completes in a real or clean test repository
- automated checks pass
- browser behavior is verified through Playwright and Chrome DevTools
- preview evidence is produced
- documentation is synchronized
- founder approval remains required before production actions

## Success criteria for public alpha

Public alpha additionally requires:

- repository validation passes in CI
- installation succeeds in a clean compatible project
- no target files are overwritten without review
- no secrets or private product data are included
- branch protection requires the validation check
- limitations and unsupported behavior are documented
- the founder approves the public release

## Primary product metric

The primary metric is not GitHub stars alone.

The activation metric is:

> A user installs the Factory, passes validation, invokes the workflow, and produces a verified implementation or release artifact without bypassing approval boundaries.

Supporting metrics include:

- installation success rate
- time to first verified workflow
- Skill completion rate
- validation pass rate
- active repositories
- returning users
- external contributions and reproducible issue reports
