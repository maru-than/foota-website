/**
 * @file Middleware — reads the Vercel geo header and refreshes the country cookie on each navigation for shipping zones.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { NextResponse, type NextRequest } from "next/server";

import { COOKIE } from "@/lib/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/* Vercel-style geo header. Edge runtime in production exposes this; locally it
   is absent — the shipping-promise component then falls back to its default
   "Rest of world" zone. */
function readCountry(req: NextRequest): string | undefined {
  const fromVercel = req.headers.get("x-vercel-ip-country");
  return fromVercel ? fromVercel.toUpperCase() : undefined;
}

export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const country = readCountry(req);
  const existingCountry = req.cookies.get(COOKIE.country)?.value;

  /* Refresh the country cookie whenever the geo header changes so the PDP's
     shipping line stays accurate after the user switches network/VPN. */
  if (country && country !== existingCountry) {
    res.cookies.set(COOKIE.country, country, { maxAge: ONE_YEAR, path: "/" });
  }
  return res;
}

export const config = {
  /* Skip static assets, the Next.js internals, image optimizer, and API
     routes — we only need to set the geo cookie on actual page navigations. */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|logo.png|robots.txt|sitemap.xml|api/.*|.*\\..*).*)",
  ],
};
