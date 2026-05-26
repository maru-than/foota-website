export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Hosts", href: "/collections/hosts" },
  { label: "Customise", href: "/customise" },
  { label: "Europe", href: "/collections/uefa" },
  { label: "South America", href: "/collections/conmebol" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Nations", href: "/shop" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Hosts", href: "/collections/hosts" },
      { label: "Customise", href: "/customise" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Confederations",
    links: [
      { label: "Europe", href: "/collections/uefa" },
      { label: "South America", href: "/collections/conmebol" },
      { label: "N. & C. America", href: "/collections/concacaf" },
      { label: "Africa", href: "/collections/caf" },
      { label: "Asia", href: "/collections/afc" },
      { label: "Oceania", href: "/collections/ofc" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Authenticity", href: "/authenticity" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Worldkit",
    links: [{ label: "About", href: "/about" }],
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
