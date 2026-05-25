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
        description="Football shirts vary by era and manufacturer — use these measurements as a guide before choosing your size."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10">
          <div className="overflow-hidden border border-line">
            <table className="w-full text-sm">
              <thead className="bg-paper text-left">
                <tr className="[&_th]:px-5 [&_th]:py-3 [&_th]:font-medium">
                  <th>Size</th>
                  <th>Chest — pit to pit (cm)</th>
                  <th>Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.size}
                    className="border-t border-line [&_td]:px-5 [&_td]:py-3"
                  >
                    <td className="font-medium">{row.size}</td>
                    <td className="text-muted">{row.chest}</td>
                    <td className="text-muted">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 text-pretty leading-relaxed text-muted">
            <h2 className="font-display text-2xl text-ink">How to measure</h2>
            <p>
              Lay a shirt that fits you well flat and measure across the chest
              from armpit to armpit, then from the top of the shoulder to the
              hem for length. Compare those numbers to the table above.
            </p>
            <p>
              Retro shirts often fit smaller and shorter than modern kits — if
              you&apos;re between sizes on a vintage shirt, we&apos;d suggest
              sizing up.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
