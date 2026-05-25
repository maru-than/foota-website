# Foota Jerseys

A premium headless Shopify storefront for authentic, retro and iconic football jerseys — _"A home for jerseys."_

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui** style primitives. Shopify is the commerce backend (products, variants, inventory, collections, discounts, **checkout, payments and orders**); this app owns the entire storefront experience.

> The storefront runs immediately with realistic **mock data**. Add three Shopify env vars and it switches to live Storefront API data — no code changes.

## Features

- Editorial homepage (hero, featured collections, new arrivals, editorial banner, shop-by-club, newsletter)
- Shop with sidebar/drawer filters (club, nation, season, size, type, era, price) and sorting
- Collection pages (`/collections/[handle]`) and product pages (`/products/[handle]`) with gallery, variant selector, details accordion, related products and a sticky mobile add-to-cart
- Persistent cart (cookie-backed, survives reloads) with an optimistic slide-out drawer and a full cart page
- Header search overlay + dedicated `/search` page
- Shopify-hosted checkout via `cart.checkoutUrl` — no custom checkout
- SEO: dynamic metadata, Open Graph image, sitemap and robots
- Mobile-first, accessible (Radix primitives), CSS-only animations

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — runs on mock data without it
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting Shopify

1. In your Shopify admin: **Settings → Apps and sales channels → Develop apps** → create an app.
2. Enable the **Storefront API** and install the app, then copy the **Storefront API access token**.
3. Set these in `.env.local`:

   ```bash
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   SHOPIFY_STOREFRONT_API_VERSION=2025-01
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. Restart the dev server. The storefront now reads live products, collections and carts.

### Jersey metadata (product tags)

Club / nation / season / type / era / badge are derived from **product tags** so no metafield setup is required to start. Tag products like:

```
club:AC Milan        nation:Brazil        season:2006/07
type:Home            era:Retro            badge:Rare Find
```

- `type`: `Home` · `Away` · `Third` · `Goalkeeper`
- `era`: `Current` · `Retro`
- `badge`: `New` · `Retro` · `Rare Find`

Collections used by the nav: `club-jerseys`, `national-teams`, `retro-classics`, `new-arrivals`.

### Cache revalidation (optional)

Point a Shopify webhook at `POST /api/revalidate?secret=YOUR_SECRET` (set `SHOPIFY_REVALIDATION_SECRET`) to refresh cached Storefront data on product/collection changes.

## Architecture

```
app/                     App Router pages, layouts, route handlers, server actions
components/
  layout/ home/ product/ cart/ shop/ search/ contact/ ui/
lib/
  shopify/               client · queries · mutations · types · reshape · products · collections · cart
  mock-data.ts           offline catalogue (matches the normalized types)
  filters.ts utils.ts navigation.ts
```

- **Server Components** fetch data through `lib/shopify/*`, which calls the Storefront API when configured and falls back to mock data otherwise.
- **Client Components** (cart drawer, filters, variant selection, search, mobile nav) handle interactivity. Cart mutations go through **Server Actions** (`app/actions/cart.ts`); the cart id is stored in an httpOnly cookie.
- Product/collection reads are cached with `next: { revalidate, tags }`; cart reads use `no-store`.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Deploying to Vercel

Push to a Git repo, import it in Vercel, and add the environment variables above in **Project → Settings → Environment Variables**. Shopify CDN images are already allow-listed in `next.config.ts`.
