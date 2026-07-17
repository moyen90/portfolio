import brandHex from "./brand-colors.json"

export type BrandColorKey = keyof typeof brandHex

/** Canonical hex values — keep in sync with `brand-colors.json` and brand PDF p.28–29. */
export const brandColors = brandHex

export const brandRgbValues: Record<
  BrandColorKey,
  { r: number; g: number; b: number }
> = {
  forest: { r: 13, g: 43, b: 34 },
  lime: { r: 212, g: 245, b: 60 },
  frost: { r: 242, g: 255, b: 238 },
  midnight: { r: 6, g: 15, b: 12 },
  white: { r: 255, g: 255, b: 255 },
  riverMist: { r: 159, g: 206, b: 190 },
  deepForest: { r: 26, g: 68, b: 53 },
  stone: { r: 232, g: 237, b: 230 },
}

/** HSL components for CSS variables (`H S% L%`). */
export const brandHsl: Record<BrandColorKey, string> = {
  forest: "162 54% 11%",
  lime: "71 90% 60%",
  frost: "106 100% 97%",
  midnight: "160 43% 4%",
  white: "0 0% 100%",
  riverMist: "160 32% 72%",
  deepForest: "159 45% 18%",
  stone: "103 16% 92%",
}

const TINT_STOPS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const
export type TintStop = (typeof TINT_STOPS)[number]

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function toHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) =>
        Math.min(255, Math.max(0, Math.round(c)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  )
}

/** Linear mix: t=0 → a, t=1 → b */
export function mixHex(a: string, b: string, t: number): string {
  const [r1, g1, b1] = parseHex(a)
  const [r2, g2, b2] = parseHex(b)
  return toHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t)
}

/** Forest scale on Frost (5% = subtle bg, 100% = full Forest). */
export function forestTint(percent: number): string {
  return mixHex(brandColors.frost, brandColors.forest, percent / 100)
}

/** Lime scale on Frost (use sparingly — accent only). */
export function limeTint(percent: number): string {
  return mixHex(brandColors.frost, brandColors.lime, percent / 100)
}

export function buildTintScale(
  tintFn: (percent: number) => string
): Record<TintStop, string> {
  return TINT_STOPS.reduce(
    (acc, stop) => {
      acc[stop] = tintFn(stop)
      return acc
    },
    {} as Record<TintStop, string>
  )
}

export const forestTints = buildTintScale(forestTint)
export const limeTints = buildTintScale(limeTint)

export function brandRgba(key: BrandColorKey, alpha = 1): string {
  const { r, g, b } = brandRgbValues[key]
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** WCAG-safe pairings from brand guidelines p.33 */
export const brandCombinations = {
  primary: { fg: "lime", bg: "forest" },
  invertedHero: { fg: "forest", bg: "lime" },
  bodyOnDark: { fg: "white", bg: "forest" },
  lightMode: { fg: "forest", bg: "frost" },
  deepSection: { fg: "lime", bg: "midnight" },
  /** Do not use */
  forbidden: { fg: "white", bg: "lime" },
} as const satisfies Record<
  string,
  { fg: BrandColorKey; bg: BrandColorKey }
>
