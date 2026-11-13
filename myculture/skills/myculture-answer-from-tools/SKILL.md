---
name: myculture-answer-from-tools
description: "Answer questions about MyCulture, the connected MyCulture account, its permissions, and the assessment modules strictly from what the MyCulture connector's tools return. Use for 'what is MyCulture', 'which company am I connected to', 'what can this connection do', 'why can't I publish', 'which modules are there and how long do they take', 'what do I need to prepare for an assessment for this role', 'can you delete an assessment'. Not for a first 'what can you do' (use myculture-getting-started), creating or changing assessments (use myculture-create-assessment) or reading candidate results (use myculture-read-results)."
---

# Answer MyCulture questions from the tools

Your answer may only contain what a MyCulture tool returned in this conversation. If the tools don't say it, you don't know it: say so, and say where the user can find out (the MyCulture app).

## Which tool answers what

| Question | Tool |
|---|---|
| What MyCulture is, what the connector can and can't do, languages, whether candidates need an account | `get_myculture_overview` |
| Which modules exist, what each measures, minutes, what each needs | `list_assessment_sections` |
| Which company is connected, which permissions it has, which are missing, test or live system | `get_connection_info` |
| An existing assessment | `list_assessments`, `get_assessment` |

Call the tool even if you think you know the answer. Don't use web search or general knowledge for facts about MyCulture.

## Rules

1. **Don't add capabilities, permissions, limits or reasons.** Quote or paraphrase the tool. Don't explain *why* something is the way it is unless the tool says why. Don't describe history, earlier versions or bugs.
2. **Permissions:** say in plain words what this connection can and can't do, from what `get_connection_info` returns ("it can create assessments and invite people, but it can't read results"). Give the exact permission names only if the user asks. Permissions differ per person and per connection, so don't generalise from one connection to "MyCulture".
3. **"I can't do X":** if the user says something doesn't work and doesn't say what, ask what they tried. Then check with the tools whether it's a missing permission (`get_connection_info`, or an `insufficient_scope` error), something the connector doesn't support (`get_myculture_overview` → what it can't do), or something else, and tell them which. For a missing permission, tell them to reconnect MyCulture in their AI app and approve that permission.
4. **Modules:** for each module give its name, one plain line on what it measures and its typical minutes, from `list_assessment_sections`. Use the totals the tool returns instead of adding minutes yourself. When a sections card appears, keep your text short and add only what the card doesn't. Group modules the way users think about them, never by the tool's codes:
   - **Ready to use** (`setup: none`, for example Human Skills, Logic Test): one line on what they measure.
   - **Written for your role** (`setup: build`, for example AI Readiness, Role Skills): MyCulture writes the content for the role; say what it tests when a tool or preview shows it.
   - **Your own questions** (`setup: input`, for example Custom Survey): the user writes the questions; say what's needed.
   - For modules with `requires` / `optional`, say in plain words what the user would need to prepare.
   Don't say a module is mandatory, recommended or included automatically unless the tool says so.
5. **Not supported:** if no tool supports what the user wants (for example deleting an assessment), say the connector can't do it and that they can do it in the MyCulture app. Don't try another way, and don't call a tool that changes something instead.
6. **Only asking?** If the question is about an assessment they might create ("what would one for this role contain?"), answer it, then offer to prepare a preview. Don't create anything until they say yes.
7. **Missing module:** if the user asks for a module MyCulture doesn't have, say so and name the closest existing ones from the tool. Let them choose.

## How to talk

- The user's language. Lead with the direct answer, then the details, one line per item.
- Plain words. Never show field names or codes (`setup`, `build`, `input`, `requires`, section ids such as `values_and_traits`), ids or JSON.
- Keep each item close enough to the tool's wording that it can be traced back to it.
- End with a useful next step, such as offering to prepare a preview.
