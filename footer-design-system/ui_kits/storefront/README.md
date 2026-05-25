# Foota Storefront — UI Kit

High-fidelity recreation of the Foota e-commerce experience. Built from the Figma product card (node `1:10`) and the brand-logo frame (`1:2`).

## What's here

| File | Purpose |
|---|---|
| `index.html`       | Full interactive demo. Open this. |
| `App.jsx`          | Top-level page composition + bag state |
| `Header.jsx`       | Sticky header with lime ticker + main nav + bag counter |
| `Hero.jsx`         | Landing hero with FOOTA display wordmark + featured jersey |
| `Filters.jsx`*     | Filter pills + sort dropdown (in `ProductGrid.jsx`) |
| `ProductGrid.jsx`  | 4-up grid |
| `ProductCard.jsx`  | 300×500 jersey card — direct port from Figma frame 1:10 |
| `PDP.jsx`          | Product detail modal — size grid, custom name/number, info badges |
| `BagDrawer.jsx`    | Right-side cart drawer with quantity, subtotal, shipping, total |
| `Footer.jsx`       | Big-logo footer + newsletter capture |
| `Jersey.jsx`       | Stylized jersey SVG placeholder (two-color) |
| `Icon.jsx`         | Lucide-style outline icon set |
| `data.js`          | Demo jersey catalog (12 national kits) |
| `storefront.css`   | All component styles |

## Interactions to try

1. **Filter** by league pill (only "All" and "National" have items in the demo data).
2. **Sort** by price or newest in the dropdown.
3. **Click a card** → product detail modal opens.
4. **Pick a size** → "Add to bag" button activates and shows the price.
5. **Type a name** (max 12 chars) and/or shirt number → previewed live on the jersey SVG.
6. **Add to bag** → bag drawer slides in from the right with the item.
7. **Adjust qty / remove** in the drawer; see subtotal / shipping / total update.

## Anatomy notes

- **Card** — direct port from Figma: dark `#222` fill, `accent-20` hairline border, kicker = country name in lime, sizes are 40px squares.
- **PDP** — extends the card pattern. Same lime kicker treatment on the country name. Underline-only inputs for custom name/number.
- **Header ticker** — full-width lime bar with marquee. Reinforces the "drop" / "new arrival" sport-retail feel.
- **No shadows on cards.** Elevation is communicated with the lime hairline border, never blur.
- **Hover = lift 4px + lime border.** Press = scale 0.98. No spring physics anywhere.

## What's intentionally minimal

- No real images — jerseys are vector placeholders. Replace `<Jersey>` with real product photography.
- No real checkout — the button alerts.
- Search and account buttons are present but no-op (UI kit scope).
- Filter coverage is limited (only `National` and `All` resolve to results in demo data).
