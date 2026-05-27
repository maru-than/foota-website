/**
 * @file Top-level navigation + footer link definitions — main nav, shop categories, help / legal.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Hosts", href: "/collections/hosts" },
  { label: "Customise", href: "/customise" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Nations", href: "/shop" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Hosts", href: "/collections/hosts" },
      { label: "Europe", href: "/collections/uefa" },
      { label: "South America", href: "/collections/conmebol" },
      { label: "Customise", href: "/customise" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Authenticity", href: "/authenticity" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];
