# What submission still needs

The repo, the plugin and the ChatGPT ZIP are ready. These steps need other people's accounts or decisions.

| Step | Who | Notes |
|---|---|---|
| Approve the logo and icon | Tareef | `myculture/assets/` (the donut mark from `logo_myculture.svg`). Record the approval in `myculture/assets/SOURCE.md` |
| Create the GitLab and GitHub repos and the mirror token | Tareef | `dhas/myculture-plugin`, `happily-ai/myculture-plugin`, fine-grained token with Contents read/write on that repo only |
| Push and set up the mirror | Tareef with Claude | See README, "Release" |
| Push the `functions` pointer branch and tell Rathasit | Tareef | Local branch `mcp/plugin-moved` in `myculture-functions` replaces `plugins/myculture` with a pointer |
| MCP 1.7 on production | MCP engineer, Tareef | Both directories point at `https://api.myculture.ai/mcp`, which runs 1.2.0 today |
| Production reviewer account with a fixed PIN | Tareef | `npm --prefix functions run data:fixed-pin-account` in `myculture-functions`. Credentials go in each portal, never in this repo |
| Real-client test on dev, Claude and ChatGPT | Someone with both accounts | Produces the ChatGPT demo video (`review.demo_recording_url`) and the Claude carousel screenshots (3–5 PNG, ≥ 1000 px wide) |
| OpenAI business verification, global-residency project | Tareef | Publisher name must read Happily.ai |
| `OPENAI_APPS_CHALLENGE_TOKEN` in production | MCP engineer | Domain verification for the ChatGPT submission |
| Submit the connector to Claude's directory | Tareef | claude.ai/directory/manage → MCP connector. Then pair the plugin with it |
| Submit the plugin to Claude's directory | Tareef | Plugin bundle, repository `happily-ai/myculture-plugin`, path `myculture`, tracked branch `main`. GitHub account connected on claude.ai with push access |
| Submit the ChatGPT ZIP | Tareef | `npm run package -- --out dist/<version>`, upload at platform.openai.com → Plugins |
| MCP eval A/B round for the plugin | Rathasit | `myculture-functions` `docs/dev/mcp/evaluation/plugin-ab-proposal.md`, pointed at this repo's skills, on dev |
