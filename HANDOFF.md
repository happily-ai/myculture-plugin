# What submission still needs

Updated 2026-11-13. The repo, the plugin and the ChatGPT ZIP are ready, and the repo is mirrored to GitHub. The remaining steps need other people's accounts, the production server, or a real-client test.

## Done

| Step | When | Notes |
|---|---|---|
| Logo and icon approved | 2026-11-13 | Tareef. Recorded in `myculture/assets/SOURCE.md` |
| GitLab repo `dhas/myculture-plugin` | 2026-11-13 | `main` pushed; GitLab's starter commit merged in, not overwritten |
| Public mirror `happily-ai/myculture-plugin` | 2026-11-13 | GitLab push mirror over HTTPS, protected branches only. Checked: `main` and tags match, unprotected branches stay off GitHub |
| Tag `v0.2.0` | 2026-11-13 | On both GitLab and GitHub |
| `functions` pointer branch pushed | 2026-11-13 | `mcp/plugin-moved` in `myculture-functions` replaces `plugins/myculture` with a pointer. Merge request dhas/myculture-functions!23, open |
| MCP 1.7.0 on production | 2026-11-13 | MCP engineer: function `mcp` on `https://mcp.myculture.ai/mcp`. The plugin points there from 0.2.1 |

## Still to do

| Step | Who | Notes |
|---|---|---|
| Review and merge dhas/myculture-functions!23 | Rathasit | Adding him as reviewer also tells him the plugin moved |
| Production reviewer account with a fixed PIN | Tareef | `npm --prefix functions run data:fixed-pin-account` in `myculture-functions`. Credentials go in each portal, never in this repo |
| Real-client test on dev, in Claude and ChatGPT | Someone with both accounts | Produces the ChatGPT demo video (`review.demo_recording_url`) and the Claude carousel screenshots (3–5 PNG, at least 1000 px wide) |
| OpenAI business verification and a global-residency project | Tareef | The publisher name must read Happily.ai |
| `OPENAI_APPS_CHALLENGE_TOKEN` in production | MCP engineer | Domain verification for the ChatGPT submission, served on `mcp.myculture.ai` (the MCP's host) |
| Submit the connector to Claude's directory | Tareef | claude.ai/directory/manage → MCP connector, URL `https://mcp.myculture.ai/mcp`. Then pair the plugin with it |
| Submit the plugin to Claude's directory | Tareef | Plugin bundle: repository `happily-ai/myculture-plugin`, path `myculture`, tracked branch `main`. Needs a GitHub account connected on claude.ai that can push to that repo |
| Submit the ChatGPT ZIP | Tareef | `npm run package -- --out dist/<version>`, then upload at platform.openai.com → Plugins |
| MCP eval A/B round for the plugin | Rathasit | `myculture-functions` `docs/dev/mcp/evaluation/plugin-ab-proposal.md`, pointed at this repo's skills, on dev |

## Keep running

| Item | Date | What to do |
|---|---|---|
| GitHub token for the mirror ("GitLab mirror myculture-plugin", owner `tareefatdhas`) | Expires 2027-11-13 | Before then, create a new fine-grained token (`happily-ai`, this repo only, Contents read/write), have `tareefathappily` approve it, and paste it into the mirror's password in GitLab. If it lapses, GitLab's mirror row shows an error and GitHub stops updating |
| Organization approval for tokens | Each new token | `happily-ai` requires its owner (`tareefathappily`) to approve fine-grained tokens: Settings → Personal access tokens → Pending requests |
