/**
 * @file Apple touch icon — derived at build time from the single master at public/logo.png.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-27
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon(): Promise<Response> {
  const master = await readFile(path.join(process.cwd(), "public/logo.png"));
  const png = await sharp(master)
    .resize(size.width, size.height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": contentType },
  });
}
