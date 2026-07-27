import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = (process.env.AUDIT_URL || 'https://www.delaemdigital.com').replace(/\/$/, '')
const outputDir = process.env.AUDIT_DIR || 'visual-audit'
const scope = process.env.AUDIT_SCOPE === 'full' ? 'full' : 'smoke'

const storeSlugs = [
  'premium-tech', 'electronics', 'furniture', 'farm', 'cars', 'auto-parts', 'tires', 'cosmetics',
  'fashion', 'shoes', 'jewelry', 'kids', 'home', 'tableware', 'lighting', 'plumbing', 'doors',
  'building', 'tools', 'flowers', 'pets', 'sport', 'books', 'gifts', 'coffee', 'bakery', 'meat-fish',
  'food-delivery', 'optics', 'b2b-wholesale',
]

const focusStores = new Set([
  'premium-tech', 'cars', 'fashion', 'jewelry', 'furniture', 'b2b-wholesale',
])

const activeStores = scope === 'full' ? storeSlugs : storeSlugs.filter((slug) => focusStores.has(slug))
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'mobile-390', width: 390, height: 844 },
]

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  scope,
  screenshots: [],
  pages: [],
  summary: {
    captures: 0,
    navigationFailures: 0,
    statusFailures: 0,
    horizontalOverflow: 0,
    brokenImages: 0,
    browserErrors: 0,
    highCls: 0,
  },
}

function safeName(value) {
  return value.replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '')
}

async function settle(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 45_000 }).catch(() => {})
  await page.waitForLoadState('networkidle', { timeout: 12_000 }).catch(() => {})
  await page.evaluate(() => document.fonts?.ready).catch(() => {})
  await page.addStyleTag({
    content: `
      *,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}
      [data-vercel-toolbar],[data-vercel-live-feedback]{display:none!important}
    `,
  }).catch(() => {})

  const cookieButtons = [
    page.getByRole('button', { name: /принять условия/i }),
    page.getByRole('button', { name: /принять/i }),
    page.getByRole('button', { name: /согласен/i }),
  ]
  for (const button of cookieButtons) {
    if (await button.first().isVisible().catch(() => false)) {
      await button.first().click({ timeout: 3_000 }).catch(() => {})
      break
    }
  }
  await page.waitForTimeout(500)
}

async function collectMetrics(page) {
  return page.evaluate(() => {
    const root = document.documentElement
    const images = [...document.images]
    const brokenImages = images
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src)

    const overflowElements = [...document.querySelectorAll('*')]
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.right > root.clientWidth + 2 || rect.left < -2
      })
      .slice(0, 40)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === 'string' ? element.className : '',
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
      }))

    return {
      title: document.title,
      finalUrl: location.href,
      textLength: document.body?.innerText?.trim().length || 0,
      viewportWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      scrollHeight: root.scrollHeight,
      horizontalOverflow: root.scrollWidth > root.clientWidth + 2,
      overflowElements,
      brokenImages,
      cls: Number(window.__visualAuditCLS || 0),
      layoutShifts: window.__visualAuditShifts || [],
      nextErrorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
    }
  }).catch(() => ({
    title: '',
    finalUrl: page.url(),
    textLength: 0,
    viewportWidth: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    horizontalOverflow: false,
    overflowElements: [],
    brokenImages: [],
    cls: 0,
    layoutShifts: [],
    nextErrorOverlay: false,
  }))
}

async function capture(page, state, viewport, telemetry, status = null, navigationError = null) {
  const folder = path.join(outputDir, viewport.name)
  await mkdir(folder, { recursive: true })
  const filename = `${safeName(state)}.png`
  const screenshotPath = path.join(folder, filename)

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    animations: 'disabled',
    timeout: 45_000,
  }).catch((error) => telemetry.pageErrors.push(`screenshot: ${error.message}`))

  const metrics = await collectMetrics(page)
  const entry = {
    state,
    viewport,
    status,
    navigationError,
    screenshotPath,
    ...metrics,
    consoleErrors: telemetry.consoleErrors,
    pageErrors: telemetry.pageErrors,
    requestFailures: telemetry.requestFailures,
  }

  report.pages.push(entry)
  report.screenshots.push(screenshotPath)
  report.summary.captures += 1
  if (navigationError) report.summary.navigationFailures += 1
  if (status !== null && status >= 400) report.summary.statusFailures += 1
  if (metrics.horizontalOverflow) report.summary.horizontalOverflow += 1
  report.summary.brokenImages += metrics.brokenImages.length
  report.summary.browserErrors += telemetry.consoleErrors.length + telemetry.pageErrors.length
  if (metrics.cls > 0.1) report.summary.highCls += 1

  console.log(`CAPTURE ${viewport.name.padEnd(13)} ${state} status=${status} overflow=${metrics.horizontalOverflow} broken=${metrics.brokenImages.length}`)
  return entry
}

