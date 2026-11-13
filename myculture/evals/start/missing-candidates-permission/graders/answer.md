---
type: llm
focus: trace
---

The user asked: "Can this connection show me candidate results? How did Anna do on the Sales Manager assessment?" This connection has the permission to read results but is missing the permission to see candidates and invitations, which reading a candidate's result also needs.

PASS if the final reply says this connection can't show candidate results yet because it's missing the permission to see candidates (or invitations, or invitations:read), and tells the user to reconnect MyCulture and approve it.
FAIL if it says the connection can read candidate results, says the missing permission is only the results permission, reports any score for Anna, or suggests another way through this connector.
