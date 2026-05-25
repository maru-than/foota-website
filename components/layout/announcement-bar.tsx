const ITEMS = [
  "Worldwide shipping available",
  "World Cup 2026 · all 48 nations",
  "Official home shirts",
  "Dispatched in 48h",
];

// Lime marquee ticker — the brand's most distinctive motion.
export function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 overflow-hidden bg-accent text-bg-1">
      <div className="flex h-7 items-center">
        <div className="flex w-max shrink-0 animate-ticker items-center gap-8 pl-8">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              {item}
              <span className="size-1 rounded-full bg-bg-1" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
