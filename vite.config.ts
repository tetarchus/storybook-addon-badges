import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    name: 'storybook-addon-badges',
    coverage: {
      all: true,
      allowExternal: true,
      enabled: true,
      exclude: [
        '.storybook',
        '.vscode',
        '*.config.{ts,js}',
        'dist',
        'docs',
        'manager.js',
        'preset.js',
        'preview.js',
        'scripts',
      ],
      include: ['**'],
      reporter: ['html', 'text', 'json', 'json-summary'],
      provider: 'v8',
      reportOnFailure: true,
      reportsDirectory: 'coverage',
      thresholds: {
        perFile: true,
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    reporters: ['default'],
  },
});

export default viteConfig;
