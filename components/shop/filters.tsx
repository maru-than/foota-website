"use client";

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
import type { Facets } from "@/lib/shopify/products";
import { cn } from "@/lib/utils";

function getValues(params: URLSearchParams, key: string): string[] {
  return params.get(key)?.split(",").filter(Boolean) ?? [];
}

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
    <div className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <h3 className="eyebrow mb-3 text-ink">{title}</h3>
      <div className={cn(scroll && "max-h-44 overflow-y-auto pr-1")}>{children}</div>
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
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-ink bg-ink text-bone" : "border-line",
        )}
      >
        {checked ? <Check className="size-3" /> : null}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onToggle}
      />
      <span className="text-ink/80">{label}</span>
    </label>
  );
}

export function FilterPanel({ facets }: { facets: Facets }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = (params: URLSearchParams) => {
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = getValues(params, key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    if (next.length) params.set(key, next.join(","));
    else params.delete(key);
    push(params);
  };

  const groups: { key: string; title: string; values: string[]; scroll?: boolean }[] = [
    { key: "club", title: "Club", values: facets.clubs, scroll: true },
    { key: "nation", title: "National Team", values: facets.nations, scroll: true },
    { key: "type", title: "Type", values: facets.types },
    { key: "era", title: "Era", values: facets.eras },
    { key: "season", title: "Season", values: facets.seasons, scroll: true },
    { key: "size", title: "Size", values: facets.sizes },
  ];

  const activeCount = groups.reduce(
    (sum, g) => sum + getValues(searchParams, g.key).length,
    0,
  );
  const hasPrice =
    Boolean(searchParams.get("minPrice")) || Boolean(searchParams.get("maxPrice"));

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <span className="text-sm font-medium">Filters</span>
        {activeCount > 0 || hasPrice ? (
          <button
            type="button"
            onClick={() => router.push(pathname, { scroll: false })}
            className="text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-burgundy"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {groups
        .filter((g) => g.values.length > 0)
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
          className="h-9 px-3"
        />
        <span className="text-muted">–</span>
        <Input
          type="number"
          inputMode="numeric"
          aria-label="Maximum price"
          placeholder={String(max)}
          value={maxVal}
          onChange={(e) => setMaxVal(e.target.value)}
          className="h-9 px-3"
        />
      </div>
      <Button variant="subtle" size="sm" onClick={apply} className="w-full">
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
  const keys = ["club", "nation", "type", "era", "season", "size"];
  const active =
    keys.reduce((sum, k) => sum + getValues(searchParams, k).length, 0) +
    (searchParams.get("minPrice") || searchParams.get("maxPrice") ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="subtle" size="sm" className="lg:hidden">
          <SlidersHorizontal className="size-4" />
          Filters{active > 0 ? ` (${active})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88%] p-0 sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FilterPanel facets={facets} />
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
