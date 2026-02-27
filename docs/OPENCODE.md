# Choochoo for OpenCode

## Install

```bash
git clone https://github.com/kahanscious/choochoo ~/.config/opencode/choochoo
mkdir -p ~/.config/opencode/plugins ~/.config/opencode/skills
ln -s ~/.config/opencode/choochoo/.opencode/plugins/choochoo.js ~/.config/opencode/plugins/choochoo.js
ln -s ~/.config/opencode/choochoo/skills ~/.config/opencode/skills/choochoo
```

Restart OpenCode.

## Update

```bash
cd ~/.config/opencode/choochoo && git pull
```

## Uninstall

```bash
rm ~/.config/opencode/plugins/choochoo.js
rm ~/.config/opencode/skills/choochoo
```
