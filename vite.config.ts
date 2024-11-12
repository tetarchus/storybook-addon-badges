import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    storybookTest(),
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
      enabled: true,
      name: 'chromium',
    },
    coverage: {
      all: true,
      allowExternal: true,
      enabled: true,
      exclude: [
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
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    globals: false,
    exclude: ['coverage', 'dist', '.vscode', 'node_modules', './test/results.json'],
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    outputFile: { json: './test/results.json' },
    reporters: ['default', 'json'],
    setupFiles: './test/testSetup.ts',
  },
});

export default viteConfig;
