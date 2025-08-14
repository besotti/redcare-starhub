// eslint.config.ts
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'simple-import-sort': simpleImportSort,
            prettier,
            react,
        },
        rules: {
            // 👇 Reaktivieren, um einfache Quotes zu ERZWINGEN
            quotes: ['error', 'single', { avoidEscape: true }],

            // 👇 Prettier-Regel auf Basis deiner .prettierrc – falls nötig, explizit konfigurieren
            'prettier/prettier': ['error', {
                singleQuote: true,
                printWidth: 100,
                semi: true,
                trailingComma: 'es5'
            }],

            // andere Regeln
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
];
