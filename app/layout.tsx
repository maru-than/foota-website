import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getCart } from "@/lib/shopify/cart";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Gambarino — Foota display face, used for the logo and hero lockups only.
const gambarino = localFont({
  src: "./fonts/Gambarino-Regular.otf",
  variable: "--font-gambarino",
  weight: "400",
  style: "normal",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Foota Jerseys | A home for jerseys",
    template: "%s | Foota Jerseys",
  },
  description:
    "Shop official 2026 FIFA World Cup home jerseys — all 48 nations, dispatched worldwide.",
  applicationName: "Foota Jerseys",
  keywords: [
    "World Cup 2026 jerseys",
    "FIFA World Cup 2026 shirts",
    "national team jerseys",
    "2026 home jerseys",
    "football shirts",
    "USA Canada Mexico 2026",
  ],
  authors: [{ name: "Foota Jerseys" }],
  openGraph: {
    type: "website",
    siteName: "Foota Jerseys",
    title: "Foota Jerseys | A home for jerseys",
    description:
      "Official 2026 FIFA World Cup home jerseys from all 48 nations. A home for jerseys.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foota Jerseys | A home for jerseys",
    description:
      "Official 2026 FIFA World Cup home jerseys from all 48 nations. A home for jerseys.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = await getCart();

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
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
