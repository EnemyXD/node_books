module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: ".",
    ecmaVersion: 12,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "win"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "warn",
    "no-alert": "warn",
  },
};
