import {
  AR,
  AU,
  BR,
  CA,
  CO,
  ES,
  FR,
  GB,
  GB_ENG,
  GH,
  JP,
  MA,
  MX,
  NL,
  NZ,
  PT,
  US,
} from "country-flag-icons/react/3x2";

import type { CountryCode } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const FLAGS = {
  AR, AU, BR, CA, CO, ES, FR, GB, GB_ENG, GH, JP, MA, MX, NL, NZ, PT, US,
} as const satisfies Record<CountryCode, React.ComponentType<{ title?: string; className?: string }>>;

const NAMES: Record<CountryCode, string> = {
  AR: "Argentina",
  AU: "Australia",
  BR: "Brazil",
  CA: "Canada",
  CO: "Colombia",
  ES: "Spain",
  FR: "France",
  GB: "United Kingdom",
  GB_ENG: "England",
  GH: "Ghana",
  JP: "Japan",
  MA: "Morocco",
  MX: "Mexico",
  NL: "Netherlands",
  NZ: "New Zealand",
  PT: "Portugal",
  US: "United States",
};

/** Small 3:2 country flag chip — uses the same library as the hero. */
export function CountryFlag({
  code,
  className,
}: {
  code: CountryCode;
  className?: string;
}) {
  const Flag = FLAGS[code];
  return (
    <Flag
      title={NAMES[code]}
      className={cn("inline-block h-3 w-[18px] shrink-0", className)}
    />
  );
}
