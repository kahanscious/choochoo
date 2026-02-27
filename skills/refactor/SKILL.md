---
name: refactor
description: >
  Guided refactoring with safety checks and incremental steps. Performs
  code improvements while maintaining functionality, running tests,
  and ensuring no regressions.
---

# Skill: refactor

## Purpose

`refactor` improves code quality safely and incrementally.

It prevents:

- Breaking changes that slip into production.
- Giant rewrite PRs that are impossible to review.
- "It works, don't touch it" code rot.
- Lost functionality during improvement.

Instead, it:

- Plans refactors as small, reversible steps.
- Runs tests after each change to verify safety.
- Explains what changed and why.
- Provides rollback points if something breaks.

This skill should be invoked when code needs improvement but must remain functional.

---

## Invocation

### Explicit

```text
/refactor
/refactor src/utils.js --scope=extract-function
/refactor "Rename and move UserService" --dry-run
/refactor . --check=safety
```

### Natural Language Triggers

If the user says things like:
- "Refactor this."
- "Clean up this code."
- "Extract this to a separate function."
- "Rename this to something clearer."
- "Improve this module."
- "Make this more maintainable."
- "Split this file."

You MUST treat it as a refactor invocation.

---

## Arguments

All optional:

- `<target>` — File, directory, or symbol to refactor. Default: current file or conversation context.
- `--scope=rename|extract|move|simplify|full`
  - rename → Rename variables, functions, classes.
  - extract → Extract method, module, or helper.
  - move → Move code between files or modules.
  - simplify → Reduce complexity, simplify logic.
  - full → Comprehensive refactor (use with caution).
  - Default: infer from context or "simplify".
- `--check=safety|tests|both|none`
  - safety → Run basic sanity checks (syntax, imports).
  - tests → Run test suite after changes.
  - both → Run safety and tests (default).
  - none → Skip all checks (dangerous).
- `--dry-run` — Show what would change without applying it.
- `--atomic` — Each change as a separate commit/step.
- `--output=<path>` — Write refactor plan to file instead of executing.

---

## Behavior

When refactor is invoked, you MUST:

1. **Analyze the target**
   - Read the code to be refactored.
   - Identify dependencies and usages (what calls this? what does this call?).
   - Determine scope of change impact.
   - Check for existing tests.

2. **Plan the refactor**
   - Break into smallest possible safe steps.
   - Identify rollback points.
   - Note any edge cases or special handling.
   - If `--dry-run`: output the plan and stop.

3. **Execute incrementally**
   - For each step:
     1. Make the change.
     2. Run safety checks (syntax, imports).
     3. If tests exist, run them.
     4. If anything fails, STOP and report.
     5. Confirm success before proceeding.

4. **Document changes**
   - Explain what changed and why.
   - Note any behavior preserved vs. changed.
   - If tests were added or updated, note that.

5. **Provide summary**
   - Print a summary of:
     - Files changed.
     - Changes made.
     - Tests run and results.
     - Any manual review needed.

---

## Output Structure

### For `--dry-run`:

```markdown
# Refactor Plan (Dry Run)

## Target
`<file or symbol>`

## Planned Changes

### Step 1: <description>
```diff
- <old code>
+ <new code>
```

### Step 2: ...

## Safety Checks
<what will be run>

## Tests
<what tests exist and will be run>

## Rollback Points
<at which steps we can stop if something fails>
```

### For Executed Refactor:

```markdown
# Refactor Complete

## Target
`<file or symbol>`

## Changes Made

| Step | Description | Status |
|------|-------------|--------|
| 1    | <change>    | ✅     |
| 2    | <change>    | ✅     |

## Verification

### Safety Checks
- Syntax: ✅
- Imports: ✅

### Tests
- <test suite>: ✅ (or ❌ with details)

## Files Modified
- `<file1>`
- `<file2>`

## Notes
<any manual review needed, edge cases, etc.>
```

---

## Constraints and Guarantees

- NEVER break existing functionality.
- ALWAYS run tests after each atomic change.
- If tests don't exist, warn the user but proceed with safety checks.
- If anything fails, STOP and provide rollback instructions.
- Never refactor more than requested — stick to the scope.
- The output MUST clearly state what changed and verify it still works.
- If `--dry-run` is used, make no actual changes.

---

## Philosophy

Refactoring is like surgery: small, precise cuts with constant monitoring of vital signs.

refactor treats every change as a procedure with anesthesia, incision, verification, and closure — not a chainsaw approach.

---
