# Roadmap

This roadmap describes the path from repository foundation to a public, verified release.

## Release model

The project uses evidence-based readiness states:

- `NOT_IMPLEMENTED` — artifact or behavior does not exist
- `DOCUMENTED` — intent is written down but not operational
- `CONFIGURED` — configuration exists but real execution is not yet proven
- `OPERATIONALLY_VERIFIED` — the workflow was executed successfully
- `PUBLIC_ALPHA` — useful for early adopters with explicit limitations
- `PUBLIC_BETA` — installation and core workflows are verified on multiple projects
- `PUBLIC_RELEASE_READY` — documented, tested, secure within stated boundaries, and ready for broad distribution

## Phase 0 — Repository foundation

Status: `IN_PROGRESS`

- [x] Public repository created
- [x] English and Russian project overview
- [x] License
- [x] Security policy
- [x] Contribution policy
- [x] Product definition
- [x] Initial architecture
- [x] Universal agent contract
- [x] Universal core Cursor Rule
- [ ] Repository metadata, topics, social preview, and Discussions

## Phase 1 — Universal core extraction

Target: `UNIVERSAL_CORE_EXTRACTED`

- [ ] Audit reusable assets from the private Symbioz SaaS repository
- [ ] Remove product-specific assumptions
- [ ] Port architecture, builder, reviewer, QA, design, security, and documentation Rules
- [ ] Port safe quality scripts
- [ ] Add validation for Rules and documentation contracts
- [ ] Verify that no secrets or private product data were copied

## Phase 2 — Cursor setup and MCP profiles

Target: `CURSOR_WORKSPACE_OPERATIONAL`

- [ ] Audit the current Cursor settings surface
- [ ] Publish recommended settings with rationale and risk notes
- [ ] Define Core, SaaS, Design, Production, and Commerce profiles
- [ ] Document official source, permissions, OAuth, secrets, health check, and removal for every MCP or plugin
- [ ] Operationally verify the required tools
- [ ] Avoid publishing raw credentials or secret-bearing configuration

Initial required coverage:

- GitHub
- Context7
- Playwright
- Chrome DevTools
- Figma
- shadcn/ui
- Supabase
- Vercel

## Phase 3 — Factory Skills

Target: `CORE_SKILLS_OPERATIONAL`

Initial Skills:

- [ ] product brief
- [ ] architecture
- [ ] implementation plan
- [ ] controlled implementation
- [ ] art direction and UI review
- [ ] code review
- [ ] security review
- [ ] browser QA
- [ ] documentation sync
- [ ] release preparation

Every Skill must define inputs, outputs, allowed tools, approval boundaries, stop conditions, quality gates, and proof of completion.

## Phase 4 — Public alpha

Target: `PUBLIC_ALPHA`

- [ ] Complete installation guide
- [ ] Publish Cursor settings checklist
- [ ] Publish MCP selection guide
- [ ] Add one end-to-end example
- [ ] Test on the Symbioz SaaS repository
- [ ] Publish `v0.1.0-alpha`

## Phase 5 — Public beta

Target: `PUBLIC_BETA`

- [ ] Verify on at least two independent SaaS repositories
- [ ] Run a clean-room installation
- [ ] Add automated repository checks
- [ ] Add troubleshooting and FAQ
- [ ] Add screenshots and short demo
- [ ] Collect and resolve external tester feedback

## Phase 6 — Version 1.0

Target: `PUBLIC_RELEASE_READY`

- [ ] Cross-platform installer or documented no-surprise setup
- [ ] Environment doctor
- [ ] Update and uninstall path
- [ ] Windows, macOS, and Linux verification
- [ ] Cursor plugin packaging where stable and justified
- [ ] Marketplace submission where applicable
- [ ] Release security audit
- [ ] Stable public documentation

## Non-goals for the first release

- supporting every language and framework
- installing every available MCP server
- promising autonomous production deployment
- replacing engineering, legal, security, or product judgment
- shipping many unverified templates
- claiming universal production readiness without evidence
