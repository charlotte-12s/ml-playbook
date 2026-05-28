#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SKILLS = ['ml-bootstrap', 'ml-debug', 'ml-ship', 'llm-craft'];

const BUNDLES = {
  full: SKILLS,
  'llm-only': ['llm-craft'],
  'traditional-ml': ['ml-bootstrap', 'ml-debug', 'ml-ship']
};

const SCRIPT_DIR = __dirname;

// Colors
const RED = '\x1b[0;31m';
const GREEN = '\x1b[0;32m';
const YELLOW = '\x1b[1;33m';
const NC = '\x1b[0m';

function info(msg) { console.log(`${GREEN}[ml-playbook]${NC} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}[ml-playbook]${NC} ${msg}`); }
function error(msg) { console.error(`${RED}[ml-playbook]${NC} ${msg}`); process.exit(1); }

// Parse arguments
function parseArgs(argv) {
  const args = { bundle: 'full', target: '.', tools: [] };
  const rest = argv.slice(2);
  let i = 0;
  while (i < rest.length) {
    switch (rest[i]) {
      case '--bundle':
        if (!rest[i + 1]) error('--bundle requires a value');
        args.bundle = rest[++i];
        break;
      case '--target':
        if (!rest[i + 1]) error('--target requires a value');
        args.target = rest[++i];
        break;
      case '--tool':
        if (!rest[i + 1]) error('--tool requires a value');
        args.tools.push(rest[++i]);
        break;
      case '--help': case '-h':
        console.log(`Usage: ml-playbook [options]

Options:
  --bundle full|llm-only|traditional-ml   Skill bundle (default: full)
  --target <dir>                          Target directory (default: .)
  --tool claude-code|cursor|codex|gemini|copilot|windsurf  Target tool (auto-detected)
  --help                                  Show this help`);
        process.exit(0);
        break;
      default:
        error(`Unknown option: ${rest[i]}. Use --help for usage.`);
    }
    i++;
  }
  return args;
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function getReferenceFiles(skillDir) {
  const refsDir = path.join(skillDir, 'references');
  if (!fs.existsSync(refsDir)) return [];
  return fs.readdirSync(refsDir).filter(f => f.endsWith('.md'));
}

// Install for Claude Code
function installClaudeCode(targetDir, selectedSkills) {
  info('Installing for Claude Code...');
  const skillsDir = path.join(targetDir, '.claude', 'skills');
  mkdirp(skillsDir);

  for (const skill of selectedSkills) {
    const src = path.join(SCRIPT_DIR, 'skills', skill);
    const dest = path.join(skillsDir, skill);
    copyDirSync(src, dest);
    info(`  Installed skill: ${skill}`);
  }

  // Handle CLAUDE.md
  const claudeMdPath = path.join(targetDir, '.claude', 'CLAUDE.md');
  const rulesContent = fs.readFileSync(path.join(SCRIPT_DIR, 'CLAUDE.md'), 'utf8');
  mkdirp(path.join(targetDir, '.claude'));

  if (fs.existsSync(claudeMdPath)) {
    fs.appendFileSync(claudeMdPath, '\n\n# --- ML Playbook Rules (appended by ml-playbook) ---\n');
    fs.appendFileSync(claudeMdPath, rulesContent);
    info('  Appended rules to existing CLAUDE.md');
  } else {
    fs.writeFileSync(claudeMdPath, rulesContent);
    info('  Created .claude/CLAUDE.md');
  }
}

// Install for Cursor
function installCursor(targetDir, selectedSkills) {
  info('Installing for Cursor...');
  const rulesDir = path.join(targetDir, '.cursor', 'rules');
  mkdirp(rulesDir);

  for (const skill of selectedSkills) {
    const skillMd = path.join(SCRIPT_DIR, 'skills', skill, 'SKILL.md');
    let content = fs.readFileSync(skillMd, 'utf8');

    // Append reference file contents if they exist
    const refs = getReferenceFiles(path.join(SCRIPT_DIR, 'skills', skill));
    if (refs.length > 0) {
      content += '\n\n## Reference Files';
      for (const ref of refs) {
        content += `\n\n### ${path.basename(ref, '.md')}\n\n`;
        content += fs.readFileSync(path.join(SCRIPT_DIR, 'skills', skill, 'references', ref), 'utf8');
      }
    }

    fs.writeFileSync(path.join(rulesDir, `${skill}.mdc`), content);
    info(`  Installed rule: ${skill}.mdc`);
  }

  const rulesContent = fs.readFileSync(path.join(SCRIPT_DIR, 'CLAUDE.md'), 'utf8');
  fs.writeFileSync(path.join(rulesDir, 'ml-playbook-rules.mdc'), rulesContent);
  info('  Installed rules: ml-playbook-rules.mdc');
}

// Install for single-file tools (Codex, Gemini, Copilot, Windsurf)
function installSingleFile(targetDir, selectedSkills, fileName) {
  const validTools = {
    codex: { file: 'AGENTS.md', label: 'Codex CLI' },
    gemini: { file: 'GEMINI.md', label: 'Gemini CLI' },
    copilot: { file: path.join('.github', 'copilot-instructions.md'), label: 'GitHub Copilot' },
    windsurf: { file: '.windsurfrules', label: 'Windsurf' }
  };
  const { file, label } = validTools[fileName];
  info(`Installing for ${label}...`);

  let content = fs.readFileSync(path.join(SCRIPT_DIR, 'CLAUDE.md'), 'utf8');
  content += '\n\n## Skill Instructions';

  for (const skill of selectedSkills) {
    content += '\n\n' + fs.readFileSync(path.join(SCRIPT_DIR, 'skills', skill, 'SKILL.md'), 'utf8');
    const refs = getReferenceFiles(path.join(SCRIPT_DIR, 'skills', skill));
    if (refs.length > 0) {
      for (const ref of refs) {
        content += `\n\n### Reference: ${path.basename(ref, '.md')}\n\n`;
        content += fs.readFileSync(path.join(SCRIPT_DIR, 'skills', skill, 'references', ref), 'utf8');
      }
    }
  }

  const filePath = path.join(targetDir, file);
  mkdirp(path.dirname(filePath));
  fs.appendFileSync(filePath, content);
  info(`  Appended to ${file}`);
}

// Main
function main() {
  const args = parseArgs(process.argv);

  // Validate bundle
  if (!BUNDLES[args.bundle]) {
    error(`Unknown bundle: ${args.bundle}. Use: full, llm-only, traditional-ml`);
  }
  const selectedSkills = BUNDLES[args.bundle];

  // Resolve target directory
  const targetDir = path.resolve(args.target);
  if (!fs.existsSync(targetDir)) {
    error(`Target directory not found: ${args.target}`);
  }
  process.chdir(targetDir);

  // Auto-detect tools if not specified
  let tools = args.tools;
  if (tools.length === 0) {
    if (fs.existsSync('.claude')) tools.push('claude-code');
    if (fs.existsSync('.cursor')) tools.push('cursor');
    if (fs.existsSync('AGENTS.md')) tools.push('codex');
    if (fs.existsSync('GEMINI.md')) tools.push('gemini');
    if (fs.existsSync('.github')) tools.push('copilot');
    if (fs.existsSync('.windsurfrules')) tools.push('windsurf');

    if (tools.length === 0) {
      tools.push('claude-code');
      info('No tool detected, defaulting to Claude Code');
    } else {
      info(`Detected tools: ${tools.join(', ')}`);
    }
  }

  // Validate tool names
  const validToolNames = ['claude-code', 'cursor', 'codex', 'gemini', 'copilot', 'windsurf'];
  for (const tool of tools) {
    if (!validToolNames.includes(tool)) {
      error(`Unknown tool: ${tool}. Valid options: ${validToolNames.join(', ')}`);
    }
  }

  // Execute installations
  for (const tool of tools) {
    switch (tool) {
      case 'claude-code': installClaudeCode(targetDir, selectedSkills); break;
      case 'cursor': installCursor(targetDir, selectedSkills); break;
      case 'codex': installSingleFile(targetDir, selectedSkills, 'codex'); break;
      case 'gemini': installSingleFile(targetDir, selectedSkills, 'gemini'); break;
      case 'copilot': installSingleFile(targetDir, selectedSkills, 'copilot'); break;
      case 'windsurf': installSingleFile(targetDir, selectedSkills, 'windsurf'); break;
    }
  }

  info(`Installation complete!`);
  info(`Installed ${selectedSkills.length} skill(s) for ${tools.length} tool(s)`);
  info(`Skills: ${selectedSkills.join(', ')}`);
  info(`Tools: ${tools.join(', ')}`);
}

main();
