import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'build/**',
      '.husky/**',
      'postgresql/**',
      'src/seeders/**',
      // 'src/docs/**',
      'src/generated/**',
      'scripts/seeders/**',
      'eslint.config.mjs',
      'commitlint.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ...js.configs.recommended },
  {  plugins: ["import"],
    rules: {
      "import/no-relative-parent-imports": "error",
  },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    }},
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      'no-redeclare': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'off',

      // '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
);
