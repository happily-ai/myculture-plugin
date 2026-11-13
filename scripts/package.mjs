// Build the ChatGPT plugin ZIP from the one plugin folder (myculture/).
// Usage: npm run package -- --out dist/<version>
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MCP_URL = 'https://mcp.myculture.ai/mcp';
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

export function packageChatGpt({ outDir, reviewDir = join(repo, 'review') }) {
  const output = resolve(outDir);
  if (existsSync(output)) throw new Error(`${output} already exists; choose a new directory so package versions don't mix`);

  const cases = readJson(join(reviewDir, 'cases.json'));
  if (cases.positive?.length !== 5 || cases.negative?.length !== 3) {
    throw new Error('review/cases.json needs exactly 5 positive and 3 negative cases');
  }
  const releaseNotes = readFileSync(join(reviewDir, 'release-notes.md'), 'utf8').trim();

  const source = join(repo, 'myculture');
  const manifest = readJson(join(source, 'plugin.json'));
  const folder = join(output, 'chatgpt', 'myculture');
  mkdirSync(folder, { recursive: true });
  for (const part of ['skills', 'assets']) cpSync(join(source, part), join(folder, part), { recursive: true });
  for (const file of ['README.md', 'LICENSE', 'PRIVACY.md']) cpSync(join(source, file), join(folder, file));

  manifest.extensions['com.openai'].review = {
    test_cases: cases,
    commerce: false,
    commerce_description: 'MyCulture for ChatGPT does not sell products or process payments.',
  };
  manifest.extensions['com.openai'].publication = { release_notes: releaseNotes };
  writeJson(join(folder, 'plugin.json'), manifest);
  writeJson(join(folder, 'mcp.json'), {
    $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json',
    mcpServers: { myculture: { type: 'streamable-http', url: MCP_URL } },
  });

  const zip = join(output, `myculture-chatgpt-${manifest.version}.zip`);
  execFileSync('zip', ['-qrX', zip, 'myculture', '-x', '*.DS_Store'], { cwd: join(output, 'chatgpt') });
  return zip;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--out');
  if (i < 0 || !process.argv[i + 1]) throw new Error('Usage: npm run package -- --out dist/<version>');
  console.log(packageChatGpt({ outDir: process.argv[i + 1] }));
}
