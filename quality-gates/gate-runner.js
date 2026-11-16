/**
 * UASET Quality Gates Evaluation Engine
 * Validates project state against Gates G0 through G9
 */

const fs = require('fs');
const path = require('path');

const GATES = [
  { id: 'G0', name: 'Requirements Approval', phase: 'Discovery & Spec', reqFiles: ['PRD.md', 'REQUIREMENTS.md', 'specs/PRD.md', '.uaset/requirements.json'] },
  { id: 'G1', name: 'Architecture Approval', phase: 'Architecture', reqFiles: ['ARCHITECTURE.md', 'docs/architecture.md', 'adr/'] },
  { id: 'G2', name: 'Design & UX Approval', phase: 'Design', reqFiles: ['DESIGN.md', 'docs/design-system.md', 'ui/'] },
  { id: 'G3', name: 'Database & API Approval', phase: 'Data & Interfaces', reqFiles: ['SCHEMA.sql', 'schema.prisma', 'openapi.yaml', 'api/'] },
  { id: 'G4', name: 'Implementation Review', phase: 'Development', reqFiles: ['src/', 'lib/', 'app/'] },
  { id: 'G5', name: 'Automated Test Verification', phase: 'Quality', reqFiles: ['tests/', 'test/', '__tests__/'] },
  { id: 'G6', name: 'Security Verification', phase: 'Security', reqFiles: ['SECURITY.md', '.uaset/security-audit.json'] },
  { id: 'G7', name: 'Performance & Reliability', phase: 'Systems', reqFiles: ['PERFORMANCE.md', 'benchmarks/'] },
  { id: 'G8', name: 'Deployment Readiness', phase: 'DevOps', reqFiles: ['Dockerfile', 'docker-compose.yml', '.github/workflows/'] },
  { id: 'G9', name: 'Release Approval', phase: 'Operations', reqFiles: ['CHANGELOG.md', 'RELEASE.md'] }
];

function evaluateProjectGates(projectRoot = process.cwd()) {
  const results = [];
  
  for (const gate of GATES) {
    let satisfied = false;
    let foundEvidence = [];
    
    for (const pattern of gate.reqFiles) {
      const fullPath = path.join(projectRoot, pattern);
      if (fs.existsSync(fullPath)) {
        satisfied = true;
        foundEvidence.push(pattern);
      }
    }
    
    results.push({
      gate: gate.id,
      name: gate.name,
      phase: gate.phase,
      status: satisfied ? 'PASSED' : 'PENDING',
      evidence: foundEvidence
    });
  }
  
  return results;
}

function generateGateReport(projectRoot = process.cwd()) {
  const results = evaluateProjectGates(projectRoot);
  let md = '# UASET Quality Gates Audit Report\n\n';
  md += `Project Path: \`${projectRoot}\`\n\n`;
  md += '| Gate | Name | Phase | Status | Evidence Found |\n';
  md += '| :--- | :--- | :--- | :---: | :--- |\n';
  
  for (const r of results) {
    const badge = r.status === 'PASSED' ? '✅ PASSED' : '⏳ PENDING';
    const evidenceStr = r.evidence.length > 0 ? r.evidence.map(e => `\`${e}\``).join(', ') : '*None detected*';
    md += `| **${r.gate}** | ${r.name} | ${r.phase} | ${badge} | ${evidenceStr} |\n`;
  }
  
  return md;
}

module.exports = {
  GATES,
  evaluateProjectGates,
  generateGateReport
};

if (require.main === module) {
  console.log(generateGateReport(process.cwd()));
}
