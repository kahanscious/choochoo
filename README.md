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
mkdir -p ~/.agents/skills
ln -s ~/.codex/choochoo/skills ~/.agents/skills/choochoo
```

**OpenCode**
```
git clone https://github.com/kahanscious/choochoo ~/.config/opencode/choochoo
mkdir -p ~/.config/opencode/skills
ln -s ~/.config/opencode/choochoo/skills ~/.config/opencode/skills/choochoo
```

More detail: [CLAUDE.md](docs/CLAUDE.md) · [CODEX.md](docs/CODEX.md) · [OPENCODE.md](docs/OPENCODE.md)

---

## Skills

| Command | What it does |
|---------|--------------|
| `/handoff [focus]` | Generates a structured summary of the current session so you can switch chats without losing context |
| `/context-manager "task"` | Loads only the files and code that matter for your task — no token waste |
| `/planner "what to build"` | Creates a phased implementation plan with clarifying questions and Rule of 5 refinement (supports `--phases`, `--dir`, `--format`, `--output`) |
| `/planner-mini "what to build"` | Quick plan without the Rule of 5 passes — lighter weight for simpler tasks (supports `--phases`, `--dir`, `--format`, `--output`) |
| `/executing-plans [plan path]` | Executes plans step-by-step with verification and human checkpoints |
| `/doc-gen [path]` | Generates README files, API docs, and inline comments from existing code |
| `/architecture` | Creates ADRs and system diagrams — captures the why behind design decisions |
| `/refactor [path]` | Guided code improvements with safety checks and test execution between changes |
| `/spike "question"` | Time-boxed exploration to test feasibility before committing (supports `--time`, `--keep`, `--discard`) |
| `/tech-debt` | Scans for debt, creates registry, generates priority reports (supports `scan`, `add`, `report`, `--path`, `--severity`, `--category`, `--file`) |
| `/security` | Identifies vulnerabilities, checks secrets, reviews auth/dependencies (supports `scan`, `check-auth`, `secrets`, `dependencies`, `audit`, `--path`, `--severity`, `--category`) |
| `/performance` | Profiles bottlenecks, optimizes code, analyzes database/cache (supports `profile`, `optimize`, `database`, `cache`, `audit`, `--path`, `--metric`, `--threshold`) |

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
