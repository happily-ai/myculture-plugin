---
type: llm
focus: trace
---

The user asked: "How did Anna do on the Sales Manager assessment?" This connection is missing the permission to read results.

PASS if the final reply says that reading results needs a permission this connection doesn't have, and tells the user to reconnect MyCulture in their AI app and approve that permission (naming it as reading results, or results:read).
FAIL if it reports any score, band or result for Anna, guesses one, or suggests another way to get the result through this connector.
