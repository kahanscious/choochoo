---
name: handoff
description: >
  Generate a compact, structured, portable handoff summary of the current
  session, suitable to paste into a new chat. Supports an explicit `/handoff`
  command, natural language triggers, optional focus, token budgets, modes,
  compression levels, logging, and debug output.
---

# Skill: handoff

## Purpose

`handoff` turns the current project or conversation state into a structured,
copy-paste-ready summary that can be used as the first message in a new chat
or by another agent.

This is not a generic summary. It is a checkpoint:

- Preserves goals, decisions, constraints, and next actions.
- Compresses irrelevant chatter and repetition.
- Keeps enough technical detail to meaningfully continue the work.

The handoff MUST always be printed in the chat so the user can copy and paste
it into a new session.

---

## Invocation

### Explicit command

```text
/handoff
/handoff <focus>
/handoff <focus> --budget=800 --mode=debug --level=2 --log --debug

	•	<focus> (optional positional): a short phrase that describes what to
emphasize, e.g. architecture, DMC IRQ timing, deployment, tests.

If <focus> is omitted, use "General".

Flags
All flags are optional:
	•	--budget=<number>
	•	Target max token size for the handoff output.
	•	Default: 800.
	•	This is a soft limit: do your best to stay under it.
	•	--mode=exec|tech|planning|debug
	•	Controls emphasis:
	•	exec     → high-level, decisions and next actions.
	•	tech     → architecture, files, implementation details.
	•	planning → roadmap, goals, open questions.
	•	debug    → repro steps, hypotheses, experiments.
	•	Default: tech.
	•	--level=1|2|3
	•	Compression intensity:
	•	1 → most compressed (~300–400 tokens).
	•	2 → balanced (~600–900 tokens).
	•	3 → more detailed (~1000–1500 tokens).
	•	Default: 2.
	•	--log
	•	In addition to printing the handoff in chat, append it to a log file
for later inspection:
	•	.handoff-log/handoffs.md
	•	Include metadata (timestamp, focus, budget, mode, level).
	•	--debug
	•	Add a ## Debug (temporary) section at the bottom with:
	•	Approx input tokens (if you can estimate).
	•	Approx output tokens.
	•	Messages summarized.
	•	Compression level.

If syntax is malformed, infer a reasonable interpretation instead of failing.

⸻

Natural Language Triggers

In addition to the explicit /handoff command, you MUST treat certain
natural language requests as if they invoked this skill.

If the user says anything that clearly indicates they want a portable,
new-chat-ready summary or checkpoint, such as:
	•	“Write a handoff.”
	•	“Create a handoff summary.”
	•	“Give me a handoff for a new chat.”
	•	“Summarize this so I can start a new session.”
	•	“Pack this up as a handoff.”
	•	“Checkpoint this conversation for later.”

…then you MUST:
	1.	Interpret this as a handoff skill invocation.
	2.	Infer a focus string from their wording if possible (otherwise "General").
	3.	Use default --budget, --mode, and --level unless they clearly request
something else (e.g. “keep it short” → smaller level, “very technical” →
--mode=tech, “high-level only” → --mode=exec).
	4.	If they explicitly mention logging (e.g. “log this handoff”, “save this
handoff”), treat that as if --log was present.
	5.	If they explicitly ask for compression stats or similar, treat that as if
--debug was present.
	6.	Generate and print the full handoff in chat using the standard output
structure below.

⸻

Behavior

When handoff is invoked (explicitly or via natural language), you MUST:
	1.	Parse arguments / intent
Determine:
	•	Focus string (or "General").
	•	budget (or default 800).
	•	mode (or default tech).
	•	level (or default 2).
	•	Whether --log and/or --debug are effectively requested.
	2.	Extract relevant state from the session
Focus only on content that matters for continuing work:
	•	High-level project goal(s).
	•	Current status (what’s been done, what’s in progress).
	•	Key decisions (and reasons, if known).
	•	Constraints (technical, business, deadlines, non-goals, limits).
	•	Open questions / unresolved issues.
	•	Important files: names, roles, and a brief summary.
	•	Important identifiers: functions, classes, modules, components.
	•	Critical experiments:
	•	Especially in debug mode (repro steps, test runs, outcomes).
	•	Concrete next actions (for an LLM or human).
You MUST drop:
	•	Small talk.
	•	Repetitive discussion that adds no new information.
	•	Dead branches of thought that are clearly abandoned.
	•	Unnecessary detail about non-critical decisions.
	3.	Apply focus filter (if focus provided)
	•	Prioritize content relevant to the focus phrase.
	•	De-emphasize or omit details that are clearly outside the focus,
unless they are critical for understanding the project at all
(e.g., main goal or hard constraints).
	4.	Apply mode emphasis
	•	exec:
	•	Emphasize high-level goal, key decisions, constraints, next actions.
	•	Keep technical details minimal unless they are central to decisions.
	•	tech:
	•	Emphasize architecture, important files, APIs, data structures,
and implementation decisions.
	•	planning:
	•	Emphasize goals, roadmap, open questions, and sequencing of work.
	•	debug:
	•	Emphasize repro steps, exact symptoms, hypotheses, logs, test
results, and current working theory.
	5.	Enforce compression level and budget
Use --level and --budget to control the length:
	•	Level 1 (max compression): aim for ~300–400 tokens.
	•	Level 2 (balanced): aim for ~600–900 tokens.
	•	Level 3 (detailed): aim for ~1000–1500 tokens.
	•	Always attempt to stay under --budget tokens.
When you need to trim:
	•	Remove optional code snippets first.
	•	Shorten file summaries.
	•	Compress Current Status bullets.
	•	Merge similar decisions and questions.
	•	Only as a last resort, trim less critical constraints or details.
You MUST NOT remove:
	•	High-Level Goal.
	•	Key Decisions.
	•	Next Actions.
	•	Core constraints that shape the work.
	6.	Print the handoff in chat
	•	You MUST always print the full handoff in the chat in the exact
output structure described in the next section.
	•	It MUST be self-contained and immediately usable as the first message
in a new chat with a different model or agent.
	7.	Logging (if --log is active)
	•	In addition to printing in chat, append a log entry to:
	•	.handoff-log/handoffs.md
	•	The log entry SHOULD contain:
	•	A YAML-style metadata block with:
	•	timestamp (ISO-8601).
	•	focus.
	•	budget.
	•	mode.
	•	level.
	•	Followed by the exact same handoff content printed in chat.
Example log entry:

---

timestamp: 2026-02-27T10:23:00Z
focus: "DMC IRQ timing"
budget: 800
mode: "debug"
level: 2

---

# Handoff Summary (v1)

...

If the environment provides file-write tools, use them.
If not, still print the handoff in chat; logging is best-effort.

	8.	Debug section (if --debug is active)
	•	Add a final section:

## Debug (temporary)
- Approx input tokens: <if estimable>
- Approx output tokens: <if estimable>
- Messages summarized: <if estimable>
- Compression level: <1/2/3>


	•	This section is only for tuning the skill; it can be ignored by a
downstream agent if not needed.

⸻

Output Structure (Mandatory)

The handoff printed in chat MUST follow this structure:

# Handoff Summary (v1)

## Focus
<focus string or "General">

## Project
- Name: <project name if known, otherwise "Unknown">
- Repo/Location: <path or URL if known, otherwise "Unknown">
- Stack/Tech: <bullet list if known, otherwise "Unknown">

## High-Level Goal
<1–3 sentences describing the core goal of the project or session.>

## Current Status
- <bullet describing what has been done or decided>
- <another bullet>
- ...

## Key Decisions
- <decision and, if known, a short reason>
- <decision>
- ...

## Open Questions
- <unresolved question that still matters>
- ...

## Constraints
- <constraint (tech choices, deadlines, non-goals, limits)>
- ...

## Important Files
List only files that actually matter for continuing the work.

1. path: <relative/path.ext>
   role: <what this file is for>
   summary: <1–2 sentence description>
2. ...

## Important Snippets (optional)
Include up to 3 short code or config snippets that are critical
for understanding or continuing the work.

```lang
// label: <short label, e.g. "IRQ edge case">
<minimal snippet>

Next Actions

List concrete next steps that a new agent or model should take.
	1.	[LLM or Human] <action> (priority: high/med/low)
	2.	…

If `--debug` is active, append:

```text
## Debug (temporary)
- Approx input tokens: <if known>
- Approx output tokens: <if known>
- Messages summarized: <if known>
- Compression level: <1/2/3>


⸻

Constraints and Guarantees
	•	Never claim work is completed if it is not.
	•	If information is missing, write "Unknown" instead of guessing.
	•	Preserve filenames, paths, and identifiers exactly as they appear.
	•	Prefer bullet points and concise wording over long paragraphs.
	•	Do not include irrelevant chatter, jokes, or small talk.
	•	Do not auto-load or rely on previous handoffs unless the user explicitly
asks to review them.
	•	The handoff MUST be useful as a standalone starting point for a new chat
with no prior context.

---
