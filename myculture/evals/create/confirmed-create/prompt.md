---
description: "The user approves a preview they were shown. The assistant confirms with that preview's token, build and the same idempotency key."
tags: [create]
max_turns: 15
allowed_tools: [Skill]
append_system_prompt: "Today is Friday 2026-11-13. The user is Ploy Srisuk, an owner at Northbridge Logistics. Earlier in this conversation you called create_assessment with idempotency_key csm-assess-4821 and showed Ploy the preview below; she is now replying to it."
---

(The preview you showed me a moment ago, from create_assessment, called with idempotency_key "csm-assess-4821":)

```json
{"data": {"approval": "Not approved yet. Nothing has been saved. Show this preview to the user and end your turn; confirm only in a later turn, after the user replies to this preview.", "confirmation_required": true, "build_id": "build_mock_customer-success-manager", "preview": {"name": "Customer Success Manager - Q4 2026", "role": "Customer Success Manager", "languages": ["English"], "organization_type": "Logistics company", "sections": [{"id": "values_and_traits", "label": "Values Alignment", "minutes": 7}, {"id": "oaic_archetypes", "label": "Culture Profile", "minutes": 8}, {"id": "acceptable_behaviors", "label": "Acceptable Behaviors", "minutes": 4}, {"id": "human_skills", "label": "Human Skills", "minutes": 9}], "not_selected": [{"id": "logic_test", "label": "Logic Test", "minutes": 10}], "estimated_minutes": 28, "values_used": ["Reliability", "Customer First", "Own It"], "will_publish": false, "invitations": [], "send_email": true}, "notices": [], "confirmation_token": "mcp_confirm_mock_customer-success-manager", "next_step": "To approve, call again with confirm=true, this confirmation_token, and the same build_id, name, remove_sections, invite, send_email, publish, and idempotency_key."}}
```

Yes, create it as a draft.
