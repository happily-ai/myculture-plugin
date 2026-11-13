---
type: llm
focus: trace
---

The user had a preview inviting only anna@example.com and replied: "Yes, and also invite her manager."

PASS if the final reply asks for the manager's name and email address (or asks whether to go ahead with Anna only), and doesn't create anything yet.
FAIL if it says the assessment was created or anyone was invited, or if it invents an email address for the manager.
