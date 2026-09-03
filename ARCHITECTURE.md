# Architecture

## Purpose

This document defines the architecture of Symbioz Cursor Factory itself. It does not prescribe one universal application architecture for every product.

The Factory is a versioned set of development contracts that can be added to compatible repositories and used by Cursor to guide product planning, engineering, design, QA, security review, documentation, and release preparation.

## Architecture layers

```text
Product intent
  -> Rules
  -> Skills
  -> Tool access through approved MCP profiles
  -> Repository changes
  -> Automated and browser verification
  -> Evidence report
  -> Human approval where required
```

### 1. Rules

Location: `.cursor/rules/`

Rules define persistent repository standards:

- core task discipline
- architecture boundaries
- implementation behavior
- independent review
- QA expectations
- design standards
- security controls
- documentation integrity

Only the core Rule may be always-on. Specialist Rules should activate by task or file scope to avoid excessive context and conflicting instructions.

### 2. Agent Skills

Location: `.cursor/skills/<skill-name>/SKILL.md`

Skills define reusable workflows. Every Skill must include:

- Purpose
- Inputs
- Outputs
- Workflow
- Approval boundaries
- Stop conditions
- Completion evidence

A Skill is guidance and workflow orchestration. It is not a security boundary by itself.

### 3. Enforcement and evidence

Technical enforcement must come from repository and platform controls:

- least-privilege MCP scopes
- GitHub branch protection
- required checks
- hooks or command controls where supported
- secret scanning
- validation scripts
- test, lint, typecheck, and build commands
- browser evidence
- explicit release approvals

The evidence layer records what actually ran and what passed.

### 4. MCP profiles

MCP integrations are grouped by capability rather than installed indiscriminately.

Initial profiles:

- Core: GitHub, documentation context, browser tools
- SaaS: database and deployment providers
- Design: Figma, shadcn/ui, browser verification
- Production: monitoring, analytics, security tools
- Commerce: payments and transactional email

Every MCP addition requires a documented use case, official source, permission model, secret-handling method, health check, removal path, and risk note.

### 5. Validation

`scripts/validate-foundation.mjs` checks the public repository contract:

- required files exist
- Skills use the required structure
- Skill names are unique
- Rules have frontmatter
- only the core Rule is always-on
- local Markdown links resolve
- known secret patterns are absent
- GitHub Actions uses minimum permissions

Validation proves repository consistency. It does not prove that Cursor or an MCP integration works locally.

## Supported repository model

The first release assumes a Git repository with:

- a documented product or task contract
- explicit scripts for relevant quality gates
- a branch-based workflow
- no secrets committed to version control
- human approval for production and destructive actions

The first reference stack is Node.js, TypeScript, Next.js, PostgreSQL or Supabase, and Vercel. The Rules and Skills should remain portable where possible, but portability must be tested rather than assumed.

## Trust boundaries

### Agent may usually perform

- read repository files relevant to the task
- search code and documentation
- propose bounded plans
- modify files inside approved scope
- run non-destructive local checks
- produce evidence and reports

### Explicit task scope required

- production code changes
- new files or packages
- database schema changes
- external integration changes
- MCP configuration changes
- public documentation changes

### Human approval required

- dependency additions with material impact
- provider changes
- production deployment or rollback
- production migrations
- pricing or billing changes
- real customer data exposure
- new paid services or material external cost
- public release and readiness claims
- destructive operations

## Release architecture

```text
working branch
  -> repository validation
  -> implementation checks
  -> review and security findings
  -> browser QA where applicable
  -> documentation sync
  -> release-preparation evidence
  -> human approval
  -> merge or release
```

No Rule or Skill may interpret a green repository validator as permission to deploy.

## Extension model

New Rules, Skills, profiles, and templates should be added only when:

1. a real project demonstrates the need
2. the workflow can be bounded
3. inputs and outputs are explicit
4. permissions and risks are documented
5. completion can be verified
6. the addition does not silently broaden supported stacks

## Current limitations

- native Cursor Rules and Skills discovery has been verified locally
- the foundation environment doctor exists and is operationally verified
- target clean-install validation is now implemented but real clean-room execution remains pending
- MCP invocation through the target Cursor executor remains incomplete
- cross-platform clean-room verification remains incomplete
- public release readiness remains incomplete
