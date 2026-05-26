# Customs collection tile

`customs.webp` (or `customs.png`) — the fourth tile in `FeaturedCollections`
on the homepage. Currently the tile renders an inline SVG with `YOUR NAME 26`
on a generated team back. To swap in real photography, drop a file at
`/public/collections/customs.webp` and add the entry to `COLLECTION_IMAGES`
in [`components/home/featured-collections.tsx`](../../components/home/featured-collections.tsx).

## Shooting spec

- Aspect ratio 3:4 portrait (matches the other collection tiles).
- Backdrop: same dark near-black `bg-bg-0` as the other collection tiles.
- Hero subject: a back of shirt with a large block name + big centred
  number. Suggested copy: `MARUTHAN 26` or another tester name so the
  picture itself sells the feature without copy.
- Compose for a dark-fade overlay across the bottom 40% (the tile
  applies `bg-gradient-to-t from-bg-0` for legend legibility).
- Treat it as the strongest single marketing surface on the homepage —
  it's the photograph that converts.
