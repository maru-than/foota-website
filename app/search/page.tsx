/**
 * @file Search results page — server-side Shopify product search with suggestion fallbacks.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import type { SearchParamsRecord } from "@/lib/filters";
import { searchProducts } from "@/lib/shopify/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search World Cup 2026 jerseys by nation.",
  alternates: { canonical: "/search" },
};

const SUGGESTIONS = ["Brazil", "Argentina", "Morocco", "Japan", "USA"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : (sp.q ?? "")).trim();
  const results = q ? await searchProducts(q) : [];

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search jerseys"}
        description={
          q
            ? `${results.length} ${results.length === 1 ? "jersey" : "jerseys"} found.`
            : "Find a 2026 jersey by nation."
        }
      >
        <form action="/search" className="mt-6 flex max-w-md gap-2">
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search jerseys…"
            aria-label="Search jerseys"
          />
          <Button type="submit" className="shrink-0">
            Search
          </Button>
        </form>
      </PageHeader>

      <Container className="py-12 lg:py-16">
        {!q ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Try:</span>
            {SUGGESTIONS.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="border border-border bg-card px-3 py-1.5 transition-colors hover:border-primary hover:text-primary"
              >
                {term}
              </Link>
            ))}
          </div>
        ) : results.length > 0 ? (
          <ProductGrid products={results} priorityCount={4} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="font-display text-3xl text-foreground">
              No jerseys match “{q}”.
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              Try a nation — or browse all 48.
            </p>
            <Button asChild variant="secondary">
              <Link href="/shop">Browse all jerseys</Link>
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}
