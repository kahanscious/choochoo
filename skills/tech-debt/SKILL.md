---
name: tech-debt
description: >
  Identifies, catalogs, prioritizes, and tracks technical debt across a
  project. Creates a debt registry with severity ratings and remediation
  suggestions.
---

# Skill: tech-debt

## Purpose

`tech-debt` helps identify, track, and prioritize technical debt in a codebase.

It prevents:

- Forgetting about debt until it causes outages.
- Untracked debt that accumulates silently.
- Rework due to unclear dependencies or risky patterns.

Instead, it:

- Scans for common debt patterns.
- Categorizes and rates severity.
- Creates a living debt registry.
- Links debt to issues/tickets for tracking.

Use this for debt audits, onboarding, or before major features.

---

## Invocation

### Explicit

```text
/tech-debt
/tech-debt scan
/tech-debt add "Missing index on user_id" --severity=high --category=db
/tech-debt report
```

### Natural Language Triggers

If the user says things like:
- "What's our technical debt?"
- "Audit the code for debt"
- "Find debt"
- "We have tech debt around..."
- "Clean up debt"
- "What's slowing us down?"
- "Technical debt report"

And they want to explore or track debt, treat as tech-debt.

---

## Arguments

All optional:

- `scan` — Scan codebase for debt patterns (requires path argument).
- `add <description>` — Add a new debt item manually.
- `report` — Generate a debt report from registry.
- `--path=<directory>` — Directory to scan. Default: current.
- `--severity=low|medium|high|critical` — Debt severity.
- `--category=code|arch|test|docs|deps|security|perf` — Debt category.
- `--file=<path>` — Custom debt registry path. Default: `TECH_DEBT.md`.

---

## Behavior

When tech-debt is invoked, you MUST:

### Mode 1: Scan (with `scan` argument)

Scan the codebase for common debt patterns:

1. **Code patterns:**
   - TODO/FIXME/HACK comments
   - Long functions (>100 lines)
   - Large files (>500 lines)
   - Deep nesting (>4 levels)
   - Duplicate code

2. **Architecture patterns:**
   - Circular dependencies
   - God objects/modules
   - Missing abstractions
   - Tight coupling

3. **Testing patterns:**
   - Low coverage files
   - Missing tests for critical paths
   - Brittle tests

4. **Dependency patterns:**
   - Outdated packages
   - Deprecated APIs
   - Unused dependencies

5. **Security/Performance:**
   - N+1 queries
   - Missing caching
   - Hardcoded secrets
   - SQL injection risks

Present findings and offer to add to registry.

### Mode 2: Add (manual entry)

Add a debt item with:

1. **Description** — What the debt is
2. **Category** — Type of debt
3. **Severity** — Impact if not addressed
4. **Effort** — Rough fix time (optional)
5. **Risk** — What breaks if ignored
6. **Links** — Related issues/tickets (optional)

### Mode 3: Report

Generate a debt report from the registry:

```markdown
# Technical Debt Report

**Generated:** <YYYY-MM-DD>
**Total Items:** <N>
**Critical:** <N> | **High:** <N> | **Medium:** <N> | **Low:** <N>

---

## Summary by Category

| Category | Count | Avg Severity |
|----------|-------|---------------|
| code     | <N>   | <severity>    |
| arch     | <N>   | <severity>    |
| ...      |       |               |

---

## Critical

### <Title>

- **Category:** <cat>
- **Severity:** critical
- **Risk:** <what breaks>
- **Suggested fix:** <how to address>
- **Links:** <#issue>

---

## High
...
```

### Debt Registry Format

The registry file (`TECH_DEBT.md` by default):

```markdown
# Technical Debt Registry

## Critical

| ID | Description | Category | Risk | Suggested Fix | Links |
|----|-------------|----------|------|---------------|-------|
| C1 | <desc> | <cat> | <risk> | <fix> | #123 |

## High

| ID | Description | Category | Risk | Suggested Fix | Links |
|----|-------------|----------|------|---------------|-------|
| H1 | <desc> | <cat> | <risk> | <fix> | #456 |

## Medium
...

## Low
...
```

---

## Severity Guidelines

| Severity | Criteria |
|----------|----------|
| critical | Active bug, security vulnerability, blocks deployment |
| high | Causes frequent issues, significant performance impact |
| medium | Nuisance, slows development, needs refactor |
| low | Minor annoyance, easy fix, cosmetic |

---

## Constraints and Guarantees

- Scan results are suggestions - user decides what to add.
- Registry is human-editable markdown.
- Categories must be one of: code, arch, test, docs, deps, security, perf.
- If no registry exists, create one at `--file` path.
- Link to issues when possible for tracking.

---

## Philosophy

Technical debt is inevitable. Untracked debt is dangerous.

tech-debt makes debt visible and actionable. It transforms vague unease into concrete items you can prioritize, track, and pay down systematically.

---

(End of file)
