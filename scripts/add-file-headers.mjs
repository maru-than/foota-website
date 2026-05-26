#!/usr/bin/env node
/**
 * @file Idempotent backfill of the standardized JSDoc file-overview block on every authored .ts/.tsx file.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join, relative, basename, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const TODAY = "2026-05-26";

const AUTHOR = "Maruthan";
const COPYRIGHT = "2026 Maruthan";
const LICENSE = "MIT";

const REQUIRED_TAGS = ["file", "author", "copyright", "license", "since"];

/* ---------- args ---------- */

const argv = process.argv.slice(2);
const DRY = argv.includes("--dry-run");
const onlyIdx = argv.indexOf("--only");
const ONLY = onlyIdx >= 0 ? argv[onlyIdx + 1] : null;

/* ---------- discovery ---------- */

// Mirrors the ESLint globalIgnores set + omits the few trees we don't author.
const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "out",
  "build",
  "footer-design-system",
  "public",
  "scripts",
]);
const EXCLUDE_FILES = new Set(["next-env.d.ts"]);

async function listSourceFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".") continue;
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listSourceFiles(abs)));
    } else if (entry.isFile()) {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      const ext = extname(entry.name);
      if (ext === ".ts" || ext === ".tsx") out.push(abs);
    }
  }
  return out;
}

/* ---------- git ---------- */

const sinceCache = new Map();
function firstCommitDate(relPath) {
  if (sinceCache.has(relPath)) return sinceCache.get(relPath);
  let date = TODAY;
  try {
    const raw = execFileSync(
      "git",
      ["log", "--diff-filter=A", "--follow", "--format=%cs", "--", relPath],
      { cwd: ROOT, encoding: "utf8" },
    ).trim();
    if (raw) {
      // Earliest commit (oldest) is the last line when --follow walks renames.
      const lines = raw.split("\n").filter(Boolean);
      if (lines.length) date = lines[lines.length - 1];
    }
  } catch {
    // untracked file: fall back to today
  }
  sinceCache.set(relPath, date);
  return date;
}

/* ---------- parsing ---------- */

