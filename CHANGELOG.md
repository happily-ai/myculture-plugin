# Changelog

## 0.2.0 (2026-11-13)

First version from its own repo, prepared for the Claude and ChatGPT plugin directories.

- **Moved** from `myculture-functions/plugins/myculture` (draft 0.1.0) with its history.
- **Publisher:** Happily.ai; display name MyCulture. MIT licence.
- **One plugin for both clients:** `.claude-plugin/plugin.json` for Claude, Agent Plugins `plugin.json` with `extensions.com.openai` for ChatGPT. The Codex manifest is folded into it.
- **Skills** (written for MCP 1.7.0):
  - new `myculture-getting-started`: checks the connection, explains MyCulture in two lines, offers three things to try; ChatGPT's onboarding skill;
  - `myculture-create-assessment`: asks only for the role, gives a reason for every module, ends with one question; keeps every preview → confirm rule;
  - `myculture-read-results`: explains each section from the 1.7 interpretation, with interview topics; keeps the user's order and never ranks;
  - `myculture-answer-from-tools`: groups modules in plain words, no field names.
- **Listing:** README as the Claude listing; ChatGPT short and long descriptions, three starter prompts, five capabilities, brand colours; logo and icon from the MyCulture logo (approval pending).
- **ChatGPT package:** `npm run package` builds the ZIP with 5 positive and 3 negative review cases and release notes.
- **Tests:** `node:test` checks for listing limits, folder rules and packaging; 15 `claude plugin eval` cases against mocked MCP 1.7.0 tools.
