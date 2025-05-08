// @ts-check
import eslint from '@eslint/js';
import * as importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      // Build and dependencies
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '.cache/**',
      '.output/**',
      '.serverless/**',
      '.husky/**',
      '.vscode/**',
      '.github/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      'commitlint.config.js',
      '.lintstagedrc',
      '.prettierrc',
      '.eslintrc.js',
      '.eslintrc.json',
      '.eslintrc.yml',
      '.eslintrc.yaml',

      // Test files (if you want to lint them separately)
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/__tests__/**',
      '**/__mocks__/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        EXPERIMENTAL_useProjectService: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': 'off',
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Import sorting rules
      // 'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    },
  },
);
