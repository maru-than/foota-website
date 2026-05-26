# Back-of-shirt hero frames

Optional photographs that can replace the SVG-rendered back frames in
the homepage hero rotation. Currently the hero uses inline SVG only
(see `components/home/hero.tsx`, `HeroBackFrame`); these assets exist
for a future swap-in.

## Suggested files

Four to eight WebP frames following the same naming as the hero front
slides: `argentina-back.webp`, `portugal-back.webp`, `france-back.webp`,
`custom-back.webp`, etc.

## Shooting spec

- Aspect ratio 4:5 portrait, 1200×1500 px, WebP quality 85.
- Same backdrop and lighting as `back-blank/` so the rotation reads as
  a coherent set.
- Crucially: the printed name + number should already be in-shot.
  Suggested set:
  - `argentina-back.webp` → `MESSI 10`
  - `portugal-back.webp` → `RONALDO 7`
  - `france-back.webp` → `MBAPPÉ 10`
  - `custom-back.webp` → `YOUR NAME 26`

## Wiring

To enable the photo path, edit `components/home/hero.tsx`:
swap the `<HeroBackFrame>` component for a `<next/image>` reading
`/jerseys/back-hero/{slug}-back.webp`, keeping `HeroBackFrame` as the
onError fallback.