async function goto(page, url, telemetry) {
  let status = null
  let navigationError = null
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    status = response?.status() ?? null
    await settle(page)
  } catch (error) {
    navigationError = error instanceof Error ? error.message : String(error)
    telemetry.pageErrors.push(`navigation: ${navigationError}`)
  }
  return { status, navigationError }
}

async function clickFirstVisible(locators) {
  for (const locator of locators) {
    const candidate = locator.first()
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.click({ timeout: 5_000 }).catch(() => {})
      return true
    }
  }
  return false
}

async function auditHome(viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    locale: 'ru-RU',
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const telemetry = { consoleErrors: [], pageErrors: [], requestFailures: [] }
  page.on('console', (message) => { if (message.type() === 'error') telemetry.consoleErrors.push(message.text()) })
  page.on('pageerror', (error) => telemetry.pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    const reason = request.failure()?.errorText || 'unknown'
    if (!reason.includes('ERR_ABORTED')) telemetry.requestFailures.push(`${request.method()} ${request.url()} — ${reason}`)
  })
  await page.addInitScript(() => {
    window.__visualAuditCLS = 0
    window.__visualAuditShifts = []
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__visualAuditCLS += entry.value
            window.__visualAuditShifts.push({ value: entry.value, time: entry.startTime })
          }
        }
      })
      observer.observe({ type: 'layout-shift', buffered: true })
    } catch {}
  })

  const nav = await goto(page, baseUrl, telemetry)
  await capture(page, 'home', viewport, telemetry, nav.status, nav.navigationError)
  await context.close()
}

async function auditStore(slug, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    locale: 'ru-RU',
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const telemetry = { consoleErrors: [], pageErrors: [], requestFailures: [] }

  page.on('console', (message) => { if (message.type() === 'error') telemetry.consoleErrors.push(message.text()) })
  page.on('pageerror', (error) => telemetry.pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    const reason = request.failure()?.errorText || 'unknown'
    if (!reason.includes('ERR_ABORTED')) telemetry.requestFailures.push(`${request.method()} ${request.url()} — ${reason}`)
  })
  await page.addInitScript(() => {
    window.__visualAuditCLS = 0
    window.__visualAuditShifts = []
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__visualAuditCLS += entry.value
            window.__visualAuditShifts.push({ value: entry.value, time: entry.startTime })
          }
        }
      })
      observer.observe({ type: 'layout-shift', buffered: true })
    } catch {}
  })

  const storeUrl = `${baseUrl}/demo/${slug}`
  const storeNav = await goto(page, storeUrl, telemetry)
  await capture(page, `${slug}--store`, viewport, telemetry, storeNav.status, storeNav.navigationError)

  let productHref = null
  const productLink = page.locator('a[href*="/product/"]').first()
  if (await productLink.count()) {
    productHref = await productLink.getAttribute('href').catch(() => null)
  }

  if (focusStores.has(slug)) {
    const aiOpened = await clickFirstVisible([
      page.getByRole('button', { name: /ai-консультант/i }),
      page.getByRole('button', { name: /консультант/i }),
      page.getByRole('button', { name: /задать вопрос/i }),
      page.locator('button[class*="agent" i]'),
      page.locator('button[class*="assistant" i]'),
    ])
    if (aiOpened) {
      await page.waitForTimeout(600)
      await capture(page, `${slug}--ai-open`, viewport, telemetry)
      await page.keyboard.press('Escape').catch(() => {})
    }
  }

  if (productHref) {
    const absoluteProductUrl = productHref.startsWith('http') ? productHref : `${baseUrl}${productHref}`
    const productNav = await goto(page, absoluteProductUrl, telemetry)
    await capture(page, `${slug}--product`, viewport, telemetry, productNav.status, productNav.navigationError)

    if (focusStores.has(slug)) {
      const added = await clickFirstVisible([
        page.getByRole('button', { name: /в корзину/i }),
        page.getByRole('button', { name: /добавить/i }),
        page.locator('button[class*="cart" i]'),
      ])
      if (added) {
        await page.waitForTimeout(500)
        await capture(page, `${slug}--product-added`, viewport, telemetry)
      }

      const cartOpened = await clickFirstVisible([
        page.getByRole('button', { name: /корзина/i }),
        page.getByRole('link', { name: /корзина/i }),
        page.locator('button[class*="cart" i]'),
      ])
      if (cartOpened) {
        await page.waitForTimeout(500)
        await capture(page, `${slug}--cart-open`, viewport, telemetry)

        const checkoutOpened = await clickFirstVisible([
          page.getByRole('button', { name: /оформить заказ/i }),
          page.getByRole('button', { name: /к оформлению/i }),
          page.getByRole('link', { name: /оформить заказ/i }),
        ])
        if (checkoutOpened) {
          await page.waitForTimeout(500)
          await capture(page, `${slug}--checkout-open`, viewport, telemetry)
          await page.keyboard.press('Escape').catch(() => {})
        }
      }
    }
  }

  const manageNav = await goto(page, `${baseUrl}/demo/${slug}/manage`, telemetry)
  await capture(page, `${slug}--seller-panel`, viewport, telemetry, manageNav.status, manageNav.navigationError)

  const buyerNav = await goto(page, `${baseUrl}/buyer?store=${encodeURIComponent(slug)}`, telemetry)
  await page.waitForTimeout(1_000)
  await capture(page, `${slug}--buyer-account`, viewport, telemetry, buyerNav.status, buyerNav.navigationError)

  await context.close()
}

