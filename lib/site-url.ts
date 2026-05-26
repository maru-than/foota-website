/* ------------------------------------------------------------------ */
/*  Resolve the site base URL for SEO metadata, robots and the sitemap. */
/*                                                                      */
/*  `process.env.NEXT_PUBLIC_SITE_URL` can be missing OR malformed —    */
/*  a Vercel project env var set to a placeholder string would slip     */
/*  through `??` (only catches null/undefined) and crash the build at  */
/*  `new URL(...)` with ERR_INVALID_URL. This helper validates and     */
/*  falls back to localhost for any unparseable value.                 */
/* ------------------------------------------------------------------ */

const DEFAULT = "http://localhost:3000";

export function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return DEFAULT;
  try {
    // Throws TypeError / ERR_INVALID_URL on anything that isn't a parseable URL.
    new URL(raw);
    return raw;
  } catch {
    return DEFAULT;
  }
}
