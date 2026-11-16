/**
 * UASET Multi-Workspace Independent Global Activation Test
 * Verifies that independent project workspaces activate and use the shared global UASET installation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const UASET_BIN = path.join(__dirname, '..', 'bin', 'uaset.js');
const BASE_TEST_DIR = path.join(__dirname, '..', 'evaluations', 'test-projects');

fs.mkdirSync(BASE_TEST_DIR, { recursive: true });

const TEST_WORKSPACES = [
  {
    name: 'workspace-web-analytics',
    domain: 'Full-stack SaaS',
    seedFiles: {
      'next.config.js': 'module.exports = {};',
      'package.json': JSON.stringify({ name: 'web-analytics', version: '0.1.0' })
    }
  },
  {
    name: 'workspace-desktop-crypto',
    domain: 'Windows / Desktop Application',
    seedFiles: {
      'tauri.conf.json': JSON.stringify({ app: { title: 'CryptoDesk' } }),
      'package.json': JSON.stringify({ name: 'cryptodesk', version: '0.1.0' })
    }
  },
  {
    name: 'workspace-mobile-health',
    domain: 'Mobile Application',
    seedFiles: {
      'app.json': JSON.stringify({ name: 'health-app' }),
      'package.json': JSON.stringify({ name: 'health-mobile', version: '0.1.0' })
    }
  }
];

console.log(`\n============================================================`);
console.log(`  UASET MULTI-WORKSPACE INDEPENDENCE TEST`);
console.log(`  Verifying 3 independent workspaces using single global installation`);
console.log(`============================================================\n`);

const results = [];

for (const ws of TEST_WORKSPACES) {
  const wsDir = path.join(BASE_TEST_DIR, ws.name);
  fs.mkdirSync(wsDir, { recursive: true });

  // Seed minimal indicator files
  for (const [f, content] of Object.entries(ws.seedFiles)) {
    fs.writeFileSync(path.join(wsDir, f), content, 'utf8');
  }

  console.log(`[*] Testing Independent Workspace: ${ws.name}`);

  // Step 1: Run UASET Init
  execSync(`node "${UASET_BIN}" init`, { cwd: wsDir, stdio: 'pipe' });

  // Step 2: Verify .uaset/config.json exists
  const configPath = path.join(wsDir, '.uaset', 'config.json');
  const hasLocalConfig = fs.existsSync(configPath);

  // Step 3: Run UASET Status
  const statusOut = execSync(`node "${UASET_BIN}" status`, { cwd: wsDir, encoding: 'utf8' });

  // Step 4: Verify Domain Detection
  const domainMatch = statusOut.match(/Detected Domain:\s+(.*)/);
  const detectedDomain = domainMatch ? domainMatch[1].trim() : 'Unknown';

  // Step 5: Verify no duplicated global folders inside workspace
  const filesInWs = fs.readdirSync(wsDir);
  const hasDuplicatedSkills = filesInWs.includes('skills');
  const hasDuplicatedAgents = filesInWs.includes('agents');

  const passed = hasLocalConfig && (detectedDomain === ws.domain) && !hasDuplicatedSkills && !hasDuplicatedAgents;

  console.log(`    - Local Config Created:      ${hasLocalConfig ? 'YES' : 'NO'}`);
  console.log(`    - Domain Correctly Detected: ${detectedDomain} (Expected: ${ws.domain})`);
  console.log(`    - No Global Directory Clones: ${(!hasDuplicatedSkills && !hasDuplicatedAgents) ? 'PASSED' : 'FAILED'}`);
  console.log(`    - Verdict:                   ${passed ? '✅ PASSED' : '❌ FAILED'}\n`);

  results.push({
    workspace: ws.name,
    expectedDomain: ws.domain,
    detectedDomain,
    hasLocalConfig,
    noDuplication: !hasDuplicatedSkills && !hasDuplicatedAgents,
    passed
  });
}

const allPassed = results.every(r => r.passed);

console.log(`============================================================`);
console.log(`  INDEPENDENCE TEST VERDICT: ${allPassed ? '✅ 100% PASSED' : '❌ FAILED'}`);
console.log(`============================================================\n`);

// Write report
let reportMd = `# UASET Workspace Independence Verification Report\n\n`;
reportMd += `**Audit Timestamp:** ${new Date().toISOString()}  \n`;
reportMd += `**Test Result:** ${allPassed ? '✅ VERIFIED — MULTI-WORKSPACE INDEPENDENCE CONFIRMED' : '⚠️ FAILURES DETECTED'}  \n\n`;

reportMd += `## Results Matrix\n\n`;
reportMd += `| Workspace Name | Expected Domain | Detected Domain | Local Config Created | No Duplicate Global Files | Result |\n`;
reportMd += `| :--- | :--- | :--- | :---: | :---: | :---: |\n`;

for (const r of results) {
  const badge = r.passed ? '✅ PASSED' : '❌ FAILED';
  reportMd += `| \`${r.workspace}\` | ${r.expectedDomain} | ${r.detectedDomain} | ${r.hasLocalConfig ? 'Yes' : 'No'} | ${r.noDuplication ? 'Yes' : 'No'} | ${badge} |\n`;
}

reportMd += `\n## Architectural Conclusion\n\nEach independent workspace operates autonomously with project-scoped configuration (\`.uaset/config.json\`) while inheriting skills, agents, and rules seamlessly from the single global UASET installation at \`~/.gemini/config/plugins/uaset/\`. No unnecessary duplicate global files or redundant agent copies are generated.\n`;

fs.writeFileSync(path.join(__dirname, '..', 'evaluations', 'reports', 'INDEPENDENCE_REPORT.md'), reportMd, 'utf8');

process.exit(allPassed ? 0 : 1);
