#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = process.cwd()
const failures = []
const warnings = []

function controlledErrorBoundary(fn) {
  try {
    fn()
  } catch (error) {
    console.error('FAIL_FACTORY_INSTALLATION_VALIDATION')
    console.error('- UNEXPECTED_VALIDATION_ERROR')
    process.exit(1)
  }
}

const CANONICAL_SCHEMA_VERSION = '1.0.0'
const CANONICAL_FACTORY_VERSION = '0.1.0-alpha.0'

const CANONICAL_RULES = [
  '.cursor/rules/00-core.mdc',
  '.cursor/rules/01-architecture.mdc',
  '.cursor/rules/02-builder.mdc',
  '.cursor/rules/03-reviewer.mdc',
  '.cursor/rules/04-qa.mdc',
  '.cursor/rules/05-design.mdc',
  '.cursor/rules/06-security.mdc',
  '.cursor/rules/07-documentation.mdc',
]

const CANONICAL_SKILLS = [
  '.cursor/skills/product-brief/SKILL.md',
  '.cursor/skills/architecture/SKILL.md',
  '.cursor/skills/controlled-implementation/SKILL.md',
  '.cursor/skills/browser-qa/SKILL.md',
  '.cursor/skills/code-review/SKILL.md',
  '.cursor/skills/security-review/SKILL.md',
  '.cursor/skills/documentation-sync/SKILL.md',
  '.cursor/skills/release-preparation/SKILL.md',
]

const CANONICAL_TARGET_LOCATIONS = {
  manifest: '.symbioz/manifest.json',
  validator: '.symbioz/validate-installation.mjs',
}

const CANONICAL_TARGET_CONTRACTS = [
  'AGENTS.md',
  'PRODUCT.md',
  'ARCHITECTURE.md',
  'SECURITY.md',
]

function fail(message) {
  console.error('FAIL_FACTORY_INSTALLATION_VALIDATION')
  console.error(`- ${message}`)
  process.exit(1)
}

