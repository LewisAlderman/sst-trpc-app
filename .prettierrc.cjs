module.exports = {
  singleQuote: false,
  bracketSameLine: false,
  printWidth: 80,
  semi: true,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false, // Github doesn't like tabs
  arrowParens: "always",
  quoteProps: "as-needed",
  plugins: [
    "prettier-plugin-tailwindcss", // MUST come last
  ],
  pluginSearchDirs: false,
};
