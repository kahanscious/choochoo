---
name: context-manager
description: >
  Assemble minimal, task-relevant project context for large repositories.
  Prevent token waste by selecting only necessary files, symbols, and
  snippets before problem-solving begins.
---

# Skill: context-manager

## Purpose

`context-manager` builds intentional, minimal context for a task.

It prevents:

- Dumping entire repositories.
- Token waste from irrelevant files.
- Context window overflow.
- Poor reasoning caused by noisy input.

Instead, it:

- Identifies relevant files.
- Extracts only necessary sections.
- Structures context clearly.
- Produces a focused context block for continued work.

This skill should be invoked BEFORE deep implementation or debugging begins.

---

## Invocation

### Explicit

```text
/context-manager <task description>
/context-manager "Fix DMC IRQ timing bug"
/context-manager "Add multi-LLM dispatch layer" --depth=2 --budget=1200

Natural Language Triggers

If the user says things like:
	•	“Load only what we need for this.”
	•	“Build context for this task.”
	•	“What files matter here?”
	•	“Don’t dump the whole repo.”
	•	“Prepare context for this change.”

You MUST treat it as a context-manager invocation.

⸻

Flags

All optional:
	•	--budget=<number>
	•	Max token budget for assembled context.
	•	Default: 1200.
	•	--depth=1|2|3
	•	1 = file-level only.
	•	2 = file + relevant functions/classes (default).
	•	3 = include related dependency files.
	•	--mode=code|debug|architecture|planning
	•	code → prioritize function-level relevance.
	•	debug → include logs, tests, edge cases.
	•	architecture → include module boundaries and interactions.
	•	planning → include high-level structure only.
	•	Default: code.

⸻

Behavior

When context-manager is invoked, you MUST:
	1.	Analyze the task
	•	Extract keywords (files, modules, features).
	•	Detect error types or stack traces (if present).
	•	Infer affected layers (API, core logic, UI, DB, infra, etc.).
	2.	Identify relevant files
Prioritize:
	•	Files explicitly named in the task or conversation.
	•	Files recently discussed or edited.
	•	Files importing or exporting related symbols.
	•	Test files that reference the feature or bug.
	•	Configuration that affects behavior (e.g., flags, env, routing).
Exclude:
	•	Large vendor or dependency directories (e.g., node_modules, venv).
	•	Generated files.
	•	Unrelated assets (images, fonts, etc.).
	•	Logs, unless in debug mode and clearly relevant.
	3.	Extract relevant sections
Based on --depth:
	•	Depth 1:
	•	Only list file paths and short role summaries.
	•	Depth 2:
	•	Include key classes/functions/methods relevant to the task.
	•	Provide short summaries of each section instead of full code when possible.
	•	Depth 3:
	•	Also include related dependency files and cross-module interactions,
staying within the budget.
You SHOULD prefer:
	•	Signatures and concise descriptions over full function bodies.
	•	High-signal snippets over raw dumps.
	4.	Enforce budget
	•	Aim to keep the total assembled context under --budget tokens.
	•	If context exceeds the budget, trim in this order:
	•	Remove lower-priority tests.
	•	Replace long code blocks with concise summaries.
	•	Collapse repetitive structures.
	•	Shorten explanatory text.
You MUST retain:
	•	Enough detail for the model to reason accurately about the task.
	•	Names of files, functions, classes, and key data structures.
	5.	Produce a structured context package
Output a clearly structured block (see next section) that a calling agent
or the user can easily prepend to a follow-up coding/debugging request.

⸻

Output Structure

The context package printed in chat SHOULD follow this structure:

# Context Package

## Task
<the task description you are building context for>

## Selected Files

1. path: <relative/path.ext>
   reason: <why this file matters for the task>
   key sections:
     - <symbol or region 1>
     - <symbol or region 2>

2. path: <relative/other_path.ext>
   reason: <short reason>
   key sections:
     - <symbol or region>

...

## Key Symbols
- <function or class name> — <1-line purpose>
- <identifier> — <1-line purpose>
- ...

## Dependency Notes
- <short note about how these files interact>
- <important constraints or coupling>

## Excluded
- <high-level note of what was intentionally omitted, e.g. "UI assets", "vendor libs">

This structure is a guideline; adapt as needed while staying clear and concise.

⸻

Constraints and Guarantees
	•	Never dump the entire repository.
	•	Never fabricate file contents.
	•	If contents are unknown or unavailable, state "Unknown" instead of guessing.
	•	Prefer summaries over large raw code blocks.
	•	Prefer precision and relevance over completeness.
	•	Preserve exact filenames and identifiers when you reference them.
	•	The produced context package MUST be understandable on its own and usable
as a preamble to a follow-up request.

⸻

Philosophy

Bad context causes bad reasoning.

context-manager ensures the model carries only the cargo needed for this stop,
so downstream coding or debugging can chug along without hitting the token limit.

---
