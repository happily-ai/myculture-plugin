import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { PLUGIN, readJson, contrastRatio } from './rules.mjs';

const claude = () => readJson(join(PLUGIN, '.claude-plugin/plugin.json'));
const openai = () => readJson(join(PLUGIN, 'plugin.json'));
const iface = () => openai().extensions['com.openai'].interface;

test('claude manifest', () => {
  const m = claude();
  assert.equal(m.name, 'myculture');
  assert.match(m.name, /^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$/);
  assert.equal(m.author.name, 'Happily.ai');
  assert.equal(m.license, 'MIT');
  assert.equal(m.version, '0.2.1');
  assert.ok(m.description && m.description.length > 0);
});

test('openai manifest', () => {
  const m = openai();
  assert.equal(m.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
  assert.equal(m.name, 'myculture');
  const i = iface();
  assert.equal(i.displayName, 'MyCulture');
  assert.ok(i.displayName.length <= 30);
  assert.doesNotMatch(i.displayName, /mcp|plugin/i);
  assert.equal(i.developerName, 'Happily.ai');
  assert.equal(i.shortDescription, 'Culture-fit hiring assessments');
  assert.ok(i.shortDescription.length <= 30);
  assert.ok(i.longDescription.startsWith('MyCulture, by Happily.ai, '));
  assert.ok(i.longDescription.length <= 4000);
  assert.ok(i.defaultPrompt.length >= 1 && i.defaultPrompt.length <= 3);
  for (const p of i.defaultPrompt) {
    assert.ok(p.length <= 128, p);
    assert.doesNotMatch(p, /@/);
  }
  assert.ok(i.capabilities.length >= 1 && i.capabilities.length <= 20);
  for (const c of i.capabilities) assert.ok(c.length <= 120, c);
  assert.equal(i.websiteURL, 'https://www.myculture.ai');
  assert.equal(i.supportURL, 'https://www.myculture.ai/contact-us');
  assert.equal(i.privacyPolicyURL, 'https://www.myculture.ai/privacy-policy');
  assert.equal(i.termsOfServiceURL, 'https://www.myculture.ai/terms-and-conditions');
  assert.equal(i.brandColor, '#4C32CC');
  assert.equal(i.brandColorDark, '#B3A6FF');
  assert.equal(m.extensions['com.openai'].onboardingSkill, './skills/myculture-getting-started/SKILL.md');
});

test('versions match', () => {
  assert.equal(openai().version, claude().version);
  assert.equal(openai().license, claude().license);
  assert.equal(openai().description, claude().description);
});

test('brand colours have at least 2:1 contrast on white and on #212121', () => {
  for (const c of [iface().brandColor, iface().brandColorDark]) {
    assert.ok(contrastRatio(c, '#FFFFFF') >= 2, `${c} on white`);
    assert.ok(contrastRatio(c, '#212121') >= 2, `${c} on #212121`);
  }
});
