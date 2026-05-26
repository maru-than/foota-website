<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## File headers

Every new `.ts` or `.tsx` file (anywhere except `next-env.d.ts`) must start with a JSDoc file-overview block containing `@file`, `@author`, `@copyright`, `@license`, and `@since`. The block goes on line 1, except when the file begins with a `"use client"` or `"use server"` directive — in that case the directive stays on line 1 and the JSDoc follows immediately after, separated by a blank line. Run `pnpm headers` (or `npm run headers`) to backfill or repair headers; the script is idempotent. `pnpm lint` will fail if any required tag is missing. Header template:

```ts
/**
 * @file <one-line purpose summary>
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since YYYY-MM-DD
 */
```
