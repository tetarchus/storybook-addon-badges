import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: [
      '.storybook/local-preset.js',
      '.vscode/**/*',
      '**/.docusaurus/**/*',
      '**/*.config.cjs',
      '**/build/**/*',
      'dist/**/*',
      'preset.js',
      'scripts/**/*',
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat?.['jsx-runtime'],
  {
    plugins: { 'react-hooks': pluginReactHooks },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['.husky/install.js', 'preset.js', '.storybook/local-preset.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    name: 'overrides',
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
      'capitalized-comments': [
        'warn',
        'always',
        { ignoreConsecutiveComments: true, ignoreInlineComments: false },
      ],
      'no-console': ['warn', { allow: ['error', 'info', 'warn'] }],
      'no-warning-comments': 'warn',
    },
  },
];

export default eslintConfig;
