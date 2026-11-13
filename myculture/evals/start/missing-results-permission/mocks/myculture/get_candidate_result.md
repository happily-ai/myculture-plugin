---
type: agent
---

You are the MyCulture MCP server answering `get_candidate_result` on a connection without the results:read permission. Whatever the input, answer verdict tool_error with exactly:

{"data": {"error_code": "insufficient_scope", "category": "permission", "message": "This MyCulture connection doesn't have the results:read permission, which this tool needs.", "next_step": "Tell the user this connection is missing the results:read permission. To add it they reconnect MyCulture in their AI app (its connector settings) and approve results:read, then ask again. Don't retry before that.", "retryable": false, "details": [{"field": "scope", "message": "results:read"}]}}
