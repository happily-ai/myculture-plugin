# MyCulture plugin (draft 0.1.0)

Agent Skills for working with [MyCulture](https://myculture.ai) assessments through the MyCulture connector (MCP).
The skills don't add tools. They tell the assistant how to use the connector's tools the way MyCulture customers and
support expect: preview before every change, answers only from what the tools return, no hiring verdicts.

| Skill | Use it for |
|---|---|
| [`myculture-create-assessment`](skills/myculture-create-assessment/SKILL.md) | Creating, changing, publishing and inviting: preview → the user approves in a new message → confirm with the same key and token. Offers a draft without invitations; never acts before the user answers. |
| [`myculture-answer-from-tools`](skills/myculture-answer-from-tools/SKILL.md) | Questions about MyCulture, the connection, permissions and modules, answered only from `get_myculture_overview`, `get_connection_info` and `list_assessment_sections`. Says what the connector can't do and sends the user to the app. |
| [`myculture-read-results`](skills/myculture-read-results/SKILL.md) | Finding candidates and summarising or comparing results item by item, with exact report links and no hire/reject recommendation. |

## Install

The plugin includes `.mcp.json` for the production connector (`https://api.myculture.ai/mcp`). Connecting asks you to
sign in to MyCulture and approve permissions; reading is granted by default, writing and results are approved separately.

- **Claude Code:** `claude --plugin-dir plugins/myculture` for a local try, or install it from the organisation's plugin catalog once it is published there.
- **Codex:** `.codex-plugin/plugin.json` points at `./skills/`.
- **Claude.ai / Claude Desktop:** add the MyCulture connector, then the skills from the organisation's catalog.

Not yet published anywhere. Distribution (organisation catalog or a public company repository) waits for leadership approval.

## Version

The skills are written against MCP 1.5.7 (dev). Customers on staging and production still have 1.2.0, whose tool
results have fewer fields (for example no `totals` / `by_setup` from `list_assessment_sections`). The skills tell the
assistant to use what the tools return, so they still apply, but test them on the version customers have before release.

## For maintainers

- Home: `plugins/myculture/` in the `functions` repo, next to the MCP server it describes. Change a skill in the same
  commit as a tool change in `functions/src/api/mcp/server.ts` that affects it. Any catalog or public copy is generated
  from here; don't edit it by hand.
- Don't put assessment question content here; it belongs to the MyCulture content owner.
- Where each rule came from (eval round, owner vote) and how to measure the skills with the MCP eval (A/B full round):
  [docs/dev/mcp/evaluation/plugin-ab-proposal.md](../../docs/dev/mcp/evaluation/plugin-ab-proposal.md).

See [PRIVACY.md](PRIVACY.md). License: to be decided before public release.
