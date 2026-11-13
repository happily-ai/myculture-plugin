import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { packageChatGpt } from '../scripts/package.mjs';
import { PLUGIN, readJson } from './rules.mjs';

const version = readJson(join(PLUGIN, 'plugin.json')).version;

function unzip(zip) {
  const dir = mkdtempSync(join(tmpdir(), 'mc-unzip-'));
  execFileSync('unzip', ['-q', zip, '-d', dir]);
  return dir;
}
function listAll(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listAll(join(dir, e.name), base) : [join(dir, e.name).slice(base.length + 1)]);
}

test('builds the ChatGPT ZIP with plugin.json, mcp.json, skills and assets', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'mc-pkg-')), 'out');
  const zip = packageChatGpt({ outDir: out });
  assert.equal(zip, join(out, `myculture-chatgpt-${version}.zip`));
  const files = listAll(unzip(zip));
  assert.ok(files.includes('myculture/plugin.json'));
  assert.ok(files.includes('myculture/mcp.json'));
  assert.equal(files.filter((f) => /^myculture\/skills\/[^/]+\/SKILL\.md$/.test(f)).length, 4);
  assert.ok(files.some((f) => /^myculture\/assets\/.+\.png$/.test(f)));
  for (const f of files) {
    assert.doesNotMatch(f, /\.claude-plugin|(^|\/)\.mcp\.json$|(^|\/)hooks\/|\.app\.json$|\.DS_Store|(^|\/)evals\//, f);
  }
});

test('mcp.json declares one streamable-http server with no client credentials or scopes', () => {
  const dir = unzip(packageChatGpt({ outDir: join(mkdtempSync(join(tmpdir(), 'mc-pkg-')), 'out') }));
  const mcp = readJson(join(dir, 'myculture/mcp.json'));
  assert.equal(mcp.$schema, 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json');
  const servers = Object.entries(mcp.mcpServers);
  assert.equal(servers.length, 1);
  const [, s] = servers[0];
  assert.equal(s.type, 'streamable-http');
  assert.equal(s.url, 'https://api.myculture.ai/mcp');
  assert.doesNotMatch(JSON.stringify(mcp), /clientId|clientSecret|baseScopes|headers/);
});

test('plugin.json carries the review cases and release notes', () => {
  const dir = unzip(packageChatGpt({ outDir: join(mkdtempSync(join(tmpdir(), 'mc-pkg-')), 'out') }));
  const m = readJson(join(dir, 'myculture/plugin.json'));
  const oa = m.extensions['com.openai'];
  assert.equal(oa.review.test_cases.positive.length, 5);
  assert.equal(oa.review.test_cases.negative.length, 3);
  for (const c of oa.review.test_cases.positive) {
    for (const k of ['description', 'prompt', 'tools_triggered', 'expected_behavior']) assert.ok(c[k], k);
  }
  for (const c of oa.review.test_cases.negative) for (const k of ['description', 'prompt']) assert.ok(c[k], k);
  assert.equal(oa.review.commerce, false);
  const notes = readFileSync(new URL('../review/release-notes.md', import.meta.url), 'utf8').trim();
  assert.equal(oa.publication.release_notes, notes);
  assert.doesNotMatch(JSON.stringify(m), /password|pin\b|fixed pin/i);
});

test('refuses review cases that are not exactly 5 positive and 3 negative', () => {
  const root = mkdtempSync(join(tmpdir(), 'mc-review-'));
  const cases = readJson(new URL('../review/cases.json', import.meta.url).pathname);
  cases.positive = cases.positive.slice(0, 4);
  writeFileSync(join(root, 'cases.json'), JSON.stringify(cases));
  writeFileSync(join(root, 'release-notes.md'), 'Notes');
  assert.throws(() => packageChatGpt({ outDir: join(root, 'out'), reviewDir: root }),
    /review\/cases\.json needs exactly 5 positive and 3 negative cases/);
});

test('refuses to write into an existing output directory', () => {
  const out = mkdtempSync(join(tmpdir(), 'mc-exists-'));
  assert.throws(() => packageChatGpt({ outDir: out }), /already exists/);
});
