import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  perfectionist.configs['recommended-natural'],
  ...pluginQuery.configs['flat/recommended-strict'],
  {
    name: 'js-core-custom',
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-console': ['error'],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          message: 'Exports should be at the end of the file.',
          selector: 'ExportNamedDeclaration[declaration!=null]',
        },
      ],
      'prefer-destructuring': 'warn',
      quotes: ['error', 'single'],
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    name: 'react-custom',
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
    },
  },
  {
    name: 'perfectionist-custom',
    rules: {
      'perfectionist/sort-imports': 'off',
    },
  },
  {
    name: 'importPlugin',
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/exports-last': ['error'],
      'import/newline-after-import': ['error'],
      'import/no-commonjs': 'warn',
      'import/no-default-export': ['error'],
      'import/no-duplicates': ['error'],
      'import/no-unused-modules': 'warn',
      'import/order': [
        'error',
        {
          'alphabetize': {
            'order': 'asc',
          },
          'groups': ['builtin', 'external', ['sibling', 'parent'], 'index'],
        },
      ],
    },
  },
  {
    name: 'stylistic',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          'blankLine': 'always',
          'next': [
            'block-like',
            'class',
            'do',
            'for',
            'function',
            'if',
            'switch',
            'try',
            'while',
          ],
          'prev': '*',
        },
        {
          'blankLine': 'always',
          'next': '*',
          'prev': [
            'block-like',
            'class',
            'do',
            'for',
            'function',
            'if',
            'switch',
            'try',
            'while',
          ],
        },
        { 'blankLine': 'always', 'next': 'return', 'prev': '*' },
        { 'blankLine': 'always', 'next': '*', 'prev': 'return' },
        {
          'blankLine': 'any',
          'next': ['const', 'let', 'var'],
          'prev': ['const', 'let', 'var'],
        },
        { 'blankLine': 'always', 'next': 'export', 'prev': '*' },
        { 'blankLine': 'never', 'next': 'export', 'prev': 'export' },
      ],
    },
  },
  {
    files: ['./*.{js,mjs,cjs}', '**/*.jsx'],
    rules: {
      'import/no-default-export': ['off'],
    },
  },
]);
