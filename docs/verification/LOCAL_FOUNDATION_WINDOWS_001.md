# Local Foundation Verification on Windows 001

Date: 2026-07-11

Executor: MiMo Code

Environment:

- branch: `foundation/universal-core`
- Node.js: `v24.15.0`
- npm: `11.12.1`
- Git: `2.55.0.windows.1`
- platform: Windows

## Result

Status: `FAIL_WITH_ACTIONABLE_CROSS_PLATFORM_FINDINGS`

The local `npm test` command executed and exposed two repository-level compatibility defects.

## Findings

1. The foundation validator rejected valid Cursor Skill and Rule frontmatter because the local checkout used CRLF line endings while the validator required an exact LF prefix.
2. The environment doctor reported npm as unavailable because it used `execFileSync('npm')`, which does not reliably resolve Windows command shims.
3. `npm test` ran only the foundation validator instead of the complete `verify` chain.
4. Local verification created `.mimocode/` and `validation-report.txt` as untracked artifacts.

## Remediation

The branch was updated to:

- normalize CRLF and CR line endings before validator checks
- execute command discovery through `cmd.exe` on Windows
- make `npm test` run `npm run verify`
- verify validate, doctor, verify, and test scripts in the doctor
- ignore `.mimocode/` and `validation-report.txt`
- add `.gitattributes` with stable line-ending rules

## Evidence boundary

This report records a failed pre-fix Windows run and the identified root causes. It does not claim that the remediation has passed locally. A fresh pull and a second `npm test` run are required.

Final status: `RETEST_REQUIRED_LOCAL_FOUNDATION_WINDOWS`
