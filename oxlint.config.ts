import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'react', 'react', 'unicorn', 'import', 'oxc'],

  ignorePatterns: ['.next', 'node_modules', 'dist', 'build', 'coverage', 'public', '.agents'],

  categories: {
    correctness: 'error',
    suspicious: 'warn',
    style: 'off',
    pedantic: 'off',
  },

  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',

    'react/jsx-key': 'error',
    'react/no-danger': 'warn',
    'react/react-in-jsx-scope': 'off',

    'nextjs/no-assign-module-variable': 'error',

    'import/no-unassigned-import': [
      'error',
      {
        allow: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less'],
      },
    ],
  },
});
