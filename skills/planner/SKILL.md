---
name: planner
description: >
  Creates detailed phased implementation plans with iterative refinement.
  Uses the Rule of 5 for iterative review and brainstorming questions to
  ensure comprehensive, executable plans. Outputs to docs/plans.
---

# Skill: planner

## Purpose

`planner` creates detailed, phased implementation plans from a user request.

It prevents:

- Jumping into code without understanding the full scope.
- Missing edge cases and dependencies.
- Plans that are too vague to execute.
- Forgetting important steps during implementation.

Instead, it:

- Asks clarifying questions to fully understand requirements.
- Iteratively refines the plan using the Rule of 5.
- Breaks work into discrete, executable phases.
- Persists the plan to markdown for later use.

This skill should be invoked when starting any non-trivial feature or task.

---

## Invocation

### Explicit

```text
/planner
/planner "Add user authentication"
/planner "Build multi-channel notification system" --phases=4 --dir=docs/roadmaps
/planner --review
```

### Natural Language Triggers

If the user says things like:
- "Plan this."
- "Create a plan for..."
- "How should we approach this?"
- "Break this down into steps."
- "What's the implementation plan?"
- "Map out how to build..."
- "I need a phased approach to..."
- "Plan out the implementation."

You MUST treat it as a planner invocation.

---

## Configuration

The output directory is configurable:

- Default: `docs/plans`
- Override with `--dir=<path>` flag

The planner will create this directory if it doesn't exist.

To disable file output entirely, set `--dir=` (empty). The plan will only be printed in chat.

---

## Arguments

All optional:

- `<task>` — What to plan. Can be explicit or inferred from conversation.
- `--phases=<number>` — Number of phases (1-6). Default: infer from complexity.
- `--dir=<path>` — Output directory. Default: `docs/plans`.
- `--review` — Apply Rule of 5 review to an existing plan (provide plan text or file path).
- `--format=brief|detailed|full`
  - brief → High-level phase overview.
  - detailed → Steps within each phase (default).
  - full → Includes dependencies, risks, edge cases, verification.
- `--output=<filename> — Custom filename (without .md). Default: auto-generated from task.

---

## Behavior

When planner is invoked, you MUST:

### Phase 1: Clarifying Questions (Brainstorming)

Before creating a plan, you MUST ask questions to fully understand the scope:

1. **Scope questions:**
   - What is the core goal? What does "done" look like?
   - What files/modules will this affect?
   - Is this a new feature or modification to existing code?

2. **Edge case questions:**
   - What are the failure modes?
   - What should happen if X fails?
   - Are there any constraints (deadlines, backwards compatibility, etc.)?

3. **Quality questions:**
   - How should this be tested?
   - Are there specific code quality requirements?
   - Should documentation be generated?

4. **Dependency questions:**
   - Does this depend on any other work?
   - Are there external services or libraries needed?

Continue asking questions until you have enough clarity. Do NOT proceed to planning until you've confirmed you understand the task.

### Phase 2: Initial Plan Creation

Create a phased plan with:

1. **High-level phases** (use --phases if specified):
   - Phase 1: Foundation/Setup
   - Phase 2: Core Implementation
   - Phase 3: Integration/Extension
   - Phase 4: Testing/Verification
   - Phase 5: Polish/Documentation

2. **Each phase contains:**
   - Clear goal
   - Specific steps (file-level)
   - Verification method for each step
   - Dependencies on previous phases

### Phase 3: Rule of 5 Iterative Refinement

Apply 4-5 review passes to improve the plan. Each pass should focus on different aspects:

**Pass 1: Completeness Check**
- Did we miss any steps?
- Are all files/modules accounted for?
- Check against: "What would a junior engineer need to know?"

**Pass 2: Dependency Analysis**
- Are steps in the right order?
- Any hidden dependencies?
- Check: "What would break if step X is done before Y?"

**Pass 3: Edge Cases & Error Handling**
- What could go wrong?
- How do we handle failures?
- Check: "What happens when [edge case] occurs?"

**Pass 4: Architecture & Design**
- Is this the right approach?
- Any architectural concerns?
- Check: "Will this scale? Is it maintainable?"

**Pass 5: Convergence Check**
- Review the full plan one more time.
- Ask: "Is this as good as we can make it?"
- If new issues surface, iterate again until convergence.

Each pass should produce specific improvements. After Pass 5, the plan should be stable.

### Phase 4: Document Generation

Write the final plan to `<dir>/<filename>.md`:

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
| 1.1  | <desc> | <path> | <how to verify> |

---

## Phase 2: <Name>
...

---

## Dependencies

- <dependency>

## Risks & Mitigations

- <risk>: <mitigation>

## Questions Resolved

- <Q>: <A>

## Open Questions

- <unresolved question>

---

## Review Log

| Pass | Focus | Improvements |
|------|-------|--------------|
| 1 | Completeness | <notes> |
| 2 | Dependencies | <notes> |
| 3 | Edge Cases | <notes> |
| 4 | Architecture | <notes> |
| 5 | Convergence | <notes> |
```

### Phase 5: Present to User

Print a summary in chat:
- Number of phases
- Key decisions made
- Open questions remaining
- Location of full plan

Ask if they want to:
- Execute with `/executing-plans` (step-by-step with checkpoints)
- Give feedback on the plan
- Save for later

---

## Rule of 5 (Detailed)

The Rule of 5, from Jeffrey Emanuel:

> It typically takes 4 to 5 iterations before the agent declares that it's "as good as it can get." At that point it has converged.

Implementation:

1. **Generate** → Initial plan (Pass 0)
2. **Review 1** → Completeness (in-the-small)
3. **Review 2** → Dependencies (in-the-small)
4. **Review 3** → Edge cases (in-the-large)
5. **Review 4** → Architecture/design (in-the-large)
6. **Review 5** → Convergence check

Key principles:
- Each review SHOULD find things the previous reviews missed
- It's normal (and expected) to iterate 4-5 times
- Don't stop at "good enough" - push to convergence
- The 3rd+ reviews are where "existential" questions matter: "Are we doing the Right Thing?"

---

## Constraints and Guarantees

- NEVER skip the clarifying questions phase.
- ALWAYS apply the Rule of 5 (minimum 4 review passes).
- If the user provides incomplete info, ask questions until you have enough.
- The plan MUST be specific enough that an "enthusiastic junior engineer with no context" could execute it.
- Output file MUST be created in the specified directory.
- NEVER claim a plan is complete without the review log showing 5 passes.
- If convergence isn't reached after 5 passes, continue until it stabilizes.

---

## Philosophy

A plan is worth nothing if it doesn't survive first contact with reality.

planner ensures plans are battle-tested through iterative refinement, so when execution begins, you're working from a map that's been checked five times over — not a sketch drawn in haste.

---
