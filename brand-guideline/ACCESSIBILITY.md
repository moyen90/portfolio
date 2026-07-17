# Accessibility — RIVERBORN color audit (Phase 4)

Automated palette checks: `yarn a11y:contrast` (`scripts/brand-contrast-audit.mjs`).

## Guideline pairs (PDF p.33)

| Combination | Ratio | WCAG | Use |
|-------------|-------|------|-----|
| Lime on Forest | 12.2:1 | AAA | Primary accent on dark surfaces |
| Forest on Lime | 12.2:1 | AAA | Primary buttons (`bg-brand-lime text-brand-forest`) |
| White on Forest | 15.2:1 | AAA | Headlines on dark |
| Forest on Frost | 14.7:1 | AAA | Light mode body |
| Lime on Midnight | 15.7:1 | AAA | Accent on deepest bg |
| **White on Lime** | **1.2:1** | **FAIL** | **Never use** |

## App defaults (post-audit)

| Element | Classes | Notes |
|---------|---------|--------|
| Page base | `bg-brand-midnight text-brand-frost` | Frost body, not lime |
| Headings | `text-brand-frost` | On Forest / Deep Forest / Midnight |
| Muted copy | `text-brand-river-mist` | Full opacity on cards |
| Secondary muted | `text-brand-river-mist/80` | OK on Forest & Deep Forest (≥4.5:1) |
| Avoid | `text-brand-river-mist/60` | Fails on Forest (~4.1:1) and Deep Forest (~3.3:1) |
| CTA | `bg-brand-lime text-brand-forest` | Never `text-white` on lime |
| Lime tint panels | `text-brand-frost` on `bg-brand-lime/20` | Forest text on lime wash fails (~2.3:1) |

## Fixes applied (Phase 4)

- Removed `text-brand-river-mist/60` in projects network empty state
- Success toast in `contact-section`: Frost on lime-tint panel (not Forest)
- Replaced leftover `text-gray-*` in legacy sections
- Root `main`: `text-brand-frost` instead of inheriting lime

## Manual / browser checks

1. **Lighthouse (static export):** after `yarn build`, serve `out/` and run:
   ```bash
   npx serve out -l 3456
   npx lighthouse http://127.0.0.1:3456 --only-categories=accessibility --output=json --output-path=brand-guideline/lighthouse-home-boot.json
   ```
   Latest run (boot screen, navigation): **accessibility 100** — see `lighthouse-home-boot.json`.
   Earlier attempts against `localhost:3000` failed (404/500) when no healthy dev server was listening.
2. Tab through sidebar, contact form, terminal input — focus ring uses `--ring` (lime).
3. Optional: inject [axe-core](https://github.com/dequelabs/axe-core) in DevTools on each section after navigation.

## Checklist

- [x] Palette script passes required pairs
- [x] No white-on-lime buttons
- [x] No `/60` muted text on card backgrounds
- [x] Lighthouse a11y on home (static `out/`, score 100)
- [ ] axe-core sweep per section (run locally after `yarn dev`)
- [ ] Phase 3 typography (when PDF type rules land)
