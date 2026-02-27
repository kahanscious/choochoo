---
name: planner-mini
description: >
  Lightweight phased planning without Rule of 5 iteration. Uses clarifying
  questions and creates structured plans, but skips iterative review passes
  to save API calls/tokens. For simpler tasks where full refinement isn't needed.
---

# Skill: planner-mini

## Purpose

`planner-mini` creates phased implementation plans quickly without the Rule of 5 iteration.

It prevents:

- Jumping into code without understanding the full scope.
- Plans that are too vague to execute.
- Wasting tokens on simple tasks that don't need iterative refinement.

Instead, it:

- Asks clarifying questions to fully understand requirements.
- Creates a clean, executable phased plan.
- Skips the 4-5 review passes to save time and tokens.
- Persists the plan to markdown for later use.

Use this for simpler tasks. Use `planner` (full) when you need the Rule of 5 convergence passes.

---

## Invocation

### Explicit

```text
/planner-mini
/planner-mini "Add user authentication"
/planner-mini "Build notification feature" --phases=3 --dir=docs/plans
```

### Natural Language Triggers

If the user says things like:
- "Quick plan for..."
- "Simple plan for..."
- "Rough plan for..."
- "Brief plan for..."
- "Plan this out quickly."
- "What's the fastest way to build..."
- "Just need a basic plan for..."

And they indicate they want something lightweight (quick, simple, brief, etc.), treat as planner-mini.

If they say "detailed plan" or "full plan", use the full `planner` skill instead.

---

## Configuration

Same as planner:

- Default output directory: `docs/plans`
- Override with `--dir=<path>` flag

The planner will create this directory if it doesn't exist.

---

## Arguments

All optional:

- `<task>` — What to plan. Can be explicit or inferred from conversation.
- `--phases=<number>` — Number of phases (1-6). Default: infer from complexity.
- `--dir=<path>` — Output directory. Default: `docs/plans`.
- `--format=brief|detailed|full`
  - brief → High-level phase overview.
  - detailed → Steps within each phase (default).
  - full → Includes dependencies, risks, edge cases, verification.
- `--output=<filename> — Custom filename (without .md). Default: auto-generated from task.

---

## Behavior

When planner-mini is invoked, you MUST:

### Phase 1: Clarifying Questions (Lightweight)

Ask only the essential questions - fewer than full planner:

1. **Core questions:**
   - What is the goal?
   - What files/modules does this affect?
   - Any hard constraints?

2. **Skip detailed edge case probing** - just note "handle edge cases" in plan.

Do NOT spend excessive time on questions. Get enough to create a reasonable plan.

### Phase 2: Quick Plan Creation

Create a phased plan with:

1. **Phases** (use --phases if specified)
2. **Steps per phase** - specific but not overly detailed
3. **Basic verification** - simple check for each step
4. **Dependencies** - only critical ones

### Phase 3: Document Generation

Write the plan to `<dir>/<filename>.md`:

```markdown
# Plan: <Task Name>

**Created:** <YYYY-MM-DD>

**Phases:** <N>

---

## Overview

<1-2 sentence description>

---

## Phase 1: <Name>

**Goal:** <what this phase achieves>

### Steps

| Step | Description | File | Verification |
|------|-------------|------|--------------|
| 1.1  | <desc> | <path> | <simple check> |

---

## Phase 2: <Name>
...

---

## Key Dependencies

- <only critical ones>

## Notes

- <any important notes>
```

### Phase 4: Present to User

Print a summary:
- Number of phases
- Location of plan
- Ask if they want to proceed or need adjustments

---

## What Changed vs Full Planner

| Aspect | planner (full) | planner-mini |
|--------|----------------|--------------|
| Clarifying questions | Extensive | Lightweight |
| Rule of 5 passes | 4-5 iterations | None |
| Plan detail | Thorough | Sufficient |
| Dependencies section | Full analysis | Critical only |
| Risks section | Detailed | Brief/none |
| Review log | Yes | No |
| Token usage | Higher | Lower |

---

## Constraints and Guarantees

- Do NOT apply Rule of 5 - this is intentionally lightweight.
- Still MUST ask clarifying questions (but can be fewer).
- Plan should be executable but may not be as thoroughly vetted.
- If user wants full refinement, redirect to `planner` skill.
- Output file MUST be created in the specified directory.

---

## Philosophy

Not every task needs five passes of refinement.

planner-mini gives you a solid plan in a fraction of the tokens - enough to execute, without the overhead of convergence iteration. Save the full Rule of 5 for complex, high-stakes work.

---
