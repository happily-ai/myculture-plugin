import { readFileSync, readdirSync, statSync, lstatSync } from 'node:fs';
import { join, relative } from 'node:path';

export const PLUGIN = new URL('../myculture/', import.meta.url).pathname;

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** Words outside fenced code blocks, as Claude's README check counts them. */
export function wordCountOutsideCode(markdown) {
  const withoutFences = markdown.replace(/```[\s\S]*?```/g, ' ');
  return withoutFences.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

function luminance(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two #RRGGBB colours. */
export function contrastRatio(hexA, hexB) {
  const [hi, lo] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

/** Every file under dir, dotfiles included, as paths relative to dir. Symlinks are listed, not followed. */
export function listPluginFiles(dir = PLUGIN) {
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      const st = lstatSync(p);
      if (st.isDirectory()) {
        if (relative(dir, p) === 'evals/results') continue; // git-ignored eval output, never published
        walk(p);
      }
      else out.push(relative(dir, p));
    }
  };
  walk(dir);
  return out.sort();
}

export function isSymlink(path) {
  return lstatSync(path).isSymbolicLink();
}

export function sizeOf(path) {
  return statSync(path).size;
}
