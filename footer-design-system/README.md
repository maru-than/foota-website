# Foota Design System

> **The home of soccer jerseys.**
> Sport · energetic · modern · linear. Dark base, electric lime accent, sharp corners, thin lines.

Foota is a soccer-jersey e-commerce brand. The aesthetic is closer to a Berlin techno flyer than a typical sportswear store: blacked-out canvas, a single high-voltage accent ("Voltron lime" #C1FF56), Sonara display type for the logo, Geist for everything else, and unrelentingly **sharp corners** — no rounded-rectangle softness anywhere.

---

## Sources

| Source | What |
|---|---|
| **Figma file** (`foota.fig`, mounted as VFS) | 2 frames on Page 1 — node `1:2` (brand wordmark on dark) and node `1:10` (product card, 300×500). Source of truth for color and component specs. |
| **Uploaded fonts** | Geist (9 weights, 200→900) and Sonara display, both `.otf` in `fonts/`. |
| **Brief notes** | "Sport, energetic, modern, linear aesthetic. dark base, with a gold/beige accents. sharp corners, thin lines." See *Caveats*. |

The Figma file is small (12 nodes) — it's an early branding sketch, not a full system. Most of this design system is **extrapolated** from those two frames, the brief, and the spirit of contemporary direct-to-consumer sportswear (Hummel, Concepts, Kappa retro, Palace x Adidas etc).

---

## Index

| Path | Contents |
|---|---|
| `colors_and_type.css`            | All CSS custom properties — color, type, spacing, radii, motion. Drop into any HTML to inherit the system. |
| `fonts/`                         | All 10 OTF files (Geist 9 weights + Sonara). |
| `assets/`                        | Logo SVGs (wordmark, mark), favicon. |
| `preview/`                       | Small HTML cards rendered in the Design System tab — colors, type specimens, spacing, components. |
| `ui_kits/storefront/`            | Pixel-perfect recreation of the Foota e-comm experience. Open `index.html` for the interactive demo. See its `README.md`. |
| `SKILL.md`                       | Agent Skill manifest — makes this folder usable as a portable Claude Code skill. |

---

## Content fundamentals

**Voice: sport register, second person, tight.** You speak the way a stadium PA announcer would write text messages — direct, time-pressured, no filler. The brand is helping you suit up; it is not selling you on lifestyle.

| Do | Don't |
|---|---|
| "Add to bag" | "Click here to purchase this premium jersey item" |
| "2 left · ships tomorrow" | "Limited stock available — order soon!" |
| "Match-ready. Imported from Madrid." | "Authentic European fashion at unbeatable prices" |
| "Pick your size." | "Please select your preferred size" |

**Rules:**
- **Casing.** Sentence case for sentences ("Pick your size."). UPPERCASE for labels (`NEW DROP`, `SHOP`, `NATIONAL`). Display logotype is always UPPERCASE.
- **Pronouns.** Second person — you / your. Never "users" or "customers" in customer-facing copy.
- **Punctuation.** Periods end sentences. No exclamation marks. One em dash or middle dot (·) for separators — never " | " or ", and".
- **Numbers visible.** Prices, sizes, counts, ship-times, stock counts are first-class typography. Use `font-variant-numeric: tabular-nums` for prices. Prices follow the Figma convention with an apostrophe rather than a decimal: `29'99 $` (this is intentional and on-brand).
- **No emoji.** The dark canvas + lime accent does the visual work.
- **No marketing adjectives.** Replace "premium / amazing / unbeatable" with a concrete fact: a country, a year (`24/25`), a number, a city ("Imported from Madrid").
- **Two-beat headlines.** `Match-ready.` then a fact. The display lockup uses a single accent period — `Match-ready.` — to give the headline a strong stop.

---

## Visual foundations

### Colors

| Token | Hex | Role |
|---|---|---|
| `--bg-0` | `#0A0A0A` | Deep pitch — videos, takeover modals |
| `--bg-1` | `#111111` | Primary surface (page background) |
| `--bg-2` | `#181818` | Card backplate |
| `--bg-3` | `#222222` | Elevated card / chip — **the Figma base** |
| `--bg-4` | `#2C2C2C` | Hover surface |
| `--fg-1` | `#FFFFFF` | Primary text |
| `--fg-2` | `rgba(255,255,255,.72)` | Body |
| `--fg-3` | `rgba(255,255,255,.48)` | Muted, captions |
| `--fg-4` | `rgba(255,255,255,.24)` | Disabled |
| `--accent` | `#C1FF56` | **Voltron lime** — the brand. Used sparingly: logo, kicker text, primary CTA, focus states, ticker. |
| `--accent-hi` | `#D4FF7A` | Hover |
| `--accent-lo` | `#A8E640` | Press |
| `--accent-20` | `rgba(193,255,86,.20)` | Default card / divider border — pulled from Figma |
| `--gold` etc. | `#D4B26A` | Alternate "Champion" palette for premium / retro collections |

**Use of accent:** treat lime like neon — one element per viewport at a time. The kicker on a product card, *or* the primary CTA, *or* the active nav link. Never all three.

### Type

- **Display:** Sonara — geometric, rounded-mono extended. Logo and hero only. Uppercase. 64–200px. Tracking −0.03em.
- **UI/Body:** Geist — full 9-weight range (200→900). 11px labels, 14–15px body, 24px H3, up to 40px H1. Tracking −0.03em on everything (Figma value).
- **Numerals:** tabular nums for prices, scores, sizes.

### Backgrounds

- Solid `#111` is the default canvas. No gradient washes, no hand-drawn illustrations, no stock photography.
- One subtle texture is allowed: a vertical 12-column grid as `rgba(193,255,86,.04)` hairlines, visible only behind the hero.
- A radial glow `rgba(193,255,86,.10)` may sit behind product imagery to suggest a spotlight.
- **No noise. No grain. No film overlays.**

### Borders, lines, shadows

- **Hairline 1px is the elevation system.** Cards have a 1px `accent-20` border, full stop.
- **Shadows are minimal** — used only for floating UI (drawer, dropdown menu) and for the lime focus ring (`0 0 24px rgba(193,255,86,.32)`).
- **No drop shadows on cards.** Hover = lift + border-color shift to solid accent.

### Corners

- **Default: 0px.** Sharp. No exceptions for cards, modals, inputs, buttons.
- **2–4px** allowed on micro-elements (toasts, focus rings).
- **999px (pill)** allowed only for filter chips and league/country tags — they're explicitly meant to feel like jersey patches.

### Imagery vibe

- Product photography is cool, high-contrast, slightly desaturated. Cool whites, deep neutrals. Never warm and sunny.
- Lifestyle photography (when used) is shot in stadium tunnels, locker rooms, training pitches. Empty, blue-hour, no faces.
- The brand has **no illustrations**. Vector silhouettes are acceptable as placeholders, but every shipped product needs a photograph.

### Animation

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — fast out, slow settle. Sport / mechanical feel.
- **Durations:** 80ms (press), 160ms (hover / state), 240ms (page transition), 320ms (drawer slide), 400ms (long fades).
- **No springs. No bounces. No physics.** Everything resolves linearly toward its end state.
- **Tickers move linearly** at 40s end-to-end. The lime top ticker is the brand's most distinctive motion.

### Hover & press

- **Buttons:** primary → step to `accent-hi` (lighter lime) on hover, `accent-lo` (darker) on press, scale 0.98 on press.
- **Cards:** translateY(−4px) on hover, border-color goes from `accent-20` → solid `accent` is *not* applied to cards (avoid lime overload). Cards lift only.
- **Nav links:** color goes from `fg-2` to `fg-1` on hover, with active state getting a 1px lime underline.
- **Icon buttons:** background fills to `--bg-3` on hover. Never animate the icon itself.

### Transparency & blur

- **Modal/drawer backdrop:** `rgba(0,0,0,.5–.6)` + `backdrop-filter: blur(4px)`.
- That is the only place transparency is used. Cards are opaque solids.

### Cards (full anatomy)

```
┌──────────────────────────┐   1px accent-20 border (never shadow)
│ ┌──────────────────────┐ │   image area 5:4, dark radial gradient backplate
│ │     [SVG/IMG]        │ │   12-col grid texture behind image at 3% lime
│ │  badge   wish ♥      │ │   badge top-left, wishlist top-right
│ │              KIT     │ │   kit label bottom-right
│ └──────────────────────┘ │
│                          │
│ Spain                    │   24px kicker in lime
│ 29'99 $                  │   14px price in white, tabular nums
│ [S][M][L][XL][+2]        │   sizes are 40px squares, accent-20 border
└──────────────────────────┘
```

### Layout

- **12-column grid, 1440 max-width, 24px gutters.** 32px outer padding on desktop.
- **4-col on mobile**, 16px outer, 12px gap. Everything stacks below 768px.
- **Product grid:** 4-up desktop, 3-up tablet, 2-up small tablet, 1-up mobile. Cards touch (no padding between them at the page edge).

---

## Iconography

See `assets/icons/` and `preview/iconography.html`. The system uses **Lucide-style outline icons**: 1.4px stroke, 24px box, no fills, sharp joins, square line-caps off (use round line-caps for slightly less harsh corners on small icons). Inline SVGs (the `<Icon>` component in `ui_kits/storefront/Icon.jsx`) are the recommended distribution — not a font, not a sprite.

Standard icon set (all in `Icon.jsx`):
`bag, search, user, heart, filter, arrow, arrowL, close, plus, minus, check, globe, truck, shield, spark, menu`

**Rules:**
- Never invent an icon — if it isn't in the set, take the nearest Lucide icon as inline SVG and add it to `Icon.jsx`.
- Never use emoji as iconography.
- Never use unicode glyphs as icons (e.g. ★ ✓ ✕). Use the SVG.
- **No PNG icons anywhere.**
- Icons inherit `currentColor` from their text container — use `color:` not `fill:`.

---

## Caveats & flags

1. **Color conflict — please confirm.** The user brief asked for "gold/beige accents," but the Figma file uses **electric lime (`#C1FF56`)** as the brand color. I prioritized the Figma as source of truth and built the system around lime ("Voltron lime"). A complete **alt "Champion" gold/beige palette** is documented (see `preview/colors-alt-champion.html`) and ready to swap in. **Tell me which is correct and I'll re-skin in one pass.**
2. **Small Figma footprint.** The Figma has only two frames — a logo lockup and a single product card. Everything else (header, hero, PDP, drawer, footer, button states, motion) is extrapolated from those two frames + the brief. Worth a review pass.
3. **No real product photography.** Jerseys are drawn as two-color SVG silhouettes. Production needs photographs.
4. **Icon set substituted.** No icons exist in the Figma. I substituted Lucide-style 1.4px outline icons, inlined in `Icon.jsx`. Flag if you have an existing icon library.
5. **No slide template provided** → no `slides/` folder created.

---

## Where to look next

- **Components in action:** `ui_kits/storefront/index.html`
- **Token reference:** `colors_and_type.css`
- **Visual cards:** open the **Design System** tab in this project.
