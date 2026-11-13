# myculture-plugin

The MyCulture plugin for Claude and ChatGPT, published by Happily.ai. One plugin folder, `myculture/`, installs in both: Claude's plugin directory reads it from the public GitHub mirror, and `scripts/package.mjs` builds the ChatGPT ZIP from the same folder.

The plugin adds no tools. It connects to the MyCulture connector (`https://api.myculture.ai/mcp`) and adds skills that guide the assistant through getting started, creating assessments and reading results in plain language.

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
