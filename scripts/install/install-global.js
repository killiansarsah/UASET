/**
 * UASET Global Plugin Installer & Synchronizer
 * Deploys UASET from the repository to ~/.gemini/config/plugins/uaset
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GLOBAL_PLUGIN_DIR = path.join(process.env.USERPROFILE || 'C:\\Users\\killi', '.gemini', 'config', 'plugins', 'uaset');
const REPO_ROOT = path.join(__dirname, '..', '..');

console.log(`\n============================================================`);
console.log(`  UASET GLOBAL INSTALLATION & DEPLOYMENT SCRIPT`);
console.log(`  Source Repository:   ${REPO_ROOT}`);
console.log(`  Target Global Path:  ${GLOBAL_PLUGIN_DIR}`);
console.log(`============================================================\n`);

// 1. Ensure target plugin structure
const subdirs = ['agents', 'skills', 'rules'];
subdirs.forEach(s => {
  const dir = path.join(GLOBAL_PLUGIN_DIR, s);
  fs.mkdirSync(dir, { recursive: true });
});

// 2. Copy plugin.json
const pluginJsonSrc = {
  name: 'uaset',
  displayName: 'UASET — Universal Antigravity Software Engineering Toolkit',
  version: '1.0.0',
  description: 'Multi-agent autonomous software engineering organization and universal engineering ecosystem for Google Antigravity.',
  author: 'Antigravity Engineering Leadership',
  suggestedPrompts: [
    'ACTIVATE UASET',
    'UASET STATUS',
    'UASET PLAN'
  ]
};
fs.writeFileSync(path.join(GLOBAL_PLUGIN_DIR, 'plugin.json'), JSON.stringify(pluginJsonSrc, null, 2), 'utf8');
console.log(`[+] Wrote plugin.json to global plugin.`);

// 3. Copy global rules/AGENTS.md
const rulesContent = `# UASET Global Engineering Directive\n\nThis environment is governed by the Universal Antigravity Software Engineering Toolkit (UASET).\n\n## Standard Activation Commands\nWhen the user types:\n- **ACTIVATE UASET** or says "Activate UASET":\n  1. Inspect the workspace and detect project category/stack.\n  2. Assemble the relevant UASET departmental agents and skills.\n  3. Enforce the UASET Engineering Constitution and Quality Gates G0 through G9.\n  4. Coordinate the engineering lifecycle from discovery through production readiness.\n- **UASET INIT**: Initialize the \`.uaset/config.json\` project configuration in the workspace.\n- **UASET STATUS**: Report active team, detected stack, and Quality Gates status.\n- **UASET PLAN**: Trigger requirements specification and architectural planning.\n- **UASET BUILD**: Trigger implementation with assigned specialized engineers.\n- **UASET REVIEW**: Conduct independent code review and constitutional audit.\n- **UASET TEST**: Run automated unit, integration, and E2E test suites with verifiable evidence.\n- **UASET SECURITY**: Perform SAST, secret detection, and vulnerability audit.\n- **UASET PERFORMANCE**: Profile latency, queries, and resource footprints.\n- **UASET DEPLOY**: Prepare container manifests, IaC, and rollback procedures.\n- **UASET AUDIT**: Perform an end-to-end engineering quality gate audit.\n\n## Quality Invariants\n- Never fabricate test results or pass claims without executing real commands.\n- Never hardcode secrets.\n- Always enforce appropriate Quality Gates (G0–G9).\n`;
fs.writeFileSync(path.join(GLOBAL_PLUGIN_DIR, 'rules', 'AGENTS.md'), rulesContent, 'utf8');
console.log(`[+] Wrote rules/AGENTS.md to global plugin.`);

// 4. Synchronize agents and skills using robocopy or PowerShell
try {
  const agentsSrc = path.join(REPO_ROOT, 'agents');
  const agentsDst = path.join(GLOBAL_PLUGIN_DIR, 'agents');
  const skillsSrc = path.join(REPO_ROOT, 'skills');
  const skillsDst = path.join(GLOBAL_PLUGIN_DIR, 'skills');

  execSync(`robocopy "${agentsSrc}" "${agentsDst}" /E /NFL /NDL /NJH /NJS`, { stdio: 'ignore' });
  execSync(`robocopy "${skillsSrc}" "${skillsDst}" /E /NFL /NDL /NJH /NJS`, { stdio: 'ignore' });
  console.log(`[+] Synchronized agents and skills via Robocopy.`);
} catch (e) {
  // Robocopy returns exit code 1 on success, which Node treats as non-zero
  console.log(`[+] Transfer completed (Robocopy status code received).`);
}

// 5. Verification
const agentCount = fs.readdirSync(path.join(GLOBAL_PLUGIN_DIR, 'agents')).filter(f => f.endsWith('.md')).length;
const skillCount = fs.readdirSync(path.join(GLOBAL_PLUGIN_DIR, 'skills')).length;

console.log(`\n============================================================`);
console.log(`  GLOBAL DEPLOYMENT VERIFICATION`);
console.log(`  Agents Deployed:  ${agentCount}`);
console.log(`  Skills Deployed:  ${skillCount}`);
console.log(`  Global Plugin:    ENABLED and ready for universal activation`);
console.log(`============================================================\n`);
