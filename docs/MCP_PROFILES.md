# MCP Profiles

Symbioz Cursor Factory does not recommend installing every available MCP server. It defines capability profiles with the smallest practical access surface.

## Governance

Every MCP integration must document:

- official or trusted source
- capability provided
- authentication method
- minimum permissions
- read/write classification
- secret-handling requirements
- harmless health check
- removal or revoke procedure
- known risks
- approval boundaries

Never commit live credentials or publish raw secret-bearing configuration.

## Core profile

For repository work, documentation lookup, and browser verification.

- GitHub: repositories, branches, pull requests, issues, reviews
- Context7: current framework and library documentation
- Playwright: browser flows, forms, screenshots, responsive checks
- Chrome DevTools: console, network, runtime, layout, fonts, performance

## SaaS profile

Adds infrastructure used by the first supported stack.

- Supabase: database, auth, storage, project inspection, logs
- Vercel: projects, previews, deployments, build and runtime logs

Production writes, migrations, promotion, rollback, cancellation, and destructive operations require explicit approval.

## Design profile

Adds design-to-code and component context.

- official Figma integration
- shadcn integration
- Storybook integration when a project has an operational Storybook instance
- Playwright and Chrome DevTools from Core

Figma OAuth and organization permissions must be completed by the account owner. Community forks are not approved by default.

## Production profile

Optional integrations based on the actual product stack.

Examples:

- error monitoring
- product analytics
- feature flags
- logs and traces
- infrastructure provider

Production tools should be read-only by default. Write access must be justified and approval-bound.

## Commerce profile

Optional integrations for products that process payments or transactional communication.

Examples:

- payments and subscriptions
- transactional email
- customer-support systems

Never test with real charges or customer data unless the task explicitly authorizes it.

## Readiness states

- `NOT_CONFIGURED`
- `CONFIGURED`
- `OPERATIONALLY_VERIFIED`
- `RESTRICTED`
- `BLOCKED_OAUTH_REQUIRED`
- `BLOCKED_PERMISSION_REQUIRED`

A server is not operational merely because it appears in a settings list. A harmless real invocation must succeed.