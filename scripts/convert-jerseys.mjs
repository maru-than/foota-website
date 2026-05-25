#!/usr/bin/env node
/**
 * One-shot converter: PNG-with-alpha → WebP-with-alpha.
 *
 * Walks the two transparent jersey directories, re-encodes each .png as .webp,
 * verifies the output, then deletes the source. Idempotent: re-running after a
 * successful conversion skips already-converted files.
 *
 * Usage: npm run convert:jerseys
 */

import { readdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const DIRS = [
  "public/jerseys/home-transparent",
  "public/jerseys/away-transparent",
];

const ROOT = fileURLToPath(new URL("..", import.meta.url));

async function convertOne(dir, file) {
  const srcAbs = join(ROOT, dir, file);
  const { name } = parse(file);
  const dstAbs = join(ROOT, dir, `${name}.webp`);

  if (existsSync(dstAbs)) {
    // Output already exists — drop the source if it's still around and move on.
    if (existsSync(srcAbs)) await unlink(srcAbs);
    return { skipped: true, file };
  }

  const srcBytes = (await stat(srcAbs)).size;
  await sharp(srcAbs)
    .webp({ quality: 85, effort: 6, alphaQuality: 90 })
    .toFile(dstAbs);

  const dstBytes = (await stat(dstAbs)).size;
  if (dstBytes <= 0) throw new Error(`Empty webp output: ${dstAbs}`);

  await unlink(srcAbs);
  return { skipped: false, file, srcBytes, dstBytes };
}

async function run() {
  let totalSrc = 0;
  let totalDst = 0;
  let converted = 0;
  let skipped = 0;

  for (const dir of DIRS) {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) {
      console.warn(`(skip) ${dir} does not exist`);
      continue;
    }
    const entries = await readdir(abs);
    const pngs = entries.filter((f) => f.toLowerCase().endsWith(".png"));

    console.log(`\n${dir}  —  ${pngs.length} png file(s)`);

    for (const file of pngs) {
      try {
        const result = await convertOne(dir, file);
        if (result.skipped) {
          skipped++;
          console.log(`  skip  ${file}`);
        } else {
          converted++;
          totalSrc += result.srcBytes;
          totalDst += result.dstBytes;
          const ratio = ((result.dstBytes / result.srcBytes) * 100).toFixed(0);
          console.log(
            `  done  ${file}  ${(result.srcBytes / 1024).toFixed(0)}KB → ${(
              result.dstBytes / 1024
            ).toFixed(0)}KB  (${ratio}%)`,
          );
        }
      } catch (err) {
        console.error(`  fail  ${file}  ${err.message}`);
        process.exitCode = 1;
      }
    }
  }

  console.log(
    `\n${converted} converted, ${skipped} skipped.  ${(totalSrc / 1024 / 1024).toFixed(
      1,
    )}MB → ${(totalDst / 1024 / 1024).toFixed(1)}MB`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
