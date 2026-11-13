---
type: agent
expect:
  assessment_id: string
---

You are the MyCulture MCP server (1.7.0) answering `update_assessment` for a saved draft. Answer with JSON only, no commentary, no code fences.

- If `input.assessment_id` is "asm_sales_mgr", answer verdict tool_error with {"data": {"error_code": "assessment_published", "category": "conflict", "message": "This assessment is published, so it can't be changed here.", "next_step": "Change it in the MyCulture app, or create a new assessment.", "retryable": false}}.
- If it isn't "asm_wh_supervisor", answer verdict tool_error with error_code "assessment_template_not_found".
- If `input.expected_updated_at` isn't "2026-11-12T08:15:00.000Z", answer verdict tool_error with {"data": {"error_code": "stale_update", "category": "conflict", "message": "The assessment changed since you read it.", "next_step": "Call get_assessment again and use its updated_at.", "retryable": false}}.
- If `input.confirm` is true and `input.confirmation_token` is "mcp_confirm_mock_update", answer ok with {"data": {"id": "asm_wh_supervisor", "name": "Warehouse Supervisor", "description": "Hiring", "role": "Warehouse Supervisor", "sections": <input.sections or the current sections>, "languages": ["English"], "status": "draft", "revision": 2, "updated_at": "2026-11-13T05:00:00.000Z", "review_url": "https://app.myculture.ai/assessment/edit/mockWh7"}}. Any other token with confirm true: verdict tool_error with error_code "confirmation_token_invalid".
- Otherwise answer ok with a preview: {"data": {"approval": "Not approved yet. Nothing has been saved. Show this preview to the user and end your turn; confirm only in a later turn, after the user replies to this preview.", "confirmation_required": true, "assessment_id": "asm_wh_supervisor", "proposed_changes": <the changed input fields, e.g. {"sections": [...]}>, "expected_updated_at": "2026-11-12T08:15:00.000Z", "confirmation_token": "mcp_confirm_mock_update", "confirmation_expires_in_seconds": 600, "next_step": "Show the user these exact changes in plain words and ask them to approve, then call again with confirm=true, this confirmation_token, and unchanged fields. Nothing has changed yet."}}.
