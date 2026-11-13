import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { PLUGIN, readJson } from './rules.mjs';

const EVALS = join(PLUGIN, 'evals');
const MOCKS = join(EVALS, 'mocks/myculture');
const TOOL_PREFIX = 'mcp__plugin_myculture_myculture__';
const toolNames = () => new Set(readJson(join(MOCKS, '_tools.json')).tools.map((t) => t.name));

function frontMatter(path) {
  const m = readFileSync(path, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : null;
}

function caseDirs() {
  const out = [];
  for (const group of readdirSync(EVALS)) {
    const g = join(EVALS, group);
    if (!statSync(g).isDirectory() || ['mocks', 'results'].includes(group)) continue;
    for (const c of readdirSync(g)) if (statSync(join(g, c)).isDirectory()) out.push(join(g, c));
  }
  return out;
}

test('tool list is the MCP 1.7.0 list', () => {
  assert.equal(toolNames().size, 26);
  assert.ok(toolNames().has('get_candidate_result'));
});

test('every mock names a real tool', () => {
  const names = toolNames();
  for (const f of readdirSync(MOCKS).filter((n) => n.endsWith('.md'))) {
    assert.ok(names.has(basename(f, '.md')), f);
  }
});

test('every case has a prompt with description, tags and max_turns', () => {
  const cases = caseDirs();
  assert.ok(cases.length > 0, 'no cases');
  for (const c of cases) {
    const fm = frontMatter(join(c, 'prompt.md'));
    assert.ok(fm, `${c}/prompt.md front matter`);
    for (const key of ['description', 'tags', 'max_turns']) assert.match(fm, new RegExp(`^${key}:`, 'm'), `${c} ${key}`);
  }
});

test('tool_used graders name real MyCulture tools or Skill', () => {
  const names = toolNames();
  for (const c of caseDirs()) {
    const gd = join(c, 'graders');
    assert.ok(existsSync(gd), `${c} has graders`);
    for (const g of readdirSync(gd)) {
      const fm = frontMatter(join(gd, g)) ?? '';
      if (!/^type: tool_used/m.test(fm)) continue;
      const tool = fm.match(/^tool: (\S+)/m)?.[1];
      assert.ok(tool, `${c}/${g} tool`);
      if (tool === 'Skill') continue;
      assert.ok(tool.startsWith(TOOL_PREFIX), `${c}/${g} prefix`);
      assert.ok(names.has(tool.slice(TOOL_PREFIX.length)), `${c}/${g} ${tool}`);
    }
  }
});

test('one case per journey: start, create, results, answer', () => {
  const tags = caseDirs().map((c) => frontMatter(join(c, 'prompt.md')) ?? '').join('\n');
  for (const t of ['start', 'create', 'results', 'answer']) assert.match(tags, new RegExp(`tags:.*\\b${t}\\b`), t);
});
