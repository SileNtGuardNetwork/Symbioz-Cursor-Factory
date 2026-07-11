# Security Policy

## Supported versions

Symbioz Cursor Factory is currently in early alpha. Security fixes are applied to the latest published release and the default branch.

## Reporting a vulnerability

Do not open a public issue for a vulnerability that could expose credentials, customer data, production systems, or destructive execution paths.

Use GitHub private vulnerability reporting when it is enabled for this repository. Until then, contact the repository owner privately through the verified contact method published on the owner profile.

Include:

- affected version or commit
- affected file or workflow
- reproduction steps using synthetic data
- realistic impact
- suggested mitigation if known

Do not include real credentials or customer data in a report.

## Secret handling

Never commit or publish:

- API keys
- access or refresh tokens
- OAuth client secrets
- cookies or session values
- authorization headers
- database connection strings
- service-role credentials
- private keys
- raw `.env` files
- raw MCP configuration containing secrets

Examples and templates must use placeholders such as:

```text
[REDACTED]
${ENVIRONMENT_VARIABLE}
```

## MCP and external tools

Every MCP server, Cursor plugin, extension, or external service included in this project must document:

- official source or maintainer
- intended use
- required permissions
- read and write capabilities
- authentication method
- secret storage method
- health-check procedure
- removal procedure
- destructive or production-impacting actions

Default policy:

- use minimum necessary permissions
- prefer official integrations
- keep production write access disabled unless explicitly needed
- require human approval for destructive actions, production changes, database migrations, billing changes, and external cost
- never expose private customer data to an unapproved tool

## AI agent boundary

Rules and Skills guide model behavior but are not treated as a complete security boundary. Sensitive controls must be reinforced through permissions, hooks, branch protection, CI checks, provider scopes, and human approval.

## Safe verification

Security and QA examples must use synthetic data. Logs, screenshots, diffs, and reports must redact secret-like values.

## Disclaimer

No configuration can guarantee the security of every project. Users remain responsible for reviewing permissions, code changes, infrastructure, dependencies, data handling, and production releases.