const DIRECTIVE_RE = /^([\s﻿]*)(["'])use (client|server)\2(\s*;?)([ \t]*)\r?\n/;

// Consume optional BOM and an optional "use client" / "use server" directive
// from the start of `src`. Returns { bom, directive, rest, restOffset }.
function consumeDirective(src) {
  let bom = "";
  let body = src;
  if (body.charCodeAt(0) === 0xfeff) {
    bom = String.fromCharCode(0xfeff);
    body = body.slice(1);
  }
  const m = body.match(DIRECTIVE_RE);
  if (!m) return { bom, directive: null, rest: body, restOffset: bom.length };
  const quote = m[2];
  const kind = m[3];
  const semi = m[4].includes(";") ? ";" : "";
  const directive = `${quote}use ${kind}${quote}${semi}`;
  return {
    bom,
    directive,
    rest: body.slice(m[0].length),
    restOffset: bom.length + m[0].length,
  };
}

// Skip leading blank lines on `rest`. Returns { offset, rest }.
function skipBlankLines(rest) {
  const m = rest.match(/^(?:[ \t]*\r?\n)+/);
  if (!m) return { offset: 0, rest };
  return { offset: m[0].length, rest: rest.slice(m[0].length) };
}

// Returns the index just past the block-comment terminator (search from i=2), or -1.
function findBlockEnd(s) {
  const end = s.indexOf("*" + "/", 2);
  return end < 0 ? -1 : end + 2;
}

// Classify the leading comment of `body` (no directive, no leading blanks).
// Possible kinds: none | jsdoc-overview | jsdoc-symbol | prose-block | line-comments
function classifyLeadingComment(body) {
  if (body.startsWith("/**")) {
    const end = findBlockEnd(body);
    if (end < 0) return { kind: "none" };
    const raw = body.slice(0, end);
    const hasFileTag = /^\s*\*\s*@file\b/m.test(raw);
    if (hasFileTag) {
      return { kind: "jsdoc-overview", raw, end, parsed: parseJsdoc(raw) };
    }
    // Decide overview-vs-symbol by what follows the JSDoc block.
    const after = body.slice(end);
    const blankLinesAfter = /^\r?\n(?:[ \t]*\r?\n)+/.test(after);
    const afterTrim = after.replace(/^(?:[ \t]*\r?\n)+/, "");
    const nextLine = afterTrim.split(/\r?\n/, 1)[0] ?? "";
    const isDeclaration =
      /^\s*(export\s+(default\s+)?)?(async\s+)?(function|class|const|let|var|interface|type|enum)\b/.test(
        nextLine,
      );
    const isImport = /^\s*import\b/.test(nextLine);
    if (isImport || blankLinesAfter || !isDeclaration) {
      return { kind: "jsdoc-overview", raw, end, parsed: parseJsdoc(raw) };
    }
    return { kind: "jsdoc-symbol", raw, end };
  }
  if (body.startsWith("/*")) {
    // Consume one OR MORE consecutive single-line block comments separated
    // only by whitespace — matches the `/* ----- */ \n /* line */ \n /* ----- */`
    // banner-comment style used in this codebase (e.g. lib/customisation.ts).
    let cursor = 0;
    while (true) {
      const slice = body.slice(cursor);
      if (!slice.startsWith("/*")) break;
      const blockEnd = findBlockEnd(slice);
      if (blockEnd < 0) break;
      cursor += blockEnd;
      const gap = body.slice(cursor).match(/^[ \t]*\r?\n/);
      if (!gap) break;
      const lookahead = body.slice(cursor + gap[0].length);
      if (!lookahead.startsWith("/*")) break;
      cursor += gap[0].length;
    }
    if (cursor === 0) return { kind: "none" };
    const raw = body.slice(0, cursor).replace(/\s+$/, "");
    const summary = liftSummaryFromMultiBlock(raw);
    return { kind: "prose-block", raw, end: cursor, summary };
  }
  if (body.startsWith("//")) {
    const lines = [];
    let cursor = 0;
    while (true) {
      const slice = body.slice(cursor);
      const m = slice.match(/^\/\/[^\n]*(?:\r?\n|$)/);
      if (!m) break;
      lines.push(m[0]);
      cursor += m[0].length;
    }
    if (!lines.length) return { kind: "none" };
    const raw = body.slice(0, cursor).replace(/\r?\n$/, "");
    const summary = liftSummaryFromLines(lines);
    return { kind: "line-comments", raw, end: cursor, summary };
  }
  return { kind: "none" };
}

// Pull tag values from an existing JSDoc block (returns { tags, description }).
function parseJsdoc(raw) {
  const tags = {};
  const inner = raw
    .replace(/^\/\*\*\s*/, "")
    .replace(/\s*\*+\/\s*$/, "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^[ \t]*\*\s?/, ""));
  const descLines = [];
  for (const line of inner) {
    const tagMatch = line.match(/^@(\w+)\s*(.*)$/);
    if (tagMatch) {
      tags[tagMatch[1]] = tagMatch[2].trim();
    } else if (Object.keys(tags).length === 0) {
      descLines.push(line);
    }
  }
  return { tags, description: descLines.join("\n").trim() };
}

function trimAndCap(s, max = 100) {
  if (!s) return "";
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + "…";
}

// Lift the first descriptive line from one or more consecutive single-line
// block comments. Each line is unwrapped from its own /* ... */ pair; pure
// decoration lines (e.g. "------") and empty lines are skipped.
function liftSummaryFromMultiBlock(raw) {
  for (const rawLine of raw.split(/\r?\n/)) {
    let line = rawLine.trim();
    if (line.startsWith("/*")) line = line.slice(2);
    if (line.endsWith("*/")) line = line.slice(0, -2);
    line = line.replace(/^[ \t]*\*+[ \t]?/, "").trim();
    if (!line) continue;
    if (/^[-=*_~]{3,}$/.test(line)) continue;
    return trimAndCap(line);
  }
  return null;
}

function liftSummaryFromLines(lines) {
  for (const raw of lines) {
    const line = raw.replace(/^\/\/\s?/, "").replace(/\r?\n$/, "").trim();
    if (!line) continue;
    return trimAndCap(line);
  }
  return null;
}

/* ---------- header building ---------- */

function buildHeader({ summary, since }) {
  return [
    "/**",
    ` * @file ${summary}`,
    ` * @author ${AUTHOR}`,
    ` * @copyright ${COPYRIGHT}`,
    ` * @license ${LICENSE}`,
    ` * @since ${since}`,
    " */",
  ].join("\n");
}

// Rebuild an existing top-of-file JSDoc with all five required tags.
// Preserves prior @file and @since values when present; rewrites other required
// tags to canonical values; keeps any non-required tags appended at the end.
function augmentJsdoc(raw, parsed, fallbackSummary, fallbackSince) {
  const want = {
    file: parsed.tags.file ?? fallbackSummary ?? "TODO: describe",
    author: AUTHOR,
    copyright: COPYRIGHT,
    license: LICENSE,
    since: parsed.tags.since ?? fallbackSince,
  };

  const inner = raw
    .replace(/^\/\*\*\s*/, "")
    .replace(/\s*\*+\/\s*$/, "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^[ \t]*\*\s?/, ""));

  const descLines = [];
  const otherTags = [];
  let sawTag = false;
  for (const line of inner) {
    const tagMatch = line.match(/^@(\w+)\s*(.*)$/);
    if (tagMatch) {
      sawTag = true;
      if (!REQUIRED_TAGS.includes(tagMatch[1])) {
        otherTags.push(`@${tagMatch[1]} ${tagMatch[2]}`.trimEnd());
      }
    } else if (!sawTag) {
      descLines.push(line);
    }
  }
  // If the original block had no @file tag, its description was lifted into
  // @file — don't also keep it as the free-form description (avoids duplication).
  const desc = parsed.tags.file
    ? descLines.join("\n").replace(/\s+$/, "")
    : "";

  const lines = ["/**"];
  if (desc) {
    for (const d of desc.split("\n")) lines.push(d ? ` * ${d}` : " *");
    lines.push(" *");
  }
  lines.push(` * @file ${want.file}`);
  lines.push(` * @author ${want.author}`);
  lines.push(` * @copyright ${want.copyright}`);
  lines.push(` * @license ${want.license}`);
  lines.push(` * @since ${want.since}`);
  for (const t of otherTags) lines.push(` * ${t}`);
  lines.push(" */");
  return lines.join("\n");
}

/* ---------- per-file processing ---------- */

async function processOne(absPath) {
  const relPath = relative(ROOT, absPath).split(sep).join("/");
  const original = await readFile(absPath, "utf8");

  const { bom, directive, rest } = consumeDirective(original);
  const { rest: afterBlanks } = skipBlankLines(rest);
  const klass = classifyLeadingComment(afterBlanks);

  const since = firstCommitDate(relPath);

  let summary;
  let action;
  let newHeaderBlock;
  let preservedBlock = null;
  let afterCommentBody = afterBlanks;

  if (klass.kind === "jsdoc-overview") {
    const existingFile = klass.parsed.tags.file;
    summary =
      existingFile ??
      trimAndCap(klass.parsed.description) ??
      `TODO: describe ${basename(relPath)}`;
    if (!summary) summary = `TODO: describe ${basename(relPath)}`;
    newHeaderBlock = augmentJsdoc(klass.raw, klass.parsed, summary, since);
    afterCommentBody = afterBlanks.slice(klass.end);
    action = "augment";
  } else if (klass.kind === "jsdoc-symbol") {
    summary = `TODO: describe ${basename(relPath)}`;
    newHeaderBlock = buildHeader({ summary, since });
    afterCommentBody = afterBlanks; // keep symbol JSDoc on the declaration
    action = "insert";
  } else if (klass.kind === "prose-block") {
    summary = klass.summary ?? `TODO: describe ${basename(relPath)}`;
    newHeaderBlock = buildHeader({ summary, since });
    preservedBlock = klass.raw;
    afterCommentBody = afterBlanks.slice(klass.end);
    action = "insert";
  } else if (klass.kind === "line-comments") {
    summary = klass.summary ?? `TODO: describe ${basename(relPath)}`;
    newHeaderBlock = buildHeader({ summary, since });
    preservedBlock = klass.raw;
    afterCommentBody = afterBlanks.slice(klass.end);
    action = "insert";
  } else {
    summary = `TODO: describe ${basename(relPath)}`;
    newHeaderBlock = buildHeader({ summary, since });
    afterCommentBody = afterBlanks;
    action = "insert";
  }

  // Reassemble: BOM → directive → blank → header → blank → (prose) → blank → body
  const body = afterCommentBody.replace(/^(?:[ \t]*\r?\n)+/, "");

  let rebuilt = bom;
  if (directive) rebuilt += `${directive}\n\n`;
  rebuilt += `${newHeaderBlock}\n`;
  if (preservedBlock) {
    rebuilt += `\n${preservedBlock}\n`;
  }
  if (body.length) rebuilt += `\n${body}`;
  if (original.endsWith("\n") && !rebuilt.endsWith("\n")) rebuilt += "\n";

  const changed = rebuilt !== original;
  if (!changed) action = "skip";

  return { relPath, absPath, action, since, summary, changed, rebuilt };
}

/* ---------- main ---------- */

async function main() {
  const all = await listSourceFiles(ROOT);
  const files = ONLY
    ? all.filter((f) => relative(ROOT, f).split(sep).join("/") === ONLY)
    : all;

  if (ONLY && !files.length) {
    console.error(`--only: no match for "${ONLY}"`);
    process.exit(2);
  }

  const counts = { insert: 0, augment: 0, skip: 0 };
  const todos = [];

  for (const abs of files) {
    const r = await processOne(abs);
    counts[r.action] += 1;
    if (r.summary.startsWith("TODO: describe")) todos.push(r.relPath);
    console.log(
      `[${r.action.padEnd(7)}] ${r.relPath} (since=${r.since}, summary="${r.summary}")`,
    );
    if (r.changed && !DRY) await writeFile(abs, r.rebuilt, "utf8");
  }

  console.log("");
  console.log(`Total: ${files.length} files`);
  console.log(
    `  insert: ${counts.insert}   augment: ${counts.augment}   skip: ${counts.skip}`,
  );
  if (DRY) console.log("(dry-run — no files written)");
  if (todos.length) {
    console.log("");
    console.log(`${todos.length} files fell back to "TODO: describe …" — curate these:`);
    for (const t of todos) console.log(`  ${t}`);
  }
}

// CLI guard — only run main() when invoked directly (not on import).
const invokedDirectly =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invokedDirectly) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
