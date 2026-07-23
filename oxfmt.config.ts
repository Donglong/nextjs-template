import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 100,

  semicolons: true,

  singleQuote: true,

  trailingCommas: 'all',

  arrowParens: 'always',

  sortImports: {
    groups: ['side_effect', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    newlinesBetween: true,
  },

  sortPackageJson: true,

  sortTailwindcss: true,

  ignorePatterns: ['.next', 'node_modules', 'dist', 'build', 'coverage', 'public', '.agents'],
});
