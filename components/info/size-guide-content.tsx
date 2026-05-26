/**
 * @file Shared size-guide body. Used by the /size-guide route page and the in-product modal. The wrapping…
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

const ROWS = [
  { size: "S", chest: "48", length: "70" },
  { size: "M", chest: "52", length: "72" },
  { size: "L", chest: "56", length: "74" },
  { size: "XL", chest: "60", length: "76" },
  { size: "XXL", chest: "64", length: "78" },
];

export function SizeGuideContent() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden border border-line-accent">
        <table className="w-full text-sm">
          <thead className="bg-bg-2 text-left">
            <tr className="[&_th]:px-4 [&_th]:py-3 [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.08em] [&_th]:text-fg-1 sm:[&_th]:px-5">
              <th>Size</th>
              <th>Chest (cm)</th>
              <th>Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr
                key={row.size}
                className="border-t border-line-1 [&_td]:px-4 [&_td]:py-3 sm:[&_td]:px-5"
              >
                <td className="font-bold tabular-nums text-fg-1">{row.size}</td>
                <td className="tabular-nums text-fg-2">{row.chest}</td>
                <td className="tabular-nums text-fg-2">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 text-pretty leading-relaxed text-fg-2">
        <h3 className="text-lg font-bold tracking-[-0.02em] text-fg-1">
          How to measure
        </h3>
        <p>
          Lay a shirt that fits you well flat and measure across the chest from
          armpit to armpit, then from the top of the shoulder to the hem for
          length. Compare to the table above.
        </p>
        <p>
          Retro shirts often fit smaller and shorter than modern kits — if
          you&apos;re between sizes on a vintage shirt, size up.
        </p>
      </div>
    </div>
  );
}