controlledErrorBoundary(() => {
const manifestPath = join(__dirname, 'manifest.json')
let manifest

try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
} catch (error) {
  fail('MANIFEST_PARSE_ERROR Cannot read or parse manifest.json')
}

if (manifest === null || typeof manifest !== 'object' || Array.isArray(manifest)) {
  fail('MANIFEST_NOT_OBJECT manifest.json must be a non-null object')
}

if (manifest.schemaVersion !== CANONICAL_SCHEMA_VERSION) {
  fail('MANIFEST_SCHEMA_VERSION_MISMATCH')
}

if (manifest.factoryVersion !== CANONICAL_FACTORY_VERSION) {
  fail('MANIFEST_FACTORY_VERSION_MISMATCH')
}

if (!Array.isArray(manifest.managedRules)) {
  fail('MANIFEST_MANAGED_RULES must be an array')
}
if (manifest.managedRules.length !== 8) {
  fail('MANIFEST_MANAGED_RULES_COUNT_MISMATCH')
}
if (new Set(manifest.managedRules).size !== 8) {
  fail('MANIFEST_MANAGED_RULES_DUPLICATE_ENTRIES')
}
for (let i = 0; i < 8; i++) {
  if (manifest.managedRules[i] !== CANONICAL_RULES[i]) {
    fail(`MANIFEST_MANAGED_RULES_MISMATCH_INDEX_${i}`)
  }
}

if (!Array.isArray(manifest.managedSkills)) {
  fail('MANIFEST_MANAGED_SKILLS must be an array')
}
if (manifest.managedSkills.length !== 8) {
  fail('MANIFEST_MANAGED_SKILLS_COUNT_MISMATCH')
}
if (new Set(manifest.managedSkills).size !== 8) {
  fail('MANIFEST_MANAGED_SKILLS_DUPLICATE_ENTRIES')
}
for (let i = 0; i < 8; i++) {
  if (manifest.managedSkills[i] !== CANONICAL_SKILLS[i]) {
    fail(`MANIFEST_MANAGED_SKILLS_MISMATCH_INDEX_${i}`)
  }
}

if (!Array.isArray(manifest.requiredTargetContracts)) {
  fail('MANIFEST_REQUIRED_TARGET_CONTRACTS must be an array')
}
if (manifest.requiredTargetContracts.length !== 4) {
  fail('MANIFEST_REQUIRED_TARGET_CONTRACTS_COUNT_MISMATCH')
}
if (new Set(manifest.requiredTargetContracts).size !== 4) {
  fail('MANIFEST_REQUIRED_TARGET_CONTRACTS_DUPLICATE_ENTRIES')
}
for (let i = 0; i < 4; i++) {
  if (manifest.requiredTargetContracts[i] !== CANONICAL_TARGET_CONTRACTS[i]) {
    fail(`MANIFEST_REQUIRED_TARGET_CONTRACTS_MISMATCH_INDEX_${i}`)
  }
}

if (manifest.targetLocations === null || typeof manifest.targetLocations !== 'object' || Array.isArray(manifest.targetLocations)) {
  fail('MANIFEST_TARGET_LOCATIONS must be a non-null object')
}
if (manifest.targetLocations.manifest !== CANONICAL_TARGET_LOCATIONS.manifest) {
  fail('MANIFEST_TARGET_LOCATIONS_MANIFEST_MISMATCH')
}
if (manifest.targetLocations.validator !== CANONICAL_TARGET_LOCATIONS.validator) {
  fail('MANIFEST_TARGET_LOCATIONS_VALIDATOR_MISMATCH')
}
  const nodeVersion = process.version
  const nodeMajor = Number(nodeVersion.slice(1).split('.')[0])
  if (nodeMajor < 20) {
    failures.push('NODE_VERSION_REQUIREMENT Node.js 20+ required')
  }

  function commandExists(command) {
    try {
      const executable = process.platform === 'win32'
        ? (process.env.ComSpec || 'cmd.exe')
        : command
      const args = process.platform === 'win32'
        ? ['/d', '/s', '/c', `${command} --version`]
        : ['--version']
      execFileSync(executable, args, {
        cwd: root,
        stdio: ['ignore', 'ignore', 'ignore'],
        windowsHide: true,
      })
      return true
    } catch {
      return false
    }
  }

  if (!commandExists('git')) {
    failures.push('GIT_NOT_AVAILABLE Git is not available in PATH')
  }

  function isGitRepository() {
    try {
      const executable = process.platform === 'win32'
        ? (process.env.ComSpec || 'cmd.exe')
        : 'git'
      const args = process.platform === 'win32'
        ? ['/d', '/s', '/c', 'git rev-parse --git-dir']
        : ['rev-parse', '--git-dir']
      execFileSync(executable, args, {
        cwd: root,
        stdio: ['ignore', 'ignore', 'ignore'],
        windowsHide: true,
      })
      return true
    } catch {
      return false
    }
  }

  if (!isGitRepository()) {
    failures.push('NOT_A_GIT_REPOSITORY Target is not a Git repository')
  }

  function readText(relativePath) {
    return readFileSync(join(root, relativePath), 'utf8').replace(/\r\n?/g, '\n')
  }

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

  for (const rule of CANONICAL_RULES) {
    if (!existsSync(join(root, rule))) {
      failures.push(`MISSING_MANAGED_RULE ${rule}`)
    }
  }

  const ruleFiles = walkFiles('.cursor/rules').filter((file) => file.endsWith('.mdc'))
  if (ruleFiles.length !== 8) {
    failures.push(`EXPECTED_8_RULES_FOUND_${ruleFiles.length}`)
  }

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
  }

  for (const skill of CANONICAL_SKILLS) {
    if (!existsSync(join(root, skill))) {
      failures.push(`MISSING_MANAGED_SKILL ${skill}`)
    }
  }

  const skillFiles = walkFiles('.cursor/skills').filter((file) => file.endsWith('/SKILL.md'))
  if (skillFiles.length !== 8) {
    failures.push(`EXPECTED_8_SKILLS_FOUND_${skillFiles.length}`)
  }

  for (const file of skillFiles) {
    const content = readText(file)
    if (!content.startsWith('---\n')) failures.push(`INVALID_SKILL_FRONTMATTER ${file}`)

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

  for (const contract of CANONICAL_TARGET_CONTRACTS) {
    if (!existsSync(join(root, contract))) {
      failures.push(`MISSING_TARGET_CONTRACT ${contract}`)
    }
  }

  const secretPatterns = [
    /ghp_[A-Za-z0-9]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /sk-[A-Za-z0-9_-]{16,}/,
    /access_token\s*[:=]\s*[^\s\]}]+/i,
    /refresh_token\s*[:=]\s*[^\s\]}]+/i,
    /authorization\s*[:=]\s*bearer\s+[^\s]+/i,
    /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  ]

  const filesToScan = [
    ...CANONICAL_RULES,
    ...CANONICAL_SKILLS,
    ...CANONICAL_TARGET_CONTRACTS,
    CANONICAL_TARGET_LOCATIONS.manifest,
    CANONICAL_TARGET_LOCATIONS.validator,
  ].filter((file) => existsSync(join(root, file)))

  for (const file of filesToScan) {
    const content = readText(file)
    for (const pattern of secretPatterns) {
      if (pattern.test(content)) failures.push(`SECRET_PATTERN ${file} ${pattern}`)
    }
  }

  const mcpPath = join(root, '.cursor', 'mcp.json')
  if (existsSync(mcpPath)) {
    console.log('INFO Project MCP configuration: present; contents intentionally not read')
  }

  const cursorIgnorePath = join(root, '.cursorignore')
  if (!existsSync(cursorIgnorePath)) {
    warnings.push('.cursorignore is not present; recommended for optimal Cursor behavior')
  }

  if (failures.length > 0) {
    console.error('FAIL_FACTORY_INSTALLATION_VALIDATION')
    for (const failure of failures) {
      console.error(`- ${failure}`)
    }
    process.exit(1)
  }

  console.log('PASS_FACTORY_INSTALLATION_VALIDATION')
  console.log(`Checked ${CANONICAL_RULES.length} managed rules.`)
  console.log(`Checked ${CANONICAL_SKILLS.length} managed skills.`)
  console.log(`Checked ${CANONICAL_TARGET_CONTRACTS.length} required target contracts.`)

  for (const warning of warnings) {
    console.log(`WARN ${warning}`)
  }

  process.exit(0)
})
