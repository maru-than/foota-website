import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bag",
  description: "Your bag at Worldkit Soccer.",
  alternates: { canonical: "/cart" },
  // robots.ts already disallows /cart — match in meta for crawlers that
  // ignore robots.txt directives in favour of page-level signals.
  robots: { index: false, follow: true },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
