---
name: doc-gen
description: >
  Generate documentation from code structures. Creates README files,
  API docs, code comments, and reference documentation from existing
  codebases with minimal input.
---

# Skill: doc-gen

## Purpose

`doc-gen` produces clear, usable documentation from code.

It prevents:

- Outdated or missing documentation.
- Manual doc writing that falls out of sync.
- "What does this do?" confusion in codebases.
- Poor onboarding for new developers.

Instead, it:

- Analyzes code structures (files, functions, classes, modules).
- Generates accurate documentation that matches the code.
- Supports multiple formats (README, API docs, inline comments).
- Creates a documentation skeleton that can be refined.

This skill should be invoked when documentation is missing, outdated, or needs to be generated for a new component.

---

## Invocation

### Explicit

```text
/doc-gen
/doc-gen <target>
/doc-gen src/api/user.js --format=api --lang=js
/doc-gen . --format=readme --depth=2
```

### Natural Language Triggers

If the user says things like:
- "Document this."
- "Generate docs for this."
- "Write a README."
- "What does this function do?"
- "Add docs to this module."
- "Create API documentation."
- "We need documentation."

You MUST treat it as a doc-gen invocation.

---

## Arguments

All optional:

- `<target>` — File, directory, or module to document. Default: current directory.
- `--format=readme|api|inline|full`
  - readme → Project-level README with overview, install, usage.
  - api → Function/class-level API documentation.
  - inline → Add JSDoc/inline comments to code.
  - full → All of the above.
  - Default: readme.
- `--lang=<language>` — Language for code examples (js, ts, py, go, rust). Default: inferred from project.
- `--depth=1|2|3|4`
  - 1 → Top-level overview only.
  - 2 → Include files and their purposes (default).
  - 3 → Include functions/classes with signatures.
  - 4 → Full detail including implementation notes.
- `--output=<path>` — Where to write docs. Default: stdout (print in chat).

---

## Behavior

When doc-gen is invoked, you MUST:

1. **Analyze the target**
   - Identify the scope (file, directory, module, entire project).
   - Detect the language and framework.
   - Identify key exports, functions, classes, and modules.

2. **Determine documentation structure**
   - For `--format=readme`: overview, installation, usage, configuration, contributing.
   - For `--format=api`: signatures, parameters, return types, examples.
   - For `--format=inline`: identify undocumented functions/classes.

3. **Extract relevant information**
   - Parse function signatures (name, params, return types).
   - Identify class structures and methods.
   - Detect dependencies and exports.
   - Find existing documentation to avoid duplication.

4. **Generate documentation**
   - Write accurate docs that match the code.
   - Use appropriate formatting (Markdown for README, JSDoc for inline).
   - Include code examples where helpful.
   - Mark sections as "TODO" if information is unclear.

5. **Output or write**
   - If `--output` specified: write to that path.
   - Otherwise: print documentation in chat using the Output Structure below.

---

## Output Structure

### For README format:

```markdown
# <Project Name>

## Overview
<2-3 sentence description of what this does>

## Installation
```bash
<install command>
```

## Usage
<basic usage examples>

## API Reference
<key functions/classes>

## Configuration
<config options if applicable>

## Contributing
<Brief contribution guidelines>
```

### For API format:

```markdown
## <Function/Class Name>

**File:** `<path>`

**Description:** <what it does>

**Signature:**
```<lang>
<full signature>
```

**Parameters:**
- `<param>`: <description>

**Returns:** <description>

**Example:**
```<lang>
<usage example>
```
```

### For Inline format:

Print the code with added JSDoc/comment headers.

---

## Constraints and Guarantees

- Never fabricate functionality that doesn't exist in the code.
- If unclear about what code does, mark as "TODO: review needed".
- Preserve existing documentation if it exists; update, don't replace.
- Use language-appropriate documentation conventions.
- Keep docs concise but complete enough to be useful.
- The output MUST be copy-paste ready for files or chat.

---

## Philosophy

Documentation is a love letter to your future self.

doc-gen makes it easy to write that letter by deriving it from the source of truth: the code itself.

---
