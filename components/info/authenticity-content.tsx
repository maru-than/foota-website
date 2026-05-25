/** Shared authenticity / quality-check body. Used by route page and modal. */

const POINTS = [
  {
    name: "Inspected on arrival",
    text: "Every shirt is checked against reference photos before it leaves the warehouse.",
  },
  {
    name: "Stitching & finish",
    text: "Each piece is examined for print, badge alignment and seam quality.",
  },
  {
    name: "Dispatched worldwide",
    text: "Tracked shipping to every nation, dispatched within 48 hours.",
  },
];

export function AuthenticityContent() {
  return (
    <div className="space-y-8 text-pretty leading-relaxed text-fg-2 [&_h3]:text-fg-1">
      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">What you get</h3>
        <p>
          Foota stocks 2026 home jerseys for all 48 nations in the field. Every
          jersey is inspected on arrival — stitching, crest, fonts and finish
          are checked against reference photos before it ships.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {POINTS.map((point) => (
          <div key={point.name} className="border border-line-accent bg-bg-2 p-4">
            <h4 className="eyebrow text-accent">{point.name}</h4>
            <p className="mt-2 text-sm">{point.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Inspection</h3>
        <p>
          Each shirt is photographed, measured and condition-checked. Any
          notable details are described on the product page — no surprises when
          your jersey arrives.
        </p>
      </section>
    </div>
  );
}
