# Release Checklist

Use this checklist before publishing any alpha, beta, release candidate, or stable version.

## Scope and status

- [ ] Release scope is written and frozen.
- [ ] Release status is honest: configured, operationally verified, public alpha, public beta, or public release ready.
- [ ] Unsupported stacks and unverified integrations are explicitly excluded.
- [ ] Breaking changes are documented.

## Repository integrity

- [ ] `npm test` passes on the release commit.
- [ ] GitHub Actions pass.
- [ ] Required Rules and Skills are present.
- [ ] Skill names are unique and frontmatter is valid.
- [ ] Local documentation links resolve.
- [ ] No generated junk, private files, or unrelated product code is included.

## Security

- [ ] Secret scan passes.
- [ ] No `.env`, raw credentials, cookies, access tokens, refresh tokens, or private MCP configuration is committed.
- [ ] All new integrations have documented scopes and removal steps.
- [ ] Destructive and production actions require explicit approval.
- [ ] Security reporting instructions are current.

## Installation and operation

- [ ] Installation was tested from a clean clone.
- [ ] Cursor discovers the Rules.
- [ ] Cursor discovers the Skills.
- [ ] At least one harmless end-to-end workflow was executed.
- [ ] Required MCP tools completed read-only health checks.
- [ ] Uninstall or rollback instructions are documented where applicable.

## Evidence

- [ ] Validation output is recorded.
- [ ] Browser QA evidence exists for UI-related workflows.
- [ ] At least one real SaaS repository was used for alpha.
- [ ] At least two independent SaaS repositories were used for beta.
- [ ] Known limitations are published.

## Documentation

- [ ] README and README.ru.md match current behavior.
- [ ] Installation, FAQ, troubleshooting, MCP catalog, and roadmap are current.
- [ ] Changelog or release notes describe user-visible changes.
- [ ] Links and examples do not expose private information.

## Distribution

- [ ] Version and Git tag match.
- [ ] Release title and notes are prepared.
- [ ] Social preview, screenshots, or demo assets are current.
- [ ] Launch content does not make unsupported claims.
- [ ] Feedback channel is available.

## Final approval

- [ ] Founder approves public publication.
- [ ] Any production, marketplace, paid-service, or external-account action has explicit approval.
- [ ] Rollback or release withdrawal path is known.
