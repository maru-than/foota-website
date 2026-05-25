import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getCart } from "@/lib/shopify/cart";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    "Shop authentic, retro and iconic football jerseys from clubs and national teams around the world.",
  applicationName: "Foota Jerseys",
  keywords: [
    "football jerseys",
    "retro football shirts",
    "authentic football kits",
    "vintage football jerseys",
    "club jerseys",
    "national team jerseys",
  ],
  authors: [{ name: "Foota Jerseys" }],
  openGraph: {
    type: "website",
    siteName: "Foota Jerseys",
    title: "Foota Jerseys | A home for jerseys",
    description:
      "Discover authentic, retro and iconic football shirts from clubs and nations around the world.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foota Jerseys | A home for jerseys",
    description:
      "Discover authentic, retro and iconic football shirts from clubs and nations around the world.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F2EA",
  colorScheme: "light",
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
      className={`${geist.variable} ${fraunces.variable} h-full`}
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
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
