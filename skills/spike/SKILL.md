---
name: spike
description: >
  Rapid exploration and feasibility testing. Creates time-boxed experiments
  to validate approaches before committing to implementation. Keeps spike
  artifacts or cleans up based on value.
---

# Skill: spike

## Purpose

`spike` enables rapid exploration to answer questions, test feasibility, or validate approaches without committing to full implementation.

It prevents:

- Wasting days on approaches that won't work.
- Getting lost in exploratory code that never ends.
- Mixing experimental code with production code.

Instead, it:

- Sets clear time boxes (15-60 min).
- Focuses on answering a single question.
- Produces a clear decision (proceed/abandon) with rationale.
- Cleans up or preserves artifacts based on value.

Use this when you're unsure if something will work or how to approach a problem.

---

## Invocation

### Explicit

```text
/spike
/spike "Can we use lib X for feature Y?"
/spike "Test if API rate limit handles our use case" --time=30min
```

### Natural Language Triggers

If the user says things like:
- "Can we use..."
- "Will X work for..."
- "Test if..."
- "Try using..."
- "Explore..."
- "What's the fastest way to..."
- "I need to figure out if..."
- "Is it possible to..."

And they indicate uncertainty or need to validate an approach, treat as spike.

---

## Arguments

All optional:

- `<question>` — What to explore. Can be explicit or inferred.
- `--time=<duration>` — Time box (15m, 30m, 45m, 60m). Default: 30m.
- `--keep` — Preserve spike artifacts in `spikes/` directory.
- `--discard` — Delete spike artifacts after (default unless --keep).

---

## Behavior

When spike is invoked, you MUST:

### Phase 1: Define the Question

Clarify what we're testing:

1. **The question** - What do we need to know?
2. **Success criteria** - What does "it works" look like?
3. **Failure criteria** - What makes us abandon this approach?

If unclear, ask 1-2 quick questions.

### Phase 2: Time Box

Set a clear time limit based on `--time` or default 30m:

- 15m: Quick API check, simple feasibility
- 30m: Moderate exploration, small prototype
- 45-60m: More complex validation

### Phase 3: Explore

Create minimal code to answer the question:

1. **No production code** - Spike code is throwaway
2. **Focus narrowly** - One question, not the whole feature
3. **Test real scenarios** - Use realistic data/conditions
4. **Document findings** - What worked, what didn't

### Phase 4: Decision

Present findings with a clear recommendation:

```
## Spike Results: <Question>

**Time box:** <duration>

### Findings

- <finding 1>
- <finding 2>

### Decision

[ ] **Proceed** — <rationale>
[ ] **Abandon** — <rationale>
[ ] **Need more info** — <what to check next>
```

### Phase 5: Cleanup

- **Default**: Delete spike artifacts
- **With --keep**: Move to `spikes/<descriptive-name>/` with README

If keeping, create a simple `spikes/<name>/README.md`:

```markdown
# Spike: <Question>

**Date:** <YYYY-MM-DD>
**Question:** <what we tested>
**Decision:** proceed | abandon | need-more-info

## Findings

<key findings>

## Artifacts

<what was created and kept>
```

---

## Output Structure

When `--keep` is used, spike artifacts go to:

```
spikes/
└── <kebab-case-question>/
    ├── README.md
    ├── spike.js (or .py, .ts, etc.)
    └── notes.md (optional)
```

---

## Constraints and Guarantees

- Spike code is NEVER production code.
- Must respect time box - stop when time is up.
- Must produce a clear decision, not just "might work".
- Clean up by default - explicit --keep to preserve.
- If time runs out, document partial findings and recommend next steps.

---

## Philosophy

A day of exploration is cheaper than a week of rework.

Spikes let you validate before you commit. They keep exploration focused and time-bounded. The goal isn't to build - it's to learn enough to make a good decision.

---

(End of file)
