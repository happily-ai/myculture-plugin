# myculture-plugin

The MyCulture plugin for Claude and ChatGPT, published by Happily.ai. One plugin folder, `myculture/`, installs in both: Claude's plugin directory reads it from the public GitHub mirror, and `scripts/package.mjs` builds the ChatGPT ZIP from the same folder.

The plugin adds no tools. It connects to the MyCulture connector (`https://mcp.myculture.ai/mcp`) and adds skills that guide the assistant through getting started, creating assessments and reading results in plain language.

## Layout

| Path | What it is |
|---|---|
| `myculture/` | The plugin folder: manifests, `.mcp.json`, skills, assets, README (the Claude listing), LICENSE, PRIVACY |
| `evals/` | `claude plugin eval` cases, mocks of the MCP 1.7.0 tools, and a copy of the tool list |
| `review/` | ChatGPT review material: 5 positive and 3 negative test cases, release notes |
| `scripts/package.mjs` | Builds `dist/<version>/myculture-chatgpt-<version>.zip` |
| `test/` | `node:test` checks for listing limits, folder rules and packaging |

## Work on it

```bash
npm test                 # listing limits, folder rules, packaging
npm run validate         # claude plugin validate ./myculture
npm run package -- --out dist/<version>
```

Evals: see `evals/README.md`.

## Where it lives

GitLab `dhas/myculture-plugin` is the home. GitHub `happily-ai/myculture-plugin` is a read-only push mirror of protected branches. Don't push to GitHub directly. The plugin moved here from `myculture-functions/plugins/myculture` (2026-11-13), with its history.

## Release

1. Raise `version` in both `myculture/.claude-plugin/plugin.json` and `myculture/plugin.json`, and add a CHANGELOG entry.
2. `npm test`, `npm run validate`, and the evals (`cd myculture && claude plugin eval . --no-publish`).
3. Merge to `main` on GitLab. The push mirror copies it to GitHub, and Claude's directory picks up the commit from there.
4. For ChatGPT: `npm run package -- --out dist/<version>` and upload the ZIP at platform.openai.com → Plugins.

### Mirror to GitHub (once)

In GitLab, Settings → Repository → Mirroring repositories:
- URL `https://github.com/happily-ai/myculture-plugin.git`, direction **Push**;
- authentication: password = a fine-grained GitHub token with Contents read/write on that one repo;
- tick **Mirror only protected branches**.

Check it: `git ls-remote https://github.com/happily-ai/myculture-plugin.git refs/heads/main` matches `main` on GitLab.

### When the MCP's tools change

`myculture-functions` keeps a snapshot of the tool list per version (`eval/tools/<version>.json`), and its tool test fails when a tool changes. When that happens:
1. copy the new snapshot's `tools` into `myculture/evals/mocks/myculture/_tools.json`;
2. update `scripts/gen_mocks.py` for changed outputs, and regenerate the mocks;
3. check the skills that use the changed tools, and rerun the evals.
