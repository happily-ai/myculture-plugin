---
name: answer-from-tools
description: "Answer questions about MyCulture, the connected MyCulture account, its permissions, and the assessment modules strictly from what the MyCulture connector's tools return. Use for 'what is MyCulture', 'which company am I connected to', 'what can this connection do', 'why can't I publish', 'which modules are there and how long do they take', 'what do I need to prepare for an assessment for this role'. Not for creating or changing assessments (use create-assessment) or reading candidate results (use read-results)."
---

# Answer MyCulture questions from the tools

Your answer may only contain what a MyCulture tool returned in this conversation. If the tools don't say it, you don't know it: say so, and say where the user can find out (the MyCulture app).

## Which tool answers what

| Question | Tool |
|---|---|
| What MyCulture is, what the connector can and can't do, languages, whether candidates need an account | `get_myculture_overview` |
| Which modules exist, what each measures, minutes, what each needs | `list_assessment_sections` |
| Which company/account is connected, which permissions it has, which are missing, test or live system | `get_connection_info` |
| An existing assessment | `list_assessments`, `get_assessment` |

Call the tool even if you think you know the answer. Don't use web search or general knowledge for facts about MyCulture.

## Rules

1. **Don't add capabilities, permissions, limits or reasons.** Quote or paraphrase the tool. Don't explain *why* something is the way it is unless the tool says why. Don't describe history, earlier versions or bugs.
2. **Permissions:** list the permissions `get_connection_info` returns and the ones it says are missing, by their names. Don't build your own table of what each permission allows beyond what the tools say. Permissions differ per person and per connection, so don't generalise from one connection to "MyCulture".
3. **"I can't do X":** if the user says something doesn't work and doesn't say what, ask what they tried. Then check with the tools whether it's a missing permission (`get_connection_info`, or an `insufficient_scope` error), something the connector doesn't support (`get_myculture_overview` → what it can't do), or something else, and tell them which. For a missing permission, tell them to reconnect MyCulture in their AI app and approve that permission.
4. **Modules:** for each module give its name, one short line on what it measures and its typical minutes, from `list_assessment_sections`. Use the totals the tool returns instead of adding minutes yourself.
   - Modules MyCulture writes from the role (`setup: build`, for example AI Readiness, Role Skills Evaluator): say it is written for the role, and what it tests when the tool or a preview shows it.
   - Fixed modules (`setup: none`, for example Human Skills, Logic Test): one short line on what they measure.
   - Modules built from the user's input (`setup: input`, for example Custom Survey): say the user writes the questions, and what the tool says is needed.
   - Modules with `requires` / `optional`: summarise which inputs they use and what the user would need to prepare.
   Don't say a module is mandatory, recommended or included automatically unless the tool says so.
5. **Not supported:** if no tool supports what the user wants (for example deleting an assessment), say the connector can't do it and tell them to do it in the MyCulture app. Don't try another way.
6. **Only asking?** If the question is about an assessment they might create ("what would one for this role contain?"), answer it, then offer to prepare a preview. Don't create anything until they say yes.
7. **Missing module:** if the user asks for a module MyCulture doesn't have, say so and list the closest existing ones from the tool. Let them choose.

## Answer shape

Short, in the user's language. Lead with the direct answer, then the details from the tool, one line per item. When an item comes from a specific tool result, keep the tool's wording close enough that it can be traced back to it.
