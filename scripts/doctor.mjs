#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

const root = process.cwd()
const checks = []

function addCheck(name, status, detail) {
  checks.push({ name, status, detail })
}

function commandVersion(command, args = ['--version']) {
  try {
    const executable = process.platform === 'win32'
      ? (process.env.ComSpec || 'cmd.exe')
      : command
    const commandArgs = process.platform === 'win32'
      ? ['/d', '/s', '/c', [command, ...args].join(' ')]
      : args

    return execFileSync(executable, commandArgs, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      windowsHide: true,
    }).trim()
  } catch {
    return null
  }
}

addCheck('Platform', 'INFO', `${process.platform} ${process.arch}`)

const nodeVersion = process.version
const nodeMajor = Number(nodeVersion.slice(1).split('.')[0])
addCheck('Node.js', nodeMajor >= 20 ? 'PASS' : 'FAIL', nodeVersion)

const gitVersion = commandVersion('git')
addCheck('Git', gitVersion ? 'PASS' : 'FAIL', gitVersion ?? 'not available')

const npmVersion = commandVersion('npm')
addCheck('npm', npmVersion ? 'PASS' : 'FAIL', npmVersion ?? 'not available')

const requiredPaths = [
  '.cursor/rules',
  '.cursor/skills',
  'AGENTS.md',
  'PRODUCT.md',
  'ARCHITECTURE.md',
  'SECURITY.md',
  'scripts/validate-foundation.mjs',
]

for (const path of requiredPaths) {
  addCheck(path, existsSync(join(root, path)) ? 'PASS' : 'FAIL', existsSync(join(root, path)) ? 'present' : 'missing')
}

const packagePath = join(root, 'package.json')
if (existsSync(packagePath)) {
  try {
    const pkg = JSON.parse(readFileSync(packagePath, 'utf8'))
    addCheck('package.json', 'PASS', `${pkg.name ?? 'unnamed'} ${pkg.version ?? 'unversioned'}`)
    addCheck('validate script', pkg.scripts?.validate ? 'PASS' : 'FAIL', pkg.scripts?.validate ?? 'missing')
    addCheck('doctor script', pkg.scripts?.doctor ? 'PASS' : 'FAIL', pkg.scripts?.doctor ?? 'missing')
    addCheck('verify script', pkg.scripts?.verify ? 'PASS' : 'FAIL', pkg.scripts?.verify ?? 'missing')
    addCheck('test script', pkg.scripts?.test === 'npm run verify' ? 'PASS' : 'FAIL', pkg.scripts?.test ?? 'missing')
  } catch {
    addCheck('package.json', 'FAIL', 'invalid JSON')
  }
} else {
  addCheck('package.json', 'FAIL', 'missing')
}

const mcpPath = join(root, '.cursor', 'mcp.json')
addCheck(
  'Project MCP configuration',
  'INFO',
  existsSync(mcpPath)
    ? 'present; contents intentionally not read'
    : 'not present; account-bound MCP setup may be completed later',
)

const cursorIgnorePath = join(root, '.cursorignore')
addCheck('.cursorignore', existsSync(cursorIgnorePath) ? 'PASS' : 'WARN', existsSync(cursorIgnorePath) ? 'present' : 'recommended')

const failures = checks.filter((check) => check.status === 'FAIL')
const warnings = checks.filter((check) => check.status === 'WARN')

console.log('SYMBIOZ_CURSOR_FACTORY_DOCTOR')
console.log('============================')
for (const check of checks) {
  console.log(`${check.status.padEnd(4)} ${check.name}: ${check.detail}`)
}
console.log('')
console.log(`Summary: ${checks.length - failures.length - warnings.length} non-failing checks, ${warnings.length} warnings, ${failures.length} failures.`)

if (failures.length > 0) {
  console.error('FAIL_FACTORY_DOCTOR')
  process.exit(1)
}

console.log('PASS_FACTORY_DOCTOR')
