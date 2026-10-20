// @ts-check
/**
 * Build step: every link to another website opens in a new tab, so the
 * portfolio stays open. Applies to the finished HTML in dist/, which covers
 * components, Markdown case studies, and anything added later.
 *
 * - External = an http(s) link to a host other than the site's own.
 * - mailto: and tel: links are left alone (they open an app, not a page).
 * - Adds target="_blank" and rel="noopener", keeping any existing rel (e.g. "me").
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  /** @type {string[][]} */
  const nested = await Promise.all(
    entries.map((e) => {
      const path = join(dir, e.name);
      if (e.isDirectory()) return htmlFiles(path);
      return e.name.endsWith('.html') ? [path] : [];
    }),
  );
  return nested.flat();
}

/**
 * @param {string} html
 * @param {string} ownHost
 */
export function markExternalLinks(html, ownHost) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = tag.match(/\shref="([^"]*)"/i)?.[1];
    if (!href || !/^https?:\/\//i.test(href)) return tag;
    const host = new URL(href).hostname.replace(/^www\./, '');
    if (host === ownHost) return tag;

    let out = tag;
    if (!/\starget=/i.test(out)) out = out.replace(/^<a\b/i, '<a target="_blank"');
    const rel = out.match(/\srel="([^"]*)"/i);
    if (!rel) out = out.replace(/^<a\b/i, '<a rel="noopener"');
    else if (!/\bnoopener\b/.test(rel[1])) out = out.replace(rel[0], ` rel="${rel[1]} noopener"`);
    return out;
  });
}

/** @returns {import('astro').AstroIntegration} */
export default function externalLinks() {
  /** @type {string} */
  let ownHost = '';
  return {
    name: 'external-links-new-tab',
    hooks: {
      'astro:config:done': ({ config }) => {
        ownHost = config.site ? new URL(config.site).hostname.replace(/^www\./, '') : '';
      },
      'astro:build:done': async ({ dir }) => {
        const files = await htmlFiles(fileURLToPath(dir));
        await Promise.all(
          files.map(async (/** @type {string} */ file) => {
            const html = await readFile(file, 'utf8');
            const updated = markExternalLinks(html, ownHost);
            if (updated !== html) await writeFile(file, updated);
          }),
        );
      },
    },
  };
}
