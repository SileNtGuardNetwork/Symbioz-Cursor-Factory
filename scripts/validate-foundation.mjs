#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const root = process.cwd()
const failures = []
const reportPath = join(root, 'validation-report.txt')

const requiredFiles = [
  'README.md',
  'README.ru.md',
  'LICENSE',
  'SECURITY.md',
  'CONTRIBUTING.md',
  'ROADMAP.md',
  'PRODUCT.md',
  'ARCHITECTURE.md',
  'AGENTS.md',
  'CHANGELOG.md',
  'SUPPORT.md',
  'CODE_OF_CONDUCT.md',
  'package.json',
  '.gitignore',
  '.gitattributes',
  '.cursorignore',
  '.cursor/rules/00-core.mdc',
  '.cursor/rules/01-architecture.mdc',
  '.cursor/rules/02-builder.mdc',
  '.cursor/rules/03-reviewer.mdc',
  '.cursor/rules/04-qa.mdc',
  '.cursor/rules/05-design.mdc',
  '.cursor/rules/06-security.mdc',
  '.cursor/rules/07-documentation.mdc',
  '.cursor/skills/product-brief/SKILL.md',
  '.cursor/skills/architecture/SKILL.md',
  '.cursor/skills/controlled-implementation/SKILL.md',
  '.cursor/skills/browser-qa/SKILL.md',
  '.cursor/skills/code-review/SKILL.md',
  '.cursor/skills/security-review/SKILL.md',
  '.cursor/skills/documentation-sync/SKILL.md',
  '.cursor/skills/release-preparation/SKILL.md',
  'docs/CURSOR_SETTINGS.md',
  'docs/INSTALLATION.md',
  'docs/MCP_CATALOG.md',
  'docs/MCP_PROFILES.md',
  'docs/FAQ.md',
  'docs/TROUBLESHOOTING.md',
  'docs/RELEASE_CHECKLIST.md',
  'docs/STATUS.md',
  'docs/OPERATIONAL_VERIFICATION.md',
  'docs/ALPHA_ACCEPTANCE_TEST.md',
  'examples/PROJECT_CONTRACT.md',
  'scripts/doctor.mjs',
  '.github/workflows/validate.yml',
  '.github/PULL_REQUEST_TEMPLATE.md',
  '.github/ISSUE_TEMPLATE/bug_report.yml',
  '.github/ISSUE_TEMPLATE/feature_request.yml',
  '.github/ISSUE_TEMPLATE/config.yml',
  '.github/CODEOWNERS',
  '.github/dependabot.yml',
]

function walkFiles(relativeDir) {
  const absoluteDir = join(root, relativeDir)
  if (!existsSync(absoluteDir)) return []

  const files = []
  for (const entry of readdirSync(absoluteDir)) {
    const relativePath = join(relativeDir, entry)
    const absolutePath = join(root, relativePath)
    if (statSync(absolutePath).isDirectory()) files.push(...walkFiles(relativePath))
    else files.push(relativePath.replaceAll('\\', '/'))
  }
  return files
}

function readText(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8').replace(/\r\n?/g, '\n')
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`MISSING ${file}`)
}

const textFiles = [
  ...new Set([
    ...requiredFiles,
    ...walkFiles('.cursor'),
    ...walkFiles('docs'),
    ...walkFiles('.github'),
    ...walkFiles('examples'),
    ...walkFiles('scripts'),
  ]),
].filter((file) => /\.(md|mdc|json|yml|yaml|mjs)$/.test(file))

const secretPatterns = [
  /ghp_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /sk-[A-Za-z0-9_-]{16,}/,
  /access_token\s*[:=]\s*[^\s\]}]+/i,
  /refresh_token\s*[:=]\s*[^\s\]}]+/i,
  /authorization\s*[:=]\s*bearer\s+[^\s]+/i,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
]

for (const file of textFiles) {
  const fullPath = join(root, file)
  if (!existsSync(fullPath)) continue
  const content = readText(file)
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) failures.push(`SECRET_PATTERN ${file} ${pattern}`)
  }
}

const skillFiles = walkFiles('.cursor/skills').filter((file) => file.endsWith('/SKILL.md'))
const skillNames = new Set()

for (const file of skillFiles) {
  const content = readText(file)
  if (!content.startsWith('---\n')) failures.push(`INVALID_FRONTMATTER ${file}`)

  const nameMatch = content.match(/^name:\s*([^\n]+)$/m)
  const descriptionMatch = content.match(/^description:\s*([^\n]+)$/m)

  if (!nameMatch) failures.push(`MISSING_SKILL_NAME ${file}`)
  if (!descriptionMatch) failures.push(`MISSING_SKILL_DESCRIPTION ${file}`)

  if (nameMatch) {
    const skillName = nameMatch[1].trim()
    if (skillNames.has(skillName)) failures.push(`DUPLICATE_SKILL_NAME ${skillName}`)
    skillNames.add(skillName)
  }

  const requiredSections = [
    '## Purpose',
    '## Inputs',
    '## Outputs',
    '## Workflow',
    '## Approval boundaries',
    '## Stop conditions',
    '## Completion evidence',
  ]

  for (const section of requiredSections) {
    if (!content.includes(section)) failures.push(`MISSING_SKILL_SECTION ${file} ${section}`)
  }
}