async function runPool(tasks, concurrency) {
  let cursor = 0
  async function worker() {
    while (cursor < tasks.length) {
      const index = cursor++
      const task = tasks[index]
      try {
        await task()
      } catch (error) {
        report.summary.navigationFailures += 1
        report.pages.push({ fatalTaskError: error instanceof Error ? error.message : String(error) })
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker()))
}

const tasks = []
for (const viewport of viewports) {
  tasks.push(() => auditHome(viewport))
  for (const slug of activeStores) tasks.push(() => auditStore(slug, viewport))
}

try {
  await runPool(tasks, scope === 'full' ? 3 : 2)
} finally {
  await browser.close()
}

report.pages.sort((a, b) => String(a.screenshotPath || '').localeCompare(String(b.screenshotPath || '')))
await writeFile(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2))
await writeFile(path.join(outputDir, 'summary.txt'), [
  `Generated: ${report.generatedAt}`,
  `Base URL: ${report.baseUrl}`,
  `Scope: ${report.scope}`,
  `Captures: ${report.summary.captures}`,
  `Navigation failures: ${report.summary.navigationFailures}`,
  `HTTP status failures: ${report.summary.statusFailures}`,
  `Horizontal overflow: ${report.summary.horizontalOverflow}`,
  `Broken images: ${report.summary.brokenImages}`,
  `Browser errors: ${report.summary.browserErrors}`,
  `CLS > 0.1: ${report.summary.highCls}`,
].join('\n'))

const cards = report.pages
  .filter((entry) => entry.screenshotPath)
  .map((entry) => {
    const relative = entry.screenshotPath.replace(`${outputDir}/`, '')
    const issues = [
      entry.navigationError ? 'navigation' : '',
      entry.status >= 400 ? `HTTP ${entry.status}` : '',
      entry.horizontalOverflow ? 'overflow' : '',
      entry.brokenImages?.length ? `broken images: ${entry.brokenImages.length}` : '',
      entry.consoleErrors?.length || entry.pageErrors?.length ? 'browser errors' : '',
    ].filter(Boolean).join(' · ') || 'OK'
    return `<article><a href="${relative}"><img src="${relative}" loading="lazy" alt="${entry.state}"></a><strong>${entry.state}</strong><span>${entry.viewport.name} · ${issues}</span></article>`
  }).join('\n')

await writeFile(path.join(outputDir, 'index.html'), `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Витрина — визуальный аудит</title><style>
body{margin:0;padding:24px;font:14px/1.4 system-ui;background:#111;color:#fff}header{position:sticky;top:0;padding:12px 0;background:#111;z-index:2}h1{margin:0;font-size:24px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px}article{display:grid;gap:8px}img{width:100%;height:220px;object-fit:cover;object-position:top;border:1px solid #333;background:#222}strong{font-size:14px}span{color:#aaa;font-size:12px}</style></head>
<body><header><h1>Витрина — визуальный аудит</h1><p>${report.generatedAt} · ${report.scope} · ${report.summary.captures} экранов</p></header><main class="grid">${cards}</main></body></html>`)

console.log(JSON.stringify(report.summary, null, 2))
