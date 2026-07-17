# RIVERBORN brand colors — portfolio integration

This folder contains the official **Brand Strategy & Guidelines** PDFs. The portfolio is being refactored to use those colors instead of generic Tailwind `green-*` / `emerald-*` accents.

Source pages referenced here:

| PDF | Topic |
|-----|--------|
| `Brand guidelines - 56.pdf` (p.28) | Primary palette |
| `Brand guidelines - 57.pdf` (p.29) | Supporting neutrals |
| `Brand guidelines - 58.pdf` (p.30) | Tints & shades |
| `Brand guidelines - 59.pdf` (p.31) | When to use tints |
| `Brand guidelines - 60.pdf` (p.32) | Color proportions |
| `Brand guidelines - 61.pdf` (p.33) | WCAG contrast combinations |

## Primary palette

| Name | Hex | Use |
|------|-----|-----|
| **Forest** | `#0D2B22` | Primary surfaces, dominant fill (~60% visual weight) |
| **Lime** | `#D4F53C` | Accent only (~10%) — links, focus, primary CTAs |
| **Frost** | `#F2FFEE` | Light surfaces, primary text on dark (~25%) |
| **Midnight** | `#060F0C` | Deepest background (~5%) |

## Supporting neutrals

| Name | Hex | Use |
|------|-----|-----|
| White | `#FFFFFF` | Headlines on dark when Frost is too soft |
| River Mist | `#9FCEBE` | Secondary / muted text, borders |
| Deep Forest | `#1A4435` | Cards, panels, elevated surfaces |
| Stone | `#E8EDE6` | Light-mode surfaces (future) |

## Rules (from guidelines)

1. **Proportion:** Forest 60% · Frost 25% · Lime 10% · Midnight 5%. Lime must not dominate a layout.
2. **Tints:** 5–20% for large background areas; 80–100% for active UI, icons, prominent controls. Avoid 30–60% tints for body text.
3. **Approved text/background pairs:** Lime on Forest · Forest on Lime · White on Forest · Forest on Frost · Lime on Midnight.
4. **Never use:** White on Lime (fails WCAG).

## Implementation in this repo

### Phase 0 — Tokens (done first)

Single source of truth:

- `lib/brand-colors.json` — canonical hex values (PDF-exact)
- `lib/brand-colors.ts` — RGB/HSL helpers, tint scales, `brandRgba()` for canvas/WebGL
- `app/globals.css` — CSS variables `--brand-*` and shadcn semantic tokens mapped to the dark-first theme
- `tailwind.config.js` — `brand-*` utilities (`bg-brand-forest`, `text-brand-lime`, etc.)

**Exit criteria:** Components can use semantic classes (`bg-primary`, `text-brand-lime`) without hard-coded Tailwind greens.

### Phase 1 — App shell

`command-center`, `system-header`, `sidebar`, `footer`, `loader`, `boot-sequence`:

- Midnight/Forest canvas, Deep Forest cards, Frost/River Mist typography hierarchy
- Grid pattern and scrollbar use brand tints (low-opacity Lime or River Mist)
- CTAs: `bg-brand-lime text-brand-forest`

### Phase 2 — Section sweep

Replace `green-*` / `emerald-*` across `components/sections/*` and legacy section files. Centralize canvas colors in `lib/brand-colors.ts` (`projects-network.tsx`).

### Phase 3 — Typography & logo (from other PDF pages)

After color tokens land, align fonts and logo usage if specified elsewhere in the guideline set.

### Phase 4 — Accessibility audit

Verify each major section against the WCAG table (page 33). Fix any white-on-lime or mid-tint body copy.

### Phase 5 — 3D / hero

Wire `tech-world-hero` (and any shaders) to `brand-colors.ts` constants.

## Developer quick reference

```tsx
// Tailwind
<div className="bg-brand-midnight text-brand-frost border-brand-deep-forest" />
<a className="text-brand-lime hover:text-brand-lime/80" />
<button className="bg-brand-lime text-brand-forest">Submit</button>

// shadcn semantics (dark-first :root)
<Button /> // uses --primary (lime) / --primary-foreground (forest)

// Canvas / inline styles
import { brandRgba, brandHex } from "@/lib/brand-colors"
ctx.strokeStyle = brandRgba("lime", 0.2)
```

```ts
import { forestTint, limeTint } from "@/lib/brand-colors"
forestTint(15) // ~15% forest on frost — large background areas
```

## Migration checklist

- [x] Phase 0: tokens in `lib/`, `globals.css`, Tailwind
- [x] Phase 1: layout shell
- [x] Phase 2: all sections + canvas (legacy section files included)
- [ ] Phase 3: typography / logo
- [x] Phase 4: WCAG pass (palette script + contrast fixes; see ACCESSIBILITY.md)
- [ ] Phase 5: 3D materials

Track remaining `green-*` usage:

```bash
rg 'green-|emerald-' components app --glob '*.{tsx,css}'
```
