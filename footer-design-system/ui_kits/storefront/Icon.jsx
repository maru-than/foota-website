// Shared SVG icons — Lucide-style 1.4px outline, 24px box.
function Icon({ name, size = 22, stroke = 1.4, style }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style };
  switch (name) {
    case "bag":    return <svg {...common}><path d="M5 7h14l-1.2 12.4a2 2 0 0 1-2 1.6H8.2a2 2 0 0 1-2-1.6L5 7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>;
    case "search": return <svg {...common}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg>;
    case "user":   return <svg {...common}><circle cx="12" cy="9" r="3.5"/><path d="M5 20c1.4-3.5 4-5 7-5s5.6 1.5 7 5"/></svg>;
    case "heart":  return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case "filter": return <svg {...common}><path d="M4 6h16M7 12h10m-7 6h4"/></svg>;
    case "arrow":  return <svg {...common}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
    case "arrowL": return <svg {...common}><path d="M19 12H5m5 5-5-5 5-5"/></svg>;
    case "close":  return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case "plus":   return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":  return <svg {...common}><path d="M5 12h14"/></svg>;
    case "check":  return <svg {...common}><path d="m4 12 5 5L20 6"/></svg>;
    case "globe":  return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16"/></svg>;
    case "truck":  return <svg {...common}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>;
    case "shield": return <svg {...common}><path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z"/></svg>;
    case "spark":  return <svg {...common}><path d="M12 3v6m0 6v6M3 12h6m6 0h6M5.5 5.5l4 4m5 5 4 4M5.5 18.5l4-4m5-5 4-4"/></svg>;
    case "menu":   return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    default:       return null;
  }
}
window.Icon = Icon;
