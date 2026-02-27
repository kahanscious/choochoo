/**
 * choochoo plugin for OpenCode.ai
 *
 * Injects choochoo bootstrap context via system prompt transform.
 * Skills are discovered via OpenCode's native skill tool.
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extractAndStripFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content: body };
};

const normalizePath = (p, homeDir) => {
  if (!p || typeof p !== 'string') return null;
  let normalized = p.trim();
  if (!normalized) return null;
  if (normalized.startsWith('~/')) {
    normalized = path.join(homeDir, normalized.slice(2));
  } else if (normalized === '~') {
    normalized = homeDir;
  }
  return path.resolve(normalized);
};

export const ChoochooPlugin = async ({ client, directory }) => {
  const homeDir = os.homedir();
  const choochooSkillsDir = path.resolve(__dirname, '../../skills');
  const envConfigDir = process.env.OPENCODE_CONFIG_DIR;
  const configDir = envConfigDir ? normalizePath(envConfigDir, homeDir) : path.join(homeDir, '.config/opencode');

  const discoverSkills = () => {
    const skills = [];
    if (!fs.existsSync(choochooSkillsDir)) return skills;
    
    const entries = fs.readdirSync(choochooSkillsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillPath = path.join(choochooSkillsDir, entry.name, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf-8');
          const { frontmatter } = extractAndStripFrontmatter(content);
          skills.push({
            name: entry.name,
            description: frontmatter.description || 'No description'
          });
        }
      }
    }
    return skills;
  };

  const getBootstrapContent = () => {
    const skills = discoverSkills();
    if (skills.length === 0) return null;

    const skillsList = skills.map(s => `- \`${s.name}\` - ${s.description}`).join('\n');
    
    let content = `**choochoo skills loaded:**
You have access to choochoo skills for intentional context control.

**Available skills:**
${skillsList}

**Tool Mapping for OpenCode:**
- \`TodoWrite\` → \`update_plan\`
- \`Task\` tool with subagents → Use OpenCode's subagent system (@mention)
- \`Skill\` tool → OpenCode's native \`skill\` tool
- \`Read\`, \`Write\`, \`Edit\`, \`Bash\` → Your native tools

**Skills location:**
choochoo skills are in \`${configDir}/skills/choochoo/\`
Use OpenCode's native \`skill\` tool to list and load skills.

**Philosophy:**
Control the input. Control the output. context-manager loads only what matters. handoff switches tracks safely.`;

    return `<EXTREMELY_IMPORTANT>
${content}
</EXTREMELY_IMPORTANT>`;
  };

  return {
    'experimental.chat.system.transform': async (_input, output) => {
      const bootstrap = getBootstrapContent();
      if (bootstrap) {
        (output.system ||= []).push(bootstrap);
      }
    }
  };
};
