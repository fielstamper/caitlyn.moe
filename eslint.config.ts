import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import promise from "eslint-plugin-promise";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores(["dist/", "release/", "node_modules/"]),

	js.configs.recommended,
	tseslint.configs.recommended,
	astro.configs.recommended,
	promise.configs["flat/recommended"],

	stylistic.configs.customize({
		indent: "tab",
		quotes: "double",
		semi: true,
		braceStyle: "1tbs",
	}),

	{
		plugins: { "@stylistic": stylistic },
		rules: {
			"@stylistic/jsx-one-expression-per-line": "off",
		},
	},

	{
		languageOptions: { globals: globals.browser },
		plugins: { "simple-import-sort": simpleImportSort },
		rules: {
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
]);
