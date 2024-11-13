import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const isStorybook = process.argv[1]?.endsWith('./storybook');
const coverage = 80;

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    storybookTest(),
    !isStorybook &&
      nodePolyfills({
        globals: { Buffer: false, global: false, process: false },
        include: ['events'],
        protocolImports: true,
      }),
  ],
  test: {
    name: 'storybook-addon-badges',
    browser: {
      provider: 'playwright',
      enabled: isStorybook || process.env.SBAB_BROWSER_TESTS === 'true',
      name: 'chromium',
      headless: true,
    },
    coverage: {
      all: true,
      allowExternal: true,
      enabled: true,
      exclude: [
        '.husky',
        '.storybook',
        '.vscode',
        '*.config.{ts,js}',
        '**/*.types.ts',
        '**/types/*.ts',
        'dist',
        'docs',
        'manager.js',
        'preset.js',
        'preview.js',
        'scripts',
        'src/stories',
        '**/__test__',
      ],
      include: ['**'],
      reporter: ['html', 'text', 'json', 'json-summary'],
      provider: 'v8',
      reportOnFailure: true,
      reportsDirectory: 'coverage',
      thresholds: {
        branches: coverage,
        functions: coverage,
        lines: coverage,
        statements: coverage,
      },
    },
    environment: 'jsdom',
    globals: false,
    exclude: ['coverage', 'dist', '.husky', '.vscode', 'node_modules', './test/results.json'],
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    outputFile: { json: './test/results.json' },
    reporters: ['default', 'json'],
    setupFiles: './test/testSetup.ts',
  },
});

export default viteConfig;
