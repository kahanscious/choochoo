# 🚂 choochoo

> Keep your agents on track.

Provider-agnostic agent skills for intentional context control. Load only what matters, plan before you code, hand off cleanly between sessions.

---

## Install

**Claude Code**
```
/plugin marketplace add kahanscious/choochoo-marketplace
/plugin install choochoo@kahanscious/choochoo-marketplace
```

**Codex**
```
git clone https://github.com/kahanscious/choochoo ~/.codex/choochoo
ln -s ~/.codex/choochoo/skills ~/.agents/skills/choochoo
```

**OpenCode**
```
git clone https://github.com/kahanscious/choochoo ~/.config/opencode/choochoo
ln -s ~/.config/opencode/choochoo/skills ~/.config/opencode/skills/choochoo
```

More detail: [CLAUDE.md](docs/CLAUDE.md) · [CODEX.md](docs/CODEX.md) · [OPENCODE.md](docs/OPENCODE.md)

---

## Skills

| Command | What it does |
|---------|--------------|
| `/handoff [focus]` | Generates a structured summary of the current session so you can switch chats without losing context |
| `/context-manager "task"` | Loads only the files and code that matter for your task — no token waste |
| `/planner "what to build"` | Creates a phased implementation plan with clarifying questions and Rule of 5 refinement |
| `/planner-mini "what to build"` | Quick plan without the Rule of 5 passes — lighter weight for simpler tasks |
| `/executing-plans [plan path]` | Executes plans step-by-step with verification and human checkpoints |
| `/doc-gen [path]` | Generates README files, API docs, and inline comments from existing code |
| `/architecture` | Creates ADRs and system diagrams — captures the why behind design decisions |
| `/refactor [path]` | Guided code improvements with safety checks and test execution between changes |

[Full skill documentation →](skills)

---

## Config

Some skills support configuration:

**Planner output directory** — By default plans go to `docs/plans`. Change with `--dir=<path>`:
```
/planner "build X" --dir=roadmaps
```

Or disable file output entirely by setting an invalid path.

---

## Update

**Marketplace install**
```
/plugin update choochoo
```

**Manual install**
```
git pull in the choochoo directory
```
