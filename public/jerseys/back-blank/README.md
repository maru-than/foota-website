# Back-of-shirt blanks

These photographs back the live preview on the PDP — the typed name and
number are overlaid via SVG. **Five files** cover the entire catalogue.

## Expected files

| File | Kit type | Used when |
|---|---|---|
| `home.webp` | Home | `meta.type === "Home"` (default) |
| `away.webp` | Away | `meta.type === "Away"` |
| `third.webp` | Third | `meta.type === "Third"` |
| `goalkeeper.webp` | Goalkeeper | `meta.type === "Goalkeeper"` |
| `default.webp` | Fallback | anything else / `null` |

## Shooting spec

- Aspect ratio 4:5 portrait. Suggested 1200×1500 px (WebP, quality ≈ 85).
- Backdrop: matte near-black (`bg-bg-0` ≈ `#0A0A0A`). No gradients.
- Hard rim-light from upper-left, deep shadow falloff right.
- Shirt laid flat, hanger lines and creases minimised; collar centred.
- Leave the upper-back region (roughly y = 60–110 in viewBox units) and
  the centre region (y = 130–200) **uncluttered** — the SVG overlay
  draws the name there at y ≈ 92 and the number at y ≈ 160.
- 35mm grain is fine. Avoid logos that would clash with the overlay.

## Wiring

Loaded by [`components/product/customise/back-preview.tsx`](../../../components/product/customise/back-preview.tsx)
via `next/image`. If a file is missing or 404s, `BackPreview` falls back
to a pure SVG silhouette with team-derived colours — the feature stays
usable while assets are in production.
