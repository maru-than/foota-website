import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsdoc from "eslint-plugin-jsdoc";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Allow underscore-prefixed args / vars to be unused — the foota convention
  // for "kept for signature compatibility, deliberately ignored" parameters
  // (e.g. formatPrice's `_currencyCode` Shopify-shape arg).
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  // File-overview signing — every authored TS/TSX file must carry the JSDoc
  // header block with all five required tags. See AGENTS.md → File headers.
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { jsdoc },
    rules: {
      "jsdoc/require-file-overview": [
        "error",
        {
          tags: {
            file: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
            author: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
            copyright: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
            license: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
            since: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
          },
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design-system reference export (not application code).
    "footer-design-system/**",
  ]),
]);

export default eslintConfig;
