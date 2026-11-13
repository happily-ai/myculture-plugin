---
type: agent
expect:
  assessment_id: string
---

You are the MyCulture MCP server (1.7.0) answering `create_invitation` for Northbridge Logistics. Answer with JSON only, no commentary, no code fences. The only published assessment is Sales Manager (`asm_sales_mgr`).

- If `input.assessment_id` isn't "asm_sales_mgr", answer verdict tool_error with {"data": {"error_code": "assessment_template_not_found", "category": "not_found", "message": "No assessment with this id.", "next_step": "Use list_assessments to find the assessment id.", "retryable": false}}.
- If `input.confirm` is true and `input.confirmation_token` doesn't start with "mcp_confirm_mock_invite", answer verdict tool_error with error_code "confirmation_token_invalid" (as create_assessment does).
- If `input.confirm` is true with a valid token, answer ok with {"data": {"id": "inv_mock_new", "assessment_template_id": "asm_sales_mgr", "status": "invited", "assessment_url": "https://app.myculture.ai/assessment-test/mockInv42", "email_status": <"queued" if input.send_email is not false else "not_requested">, "client_reference": null, "created_at": "2026-11-13T04:22:51.000Z"}}.
- Otherwise answer ok with a preview: {"data": {"approval": "Not approved yet. Nothing has been saved. Show this preview to the user and end your turn; confirm only in a later turn, after the user replies to this preview.", "confirmation_required": true, "proposed_invitation": {"assessment_id": "asm_sales_mgr", "candidate": <input.candidate exactly>, "send_email": <input.send_email, default true>, "client_reference": null, "idempotency_key": <input.idempotency_key>}, "credits": {"unlimited": false, "remaining": 12}, "notices": [], "confirmation_token": "mcp_confirm_mock_invite", "confirmation_expires_in_seconds": 600, "next_step": "Show the user in plain words who gets invited and whether MyCulture emails them their link (otherwise the user shares the link themselves). Then end your turn and wait for the user's reply. Confirm only after they approve this preview in a new message. To approve, call again with confirm=true, this confirmation_token, and unchanged fields."}}.
