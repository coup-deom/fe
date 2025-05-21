import path from "path";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import * as importX from "eslint-plugin-import-x";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import { defineConfig, globalIgnores } from "eslint/config";
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { builtinModules } from "module";

const tsconfig = path.join(process.cwd(), "tsconfig.app.json");

export default defineConfig([
  globalIgnores(['.yarn', '.pnp.*', 'eslint.config.js', 'vite.config.ts', 'src/components/shadcn']),
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

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
      'import-x/no-nodejs-modules': [
        'error',
        { allow: builtinModules.map(mod => `node:${mod}`) },
      ],
      'import-x/no-unresolved': ['error', { ignore: ['^virtual:'] }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],


      '@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],
      "@stylistic/js/no-extra-semi": "off",

      eqeqeq: ["error", "always"],
      "import-x/order": [
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
        "import-x/parsers": {
          "@stylistic/ts/parser": [".ts", ".tsx"],
          typescript: {
            project: tsconfig,
          },
        },
        "import-x/resolver-next": [
            createTypeScriptImportResolver({
              alwaysTryTypes: true,
              project: tsconfig,
            })
        ]
      },
    ],
  },
  prettier,
]);
