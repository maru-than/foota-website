import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SiteAnalytics } from "@/components/layout/site-analytics";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getCart } from "@/lib/shopify/cart";
import { getCollectionProducts } from "@/lib/shopify/collections";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Gambarino — Worldkit display face, used for hero lockups only.
const gambarino = localFont({
  src: "./fonts/Gambarino-Regular.woff2",
  variable: "--font-gambarino",
  weight: "400",
  style: "normal",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Worldkit Soccer | A home for jerseys",
    template: "%s | Worldkit Soccer",
  },
  description:
    "Shop 2026 international home jerseys for every nation in the 48-team field — dispatched worldwide.",
  applicationName: "Worldkit Soccer",
  keywords: [
    "2026 international football jerseys",
    "national team jerseys",
    "2026 home jerseys",
    "football shirts",
    "USA Canada Mexico 2026",
  ],
  authors: [{ name: "Worldkit Soccer" }],
  openGraph: {
    type: "website",
    siteName: "Worldkit Soccer",
    title: "Worldkit Soccer | A home for jerseys",
    description:
      "2026 international home jerseys from all 48 nations. A home for jerseys.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worldkit Soccer | A home for jerseys",
    description:
      "2026 international home jerseys from all 48 nations. A home for jerseys.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Required for env(safe-area-inset-*) to resolve to non-zero values on iOS;
  // unlocks the sticky-bar / sheet / announcement-bar insets below.
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [cart, bestSellers] = await Promise.all([
    getCart(),
    // Loaded once at layout — drawer uses them as the empty-state discovery
    // surface so an empty bag is a top-of-funnel, not a dead end.
    getCollectionProducts("best-sellers").then((p) => p.slice(0, 4)),
  ]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${gambarino.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* Enables CSS-only reveal animations; content stays visible without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg-1"
        >
          Skip to content
        </a>
        <CartProvider initialCart={cart}>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer recommendations={bestSellers} />
          <CookieBanner />
          <SiteAnalytics />
        </CartProvider>
      </body>
    </html>
  );
}
