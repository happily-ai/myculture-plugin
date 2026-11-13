---
type: llm
focus: trace
---

The user asked: "Which modules can a MyCulture assessment include, and how long do they take?"

PASS if the final reply names the ten modules from the tool result, each with a one-line plain description and its typical minutes, and gives the total from the tool (89 minutes for all ten) rather than a different sum. Grouping modules (for example ready to use, written for your role, your own questions) is fine.
FAIL if it shows field names or codes such as setup, build, input, requires or section ids like values_and_traits, invents a module, or says a module is mandatory or recommended when the tool doesn't.
