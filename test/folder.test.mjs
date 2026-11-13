import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { PLUGIN, readJson, wordCountOutsideCode, listPluginFiles, isSymlink, sizeOf } from './rules.mjs';

const IMAGE = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
const TEXT = new Set(['.md', '.json']);

test('README is the listing: at least 40 words outside code', () => {
  const md = readFileSync(join(PLUGIN, 'README.md'), 'utf8');
  assert.ok(wordCountOutsideCode(md) >= 40);
});

test('LICENSE is MIT, Happily.ai', () => {
  const text = readFileSync(join(PLUGIN, 'LICENSE'), 'utf8');
  assert.match(text, /MIT License/);
  assert.match(text, /Happily\.ai/);
});

test('folder passes the directory file rules', () => {
  const files = listPluginFiles();
  assert.ok(files.length <= 512, `${files.length} files`);
  for (const f of files) {
    const name = basename(f);
    assert.ok(!['.DS_Store', 'Thumbs.db', 'desktop.ini'].includes(name), f);
    assert.ok(!f.split('/').includes('__MACOSX'), f);
    assert.ok(!isSymlink(join(PLUGIN, f)), `symlink ${f}`);
    const ext = extname(f).toLowerCase();
    assert.ok(IMAGE.has(ext) || TEXT.has(ext) || name === 'LICENSE', `file type ${f}`);
    if (!IMAGE.has(ext)) assert.ok(sizeOf(join(PLUGIN, f)) < 262144, `size ${f}`);
  }
});

test('claude .mcp.json points at the production connector', () => {
  const mcp = readJson(join(PLUGIN, '.mcp.json'));
  assert.deepEqual(Object.keys(mcp.mcpServers), ['myculture']);
  assert.equal(mcp.mcpServers.myculture.type, 'http');
  assert.equal(mcp.mcpServers.myculture.url, 'https://api.myculture.ai/mcp');
});

test('no credentials anywhere in the plugin', () => {
  for (const f of listPluginFiles()) {
    if (IMAGE.has(extname(f).toLowerCase())) continue;
    const text = readFileSync(join(PLUGIN, f), 'utf8');
    assert.doesNotMatch(text, /client_?secret|clientSecret/i, f);
    assert.doesNotMatch(text, /mc_(live|test)_/, f);
  }
});
