export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Clubs", href: "/collections/club-jerseys" },
  { label: "Nations", href: "/collections/national-teams" },
  { label: "Retro", href: "/collections/retro-classics" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Jerseys", href: "/shop" },
      { label: "Club Jerseys", href: "/collections/club-jerseys" },
      { label: "National Teams", href: "/collections/national-teams" },
      { label: "Retro Classics", href: "/collections/retro-classics" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Authenticity", href: "/authenticity" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Foota",
    links: [
      { label: "About", href: "/about" },
      { label: "Search", href: "/search" },
    ],
  },
];