const ruleFiles = walkFiles('.cursor/rules').filter((file) => file.endsWith('.mdc'))
for (const file of ruleFiles) {
  const content = readText(file)
  if (!content.startsWith('---\n')) failures.push(`INVALID_RULE_FRONTMATTER ${file}`)

  const frontmatterEnd = content.indexOf('\n---\n', 4)
  if (frontmatterEnd === -1) failures.push(`UNCLOSED_RULE_FRONTMATTER ${file}`)

  const frontmatter = frontmatterEnd === -1 ? '' : content.slice(4, frontmatterEnd)
  if (!/^description:\s*.+$/m.test(frontmatter)) failures.push(`MISSING_RULE_DESCRIPTION ${file}`)
  if (!/^globs:\s*(?:\[.*\]|\n(?:\s+-\s+.+\n?)+)$/m.test(frontmatter)) failures.push(`MISSING_RULE_GLOBS ${file}`)
  if (!/^alwaysApply:\s*(true|false)\s*$/m.test(frontmatter)) failures.push(`MISSING_RULE_ALWAYS_APPLY ${file}`)

  const alwaysApply = /^alwaysApply:\s*true\s*$/m.test(frontmatter)
  if (alwaysApply && file !== '.cursor/rules/00-core.mdc') {
    failures.push(`UNEXPECTED_ALWAYS_APPLY ${file}`)
  }
  if (file === '.cursor/rules/00-core.mdc' && !alwaysApply) {
    failures.push(`CORE_RULE_NOT_ALWAYS_APPLY ${file}`)
  }

  const body = frontmatterEnd === -1 ? '' : content.slice(frontmatterEnd + 5).trim()
  const nonEmptyBodyLines = body.split('\n').filter((line) => line.trim().length > 0)
  if (nonEmptyBodyLines.length < 8) failures.push(`INCOMPLETE_RULE_BODY ${file}`)
  if (!/^#\s+.+$/m.test(body)) failures.push(`MISSING_RULE_TITLE ${file}`)
}

const markdownLinkPattern = /\[[^\]]+\]\((?!https?:|mailto:|#)([^)]+)\)/g
for (const file of textFiles.filter((candidate) => /\.(md|mdc)$/.test(candidate))) {
  const fullPath = join(root, file)
  if (!existsSync(fullPath)) continue
  const content = readText(file)
  let match
  while ((match = markdownLinkPattern.exec(content)) !== null) {
    const target = match[1].split('#')[0]
    if (!target) continue
    const absoluteTarget = resolve(root, dirname(file), target)
    if (!existsSync(absoluteTarget)) failures.push(`BROKEN_LOCAL_LINK ${file} -> ${target}`)
  }
}

const packagePath = join(root, 'package.json')
if (existsSync(packagePath)) {
  try {
    const pkg = JSON.parse(readText('package.json'))
    if (!pkg.scripts?.validate) failures.push('PACKAGE_MISSING_VALIDATE_SCRIPT')
    if (!pkg.scripts?.doctor) failures.push('PACKAGE_MISSING_DOCTOR_SCRIPT')
    if (!pkg.scripts?.verify) failures.push('PACKAGE_MISSING_VERIFY_SCRIPT')
    if (!pkg.scripts?.test) failures.push('PACKAGE_MISSING_TEST_SCRIPT')
    else if (pkg.scripts.test !== 'npm run verify') failures.push('PACKAGE_TEST_MUST_RUN_VERIFY')
  } catch {
    failures.push('INVALID_PACKAGE_JSON')
  }
}

const workflowPath = join(root, '.github/workflows/validate.yml')
if (existsSync(workflowPath)) {
  const workflow = readText('.github/workflows/validate.yml')
  if (!/permissions:\s*\n\s+contents:\s+read/m.test(workflow)) {
    failures.push('WORKFLOW_PERMISSIONS_NOT_MINIMAL .github/workflows/validate.yml')
  }
  if (!workflow.includes('npm run verify')) failures.push('WORKFLOW_MISSING_VERIFY_COMMAND')
  if (!workflow.includes('actions/upload-artifact@v4')) failures.push('WORKFLOW_MISSING_REPORT_ARTIFACT')
}

const reportLines = failures.length > 0
  ? ['FAIL_FOUNDATION_VALIDATION', ...failures.map((failure) => `- ${failure}`)]
  : [
      'PASS_FOUNDATION_VALIDATION',
      `Checked ${requiredFiles.length} required files.`,
      `Checked ${skillFiles.length} skills.`,
      `Checked ${ruleFiles.length} rules.`,
      `Checked ${textFiles.length} text files for secrets and local links.`,
    ]

writeFileSync(reportPath, `${reportLines.join('\n')}\n`, 'utf8')

for (const line of reportLines) {
  if (failures.length > 0) console.error(line)
  else console.log(line)
}

if (failures.length > 0) process.exit(1)
