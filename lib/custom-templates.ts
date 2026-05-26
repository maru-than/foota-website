/**
 * @file Customisation templates — quick-pick name + number combos.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

/* ------------------------------------------------------------------ */
/*  Customisation templates — quick-pick name + number combos.          */
/*                                                                      */
/*  Two tracks:                                                         */
/*    • LEGENDS — heroes most buyers want, by nation.                   */
/*    • SQUAD   — a small slice of the current senior squad, by nation. */
/*                                                                      */
/*  Anything not listed falls back to a small "starter" set so the      */
/*  template chooser is never empty.                                    */
/* ------------------------------------------------------------------ */

export interface CustomTemplate {
  name: string;
  number: string;
}

const LEGENDS: Record<string, CustomTemplate[]> = {
  Argentina: [
    { name: "MESSI", number: "10" },
    { name: "MARADONA", number: "10" },
    { name: "BATISTUTA", number: "9" },
  ],
  Brazil: [
    { name: "PELÉ", number: "10" },
    { name: "RONALDO", number: "9" },
    { name: "RONALDINHO", number: "10" },
  ],
  France: [
    { name: "ZIDANE", number: "10" },
    { name: "HENRY", number: "12" },
    { name: "PLATINI", number: "10" },
  ],
  England: [
    { name: "BECKHAM", number: "7" },
    { name: "ROONEY", number: "10" },
    { name: "LINEKER", number: "10" },
  ],
  Germany: [
    { name: "BECKENBAUER", number: "5" },
    { name: "MÜLLER", number: "13" },
    { name: "KLINSMANN", number: "18" },
  ],
  Spain: [
    { name: "RAÚL", number: "7" },
    { name: "INIESTA", number: "8" },
    { name: "XAVI", number: "6" },
  ],
  Portugal: [
    { name: "RONALDO", number: "7" },
    { name: "FIGO", number: "7" },
    { name: "EUSÉBIO", number: "10" },
  ],
  Netherlands: [
    { name: "CRUYFF", number: "14" },
    { name: "VAN BASTEN", number: "9" },
    { name: "BERGKAMP", number: "10" },
  ],
  Italy: [
    { name: "DEL PIERO", number: "10" },
    { name: "TOTTI", number: "10" },
    { name: "BAGGIO", number: "10" },
  ],
};

const SQUAD: Record<string, CustomTemplate[]> = {
  Argentina: [
    { name: "MESSI", number: "10" },
    { name: "MARTÍNEZ", number: "9" },
    { name: "DE PAUL", number: "7" },
  ],
  Brazil: [
    { name: "VINÍCIUS", number: "7" },
    { name: "RODRYGO", number: "10" },
    { name: "RAPHINHA", number: "11" },
  ],
  France: [
    { name: "MBAPPÉ", number: "10" },
    { name: "GRIEZMANN", number: "7" },
    { name: "DEMBÉLÉ", number: "11" },
  ],
  England: [
    { name: "KANE", number: "9" },
    { name: "BELLINGHAM", number: "10" },
    { name: "SAKA", number: "17" },
  ],
  Germany: [
    { name: "MUSIALA", number: "10" },
    { name: "WIRTZ", number: "17" },
    { name: "KIMMICH", number: "6" },
  ],
  Spain: [
    { name: "YAMAL", number: "19" },
    { name: "PEDRI", number: "20" },
    { name: "RODRI", number: "16" },
  ],
  Portugal: [
    { name: "RONALDO", number: "7" },
    { name: "B. FERNANDES", number: "8" },
    { name: "LEÃO", number: "11" },
  ],
  Netherlands: [
    { name: "VAN DIJK", number: "4" },
    { name: "DEPAY", number: "10" },
    { name: "GAKPO", number: "9" },
  ],
  USA: [
    { name: "PULISIC", number: "10" },
    { name: "REYNA", number: "7" },
    { name: "MUSAH", number: "6" },
  ],
  Mexico: [
    { name: "LOZANO", number: "22" },
    { name: "JIMÉNEZ", number: "9" },
    { name: "GIMÉNEZ", number: "11" },
  ],
  Canada: [
    { name: "DAVIES", number: "19" },
    { name: "DAVID", number: "20" },
    { name: "BUCHANAN", number: "11" },
  ],
};

const STARTER: CustomTemplate[] = [
  { name: "MY NAME", number: "10" },
  { name: "CAPITAN", number: "7" },
  { name: "NÚMERO", number: "9" },
];

export function legendsFor(nation: string | null | undefined): CustomTemplate[] {
  if (!nation) return STARTER;
  return LEGENDS[nation] ?? STARTER;
}

export function squadFor(nation: string | null | undefined): CustomTemplate[] {
  if (!nation) return STARTER;
  return SQUAD[nation] ?? STARTER;
}
