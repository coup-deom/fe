import path from "path";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";

const tsconfig = path.join(process.cwd(), "tsconfig.app.json");

export default [
  importPlugin.flatConfigs.recommended,
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: tsconfig,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic/js": stylisticJs,
      "@stylistic/ts": stylisticTs,
      "@stylistic/jsx": stylisticJsx,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "@stylistic/ts/quotes": ["warn", "single"],
      "@stylistic/js/no-extra-semi": "off",

      eqeqeq: ["error", "always"],
      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "always",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            ["sibling", "index"],
          ],
        },
      ],

      'prettier/prettier': [
        "error",
        {
          singleQuote: true,
          trailingComma: "all",
          semi: false,
          arrowParens: "avoid",
          endOfLine: "auto",
        },
      ],
    },
    settings: [
      {
      "import/parsers": {
          "@stylistic/ts/parser": [".ts", ".tsx"],
          typescript: {
            project: tsconfig,
          },
        },
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
            alwaysTryTypes: true,
          },
          vite: {
            configPath: "./vite.config.ts"
          },
        }
      },
    ],
  },
  prettier,
];
