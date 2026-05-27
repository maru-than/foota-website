"use client";

/**
 * @file Full-page search modal — real-time input, debounced server action, product cards, keyboard-aware.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { cn, formatPrice } from "@/lib/utils";
import { searchAction } from "@/app/actions/search";
import type { Product } from "@/lib/shopify/types";

export function SearchOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(next: boolean) {
    if (!next) {
      setQuery("");
      setResults([]);
    }
    onOpenChange(next);
  }

  useEffect(() => {
    const term = query.trim();
    const timer = setTimeout(
      () => {
        if (term.length < 2) {
          setResults([]);
          return;
        }
        startTransition(async () => {
          setResults(await searchAction(term));
        });
      },
      term.length < 2 ? 0 : 250,
    );
    return () => clearTimeout(timer);
  }, [query]);

  function goToResults(e: React.FormEvent | React.MouseEvent) {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    handleOpenChange(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  const showEmpty = query.trim().length >= 2 && results.length === 0 && !isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="top-[12vh] max-w-2xl translate-y-0 p-0"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        hideClose
      >
        <DialogTitle className="sr-only">Search jerseys</DialogTitle>
        <DialogDescription className="sr-only">
          Search World Cup 2026 jerseys by nation.
        </DialogDescription>

        <form
          onSubmit={goToResults}
          className="flex items-center gap-3 border-b border-border pl-5 pr-2"
        >
          <SearchIcon className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search nations…"
            className="h-14 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="shrink-0 px-3 py-2 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:text-primary"
          >
            Cancel
          </button>
        </form>

        <div className="max-h-[52vh] overflow-y-auto">
          {showEmpty ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              No jerseys match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : null}

          {results.length > 0 ? (
            <>
              <ul className="divide-y divide-line-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.handle}`}
                      onClick={() => handleOpenChange(false)}
                      className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-muted"
                    >
                      <div
                        className={cn(
                          "relative aspect-[4/5] w-11 shrink-0 overflow-hidden border border-border",
                          p.featuredImage ? "bg-white" : "bg-muted",
                        )}
                      >
                        {p.featuredImage ? (
                          <Image
                            src={p.featuredImage.url}
                            alt={p.featuredImage.altText}
                            fill
                            sizes="44px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <JerseyPlaceholder label={p.meta.teamName ?? undefined} className="p-1" />
                        )}
                      </div>
                      <div className="flex-1">
                        {p.meta.teamName ? (
                          <span className="text-[11px] uppercase text-primary">
                            {p.meta.teamName}
                          </span>
                        ) : null}
                        <p className="text-sm text-foreground">{p.title}</p>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-muted-foreground">
                        {formatPrice(
                          p.priceRange.minVariantPrice.amount,
                          p.priceRange.minVariantPrice.currencyCode,
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToResults}
                className="block w-full border-t border-border px-5 py-3 text-left text-xs uppercase text-primary transition-colors hover:bg-muted"
              >
                View all results
              </button>
            </>
          ) : null}

          {query.trim().length < 2 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              Try a nation — &ldquo;Brazil&rdquo;, &ldquo;Morocco&rdquo;,
              &ldquo;Argentina&rdquo;.
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
