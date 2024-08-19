import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [tsconfigPaths(), react()],
});

export default viteConfig;
