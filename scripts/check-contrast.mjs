/**
 * Checks WCAG contrast for the text/background pairs the design uses.
 * Reads values from src/styles/tokens.css so it stays in sync.
 * Usage: node scripts/check-contrast.mjs
 */
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];

const PAIRS = [
  ['color-text', 'color-bg'],
  ['color-text', 'color-surface'],
  ['color-text', 'color-surface-muted'],
  ['color-text-muted', 'color-bg'],
  ['color-text-muted', 'color-surface'],
  ['color-text-muted', 'color-surface-muted'],
  ['color-accent', 'color-bg'],
  ['color-accent', 'color-surface'],
  ['color-accent', 'color-accent-soft'],
  ['color-accent-hover', 'color-accent-soft'],
  ['color-on-accent', 'color-accent'],
  ['color-on-accent', 'color-accent-hover'],
  ['color-on-ink', 'color-ink'],
  ['color-on-ink-muted', 'color-ink'],
  ['color-notice-text', 'color-notice-bg'],
];

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failed = 0;
for (const [fg, bg] of PAIRS) {
  const r = ratio(token(fg), token(bg));
  const ok = r >= 4.5;
  if (!ok) failed++;
  console.log(`${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2)}:1  ${fg} on ${bg}`);
}
process.exit(failed ? 1 : 0);
