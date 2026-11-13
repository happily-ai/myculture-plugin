---
---

{
  "data": {
    "data": [
      {
        "id": "values_and_traits",
        "label": "Values Alignment",
        "measures": "How a candidate's personal values align with the company's values.",
        "typical_minutes": 7,
        "time_limit_minutes": 10,
        "tag": "culture",
        "setup": "build",
        "requires": [
          {
            "key": "core_values",
            "label": "Company values",
            "rule": "2 to 8 values.",
            "ask": "What are your company's core values? Please list at least two (for example: Teamwork, Integrity)."
          }
        ],
        "optional": [],
        "needs": "The company's core values (at least two). MyCulture matches them to the value cards."
      },
      {
        "id": "oaic_archetypes",
        "label": "Culture Profile",
        "measures": "Which organizational culture a candidate prefers (Clan, Create, Compete, Control), compared with the company's profile.",
        "typical_minutes": 8,
        "time_limit_minutes": 10,
        "tag": "culture",
        "setup": "build",
        "requires": [],
        "optional": [],
        "needs": "The role and company values; MyCulture sets the company profile from them."
      },
      {
        "id": "acceptable_behaviors",
        "label": "Acceptable Behaviors",
        "measures": "Which workplace behaviors a candidate considers acceptable, compared with the company's expectations.",
        "typical_minutes": 4,
        "time_limit_minutes": 5,
        "tag": "culture",
        "setup": "build",
        "requires": [],
        "optional": [],
        "needs": "The role and company values; MyCulture drafts the workplace behaviors and ratings."
      },
      {
        "id": "human_skills",
        "label": "Human Skills",
        "measures": "Written communication, critical thinking, empathy and situational awareness, through open-ended answers.",
        "typical_minutes": 9,
        "time_limit_minutes": 10,
        "tag": "general",
        "setup": "none",
        "requires": [],
        "optional": [],
        "needs": "Nothing; uses the standard open-ended questions (they can be edited in MyCulture)."
      },
      {
        "id": "logic_test",
        "label": "Logic Test",
        "measures": "Logical reasoning, problem-solving and decision-making.",
        "typical_minutes": 10,
        "time_limit_minutes": 10,
        "tag": "general",
        "setup": "none",
        "requires": [],
        "optional": [],
        "needs": "Nothing."
      },
      {
        "id": "work_style_identifier",
        "label": "Work Style Identifier",
        "measures": "A candidate's work style, based on the 3P framework.",
        "typical_minutes": 2,
        "time_limit_minutes": 5,
        "tag": "general",
        "setup": "none",
        "requires": [],
        "optional": [],
        "needs": "Nothing."
      },
      {
        "id": "big5",
        "label": "Big5 Personality",
        "measures": "Personality traits (Big Five) that influence workplace behavior and team dynamics.",
        "typical_minutes": 10,
        "time_limit_minutes": 10,
        "tag": "general",
        "setup": "none",
        "requires": [],
        "optional": [],
        "needs": "Nothing."
      },
      {
        "id": "custom_survey",
        "label": "Custom Survey",
        "measures": "Whatever your organization wants to ask, in a questionnaire you write.",
        "typical_minutes": 5,
        "time_limit_minutes": 10,
        "tag": "culture",
        "setup": "input",
        "requires": [
          {
            "key": "custom_survey_title",
            "label": "Survey title",
            "rule": "Required.",
            "ask": "What should the survey be called?"
          },
          {
            "key": "custom_survey_custom_fields",
            "label": "Questions",
            "rule": "1 to 20 questions.",
            "ask": "What questions do you want to ask, and how should each be answered?"
          }
        ],
        "optional": [],
        "needs": "A title, a description and 1 to 20 questions from the user (custom_survey), or copy it from an assessment that has one (source_assessment_id)."
      },
      {
        "id": "ai_use_evaluator",
        "label": "AI Readiness Assessment",
        "measures": "Critical thinking, communication and judgment when working with AI, through a realistic task.",
        "typical_minutes": 14,
        "time_limit_minutes": 15,
        "tag": "general",
        "setup": "build",
        "requires": [],
        "optional": [],
        "needs": "The role and company values; MyCulture writes the work task from them."
      },
      {
        "id": "role_skills_evaluator",
        "label": "Role Skills Evaluator",
        "measures": "Job-specific technical and professional skills, through a collaborative, AI-guided work task.",
        "typical_minutes": 20,
        "time_limit_minutes": 20,
        "tag": "role",
        "setup": "build",
        "requires": [],
        "optional": [],
        "needs": "The role and company values; MyCulture suggests 5 skills and writes the work task."
      }
    ],
    "filter": null,
    "totals": {
      "count": 10,
      "typical_minutes": 89,
      "time_limit_minutes": 105
    },
    "by_setup": {
      "none": {
        "count": 4,
        "typical_minutes": 31,
        "time_limit_minutes": 35,
        "sections": [
          "human_skills",
          "logic_test",
          "work_style_identifier",
          "big5"
        ]
      },
      "build": {
        "count": 5,
        "typical_minutes": 53,
        "time_limit_minutes": 60,
        "sections": [
          "values_and_traits",
          "oaic_archetypes",
          "acceptable_behaviors",
          "ai_use_evaluator",
          "role_skills_evaluator"
        ]
      },
      "input": {
        "count": 1,
        "typical_minutes": 5,
        "time_limit_minutes": 10,
        "sections": [
          "custom_survey"
        ]
      }
    },
    "next_step": "Explain the modules in plain words (name, what it measures, typical minutes). For totals, quote totals / by_setup instead of adding minutes yourself. If the user picks some, call create_assessment with those sections (and the role, when a section needs it). Don't ask for company values before the preview."
  }
}
