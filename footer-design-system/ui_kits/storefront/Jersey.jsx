// Stylized jersey placeholder — used in place of product photography.
// Two-color, sharp lines, matching the brand's linear aesthetic.
function Jersey({ color1 = "#C8102E", color2 = "#FFC400", number = "10", name = "", style }) {
  return (
    <svg viewBox="0 0 200 240" style={{ width: "100%", height: "100%", display: "block", ...style }}>
      <defs>
        <clipPath id={`clip-${color1}-${color2}`}>
          <path d="M40 40 L70 30 L80 42 Q100 52 120 42 L130 30 L160 40 L175 70 L155 80 L155 200 Q155 210 145 210 L55 210 Q45 210 45 200 L45 80 L25 70 Z"/>
        </clipPath>
      </defs>
      {/* body */}
      <path d="M40 40 L70 30 L80 42 Q100 52 120 42 L130 30 L160 40 L175 70 L155 80 L155 200 Q155 210 145 210 L55 210 Q45 210 45 200 L45 80 L25 70 Z"
            fill={color1} stroke="rgba(0,0,0,.25)" strokeWidth="1"/>
      {/* secondary band */}
      <g clipPath={`url(#clip-${color1}-${color2})`}>
        <rect x="0" y="80" width="200" height="22" fill={color2} opacity="0.92"/>
        <rect x="0" y="160" width="200" height="14" fill={color2} opacity="0.65"/>
      </g>
      {/* collar */}
      <path d="M80 42 Q100 56 120 42 L116 50 Q100 60 84 50 Z" fill="rgba(0,0,0,.35)"/>
      {/* number */}
      {number && (
        <text x="100" y="148" textAnchor="middle"
              fontFamily="Geist, sans-serif" fontWeight="800" fontSize="58"
              letterSpacing="-3" fill={color2}>{number}</text>
      )}
      {name && (
        <text x="100" y="108" textAnchor="middle"
              fontFamily="Geist, sans-serif" fontWeight="700" fontSize="11"
              letterSpacing="2" fill={color2} style={{textTransform:"uppercase"}}>{name}</text>
      )}
      {/* sleeve shadow lines */}
      <path d="M40 40 L25 70 L45 80" fill="rgba(0,0,0,.18)"/>
      <path d="M160 40 L175 70 L155 80" fill="rgba(0,0,0,.18)"/>
    </svg>
  );
}
window.Jersey = Jersey;
