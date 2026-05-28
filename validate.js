#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SKILLS = ['ml-bootstrap', 'ml-debug', 'ml-ship', 'llm-craft'];
let ok = true;

for (const skill of SKILLS) {
  const skillPath = path.join(__dirname, 'skills', skill, 'SKILL.md');
  if (!fs.existsSync(skillPath)) {
    console.error(`MISSING: ${skillPath}`);
    ok = false;
    continue;
  }
  const content = fs.readFileSync(skillPath, 'utf8');
  if (!content.includes('name:') || !content.includes('description:')) {
    console.error(`INVALID FRONTMATTER: ${skillPath}`);
    ok = false;
  }

  // Check references if directory exists
  const refsDir = path.join(__dirname, 'skills', skill, 'references');
  if (fs.existsSync(refsDir)) {
    const refs = fs.readdirSync(refsDir).filter(f => f.endsWith('.md'));
    for (const ref of refs) {
      const refPath = path.join(refsDir, ref);
      if (fs.statSync(refPath).size === 0) {
        console.error(`EMPTY REFERENCE: ${refPath}`);
        ok = false;
      }
    }
  }
}

if (ok) {
  console.log('All skills valid');
} else {
  process.exit(1);
}
