#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const root = process.cwd()
const failures = []

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
  'package.json',
  '.gitignore',
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
  'docs/EXAMPLE_PROJECT_CONTRACT.md',
  '.github/workflows/validate.yml',
  '.github/pull_request_template.md',
  '.github/ISSUE_TEMPLATE/bug_report.yml',
  '.github/ISSUE_TEMPLATE/feature_request.yml',
  '.github/CODEOWNERS',
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

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`MISSING ${file}`)
}

const textFiles = [
  ...new Set([
    ...requiredFiles,
    ...walkFiles('.cursor'),
    ...walkFiles('docs'),
    ...walkFiles('.github'),
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
  const content = readFileSync(fullPath, 'utf8')
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) failures.push(`SECRET_PATTERN ${file} ${pattern}`)
  }
}

const skillFiles = walkFiles('.cursor/skills').filter((file) => file.endsWith('/SKILL.md'))
const skillNames = new Set()

for (const file of skillFiles) {
  const content = readFileSync(join(root, file), 'utf8')
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
  const content = readFileSync(join(root, file), 'utf8')
  if (!content.startsWith('---\n')) failures.push(`INVALID_RULE_FRONTMATTER ${file}`)

  const alwaysApply = /^alwaysApply:\s*true\s*$/m.test(content)
  if (alwaysApply && file !== '.cursor/rules/00-core.mdc') {
    failures.push(`UNEXPECTED_ALWAYS_APPLY ${file}`)
  }
}

const markdownLinkPattern = /\[[^\]]+\]\((?!https?:|mailto:|#)([^)]+)\)/g
for (const file of textFiles.filter((candidate) => /\.(md|mdc)$/.test(candidate))) {
  const content = readFileSync(join(root, file), 'utf8')
  let match
  while ((match = markdownLinkPattern.exec(content)) !== null) {
    const target = match[1].split('#')[0]
    if (!target) continue
    const absoluteTarget = resolve(root, dirname(file), target)
    if (!existsSync(absoluteTarget)) failures.push(`BROKEN_LOCAL_LINK ${file} -> ${target}`)
  }
}

const workflowPath = join(root, '.github/workflows/validate.yml')
if (existsSync(workflowPath)) {
  const workflow = readFileSync(workflowPath, 'utf8')
  if (!/permissions:\s*\n\s+contents:\s+read/m.test(workflow)) {
    failures.push('WORKFLOW_PERMISSIONS_NOT_MINIMAL .github/workflows/validate.yml')
  }
  if (!workflow.includes('npm test')) failures.push('WORKFLOW_MISSING_TEST_COMMAND')
}

if (failures.length > 0) {
  console.error('FAIL_FOUNDATION_VALIDATION')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('PASS_FOUNDATION_VALIDATION')
console.log(`Checked ${requiredFiles.length} required files.`)
console.log(`Checked ${skillFiles.length} skills.`)
console.log(`Checked ${ruleFiles.length} rules.`)
console.log(`Checked ${textFiles.length} text files for secrets and local links.`)
