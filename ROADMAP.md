# Roadmap

This roadmap describes the evidence-based path from the current repository foundation to a working Cursor SaaS development operating system and then to a public release.

## Product direction

Symbioz Cursor Factory is not a separate SaaS generator, universal admin panel, or prebuilt module marketplace.

It is a versioned Cursor development operating system that helps a founder and an AI coding agent move from approved product architecture to controlled implementation, verification, preview, and release.

Reusable SaaS code should be extracted from real products only after repeated use proves that it belongs in a shared layer.

## Release model

- `NOT_IMPLEMENTED` — artifact or behavior does not exist
- `DOCUMENTED` — intent is written down but not operational
- `CONFIGURED` — configuration or implementation exists but full execution is not proven
- `OPERATIONALLY_VERIFIED` — the workflow was executed successfully in the stated environment
- `PUBLIC_ALPHA` — useful for early adopters with explicit limitations
- `PUBLIC_BETA` — verified across multiple projects and clean installations
- `PUBLIC_RELEASE_READY` — documented, tested, secure within stated boundaries, and ready for broad distribution

## Phase 0 — Repository foundation

Status: `OPERATIONALLY_VERIFIED_WITH_REMAINING_PUBLIC_METADATA`

- [x] Public repository created
- [x] English and Russian project overview
- [x] License, security, contribution, support, and conduct policies
- [x] Product definition and initial architecture
- [x] Universal agent operating contract
- [x] Eight baseline Cursor Rules
- [x] Eight baseline Agent Skills
- [x] Foundation validator
- [x] Environment doctor
- [x] GitHub Actions validation and retained report artifact
- [x] Windows local foundation verification
- [ ] Repository topics, social preview, and Discussions
- [ ] Final human provenance review for private Symbioz product data

## Phase 1 — Cursor contracts and local behavior

Target: `CURSOR_CONTRACTS_OPERATIONAL`

- [x] All eight Rules pass the static contract audit
- [x] Only `00-core.mdc` is configured always-on
- [x] All eight Rules are discovered in native Cursor UI
- [x] All eight Skills are discovered in Cursor UI
- [x] `product-brief` completes the retained external-executor verification
- [x] Minimal-prompt tests demonstrate key safety and approval behavior
- [ ] Minimal-prompt behavior test demonstrates the complete Core Rule task contract and completion report
- [ ] Current Cursor version and relevant settings are recorded
- [ ] Native Cursor Agent invocation is verified when an executable plan is available

Current limitation: the available local Cursor plan blocks native Agent execution. MiMo Code remains the available executor for operational tests.

## Phase 2 — Core MCP profile

Target: `CORE_MCP_OPERATIONAL`

Core profile:

- GitHub
- documentation context
- Playwright
- Chrome DevTools

Checklist:

- [x] MCP profile and catalog documented
- [x] Minimum-permission and secret-handling policy documented
- [ ] GitHub read operation invoked successfully
- [ ] Documentation-context operation invoked successfully
- [ ] Playwright read-only browser operation invoked successfully
- [ ] Chrome DevTools read-only operation invoked successfully
- [ ] Permission scopes recorded
- [ ] Revocation or removal method recorded
- [ ] No production customer data used during verification

SaaS, Design, Production, and Commerce MCP profiles remain optional until a real product requires them.

## Phase 3 — Working-suit end-to-end dry run

Target: `CURSOR_SAAS_OS_OPERATIONAL`

- [ ] Apply the Factory to a clean compatible repository or an explicitly approved Symbioz test branch
- [ ] Prepare an approved product or feature contract
- [ ] Complete one harmless controlled implementation vertical slice
- [ ] Run the repository quality gates
- [ ] Complete code and security review
- [ ] Complete Playwright and Chrome DevTools browser verification
- [ ] Produce preview evidence without automatic production deployment
- [ ] Synchronize project documentation
- [ ] Complete release-preparation evidence
- [ ] Record the founder approval boundary and rollback plan

This phase is the point at which the personal working suit becomes ready for real SaaS development under supervision.

## Phase 4 — Public alpha

Target: `PUBLIC_ALPHA`

- [ ] Installation succeeds in a clean compatible project
- [ ] Existing target files are not overwritten without review
- [ ] Rules and Skills are discovered after installation
- [ ] Validation passes after installation
- [ ] Removal path is tested
- [ ] Branch protection requires the validation check
- [ ] Final secret and provenance review is complete
- [ ] Unsupported stacks and limitations remain visible
- [ ] Release notes are prepared
- [ ] Founder approves the release
- [ ] Tag `v0.1.0-alpha`

## Phase 5 — Public beta and version 1.0

Target: `PUBLIC_RELEASE_READY`

- [ ] Verify the workflow on at least two independent SaaS repositories
- [ ] Verify clean setup on Windows, macOS, and Linux
- [ ] Add a cross-platform installer only when manual clean installation is stable
- [ ] Add update and uninstall workflows
- [ ] Add screenshots and a short end-to-end demo
- [ ] Collect and resolve external tester feedback
- [ ] Complete release security review
- [ ] Stabilize public documentation
- [ ] Evaluate plugin or marketplace packaging only when platform behavior is stable

## Non-goals for the first release

- building a universal SaaS application or owner panel before a real product requires it
- prebuilding large libraries of hypothetical packages, modules, or templates
- supporting every language, framework, provider, cloud, or database
- installing every available MCP server
- promising autonomous production deployment
- replacing engineering, legal, security, product, or founder judgment
- claiming production readiness without retained evidence
