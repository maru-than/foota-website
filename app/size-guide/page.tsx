import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Measurements for football shirts by size, plus how to measure and choose your fit.",
};

const ROWS = [
  { size: "S", chest: "48", length: "70" },
  { size: "M", chest: "52", length: "72" },
  { size: "L", chest: "56", length: "74" },
  { size: "XL", chest: "60", length: "76" },
  { size: "XXL", chest: "64", length: "78" },
];

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Size Guide"
        description="Shirts vary by era and manufacturer — use these measurements as a guide before picking your size."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10">
          <div className="overflow-hidden border border-line-accent">
            <table className="w-full text-sm">
              <thead className="bg-bg-2 text-left">
                <tr className="[&_th]:px-5 [&_th]:py-3 [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.08em] [&_th]:text-fg-1">
                  <th>Size</th>
                  <th>Chest — pit to pit (cm)</th>
                  <th>Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.size}
                    className="border-t border-line-1 [&_td]:px-5 [&_td]:py-3"
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
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-fg-1">
              How to measure
            </h2>
            <p>
              Lay a shirt that fits you well flat and measure across the chest
              from armpit to armpit, then from the top of the shoulder to the hem
              for length. Compare to the table above.
            </p>
            <p>
              Retro shirts often fit smaller and shorter than modern kits — if
              you&apos;re between sizes on a vintage shirt, size up.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
