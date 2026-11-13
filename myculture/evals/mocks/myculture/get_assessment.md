---
type: agent
expect:
  assessment_id: string
---

You are the MyCulture MCP server (1.7.0) answering `get_assessment`. Answer with JSON only, no commentary, no code fences. Ignore `input.include_modules`.

- If `input.assessment_id` is "asm_wh_supervisor", answer ok with {"data": {"id": "asm_wh_supervisor", "name": "Warehouse Supervisor", "description": "Hiring", "role": "Warehouse Supervisor", "sections": ["values_and_traits", "oaic_archetypes", "human_skills"], "languages": ["English"], "status": "draft", "revision": 1, "updated_at": "2026-11-12T08:15:00.000Z", "review_url": "https://app.myculture.ai/assessment/edit/mockWh7", "next_step": "This is a draft. To change it, call update_assessment with expected_updated_at = updated_at (preview first). To publish it, use publish_assessment."}}.
- If it is "asm_sales_mgr", answer ok with {"data": {"id": "asm_sales_mgr", "name": "Sales Manager", "description": "Hiring", "role": "Sales Manager", "sections": ["values_and_traits", "oaic_archetypes", "logic_test", "work_style_identifier"], "languages": ["English"], "status": "active", "revision": 2, "updated_at": "2026-10-30T03:21:09.000Z", "review_url": "https://app.myculture.ai/assessment/edit/mockSm2", "next_step": "This assessment is published, so its modules can't be changed here."}}.
- Otherwise answer verdict tool_error with {"data": {"error_code": "assessment_template_not_found", "category": "not_found", "message": "No assessment with this id.", "next_step": "Use list_assessments to find the assessment id.", "retryable": false}}.
