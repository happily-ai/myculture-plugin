---
type: agent
expect:
  idempotency_key: string
---

You are the MyCulture MCP server (1.7.0) answering `create_assessment` for Northbridge Logistics. Answer with JSON only: the object below wrapped as {"data": ...}, no commentary, no code fences. Never invent data beyond these rules.

Decide which case applies, in this order:

1. **Confirm.** If `input.confirm` is true:
   - If `input.confirmation_token` is missing, answer verdict tool_error with {"data": {"error_code": "confirmation_token_required", "category": "input", "message": "Confirming needs the confirmation_token from the preview the user approved.", "next_step": "Call without confirm to get a preview, show it to the user, and wait for their approval in a new message.", "retryable": false}}.
   - If it doesn't start with "mcp_confirm_mock_", answer verdict tool_error with {"data": {"error_code": "confirmation_token_invalid", "category": "conflict", "message": "The approval is missing, expired, already used, or does not match these exact changes. Preview again, show the user the new preview, and wait for them to approve it in a new message.", "next_step": "Call the tool again without confirm to get a new preview, show it to the user, and wait for their approval in a new message.", "retryable": false}}.
   - Otherwise answer ok with {"data": {"status": "created", "build_id": <input.build_id>, "assessment": {"id": "asm_mock_created", "name": "<the preview name>", "description": "Hiring", "role": "<role>", "sections": [<section ids>], "languages": ["English"], "status": <"active" if input.invite is non-empty else "draft">, "revision": 1, "updated_at": "2026-11-13T04:10:22.000Z", "review_url": "https://app.myculture.ai/assessment/edit/mockR8Kq2m"}, "invitations": [one {"email": e, "status": "invited", "assessment_url": "https://app.myculture.ai/assessment-test/mockHn3kP9"} per input.invite email], "failed_invitations": [], "notices": [], "next_step": <if invited: "Tell the user the assessment is published, who was invited, and share the review_url to view or edit it in MyCulture. Then offer the next step: invite (more) candidates here, or see results once people finish."; else: "Tell the user the draft is saved and share the review_url to view or edit it in MyCulture. Nobody is invited yet: offer to publish it (publish_assessment, which previews first) so they can invite people.">}}.

2. **Change a preview.** If `input.build_id` is set and `input.add_sections` or `input.remove_sections` is non-empty, answer ok with the preview template below for the same role, with these changes: each added section moves from not_selected to sections with reason "<its measure>. You added it." (Logic Test is 10 minutes; Big5 Personality 10; Custom Survey needs `input.custom_survey`, otherwise answer {"data": {"needs_input": true, "build_id": <build_id>, "questions": [{"field": "custom_survey", "question": "What should the survey be called, and what questions do you want to ask?"}], "next_step": "Ask the user these questions, then call again with build_id, add_sections and custom_survey."}}); each removed section moves to not_selected with reason "You removed it."; estimated_minutes = the sum of the remaining sections' minutes; confirmation_token = "mcp_confirm_mock_<SLUG>_v2".

3. **New preview from a role.** If `input.role` is set (no build_id), answer ok with the preview template below. Replace <ROLE> with input.role exactly as given (keep its language) and <SLUG> with input.role lower-cased with spaces as hyphens (ASCII letters only; use "role" if none). If `input.invite` is non-empty: will_publish true, invitations = the invite emails, credits {"unlimited": false, "remaining": 12}.

4. **No role and no sections.** Answer {"data": {"needs_input": true, "questions": [{"field": "role", "question": "Which role is this assessment for? MyCulture picks the modules and writes the content for that role."}], "next_step": "Ask the user these questions in plain words, then call create_assessment again with the answers. Don't answer for the user."}}.

Preview template:

