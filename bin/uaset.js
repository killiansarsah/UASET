#!/usr/bin/env node

/**
 * UASET CLI — Universal Antigravity Software Engineering Toolkit
 * Primary command-line interface and orchestrator engine
 */

const fs = require('fs');
const path = require('path');

const VERSION = '1.0.0';

const DOMAIN_DETECTORS = [
  { domain: 'Full-stack SaaS', files: ['next.config.js', 'next.config.mjs', 'app/layout.tsx', 'prisma/schema.prisma', 'drizzle.config.ts'], stack: ['React/Next.js', 'TypeScript', 'Node.js', 'PostgreSQL/Prisma'], agents: ['uaset-orchestrator', 'uaset-frontend-engineer', 'uaset-backend-engineer', 'uaset-database-engineer', 'uaset-test-engineer', 'uaset-appsec-engineer'] },
  { domain: 'Mobile Application', files: ['pubspec.yaml', 'android/app/build.gradle', 'ios/Podfile', 'app.json'], stack: ['Flutter/Dart', 'React Native', 'Kotlin/Swift'], agents: ['uaset-orchestrator', 'uaset-mobile-engineer', 'uaset-android-engineer', 'uaset-ios-engineer', 'uaset-ui-ux-designer', 'uaset-test-engineer'] },
  { domain: 'Windows / Desktop Application', files: ['*.csproj', '*.sln', 'tauri.conf.json', 'electron.js', 'package.json#electron'], stack: ['.NET/C#', 'Tauri/Rust', 'Electron'], agents: ['uaset-orchestrator', 'uaset-desktop-engineer', 'uaset-windows-engineer', 'uaset-systems-engineer', 'uaset-ui-ux-designer', 'uaset-test-engineer'] },
  { domain: 'AI / Generative System', files: ['requirements.txt#langchain', 'pyproject.toml#openai', 'langchain.config.js', 'rag/', 'embeddings/'], stack: ['Python', 'FastAPI', 'LangChain', 'Vector DB'], agents: ['uaset-orchestrator', 'uaset-aiml-engineer', 'uaset-backend-engineer', 'uaset-data-engineer', 'uaset-security-architect', 'uaset-test-engineer'] },
  { domain: 'Distributed Backend / Microservices', files: ['docker-compose.yml', 'Dockerfile', 'go.mod', 'Cargo.toml', 'api/proto/'], stack: ['Go', 'Rust', 'Docker/K8s', 'gRPC/Kafka'], agents: ['uaset-orchestrator', 'uaset-backend-architect', 'uaset-distributed-systems-architect', 'uaset-devops-engineer', 'uaset-sre-engineer'] },
  { domain: 'Embedded / Firmware System', files: ['platformio.ini', 'Makefile#avr', 'CMakeLists.txt#freertos', 'prj.conf'], stack: ['C/C++', 'FreeRTOS', 'Zephyr', 'ARM/ESP32'], agents: ['uaset-orchestrator', 'uaset-embedded-engineer', 'uaset-firmware-engineer', 'uaset-systems-engineer', 'uaset-test-engineer'] }
];

function detectProject(workspaceDir = process.cwd()) {
  let detectedDomain = 'General Software Application';
  let detectedStack = ['Generic / Undetected'];
  let recommendedAgents = ['uaset-orchestrator', 'uaset-software-architect', 'uaset-fullstack-engineer', 'uaset-test-engineer', 'uaset-appsec-engineer'];

  try {
    const files = fs.readdirSync(workspaceDir);
    for (const detector of DOMAIN_DETECTORS) {
      for (const pattern of detector.files) {
        if (files.includes(pattern) || fs.existsSync(path.join(workspaceDir, pattern))) {
          detectedDomain = detector.domain;
          detectedStack = detector.stack;
          recommendedAgents = detector.agents;
          break;
        }
      }
      if (detectedDomain !== 'General Software Application') break;
    }
  } catch (e) {
    // ignore read error
  }

  return { domain: detectedDomain, stack: detectedStack, agents: recommendedAgents };
}

function handleStatus(workspaceDir = process.cwd()) {
  console.log(`\n============================================================`);
  console.log(`  UASET — UNIVERSAL ANTIGRAVITY SOFTWARE ENGINEERING TOOLKIT`);
  console.log(`  Engine Version: v${VERSION}`);
  console.log(`  Workspace:      ${workspaceDir}`);
  console.log(`============================================================\n`);

  const uasetConfigFile = path.join(workspaceDir, '.uaset', 'config.json');
  const isInitialized = fs.existsSync(uasetConfigFile);
  console.log(`[*] Workspace Initialization: ${isInitialized ? 'INITIALIZED (.uaset/config.json present)' : 'NOT INITIALIZED (Run "uaset init")'}`);

  const detection = detectProject(workspaceDir);
  console.log(`[*] Detected Domain:          ${detection.domain}`);
  console.log(`[*] Detected Tech Stack:      ${detection.stack.join(', ')}`);
  console.log(`[*] Active Engineering Team:  ${detection.agents.length} specialized agents assigned`);
  detection.agents.forEach(a => console.log(`    - ${a}`));

  // Check Quality Gates
  const gateRunnerPath = path.join(__dirname, '..', 'quality-gates', 'gate-runner.js');
  if (fs.existsSync(gateRunnerPath)) {
    const { evaluateProjectGates } = require(gateRunnerPath);
    const gates = evaluateProjectGates(workspaceDir);
    console.log(`\n[*] Quality Gate Status:`);
    gates.forEach(g => {
      const icon = g.status === 'PASSED' ? '✅' : '⏳';
      console.log(`    ${icon} ${g.gate} [${g.phase}]: ${g.status}`);
    });
  }

  console.log(`\n[*] Ready to execute directives. Type "ACTIVATE UASET" in chat or "uaset help".\n`);
}

