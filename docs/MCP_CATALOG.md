# MCP Catalog

This catalog defines the initial supported tool coverage for SaaS development. Inclusion means the tool has a clear use case. It does not mean every project should enable it.

## Core

### GitHub
Purpose: repository inspection, issues, pull requests, reviews, and controlled repository changes.

Default posture: read access first. Write operations require explicit task scope.

### Context7
Purpose: current library and framework documentation.

Default posture: read-only documentation retrieval.

### Playwright
Purpose: browser automation, critical-path checks, screenshots, responsive verification, and regression tests.

Default posture: local or preview environments. Production interaction requires explicit approval.

### Chrome DevTools
Purpose: console, network, performance, layout, and runtime diagnostics.

Default posture: diagnostic use only.

## SaaS

### Supabase
Purpose: PostgreSQL, Auth, Storage, logs, and project configuration.

Default posture: development project first. Production schema changes and data access require approval.

### Vercel
Purpose: previews, deployments, build logs, runtime logs, and project configuration.

Default posture: preview inspection. Production deployment requires approval.

## Design

### Figma
Purpose: design context, frames, components, variables, and implementation references.

Default posture: read-only unless a design-editing workflow is explicitly approved.

### shadcn/ui
Purpose: component discovery and installation from trusted registries.

Default posture: inspect before install. Added dependencies must be reviewed.

## Optional production services

- Sentry for error monitoring
- PostHog for product analytics and feature flags
- Stripe for billing
- Resend for transactional email
- Linear for issue management
- Notion for documentation

These are not part of the mandatory baseline.

## Admission checklist

Before adding any MCP or plugin, document:

1. exact use case;
2. official source and maintainer;
3. authentication method;
4. requested permissions;
5. data exposed to the tool;
6. read/write classification;
7. destructive operations;
8. secret storage method;
9. health check;
10. removal procedure;
11. operational verification result.

A configured tool is not considered operationally verified until a real, bounded test succeeds.
