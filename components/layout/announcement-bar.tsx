/**
 * @file Sticky marquee ticker — lime background, rotating promotional messages, motion-aware.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

const ITEMS = [
  "Worldwide shipping available",
  "Summer 2026 · all 48 nations",
  "Home & away kits in stock",
  "Add your name & number · +$5",
  "Dispatched in 48h",
];

// Lime marquee ticker — the brand's most distinctive motion.
export function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 overflow-hidden bg-accent pt-[env(safe-area-inset-top)] text-bg-1">
      <div className="flex h-7 items-center">
        <div className="flex w-max shrink-0 animate-ticker items-center gap-8 pl-8 motion-reduce:animate-none">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8 whitespace-nowrap text-[11px] font-bold uppercase"
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
