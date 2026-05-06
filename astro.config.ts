import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ki-anleitungen.de",
  integrations: [tailwind(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "catppuccin-mocha",
        light: "catppuccin-latte",
      },
      defaultColor: "dark",
      wrap: true,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
