/**
 * UASET Benchmark Suite Runner
 * Executes real tests across all 6 representative projects and records verifiable evidence
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BENCHMARKS_DIR = path.join(__dirname, '..', '..', 'evaluations', 'benchmarks');
const UASET_BIN = path.join(__dirname, '..', '..', 'bin', 'uaset.js');
const GATE_RUNNER = path.join(__dirname, '..', '..', 'quality-gates', 'gate-runner.js');

const { evaluateProjectGates } = require(GATE_RUNNER);

const benchmarkFolders = fs.readdirSync(BENCHMARKS_DIR).filter(f => fs.statSync(path.join(BENCHMARKS_DIR, f)).isDirectory());

console.log(`\n============================================================`);
console.log(`  UASET BENCHMARK EXECUTION & VERIFICATION ENGINE`);
console.log(`  Executing tests across ${benchmarkFolders.length} benchmark projects`);
console.log(`============================================================\n`);

const benchmarkResults = [];

for (const folder of benchmarkFolders) {
  const projectDir = path.join(BENCHMARKS_DIR, folder);
  console.log(`\n------------------------------------------------------------`);
  console.log(`[*] Benchmarking Project: [${folder}]`);
  console.log(`    Location: ${projectDir}`);

  // 1. Initialize UASET
  try {
    execSync(`node "${UASET_BIN}" init`, { cwd: projectDir, stdio: 'pipe' });
  } catch (e) {
    console.error(`[-] Failed to initialize UASET in ${folder}:`, e.message);
  }

  // 2. Query UASET Status
  let statusOutput = '';
  try {
    statusOutput = execSync(`node "${UASET_BIN}" status`, { cwd: projectDir, encoding: 'utf8' });
  } catch (e) {
    statusOutput = e.stdout || e.message;
  }

  // Extract detected domain and assigned agents
  const domainMatch = statusOutput.match(/Detected Domain:\s+(.*)/);
  const detectedDomain = domainMatch ? domainMatch[1].trim() : 'Unknown';

  // 3. Execute Real Test Suite
  let testPassed = false;
  let testLog = '';
  try {
    testLog = execSync('node test.js', { cwd: projectDir, encoding: 'utf8' });
    testPassed = true;
    console.log(`[+] Test Execution: PASSED`);
  } catch (e) {
    testPassed = false;
    testLog = e.stdout || e.stderr || e.message;
    console.log(`[-] Test Execution: FAILED`);
  }

  // 4. Evaluate Quality Gates
  const gates = evaluateProjectGates(projectDir);
  const passedGates = gates.filter(g => g.status === 'PASSED').map(g => g.gate);

  benchmarkResults.push({
    folder,
    detectedDomain,
    testPassed,
    testLog: testLog.trim(),
    passedGates
  });
}

console.log(`\n============================================================`);
console.log(`  BENCHMARK SUMMARY`);
console.log(`============================================================`);

let allTestsPassed = true;
for (const r of benchmarkResults) {
  const badge = r.testPassed ? '✅ PASSED' : '❌ FAILED';
  if (!r.testPassed) allTestsPassed = false;
  console.log(`- ${r.folder} [${r.detectedDomain}]: ${badge} (Gates satisfied: ${r.passedGates.join(', ')})`);
}

// Generate Benchmark Report
let md = `# UASET Multi-Domain Benchmark Verification Report\n\n`;
md += `**Execution Date:** ${new Date().toISOString()}  \n`;
md += `**Total Benchmarks Tested:** ${benchmarkResults.length}  \n`;
md += `**Overall Result:** ${allTestsPassed ? '✅ 100% BENCHMARKS PASSED WITH EVIDENCE' : '⚠️ SOME BENCHMARKS FAILED'}  \n\n`;

md += `## 1. Domain Coverage & Test Execution Matrix\n\n`;
md += `| Benchmark Project | Identified Domain | Test Status | Quality Gates Verified | Verifiable Output Preview |\n`;
md += `| :--- | :--- | :---: | :---: | :--- |\n`;

for (const r of benchmarkResults) {
  const badge = r.testPassed ? '✅ PASSED' : '❌ FAILED';
  const gatesStr = r.passedGates.map(g => `\`${g}\``).join(', ');
  const logSnippet = r.testLog.split('\n').slice(-1)[0] || 'No log';
  md += `| **${r.folder}** | ${r.detectedDomain} | ${badge} | ${gatesStr} | \`${logSnippet}\` |\n`;
}

md += `\n## 2. Verifiable Execution Logs\n\n`;
for (const r of benchmarkResults) {
  md += `### ${r.folder} (${r.detectedDomain})\n\n`;
  md += `\`\`\`text\n${r.testLog}\n\`\`\`\n\n`;
}

fs.writeFileSync(path.join(__dirname, '..', '..', 'evaluations', 'reports', 'BENCHMARK_REPORT.md'), md, 'utf8');
console.log(`\n[+] Wrote comprehensive benchmark report to evaluations/reports/BENCHMARK_REPORT.md\n`);

process.exit(allTestsPassed ? 0 : 1);
