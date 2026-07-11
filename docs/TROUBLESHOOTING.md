# Troubleshooting

## Cursor does not discover the Rules

1. Confirm the project is opened at the repository root.
2. Confirm Rule files are located in `.cursor/rules/` and use the `.mdc` extension.
3. Reload the Cursor window.
4. Start a new Agent conversation after reloading.
5. Confirm only the core Rule is always applied; specialist Rules should activate by task or file scope.

## Cursor does not discover a Skill

1. Confirm the path is `.cursor/skills/<skill-name>/SKILL.md`.
2. Confirm the file starts with YAML frontmatter.
3. Confirm `name` and `description` are present.
4. Run `npm test` to validate the repository contracts.
5. Reload Cursor and start a new conversation.

## `npm test` fails with `MISSING`

A required public contract is absent. Restore the named file or update the validator only when the product contract intentionally changes.

## `npm test` fails with `SECRET_PATTERN`

Stop immediately. Remove the credential-like value from the repository and rotate the credential if it was real. Do not weaken the validator to make the failure disappear.

## An MCP tool is visible but does not work

1. Confirm the MCP or plugin source is official or approved.
2. Confirm authentication completed successfully.
3. Confirm the required scopes are granted and no broader scopes are enabled.
4. Confirm required environment variables exist locally and are not committed.
5. Run a harmless read-only health check before any write action.
6. Remove and reconnect the integration when authentication state is stale.

## Browser QA cannot open the application

1. Confirm the development server is running.
2. Confirm the local URL and port.
3. Check the application console and terminal output.
4. Confirm authentication or seed data is not blocking the route.
5. Use synthetic data only.

## A build passes but the interface is visually broken

A successful build is not visual proof. Run the browser QA Skill across the required breakpoints and states, capture evidence, and compare the result with the approved design contract.

## A Skill wants to deploy or migrate automatically

Stop. Production deployment, production migration, paid-service changes, destructive actions, and customer-data exposure require explicit owner approval.

## GitHub Actions does not start

1. Confirm Actions are enabled for the repository.
2. Confirm the workflow exists under `.github/workflows/` on the pushed branch.
3. Confirm the branch pattern in the workflow matches the branch.
4. Check repository Actions permissions.
5. Push a harmless documentation change after permissions are corrected.

## The workflow works in one SaaS but not another

Check project-specific assumptions: package manager, scripts, framework, database, environment variables, route conventions, and deployment provider. The Factory must not claim support until the second environment is verified and documented.

## I cannot resolve the problem

Open a bug report with the smallest reproduction, environment versions, and redacted evidence. Do not attach `.env`, raw MCP configuration, private repositories, or customer data.
