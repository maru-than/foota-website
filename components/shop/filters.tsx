"use client";

/**
 * @file Filter drawer (mobile) / sidebar (desktop) — confederation, nation, type, era, size, price range.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getFilterValues as getValues, toggleFilterValue } from "@/lib/filters";
import type { Facets } from "@/lib/shopify/products";
import { cn } from "@/lib/utils";

function FilterGroup({
  title,
  scroll,
  children,
}: {
  title: string;
  scroll?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line-1 py-5 first:border-t-0 first:pt-0">
      <h3 className="eyebrow mb-3 text-fg-3">{title}</h3>
      {/* On mobile the drawer scrolls already; nesting a scroll region inside
          it traps touch. Only constrain height from md: up where the panel is
          a desktop sidebar. */}
      <div className={cn(scroll && "md:no-scrollbar md:max-h-44 md:overflow-y-auto")}>
        {children}
      </div>
    </div>
  );
}

function CheckRow({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-2.5 py-2 text-sm">
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-accent bg-accent text-bg-1" : "border-line-accent",
        )}
      >
        {checked ? <Check className="size-3" strokeWidth={2.5} /> : null}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
      <span className={cn(checked ? "text-fg-1" : "text-fg-2")}>{label}</span>
    </label>
  );
}

export function FilterPanel({
  facets,
  /** When true (desktop sidebar), the panel renders its own "Filters /
   *  Clear all" header. The drawer hides it because the Sheet title already
   *  says "Filters" — avoids the duplicate label on mobile. */
  showHeader = true,
}: {
  facets: Facets;
  showHeader?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = (params: URLSearchParams) => {
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (key: string, value: string) => {
    push(toggleFilterValue(searchParams, key, value));
  };

  const groups: { key: string; title: string; values: string[]; scroll?: boolean }[] = [
    { key: "confederation", title: "Confederation", values: facets.confederations },
    { key: "nation", title: "Nation", values: facets.nations, scroll: true },
    { key: "type", title: "Type", values: facets.types },
    { key: "era", title: "Era", values: facets.eras },
    { key: "size", title: "Size", values: facets.sizes },
  ];

  const activeCount = groups.reduce(
    (sum, g) => sum + getValues(searchParams, g.key).length,
    0,
  );
  const hasPrice =
    Boolean(searchParams.get("minPrice")) || Boolean(searchParams.get("maxPrice"));
  const showClear = activeCount > 0 || hasPrice;

  return (
    <div>
      {showHeader ? (
        <div className="flex items-center justify-between pb-4">
          <span className="text-sm font-bold uppercase tracking-[0.12em]">Filters</span>
          {showClear ? (
            <button
              type="button"
              onClick={() => router.push(pathname, { scroll: false })}
              className="text-xs uppercase tracking-[0.1em] text-fg-3 transition-colors hover:text-accent"
            >
              Clear all
            </button>
          ) : null}
        </div>
      ) : showClear ? (
        // Drawer: keep "Clear all" reachable without the duplicate "Filters"
        // label — anchored right-aligned above the first group.
        <div className="flex justify-end pb-2">
          <button
            type="button"
            onClick={() => router.push(pathname, { scroll: false })}
            className="text-xs uppercase tracking-[0.1em] text-fg-3 transition-colors hover:text-accent"
          >
            Clear all
          </button>
        </div>
      ) : null}

      {groups
        .filter((g) => g.values.length > 1)
        .map((group) => {
          const selected = getValues(searchParams, group.key);
          return (
            <FilterGroup key={group.key} title={group.title} scroll={group.scroll}>
              {group.values.map((value) => (
                <CheckRow
                  key={value}
                  label={value}
                  checked={selected.includes(value)}
                  onToggle={() => toggle(group.key, value)}
                />
              ))}
            </FilterGroup>
          );
        })}

      <FilterGroup title="Price">
        <PriceFilter
          key={`${searchParams.get("minPrice") ?? ""}-${searchParams.get("maxPrice") ?? ""}`}
          min={facets.priceRange.min}
          max={facets.priceRange.max}
        />
      </FilterGroup>
    </div>
  );
}

function PriceFilter({ min, max }: { min: number; max: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [minVal, setMinVal] = useState(() => searchParams.get("minPrice") ?? "");
  const [maxVal, setMaxVal] = useState(() => searchParams.get("maxPrice") ?? "");

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    if (minVal) params.set("minPrice", minVal);
    else params.delete("minPrice");
    if (maxVal) params.set("maxPrice", maxVal);
    else params.delete("maxPrice");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Input
          type="number"
          inputMode="numeric"
          aria-label="Minimum price"
          placeholder={String(min)}
          value={minVal}
          onChange={(e) => setMinVal(e.target.value)}
          className="h-11 px-3"
        />
        <span className="text-fg-3">–</span>
        <Input
          type="number"
          inputMode="numeric"
          aria-label="Maximum price"
          placeholder={String(max)}
          value={maxVal}
          onChange={(e) => setMaxVal(e.target.value)}
          className="h-11 px-3"
        />
      </div>
      <Button variant="secondary" size="sm" onClick={apply} className="w-full">
        Apply
      </Button>
    </div>
  );
}

export function FiltersDrawer({
  facets,
  resultCount,
}: {
  facets: Facets;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const keys = ["confederation", "nation", "type", "era", "size"];
  const active =
    keys.reduce((sum, k) => sum + getValues(searchParams, k).length, 0) +
    (searchParams.get("minPrice") || searchParams.get("maxPrice") ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm" className="lg:hidden">
          <SlidersHorizontal className="size-4" strokeWidth={1.5} />
          Filters{active > 0 ? ` (${active})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FilterPanel facets={facets} showHeader={false} />
        </div>
        <SheetFooter>
          <Button onClick={() => setOpen(false)} className="w-full">
            Show {resultCount} {resultCount === 1 ? "result" : "results"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
