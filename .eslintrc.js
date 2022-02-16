module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: [
      "airbnb-base",
      "airbnb-typescript/base",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      project: "./tsconfig.json",
      tsConfigRootDir: "./",
    },
    plugins: ["@typescript-eslint", "prettier", "import"],
    rules: {
      "no-debugger": "off",
      "no-console": 0,
      "@typescript-eslint/lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }]
    },
  };
  