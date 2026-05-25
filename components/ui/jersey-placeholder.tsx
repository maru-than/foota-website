import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Two-color jersey SVG placeholder — ported from the Foota design    */
/*  system (ui_kits/storefront/Jersey.jsx). Used in place of product   */
/*  photography until real Shopify images connect.                     */
/* ------------------------------------------------------------------ */

const PALETTE: [string, string][] = [
  ["#C8102E", "#FFC400"],
  ["#1A2B6E", "#FFFFFF"],
  ["#E60026", "#101010"],
  ["#0A4F8C", "#FFD700"],
  ["#FEDF00", "#009C3B"],
  ["#FF6600", "#101010"],
  ["#6CACE4", "#FFFFFF"],
  ["#8B0000", "#E8DCC4"],
  ["#101010", "#C1FF56"],
  ["#5A2A83", "#FFC400"],
  ["#0F8A5F", "#FFFFFF"],
  ["#1A1A1A", "#FF6600"],
];

const NUMBERS = ["7", "9", "10", "11", "14", "23"];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic kit colors + shirt number derived from a seed (team name). */
export function teamColors(seed?: string | null) {
  const h = seed ? hash(seed) : 0;
  const [color1, color2] = PALETTE[h % PALETTE.length];
  return { color1, color2, number: NUMBERS[h % NUMBERS.length] };
}

export function Jersey({
  color1 = "#222222",
  color2 = "#C1FF56",
  number = "10",
  name = "",
  className,
}: {
  color1?: string;
  color2?: string;
  number?: string;
  name?: string;
  className?: string;
}) {
  const clipId = `jclip-${(color1 + color2).replace(/[^a-z0-9]/gi, "")}`;
  const body =
    "M40 40 L70 30 L80 42 Q100 52 120 42 L130 30 L160 40 L175 70 L155 80 L155 200 Q155 210 145 210 L55 210 Q45 210 45 200 L45 80 L25 70 Z";
  return (
    <svg viewBox="0 0 200 240" className={cn("block h-full w-full", className)} aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <path d={body} />
        </clipPath>
      </defs>
      <path d={body} fill={color1} stroke="rgba(0,0,0,.25)" strokeWidth="1" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="80" width="200" height="22" fill={color2} opacity="0.92" />
        <rect x="0" y="160" width="200" height="14" fill={color2} opacity="0.65" />
      </g>
      <path d="M80 42 Q100 56 120 42 L116 50 Q100 60 84 50 Z" fill="rgba(0,0,0,.35)" />
      {name ? (
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontFamily="var(--font-geist-sans), sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="2"
          fill={color2}
        >
          {name.toUpperCase()}
        </text>
      ) : null}
      {number ? (
        <text
          x="100"
          y="148"
          textAnchor="middle"
          fontFamily="var(--font-geist-sans), sans-serif"
          fontWeight="800"
          fontSize="58"
          letterSpacing="-3"
          fill={color2}
        >
          {number}
        </text>
      ) : null}
      <path d="M40 40 L25 70 L45 80" fill="rgba(0,0,0,.18)" />
      <path d="M160 40 L175 70 L155 80" fill="rgba(0,0,0,.18)" />
    </svg>
  );
}

/** Centered jersey for an image frame. Colors derived from the label/seed. */
export function JerseyPlaceholder({
  label,
  sublabel,
  number,
  className,
}: {
  label?: string;
  sublabel?: string;
  number?: string;
  className?: string;
}) {
  const c = teamColors(label ?? sublabel);
  return (
    <div className={cn("flex h-full w-full items-center justify-center p-5", className)}>
      <Jersey
        color1={c.color1}
        color2={c.color2}
        number={number ?? c.number}
        className="max-w-[72%]"
      />
    </div>
  );
}
