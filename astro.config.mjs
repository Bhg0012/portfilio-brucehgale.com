// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import externalLinks from './src/integrations/external-links.mjs';

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
    // Links to other websites open in a new tab.
    externalLinks(),
  ],
  devToolbar: { enabled: false },
});
