---
name: executing-plans
description: >
  Execute plans created by the planner skill. Runs each phase step-by-step
  with human checkpoints, verification, and progress tracking.
---

# Skill: executing-plans

## Purpose

`executing-plans` takes a plan and runs it.

It prevents:

- Plans that never get executed.
- Forgetting which steps are done.
- Moving forward without verifying each step.
- Losing track of where you are in a multi-phase plan.

Instead, it:

- Reads the plan from the plans directory.
- Executes each step one at a time.
- Verifies completion after each step.
- Allows human checkpoints between phases.
- Tracks progress and reports status.

Use this after `planner` has created a plan you want to execute.

---

## Invocation

### Explicit

```text
/executing-plans
/executing-plans docs/plans/my-feature.md
/executing-plans --phase=2
/executing-plans --resume
```

### Natural Language Triggers

If the user says things like:
- "Execute the plan."
- "Run the plan."
- "Let's start on phase 1."
- "Continue where we left off."
- "What's left in the plan?"

You MUST treat it as an executing-plans invocation.

---

## Arguments

All optional:

- `<plan_path>` — Path to the plan markdown file. Default: most recent plan in docs/plans.
- `--phase=<number>` — Start from a specific phase.
- `--resume` — Continue from where execution left off.
- `--dry-run` — Show what would execute without running it.
- `--auto` — Run in one-shot mode: never check in, never ask questions, just execute straight through to completion.

---

## Arguments

All optional:

- `<plan_path>` — Path to the plan markdown file. Default: most recent plan in docs/plans.
- `--phase=<number>` — Start from a specific phase.
- `--resume` — Continue from where execution left off.
- `--dry-run` — Show what would execute without running it.
- `--auto` — Run in one-shot mode: never check in, just execute all the way through.

---

## Behavior

When executing-plans is invoked, you MUST:

### Phase 0: Get Plan Path (if not provided)

If no plan path is provided:

1. Search `docs/plans/` for .md files
2. List available plans to the user:
   - Show each plan name and creation date
   - Add option: "Other (specify a path)"
3. Wait for user to pick one or specify a path

### Phase 1: Load the Plan

1. Find the plan:
   - If path provided, load that file.
   - If not, find the most recent .md file in `docs/plans/`.
2. Parse the plan structure:
   - Extract phases and steps.
   - Identify verification methods.
   - Note dependencies.
3. If no path was explicitly provided by the user:
   - Present the plan overview to the user
   - ASK: "Ready to execute this plan? Say yes to start, or specify a different plan."
   - Do NOT proceed without explicit user confirmation.
4. If path WAS explicitly provided, still show overview and ask for confirmation before starting.

### Phase 2: Confirm Before Execution

After loading the plan but BEFORE executing ANY steps:

1. Present:
   - Number of phases
   - Total steps
   - Estimated batches (group similar steps together)
2. Ask: "Ready to begin execution? I'll ask before each batch."
3. Wait for user to say yes.
4. Only NOW start executing.

### Phase 3: Execute Each Step

For each step in order:

1. **Present the step**
   - Show the step description, file, and verification method.
   - Ask: "Execute this step? Say yes or describe changes needed."
   - STOP HERE and wait for user response. Do NOT continue until they respond.

2. **Execute the step**
   - Run the code changes for that step.

3. **Verify completion**
   - Check that the step actually did what it claimed.
   - If verification fails, report the issue and stop.

4. **Mark complete**
   - Update progress tracking.
   - Report success or failure.

5. **Ask before next step**
   - Ask: "Next step ready. Say yes to continue, or stop/feedback anytime."
   - STOP HERE and wait for user response.

### Phase 4: Phase Checkpoints

After completing a phase:

1. Summarize what was done.
2. If `--auto` is NOT set:
   - Ask: "Ready to proceed to the next phase? Or would you like to generate a handoff for a fresh chat?"
   - If user wants handoff, invoke the handoff skill.
   - If user wants to stop, save progress and exit.
3. If `--auto` IS set, proceed immediately to next phase.

### Phase 5: Completion

When all phases are done:

1. Summarize the full execution.
2. Report any issues encountered.
3. If `--auto` is NOT set:
   - Offer to generate a handoff if needed.
4. If `--auto` was set, just report completion.

---

## Output Structure

### At Start

```markdown
# Executing Plan: <plan name>

**Phases:** <N>
**Starting from:** Phase <X>

---

## Phase 1: <name>

### Step 1.1: <description>
- File: <path>
- Verification: <how to check>
```

### After Each Step

```markdown
### Step 1.1: ✅ Complete

Verification result: <pass/fail>
```

### At Phase End

```markdown
## Phase 1 Complete

Steps completed: 3/3
Next: Ready for Phase 2?
```

---

## Configuration

The output directory is configurable:

- Default: `docs/plans`
- Override with `--dir=<path>` flag in planner skill

Progress is saved to `<dir>/.progress.json` for resume functionality.

---

## Constraints and Guarantees

- NEVER skip verification steps.
- ALWAYS ask for confirmation before executing (unless `--auto`).
- If a step fails, STOP and report — don't continue.
- Track progress so `--resume` works.
- If the user says stop, save state and exit cleanly.
- At phase end (unless `--auto`): ALWAYS ask if user wants to continue or generate a handoff.
- If invoked without a plan path: ALWAYS ask user to provide one.

---

## Philosophy

A plan without execution is just a wish.

executing-plans turns plans into reality, one verified step at a time.

---
