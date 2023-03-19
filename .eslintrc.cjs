const config = (...args) => ({
	parser: "@typescript-eslint/parser",
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: "module",
	},
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			typescript: {}, // fixes resolving TS custom paths
		},
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:jsx-a11y/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	plugins: ["simple-import-sort", "const-case"],
	rules: {
		"const-case/uppercase": "error",
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		"padding-line-between-statements": ["warn", ...args[0]],
		"react/prop-types": "off", // if we are using TS
		"react/jsx-one-expression-per-line": "off",
		"@typescript-eslint/consistent-type-imports": "error",
		"@typescript-eslint/ban-types": [ "error", { types: { "{}": false } } ]
	},
});

const paddingLineRules = [
	{ blankLine: "always", prev: "*", next: ["block", "block-like"] },
	{
		blankLine: "always",
		prev: ["block", "block-like", "multiline-block-like"],
		next: "*",
	},
	{
		blankLine: "any",
		prev: ["block-like", "multiline-block-like"],
		next: "return",
	},
];

module.exports = config(paddingLineRules);