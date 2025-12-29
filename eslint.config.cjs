const js = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const importPlugin = require("eslint-plugin-import");
const unusedImports = require("eslint-plugin-unused-imports");

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  ...compat.extends("expo"),
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: "readonly"
      }
    },
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    },
    rules: {
      "import/no-default-export": "error",
      "import/no-unresolved": "error",
      "no-restricted-imports": [
        "error",
        {
          "patterns": ["../..*/**"]
        }
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "unused-imports/no-unused-imports": "error",
      "no-console": ["error", { "allow": ["warn", "error"] }]
    }
  },
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "import/no-default-export": "off"
    }
  },
  {
    files: ["src/shared/logger/logger.ts"],
    rules: {
      "no-console": "off"
    }
  }
];
