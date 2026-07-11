# Operational Verification Protocol

This protocol converts configured repository assets into verified behavior. It must be executed in a real Cursor installation and must not use production credentials or customer data.

## Verification record

Record before starting:

- date and time
- operating system
- Cursor version
- repository commit SHA
- Node.js version
- Git version
- enabled MCP profiles
- tester

## Gate 1: Repository health

Run:

```bash
npm test
npm run doctor
```

Required evidence:

- `PASS_FOUNDATION_VALIDATION`
- `PASS_FACTORY_DOCTOR`
- no secret values in output

Failure status:

```text
BLOCKED_REPOSITORY_HEALTH
```

## Gate 2: Cursor Rule discovery

Open the repository root in Cursor.

Verify:

1. `.cursor/rules/00-core.mdc` is discoverable.
2. The core Rule applies to a harmless repository task.
3. Specialist Rules are present but are not all forced into every task.
4. The agent can state the task contract before changing files.
5. The agent does not claim that configuration equals operational verification.

Harmless test prompt:

```text
Read the repository operating contract. Do not edit anything. Report the target, scope, verification, stop condition, and approval boundary for checking whether README.md links to the installation guide.
```

Required evidence:

- screenshot or copied redacted response
- list of Rules detected by Cursor
- `PASS_RULE_DISCOVERY`

## Gate 3: Skill discovery

Verify that Cursor discovers these Skills:

- product-brief
- architecture
- controlled-implementation
- browser-qa
- code-review
- security-review
- documentation-sync
- release-preparation

Invoke `product-brief` manually or through an unambiguous request.

Safe test request:

```text
Use the product-brief Skill. Create a brief for a local-only demo page that stores no data, uses no external services, and is not intended for deployment. Do not modify files.
```

Required evidence:

- Skill selected
- output includes facts versus assumptions, scope, non-goals, acceptance criteria, approvals, and final status
- `PASS_SKILL_DISCOVERY`

## Gate 4: Harmless end-to-end task

Create a temporary branch or disposable test repository.

Task:

```text
Add a file named FACTORY_TEST.md containing a title and one sentence. Use controlled-implementation, do not add dependencies, do not change any other file, run repository validation, and report evidence. Do not commit, push, merge, release, or deploy.
```

Required evidence:

- only `FACTORY_TEST.md` changed
- validation executed
- completion report uses the defined status language
- no external write operations occurred
- temporary file is removed after evidence is recorded
- `PASS_HARMLESS_E2E`

## Gate 5: Core MCP verification

Connect only the MCP tools needed for the selected profile. Use minimum permissions.

For each tool record:

- official source
- authentication method
- scopes granted
- read or write classification
- test operation
- returned target identity
- removal or revocation method

### GitHub

Safe test:

- read repository metadata
- read one public file
- do not create or modify content

### Documentation context

Safe test:

- retrieve current documentation for one dependency
- confirm source attribution

### Playwright or browser automation

Safe test:

- open a public or local page
- read title and viewport
- do not submit forms

### Chrome DevTools

Safe test:

- inspect console and network for a local or public page
- do not mutate application state

### Supabase and Vercel

These are not required for the first Core-profile pass. When tested, use a disposable development project and read-only operations first.

Required final status:

```text
PASS_CORE_MCP_VERIFICATION
```

or one explicit blocked status per tool.

## Gate 6: Clean-project installation

Use a repository that does not already contain Factory files.

Required clean-install evidence:

- compatible target prerequisites recorded (Git, Node.js 20+, target contracts)
- pre-install git status recorded
- destination collision inventory completed
- exact copied paths recorded
- `PASS_FACTORY_INSTALLATION_VALIDATION`
- validator exit code 0
- Cursor discovery of all eight Rules verified
- Cursor discovery of all eight Skills verified
- target quality gates executed separately when available (test, lint, typecheck, build)
- no credentials introduced
- uninstall completed successfully
- post-uninstall git status and diff reviewed
- `PASS_CLEAN_INSTALL`

Do not require `PASS_FOUNDATION_VALIDATION` or `PASS_FACTORY_DOCTOR` from the target repository.

Required status:

```text
PASS_CLEAN_INSTALL
```

## Gate 7: Final privacy and provenance review

Confirm:

- no private Symbioz SaaS business logic was copied
- no private repository URLs are required for operation
- no credentials, tokens, customer data, or internal hostnames are present
- third-party names are used only for interoperability and documentation
- license and disclaimer are visible

Required status:

```text
PASS_PUBLIC_PROVENANCE_REVIEW
```

## Public alpha decision

Public alpha may be proposed only when all required gates pass:

```text
PASS_FOUNDATION_VALIDATION
PASS_FACTORY_DOCTOR
PASS_RULE_DISCOVERY
PASS_SKILL_DISCOVERY
PASS_HARMLESS_E2E
PASS_CORE_MCP_VERIFICATION
PASS_CLEAN_INSTALL
PASS_PUBLIC_PROVENANCE_REVIEW
```

A human owner must approve the release after reviewing the evidence.
