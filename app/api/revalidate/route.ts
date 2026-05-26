/**
 * @file Shopify revalidation webhook — refreshes cached products/collections on demand, secret-gated.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { TAGS } from "@/lib/shopify/client";

/**
 * Revalidation webhook for Shopify. Point Shopify product/collection webhooks
 * here (e.g. /api/revalidate?secret=...) to refresh cached Storefront data
 * on demand. Protected by SHOPIFY_REVALIDATION_SECRET when set.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.SHOPIFY_REVALIDATION_SECRET;

  if (expected && secret !== expected) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  // Next 16: revalidateTag takes a cache-life profile; { expire: 0 } purges now.
  revalidateTag(TAGS.products, { expire: 0 });
  revalidateTag(TAGS.collections, { expire: 0 });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
