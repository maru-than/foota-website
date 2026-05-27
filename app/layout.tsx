/**
 * @file Root layout — Geist font, header, footer, cart provider, cookie banner, analytics, viewport.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { CookieBanner } from "@/components/layout/cookie-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SiteAnalytics } from "@/components/layout/site-analytics";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Toaster } from "@/components/ui/sonner";
import { getCart } from "@/lib/shopify/cart";
import { getCollectionProducts } from "@/lib/shopify/collections";
import { resolveSiteUrl } from "@/lib/site-url";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Worldkit Soccer | A home for jerseys",
    template: "%s | Worldkit Soccer",
  },
  description:
    "Shop 2026 FIFA World Cup home and away jerseys for every nation in the 48-team field — dispatched worldwide.",
  applicationName: "Worldkit Soccer",
  keywords: [
    "2026 World Cup jerseys",
    "national team jerseys",
    "2026 home and away kits",
    "football shirts",
    "USA Canada Mexico 2026",
  ],
  authors: [{ name: "Worldkit Soccer" }],
  openGraph: {
    type: "website",
    siteName: "Worldkit Soccer",
    title: "Worldkit Soccer | A home for jerseys",
    description:
      "2026 World Cup home and away jerseys from all 48 nations. A home for jerseys.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worldkit Soccer | A home for jerseys",
    description:
      "2026 World Cup home and away jerseys from all 48 nations. A home for jerseys.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
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
    <html lang="en" suppressHydrationWarning className={`dark ${geist.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <CartProvider initialCart={cart}>
          <Header />
          {/* Top padding on desktop reserves space for the fixed floating
              header pill (top-6 + h-14 = ~80px); mobile keeps its sticky
              flow-anchored header so no padding needed. */}
          <main id="main" className="flex-1 lg:pt-24">
            {children}
          </main>
          <Footer />
          <CartDrawer recommendations={bestSellers} />
          <CookieBanner />
          <SiteAnalytics />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
