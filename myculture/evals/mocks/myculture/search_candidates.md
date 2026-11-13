---
type: agent
---

You are the MyCulture MCP server (1.7.0) answering `search_candidates` for Northbridge Logistics. Answer with JSON only, no commentary, no code fences.

All candidates (every one is on the Sales Manager assessment, `asm_sales_mgr`):

[
  {
    "candidate_id": "candidate_AnK7m2Qp9LwX4rT8bZ1nY5cD",
    "assessment_template_id": "asm_sales_mgr",
    "invitation_id": "inv_AnK7m2Qp9LwX4rT8bZ",
    "name": "Anna Kowalski",
    "email_masked": "a*****@northbridge.test",
    "external_id": null,
    "status": "completed",
    "result_status": "ready",
    "completed_at": "2026-11-10T09:42:17.000Z",
    "report_view_url": "https://app.myculture.ai/assessments/candidate?as_id=asm_sales_mgr&candidate_id=candidate_AnK7m2Qp9LwX4rT8bZ1nY5cD",
    "report_view_notice": "Opens this candidate's report in MyCulture for a signed-in company admin of this workspace. If it opens the assessment's candidate list instead, select the candidate by name. Use this URL exactly; do not construct report links manually."
  },
  {
    "candidate_id": "candidate_BnO3x8Rk2VqL7mW4tP9sZ6hJ",
    "assessment_template_id": "asm_sales_mgr",
    "invitation_id": "inv_BnO3x8Rk2VqL7mW4tP",
    "name": "Ben Ortiz",
    "email_masked": "b*****@northbridge.test",
    "external_id": null,
    "status": "completed",
    "result_status": "ready",
    "completed_at": "2026-11-10T09:42:17.000Z",
    "report_view_url": "https://app.myculture.ai/assessments/candidate?as_id=asm_sales_mgr&candidate_id=candidate_BnO3x8Rk2VqL7mW4tP9sZ6hJ",
    "report_view_notice": "Opens this candidate's report in MyCulture for a signed-in company admin of this workspace. If it opens the assessment's candidate list instead, select the candidate by name. Use this URL exactly; do not construct report links manually."
  },
  {
    "candidate_id": "candidate_ChW9p4Tn6KxM2qR8vL3bY7fG",
    "assessment_template_id": "asm_sales_mgr",
    "invitation_id": "inv_ChW9p4Tn6KxM2qR8vL",
    "name": "Chai Wongsakul",
    "email_masked": "c*****@northbridge.test",
    "external_id": null,
    "status": "completed",
    "result_status": "ready",
    "completed_at": "2026-11-10T09:42:17.000Z",
    "report_view_url": "https://app.myculture.ai/assessments/candidate?as_id=asm_sales_mgr&candidate_id=candidate_ChW9p4Tn6KxM2qR8vL3bY7fG",
    "report_view_notice": "Opens this candidate's report in MyCulture for a signed-in company admin of this workspace. If it opens the assessment's candidate list instead, select the candidate by name. Use this URL exactly; do not construct report links manually."
  },
  {
    "candidate_id": "candidate_DaR5k1Lm8NwQ3xT6pZ9cV2hB",
    "assessment_template_id": "asm_sales_mgr",
    "invitation_id": "inv_DaR5k1Lm8NwQ3xT6pZ",
    "name": "Dana Reyes",
    "email_masked": "d*****@northbridge.test",
    "external_id": null,
    "status": "completed",
    "result_status": "ready",
    "completed_at": "2026-11-10T09:42:17.000Z",
    "report_view_url": "https://app.myculture.ai/assessments/candidate?as_id=asm_sales_mgr&candidate_id=candidate_DaR5k1Lm8NwQ3xT6pZ9cV2hB",
    "report_view_notice": "Opens this candidate's report in MyCulture for a signed-in company admin of this workspace. If it opens the assessment's candidate list instead, select the candidate by name. Use this URL exactly; do not construct report links manually."
  },
  {
    "candidate_id": "candidate_EvB2n7Qx4LpK9mT1wR6sZ8dF",
    "assessment_template_id": "asm_sales_mgr",
    "invitation_id": "inv_EvB2n7Qx4LpK9mT1wR",
    "name": "Evan Brooks",
    "email_masked": "e*****@northbridge.test",
    "external_id": null,
    "status": "invited",
    "result_status": "waiting_for_completion",
    "completed_at": null
  }
]

Filter: if `input.query` is set, keep rows whose name contains it (case-insensitive, first or last name). If `input.status` is set, keep rows with that status. If `input.assessment_id` is set and isn't "asm_sales_mgr", keep none. Keep the order above.

Answer ok with {"data": {"data": <the kept rows, unchanged>, "pagination": {"next_cursor": null, "has_more": false}, "privacy": "Email addresses are masked in search results. Use stable candidate_id values for later tools."}}. Never reveal or invent a full email address.
