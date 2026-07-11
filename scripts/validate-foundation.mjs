#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

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
  'docs/CURSOR_SETTINGS.md',
  'docs/MCP_PROFILES.md',
]

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`MISSING ${file}`)
}

const textFiles = requiredFiles.filter((file) => file.endsWith('.md') || file.endsWith('.mdc'))
const secretPatterns = [
  /ghp_[A-Za-z0-9]+/,
  /github_pat_[A-Za-z0-9_]+/,
  /sk-[A-Za-z0-9_-]{16,}/,
  /access_token\s*[:=]\s*[^\s]+/i,
  /refresh_token\s*[:=]\s*[^\s]+/i,
  /authorization\s*[:=]\s*bearer\s+[^\s]+/i,
]

for (const file of textFiles) {
  const fullPath = join(root, file)
  if (!existsSync(fullPath)) continue
  const content = readFileSync(fullPath, 'utf8')
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) failures.push(`SECRET_PATTERN ${file} ${pattern}`)
  }
}

const skillFiles = requiredFiles.filter((file) => file.endsWith('SKILL.md'))
for (const file of skillFiles) {
  const fullPath = join(root, file)
  if (!existsSync(fullPath)) continue
  const content = readFileSync(fullPath, 'utf8')
  if (!content.startsWith('---\n')) failures.push(`INVALID_FRONTMATTER ${file}`)
  if (!/^name:\s*\S+/m.test(content)) failures.push(`MISSING_SKILL_NAME ${file}`)
  if (!/^description:\s*\S+/m.test(content)) failures.push(`MISSING_SKILL_DESCRIPTION ${file}`)
}

if (failures.length > 0) {
  console.error('FAIL_FOUNDATION_VALIDATION')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('PASS_FOUNDATION_VALIDATION')
console.log(`Checked ${requiredFiles.length} required files.`)
