#!/usr/bin/env node
/**
 * WCAG contrast audit for RIVERBORN palette + common UI composites.
 * Run: node scripts/brand-contrast-audit.mjs
 */
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const brandHex = JSON.parse(
  readFileSync(join(__dirname, "../lib/brand-colors.json"), "utf8")
)

function hexToRgb(hex) {
  const h = hex.replace("#", "")
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

const brand = Object.fromEntries(
  Object.entries(brandHex).map(([k, v]) => [k, hexToRgb(v)])
)

function lum([r, g, b]) {
  const f = (c) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrast(fg, bg) {
  const l1 = lum(fg)
  const l2 = lum(bg)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

function blend(fg, bg, alpha) {
  return fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha)))
}

function report(label, fg, bg, { required = true, large = false } = {}) {
  const ratio = contrast(fg, bg)
  const aa = large ? ratio >= 3 : ratio >= 4.5
  const aaa = large ? ratio >= 4.5 : ratio >= 7
  const status = aa ? (aaa ? "AAA" : "AA ") : "FAIL"
  console.log(`${status}  ${ratio.toFixed(2)}:1  ${label}`)
  if (required && !aa) return false
  return true
}

function reportTextAlpha(label, fg, bg, alpha, opts = {}) {
  return report(label, blend(fg, bg, alpha), bg, opts)
}

console.log("RIVERBORN contrast audit\n")

const results = []

console.log("— Guideline pairs (p.33) —")
results.push(report("Lime on Forest", brand.lime, brand.forest))
results.push(report("Forest on Lime", brand.forest, brand.lime))
results.push(report("White on Forest", brand.white, brand.forest))
results.push(report("Forest on Frost", brand.forest, brand.frost))
results.push(report("Lime on Midnight", brand.lime, brand.midnight))
report("White on Lime (must NOT use)", brand.white, brand.lime, {
  required: false,
})

console.log("\n— App typography —")
results.push(report("Frost on Midnight (body)", brand.frost, brand.midnight))
results.push(
  report("Frost on Deep Forest (cards)", brand.frost, brand.deepForest)
)
results.push(
  report("River Mist on Forest (muted)", brand.riverMist, brand.forest)
)
results.push(
  report("River Mist on Deep Forest (muted)", brand.riverMist, brand.deepForest)
)

console.log("\n— Opacity tokens (normal text) —")
results.push(
  reportTextAlpha(
    "text-brand-river-mist/80 on deepForest",
    brand.riverMist,
    brand.deepForest,
    0.8
  )
)
results.push(
  reportTextAlpha(
    "text-brand-river-mist/80 on forest",
    brand.riverMist,
    brand.forest,
    0.8
  )
)
reportTextAlpha(
  "text-brand-river-mist/60 on deepForest (avoid)",
  brand.riverMist,
  brand.deepForest,
  0.6,
  { required: false }
)

console.log("\n— Chips / badges —")
results.push(
  report(
    "Lime on bg-lime/10 over deepForest",
    brand.lime,
    blend(brand.lime, brand.deepForest, 0.1)
  )
)
results.push(
  report("Frost on bg-lime/20 panel", brand.frost, blend(brand.lime, brand.deepForest, 0.2))
)

const failed = results.filter((r) => !r).length
console.log(
  failed
    ? `\n${failed} required check(s) failed.`
    : "\nAll required checks passed."
)
process.exit(failed > 0 ? 1 : 0)