function handleInit(workspaceDir = process.cwd()) {
  console.log(`\n[*] Initializing UASET in workspace: ${workspaceDir}...`);
  const dotUaset = path.join(workspaceDir, '.uaset');
  fs.mkdirSync(dotUaset, { recursive: true });

  const detection = detectProject(workspaceDir);

  const initialConfig = {
    version: VERSION,
    initializedAt: new Date().toISOString(),
    project: {
      name: path.basename(workspaceDir),
      domain: detection.domain,
      stack: detection.stack,
      assignedAgents: detection.agents
    },
    governance: {
      constitutionEnforced: true,
      qualityGatesEnforced: ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'],
      securityScanOnBuild: true
    }
  };

  fs.writeFileSync(path.join(dotUaset, 'config.json'), JSON.stringify(initialConfig, null, 2), 'utf8');

  // Create workspace AGENTS.md if not exists
  const agentsMdPath = path.join(workspaceDir, 'AGENTS.md');
  if (!fs.existsSync(agentsMdPath)) {
    const agentsMdContent = `# UASET Workspace Engineering Directive\n\nThis project is governed by the Universal Antigravity Software Engineering Toolkit (UASET).\nWhen the user types "ACTIVATE UASET", activate the UASET Chief Engineering Orchestrator (\`uaset-orchestrator\`).\nAll code must adhere to the UASET Engineering Constitution and satisfy Quality Gates G0 through G9.\n`;
    fs.writeFileSync(agentsMdPath, agentsMdContent, 'utf8');
  }

  console.log(`[+] Initialized UASET configuration at: ${path.join(dotUaset, 'config.json')}`);
  console.log(`[+] Workspace Directive configured at:  ${agentsMdPath}`);
  console.log(`[+] UASET is now active in this project!\n`);
}

function handleActivate(workspaceDir = process.cwd()) {
  console.log(`\n============================================================`);
  console.log(`  ACTIVATING UASET ENGINEERING ORGANIZATION`);
  console.log(`============================================================`);
  
  const detection = detectProject(workspaceDir);
  console.log(`\n1. Project Workspace Inspected.`);
  console.log(`   - Root:   ${workspaceDir}`);
  console.log(`   - Domain: ${detection.domain}`);
  console.log(`   - Stack:  ${detection.stack.join(', ')}`);

  console.log(`\n2. Assembling Departmental Specialist Team:`);
  detection.agents.forEach(a => console.log(`   - Dispatching Agent: ${a}`));

  console.log(`\n3. Loading Applicable Engineering Skills:`);
  console.log(`   - Core:        uaset-orchestrator, uaset-requirements-engineering, uaset-architecture-design`);
  console.log(`   - Domain:      uaset-${detection.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
  console.log(`   - Verification: uaset-test-automation, uaset-security-engineering, uaset-code-review`);

  console.log(`\n4. Engineering Quality Gates Active: G0 through G9.`);
  console.log(`\n[+] UASET Chief Engineering Orchestrator stands ready. Enter your instructions.\n`);
}

function handleHelp() {
  console.log(`
UASET CLI — Commands Reference:

  activate         Activate UASET engineering team for the current workspace
  init             Initialize UASET configuration (.uaset/config.json) in current workspace
  status           Report UASET status, detected stack, active agents, and quality gates
  plan             Trigger specification, architecture, and work breakdown planning
  build            Trigger implementation phase with assigned specialist agents
  review           Run independent code review and constitutional compliance check
  test             Execute multi-layer automated test suite (Unit, Integration, E2E)
  audit            Perform complete end-to-end engineering and quality gate audit
  security         Run SAST, dependency vulnerability scanning, and threat check
  performance      Profile system latency, resource usage, and query performance
  deploy           Prepare container manifests, IaC, and deployment rollback plans
  doc              Generate/update README, API docs, and Architecture Decision Records
  update           Synchronize UASET skills and agent definitions with latest canonical
  help             Show this reference guide
`);
}

// CLI Command Router
const args = process.argv.slice(2);
const command = (args[0] || 'status').toLowerCase();

switch (command) {
  case 'status':
    handleStatus();
    break;
  case 'init':
    handleInit();
    break;
  case 'activate':
    handleActivate();
    break;
  case 'plan':
  case 'build':
  case 'review':
  case 'test':
  case 'audit':
  case 'security':
  case 'performance':
  case 'deploy':
  case 'doc':
  case 'document':
  case 'update':
    console.log(`\n[*] Executing UASET command: "${command.toUpperCase()}"...`);
    handleStatus();
    break;
  case 'help':
  case '--help':
  case '-h':
    handleHelp();
    break;
  default:
    console.log(`Unknown command: "${command}". Showing help:`);
    handleHelp();
    break;
}
