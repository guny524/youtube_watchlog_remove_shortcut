import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import importPlugin from "eslint-plugin-import";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".output/**",
      ".wxt/**",
      ".test-profile/**",
      ".test-user-data/**",
      "chrome-mv3-dev/**",
      "**/*.svelte",
      "eslint.config.mjs",
      ".dependency-cruiser.cjs",
    ],
  },

  // TypeScript strict config
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { sonarjs, import: importPlugin },
    rules: {
      // Import order
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }],

      // Base ESLint rules off, use TypeScript versions
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error", { "functions": false }],
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error",

      // Type definitions
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      // Allow any for YouTube's untyped API (warn instead of error)
      "@typescript-eslint/no-explicit-any": "warn",

      // Non-null assertion (allow for DOM queries)
      "@typescript-eslint/no-non-null-assertion": "off",

      // Unnecessary condition (allow for null checks after DOM queries)
      "@typescript-eslint/no-unnecessary-condition": "off",

      // Cognitive complexity
      "sonarjs/cognitive-complexity": ["error", 15],

      // Switch exhaustiveness
      "@typescript-eslint/switch-exhaustiveness-check": ["error", {
        requireDefaultForNonUnion: true,
        considerDefaultExhaustiveForUnions: false,
      }],

      // Magic numbers
      "@typescript-eslint/no-magic-numbers": ["warn", {
        ignore: [0, 1, -1, 2, 10, 100, 1000],
        ignoreArrayIndexes: true,
        ignoreTypeIndexes: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
      }],

      // Dependencies limit
      "import/max-dependencies": ["warn", { max: 20, ignoreTypeImports: true }],

      // Code length
      "max-lines": ["warn", { max: 400, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["warn", { max: 80, skipBlankLines: true, skipComments: true }],
      "max-statements": ["warn", 25],

      // Relax strict type checking for YouTube API interactions
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/restrict-template-expressions": ["error", {
        allowNumber: true,
        allowBoolean: true,
        allowNullish: true,
      }],
      "@typescript-eslint/prefer-nullish-coalescing": "off",
    },
  },

  // Config files exception
  {
    files: ["*.config.ts", "*.config.mjs", "*.config.js", "wxt.config.ts"],
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
      "import/max-dependencies": "off",
    },
  },
);
