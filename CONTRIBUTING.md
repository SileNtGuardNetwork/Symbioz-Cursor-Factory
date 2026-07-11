# Contributing

Symbioz Cursor Factory is currently in founder-led alpha. Contributions are welcome, but the public contracts are still stabilizing.

## Before contributing

1. Read `README.md`, `ROADMAP.md`, `SECURITY.md`, `AGENTS.md`, and `docs/PRODUCT.md`.
2. Search existing issues and discussions.
3. For structural changes, open an issue before writing code.
4. Never include credentials, private product data, or copied proprietary assets.

## Contribution principles

- solve one clear problem per pull request
- keep changes small and reviewable
- do not silently expand scope
- prefer official documentation and stable interfaces
- do not add an MCP server, dependency, integration, or template without a concrete use case and risk note
- distinguish documentation, configuration, operational verification, and production readiness
- include evidence for claims about compatibility or successful execution

## Required pull request information

Every non-trivial pull request should state:

- **target** — what will exist after the change
- **scope** — exact files and behavior changed
- **verification** — how success was checked
- **stop condition** — what is intentionally not included
- **risk** — security, compatibility, migration, or maintenance impact
- **approval boundary** — any action requiring a maintainer or user decision

## Rules, Skills, and MCP contributions

### Rules

- must be concise and enforce a recurring project standard
- must declare when they apply
- must avoid product-specific assumptions unless placed in an example
- must not claim to enforce permissions that require hooks, CI, or provider controls

### Skills

- must define purpose, trigger, inputs, outputs, tools, writable paths, prohibited actions, quality gates, failure states, and proof of completion
- must be tested through a real invocation before being described as operational

### MCP profiles

- prefer official integrations
- document permissions and risk
- never commit secret-bearing configuration
- provide health-check and removal instructions
- separate read-only and write-enabled use cases

## Documentation

English is the primary repository language. Important onboarding material should also have a Russian version where practical.

Avoid unsupported marketing claims. Use explicit readiness labels such as `DOCUMENTED`, `CONFIGURED`, `OPERATIONALLY_VERIFIED`, `PUBLIC_ALPHA`, and `PUBLIC_BETA`.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
