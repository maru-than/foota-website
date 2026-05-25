// Jersey data — fictional teams and prices for the storefront demo.
window.FOOTA_DATA = {
  jerseys: [
    { id: "esp-h", country: "Spain",    league: "National", year: "24/25", price: 29.99, sizes: ["S","M","L","XL","XXL","XXXL"], color1: "#C8102E", color2: "#FFC400", kit: "Home",   isNew: true,  badge: "New drop" },
    { id: "fra-h", country: "France",   league: "National", year: "24/25", price: 32.99, sizes: ["S","M","L","XL"],               color1: "#1A2B6E", color2: "#FFFFFF", kit: "Home",   isNew: false, badge: null },
    { id: "ger-a", country: "Germany",  league: "National", year: "24/25", price: 32.99, sizes: ["S","M","L","XL","XXL"],         color1: "#E60026", color2: "#1A1A1A", kit: "Away",   isNew: false, badge: "Limited" },
    { id: "ita-h", country: "Italy",    league: "National", year: "24/25", price: 29.99, sizes: ["S","M","L","XL","XXL"],         color1: "#0A4F8C", color2: "#FFD700", kit: "Home",   isNew: false, badge: null },
    { id: "arg-h", country: "Argentina",league: "National", year: "24/25", price: 34.99, sizes: ["M","L","XL"],                   color1: "#6CACE4", color2: "#FFFFFF", kit: "Home",   isNew: true,  badge: "New drop" },
    { id: "bra-h", country: "Brazil",   league: "National", year: "24/25", price: 34.99, sizes: ["S","L","XL","XXL"],             color1: "#FEDF00", color2: "#009C3B", kit: "Home",   isNew: false, badge: null },
    { id: "por-h", country: "Portugal", league: "National", year: "24/25", price: 29.99, sizes: ["S","M","L"],                    color1: "#8B0000", color2: "#006400", kit: "Home",   isNew: false, badge: null },
    { id: "ned-h", country: "Netherlands", league: "National", year: "24/25", price: 32.99, sizes: ["S","M","L","XL"],            color1: "#FF6600", color2: "#1A1A1A", kit: "Home",   isNew: false, badge: "−20%" },
    { id: "eng-a", country: "England",  league: "National", year: "24/25", price: 32.99, sizes: ["L","XL"],                       color1: "#E60026", color2: "#FFFFFF", kit: "Away",   isNew: false, badge: null },
    { id: "bel-h", country: "Belgium",  league: "National", year: "24/25", price: 29.99, sizes: ["S","M","L","XL","XXL"],         color1: "#1A1A1A", color2: "#FFC400", kit: "Home",   isNew: false, badge: null },
    { id: "cro-h", country: "Croatia",  league: "National", year: "24/25", price: 29.99, sizes: ["S","M","L"],                    color1: "#FFFFFF", color2: "#C8102E", kit: "Home",   isNew: true,  badge: "New drop" },
    { id: "uru-h", country: "Uruguay",  league: "National", year: "24/25", price: 27.99, sizes: ["M","L","XL"],                   color1: "#6CACE4", color2: "#1A1A1A", kit: "Home",   isNew: false, badge: null },
  ],

  leagues: ["All", "National", "La Liga", "Premier League", "Serie A", "Bundesliga", "Retro"],
  kits: ["Home", "Away", "Third", "Keeper"],
  sortOptions: ["Newest", "Price: low → high", "Price: high → low", "Bestseller"],

  hero: {
    eyebrow: "Drop 17 · live",
    title: "Match-ready",
    subtitle: "The home of soccer jerseys. Imported direct, dispatched in 48h, printed in-house.",
    cta: "Shop new arrivals"
  }
};
