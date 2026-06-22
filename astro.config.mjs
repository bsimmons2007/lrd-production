// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: Logan — replace with your real production domain once deployed.
  // Used for canonical URLs, absolute Open Graph image links, and the sitemap.
  site: 'https://lrd-production.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