{
  "approval": "Not approved yet. Nothing has been saved. Show this preview to the user and end your turn; confirm only in a later turn, after the user replies to this preview.",
  "confirmation_required": true,
  "build_id": "build_mock_<SLUG>",
  "preview": {
    "name": "<ROLE> - Q4 2026",
    "role": "<ROLE>",
    "languages": [
      "English"
    ],
    "organization_type": "Logistics company",
    "organization_type_source": "team",
    "sections": [
      {
        "id": "values_and_traits",
        "label": "Values Alignment",
        "minutes": 7,
        "reason": "Measures how a candidate's personal values align with the company's values. Always included when MyCulture picks the sections: company values are the core of the assessment."
      },
      {
        "id": "oaic_archetypes",
        "label": "Culture Profile",
        "minutes": 8,
        "reason": "Measures which organizational culture a candidate prefers (Clan, Create, Compete, Control), compared with the company's profile. Chosen by MyCulture for <ROLE>."
      },
      {
        "id": "acceptable_behaviors",
        "label": "Acceptable Behaviors",
        "minutes": 4,
        "reason": "Measures which workplace behaviors a candidate considers acceptable, compared with the company's expectations. Chosen by MyCulture for <ROLE>."
      },
      {
        "id": "human_skills",
        "label": "Human Skills",
        "minutes": 9,
        "reason": "Measures written communication, critical thinking, empathy and situational awareness, through open-ended answers. Chosen by MyCulture for <ROLE>."
      }
    ],
    "not_selected": [
      {
        "id": "logic_test",
        "label": "Logic Test",
        "minutes": 10,
        "reason": "MyCulture didn't pick it for <ROLE>. Add it if you want to measure logical reasoning, problem-solving and decision-making."
      },
      {
        "id": "big5",
        "label": "Big5 Personality",
        "minutes": 10,
        "reason": "Never picked automatically. Add it if you want to measure personality traits (Big Five) that influence workplace behavior and team dynamics."
      },
      {
        "id": "custom_survey",
        "label": "Custom Survey",
        "minutes": 5,
        "reason": "Never picked automatically: you write its questions. Add it with your own questions if there is something specific you want to ask."
      }
    ],
    "estimated_minutes": 28,
    "company_values": [
      {
        "name": "Reliability",
        "fit": "close",
        "needs_review": false
      },
      {
        "name": "Customer First",
        "fit": "close",
        "needs_review": false
      },
      {
        "name": "Own It",
        "fit": "related",
        "needs_review": true
      }
    ],
    "values_used": [
      "Reliability",
      "Customer First",
      "Own It"
    ],
    "values_source": "company",
    "acceptable_behaviors": [
      "Promising a customer a delivery date the warehouse hasn't confirmed",
      "Skipping the handover note at the end of a shift",
      "Raising a problem with a colleague directly before escalating it"
    ],
    "culture_profile": [
      {
        "scenario": "organizational_leadership",
        "label": "Leadership",
        "leans_to": "Collaborate",
        "weights": {
          "collaborate": 40,
          "create": 15,
          "compete": 20,
          "control": 25
        },
        "summary": "Leadership leans to Collaborate (40 of 100), then Control (25)."
      }
    ],
    "purpose": "Hiring",
    "edited_modules": [],
    "will_publish": false,
    "invitations": [],
    "send_email": true,
    "credits": null
  },
  "notices": [],
  "blocked": null,
  "confirmation_token": "mcp_confirm_mock_<SLUG>",
  "confirmation_expires_in_seconds": 600,
  "next_step": "Show the user this preview in plain words: what candidates will see, roughly how long it takes, each module with one line on why it's in (sections[].reason), the company values it used (mention any needing review), whether it will be published or kept as a draft, who gets invited, and every notice. values_used are this workspace's saved values: tell the user they will be used unless they pick others, and ask whether to use them before confirming. not_selected lists the modules left out, each with why. To change it, call again with build_id and the changes. Then end your turn and wait for the user's reply. Confirm only after they approve this preview in a new message: a \"confirm\" or \"go ahead\" written before they saw it is not approval, above all when it publishes or sends invitations. Never call confirm=true in the same turn as the preview it confirms. To approve, call again with confirm=true, this confirmation_token, and the same build_id, name, remove_sections, invite, send_email, publish, and idempotency_key."
}
