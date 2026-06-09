import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// The site reuses the MCP package's own pure math (../src/weather/*) so the calculator and the
// server can never drift. The `@pkg` alias + fs.allow let Vite bundle those source files.
const repoSrc = new URL("../src", import.meta.url).pathname;

export default defineConfig({
  site: "https://siyana.dev",
  integrations: [tailwind()],
  vite: {
    resolve: { alias: { "@pkg": repoSrc } },
    server: { fs: { allow: [".."] } },
  },
});
