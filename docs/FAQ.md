# Frequently Asked Questions

## What is Symbioz Cursor Factory?

An open-source, Cursor-first operating system for structured SaaS product development. It combines Rules, Agent Skills, MCP selection guidance, approval boundaries, quality gates, and documentation contracts.

## Is it a SaaS boilerplate?

Not primarily. A reusable SaaS template may be included, but the core product is the development operating system around planning, architecture, implementation, verification, browser QA, and release preparation.

## Does it build any product automatically?

No. It improves structure and repeatability, but it does not replace product judgment, engineering review, security review, testing, or owner approval.

## Does it require Cursor?

The primary experience targets Cursor. Some Skills and documentation use portable open formats, but operational verification is performed in Cursor first.

## Are all MCP servers installed by default?

No. MCP access is profile-based and follows least privilege. Users should connect only the tools required by the current project and task.

## Which stack is supported first?

The first verified path targets Cursor, GitHub, Next.js, TypeScript, Supabase or PostgreSQL, Vercel, Figma, shadcn/ui, Playwright, and Chrome DevTools.

## Can I use another database or cloud provider?

Yes, but support is not considered verified until the workflow is tested and documented for that provider.

## Why are production actions not autonomous?

Production deployments, database migrations, paid-service changes, secrets, and destructive operations can cause irreversible damage. They require explicit human approval.

## How do I install the current alpha?

Follow [INSTALLATION.md](INSTALLATION.md). The alpha uses a documented manual setup while the installer and environment doctor are still being developed.

## How do I report a bug?

Use the bug report form. Include a minimal reproduction and redacted evidence. Never publish credentials, private source code, or customer data.

## Can I contribute a new Skill or MCP profile?

Yes, after the relevant contracts stabilize. Contributions must define the problem, scope, permissions, approval boundaries, verification, and evidence from a real use case.

## Is this project affiliated with Cursor?

No. Symbioz Cursor Factory is an independent open-source project and is not affiliated with or endorsed by Cursor or Anysphere.
