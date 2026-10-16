/**
 * Post-build checks for the static output in dist/.
 *
 * 1. Every internal link and asset reference resolves to a built file.
 * 2. No unpublished project (draft or review) was built.
 * 3. Nothing from intake/ leaked into the output.
 *
 * Run after `npm run build` (or use `npm run validate`, which does both).
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const PROJECTS = 'content/projects';
const errors = [];

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

// 1. Internal links resolve.
function resolves(pathname) {
  const clean = decodeURIComponent(pathname.split(/[?#]/)[0]);
  if (clean === '' || clean === '/') return existsSync(join(DIST, 'index.html'));
  const target = join(DIST, clean);
  return (
    (existsSync(target) && statSync(target).isFile()) ||
    existsSync(join(target, 'index.html')) ||
    existsSync(`${target}.html`)
  );
}

const attr = /\s(?:href|src)="([^"]+)"|\ssrcset="([^"]+)"/g;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(attr)) {
    const values = match[1]
      ? [match[1]]
      : match[2].split(',').map((s) => s.trim().split(/\s+/)[0]);
    for (const value of values) {
      if (!value.startsWith('/') || value.startsWith('//')) continue;
      if (!resolves(value)) errors.push(`${relative(DIST, file)}: broken internal reference ${value}`);
    }
  }
}

// 2. Unpublished projects are absent from the build.
if (existsSync(PROJECTS)) {
  for (const slug of readdirSync(PROJECTS)) {
    const source = join(PROJECTS, slug, 'index.md');
    if (!existsSync(source)) continue;
    const frontmatter = readFileSync(source, 'utf8').split(/^---\s*$/m)[1] ?? '';
    const publication = frontmatter.match(/^publication:\s*['"]?(\w+)/m)?.[1] ?? 'draft';
    if (publication !== 'published' && existsSync(join(DIST, 'work', slug))) {
      errors.push(`Unpublished project "${slug}" (${publication}) appears in dist/work/`);
    }
  }
}

// 3. No intake material in the output.
for (const file of files) {
  if (/(^|\/)intake(\/|$)/.test(relative(DIST, file))) errors.push(`Intake path in output: ${file}`);
}
for (const file of htmlFiles) {
  if (readFileSync(file, 'utf8').includes('/intake/')) {
    errors.push(`${relative(DIST, file)}: references an intake/ path`);
  }
}

if (errors.length) {
  console.error(`verify-build: ${errors.length} problem(s)\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(`verify-build: OK (${htmlFiles.length} pages, ${files.length} files checked)`);
