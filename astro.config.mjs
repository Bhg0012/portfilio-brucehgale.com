// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://brucehgale.com',
  // Static output: Cloudflare serves the generated `dist/` folder directly.
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // The layout preview exists only in placeholder mode and is never indexed.
      filter: (page) => !page.includes('/preview/'),
    }),
  ],
  devToolbar: { enabled: false },
});
