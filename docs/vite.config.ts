import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

const viteConfig =  defineConfig({
  plugins: [remix()],
});

export default viteConfig