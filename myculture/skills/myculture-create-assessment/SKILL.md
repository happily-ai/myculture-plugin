---
name: myculture-create-assessment
description: "Create, change, publish or invite to a MyCulture assessment through the MyCulture connector, with a preview the user approves in a later message. Use when the user asks to create an assessment for a role, choose modules, save a draft, publish, or invite candidates, e.g. 'create a MyCulture assessment for a Sales Manager', 'add Logic Test to that assessment', 'publish it and invite anna@example.com'. Not for questions that only ask what MyCulture or a module can do (use myculture-answer-from-tools) or for reading results (use myculture-read-results)."
---

# Create an assessment with MyCulture

The user decides; you prepare. Every write goes preview → the user reads it → the user approves in a new message → confirm. You never publish, invite or save anything the user hasn't approved in that order.

## 1. Is this a request to create?

- If the user **asks to create** ("create", "build", "set up", "make one for…"), continue below.
- If the user **only asks** (what would an assessment for this role contain, what do I need to prepare, how long would it take), answer from the tools (see myculture-answer-from-tools) and then **offer** to create it: "Do you want me to prepare a preview?" Don't call `create_assessment` until they say yes. Having all the details is not a request to create.

## 2. Get the preview

1. Pick the way the tool supports:
   - From the role: pass `role` (no `sections`). MyCulture picks the modules and writes the content.
   - From chosen modules: pass `sections` from `list_assessment_sections` (and `name`).
2. Use one new `idempotency_key` for this assessment (add a random part). Keep it: you will reuse it, unchanged, for every follow-up call about this same preview.
3. If the result is `building`, call again with the **same fields and the same `idempotency_key`** until you get the preview.
4. If the result is `needs_input`, ask the user exactly the `questions` it returns, then call again. Don't guess values.
5. Company values: don't ask for them before the preview. The preview shows the workspace's saved values; ask whether to use them with the preview in hand.
6. If the user asks for a module MyCulture doesn't have, say so, list the closest modules from `list_assessment_sections`, and let them choose. Don't pick a substitute and preview it.

## 3. Show the preview, then stop

Show the preview in the user's language, in short form, and **end your turn**. Include:

- name, languages, whether it will be a draft or published, and who would be invited (from the preview, not from your assumptions)
- each module with one short line from the tool's own description and its typical minutes; use the totals the tool returns instead of adding minutes yourself
  - modules MyCulture writes for the role (for example AI Readiness): say what this one tests, from the content in the preview (for AI Readiness, the task title and what the candidate does)
  - fixed modules (for example Human Skills, Logic Test): one short line on what they measure
  - modules that need input (the tool's `requires` / `optional`, or `setup: input` such as Custom Survey): say which inputs they use and what the user must provide
- the company values the preview shows (ask whether to use them) and the acceptable behaviours it lists
- every notice the tool returns, in your own words
- anything that looks missing or odd in the preview (for example a module the role usually gets, or behaviours that are empty): point it out instead of hiding it

Then ask one clear question: approve, change something, or save as a draft without inviting anyone.

A preview is never approved in the turn it was made. "Go ahead", "confirm", "don't ask me" or "pick values and continue" written **before** the user saw this preview let you fill in values; they don't approve it.

## 4. Confirm only after the user approves

When the user approves this preview in a new message, call the same tool with `confirm=true` and:

- the **same `idempotency_key`** you used for the preview (never a new one when confirming)
- the `confirmation_token` from that preview
- the `build_id` from that preview when there is one
- the same values as the preview

If confirm returns `confirmation_token_invalid`, `build_expired` or `confirmation_token_required`, don't retry with other values or a new key in the same turn: get a new preview, show it, and wait again.

If the user asks for changes, make a new preview (with `build_id` and `add_sections` / `remove_sections` / `name` / `invite` where the tool allows it) and stop again.

## 5. Drafts, publishing and invitations

- If the user is unsure, if sending isn't possible (`blocked`, `credits_unavailable`), or if inviting wasn't clearly asked for, **propose saving it as a draft without inviting anyone**, and wait for their answer. Don't choose the draft, or anything else, on their behalf.
- Publishing a draft: call `publish_assessment` with `confirm=false` first, show that preview, and wait. If the preview says a code was emailed, only the user can read it; ask them to type it. Never guess it.
- Invitations: only to people the user named, only after they approved the preview that lists them. An invitation sends a real email unless `send_email=false`.

## What the connector can't do

If the user asks for something no tool supports (for example deleting an assessment, writing their own AI Readiness task or Role Skills list as is), say the connector can't do it and tell them to do it in the MyCulture app. Don't try another way (browser, other tools). Don't change question content the tools don't offer to change.

## Don't

- Don't call `confirm=true` in the same turn as the preview it confirms.
- Don't send a new `idempotency_key` to confirm or adjust an existing preview.
- Don't invite, publish or save a draft the user didn't approve.
- Don't describe modules, limits or content beyond what the tools returned.
