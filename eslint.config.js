import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import cypressPlugin from 'eslint-plugin-cypress';

export default [
  js.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
        globals: {
          console: 'readonly',
      },
      parser: tsparser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // Cypress test files
  {
    files: ['cypress/**/*.{ts,tsx}', '**/*.{cy,spec}.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        cy: true,
        Cypress: true,
        describe: true,
        it: true,
        before: true,
        after: true,
        beforeEach: true,
        afterEach: true,
        context: true,
        expect: true,
        console: 'readonly',
      },
    },
    plugins: {
      cypress: cypressPlugin,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-expressions': 'off',
    },
    settings: {
      'cypress/globals': true,
    },
  },
];
