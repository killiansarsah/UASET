/**
 * UASET Comprehensive Skill Ecosystem Generator
 * Generates 50 production-grade engineering skills across Core and Specialized Domains
 */

const fs = require('fs');
const path = require('path');

const CORE_SKILLS = [
  {
    id: 'uaset-orchestrator',
    name: 'UASET Chief Engineering Orchestration',
    desc: 'Central coordination skill for UASET. Use to activate the engineering organization, inspect project workspaces, identify project domain, assemble specialized agents, schedule execution plans, and enforce quality gates G0–G9.',
    category: 'Leadership & Coordination',
    gates: ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9']
  },
  {
    id: 'uaset-project-discovery',
    name: 'UASET Project Discovery & Feasibility',
    desc: 'Conduct initial project discovery, stakeholder analysis, business problem formulation, and technical feasibility exploration. Use when initiating a new project or onboarding an unfamiliar legacy codebase.',
    category: 'Product & Requirements',
    gates: ['G0']
  },
  {
    id: 'uaset-requirements-engineering',
    name: 'UASET Requirements Engineering',
    desc: 'Author comprehensive Product Requirements Documents (PRDs) with testable functional requirements, non-functional requirements (NFRs), and Given/When/Then acceptance criteria. Use before commencing system design or implementation.',
    category: 'Product & Requirements',
    gates: ['G0']
  },
  {
    id: 'uaset-technical-research',
    name: 'UASET Technical Research & Benchmarking',
    desc: 'Perform structured technical research, library evaluations, architecture benchmarking, and trade-off analyses with reproducible evidence. Use when evaluating unfamiliar tools or architectural paradigms.',
    category: 'Research & Architecture',
    gates: ['G0', 'G1']
  },
  {
    id: 'uaset-feasibility-analysis',
    name: 'UASET Technical Feasibility Analysis',
    desc: 'Evaluate system viability, compute and memory constraints, third-party API quotas, hardware limitations, and licensing compliance. Use during project discovery or when evaluating high-risk technical features.',
    category: 'Product & Architecture',
    gates: ['G0', 'G1']
  },
  {
    id: 'uaset-software-specification',
    name: 'UASET Software Technical Specification',
    desc: 'Author detailed software specifications, domain models, entity-relationship diagrams, and component boundary definitions. Use to translate business requirements into actionable technical engineering plans.',
    category: 'Architecture',
    gates: ['G0', 'G1']
  },
  {
    id: 'uaset-architecture-design',
    name: 'UASET Architecture Design & ADR Management',
    desc: 'Design high-level and modular system architectures, author Architecture Decision Records (ADRs), create C4/Mermaid diagrams, and enforce separation of concerns. Use when establishing or refactoring system topology.',
    category: 'Architecture',
    gates: ['G1']
  },
  {
    id: 'uaset-technology-selection',
    name: 'UASET Technology Stack Selection',
    desc: 'Select optimal programming languages, frameworks, databases, messaging layers, and infrastructure using objective criteria matrices. Use when bootstrapping a greenfield project or modernizing an existing stack.',
    category: 'Architecture',
    gates: ['G1']
  },
  {
    id: 'uaset-database-design',
    name: 'UASET Database Modeling & Migration Engineering',
    desc: 'Design relational schemas (PostgreSQL, MySQL, SQLite), NoSQL data models, index strategies, foreign key constraints, and zero-downtime reversible migrations. Use when defining or altering data persistence layers.',
    category: 'Database & Storage',
    gates: ['G1', 'G3']
  },
  {
    id: 'uaset-api-design',
    name: 'UASET API Design & Contract Specification',
    desc: 'Author OpenAPI 3.1, GraphQL, and gRPC schemas with strict type definitions, standard pagination, HTTP status code mapping, and backward compatibility rules. Use when designing or changing external or internal interfaces.',
    category: 'API & Interfaces',
    gates: ['G1', 'G3']
  },
  {
    id: 'uaset-ui-ux-design',
    name: 'UASET UI/UX Design & Anti-AI Slop Guidelines',
    desc: 'Design purposeful, ergonomic user interfaces avoiding generic AI clichés (no neon purple gradients, no card-in-card syndrome, no un-tracked typography). Use when designing screen layouts, user flows, and visual hierarchies.',
    category: 'Design & UX',
    gates: ['G2']
  },
  {
    id: 'uaset-design-systems',
    name: 'UASET Design Systems & Token Engineering',
    desc: 'Establish semantic design tokens (color, typography, spacing, elevation), accessible component primitives, and Tailwind/CSS architectures. Use when building or scaling consistent client user interfaces.',
    category: 'Design & Frontend',
    gates: ['G2', 'G4']
  },
  {
    id: 'uaset-frontend-development',
    name: 'UASET Frontend Engineering',
    desc: 'Develop modern, accessible web client applications using React, Vue, Angular, or TypeScript, optimizing Core Web Vitals, state management, and rendering pipelines. Use when building client-side user interfaces.',
    category: 'Software Development',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-backend-development',
    name: 'UASET Backend Engineering',
    desc: 'Build scalable, fault-tolerant backend services, controllers, middlewares, domain services, and database integration layers. Use when building server-side applications, microservices, or background workers.',
    category: 'Software Development',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-fullstack-development',
    name: 'UASET Full-Stack Development',
    desc: 'Engineer end-to-end features connecting database schemas, API routes, server validations, and responsive client interfaces with end-to-end type safety. Use when delivering vertical feature slices.',
    category: 'Software Development',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-mobile-development',
    name: 'UASET Mobile Application Engineering',
    desc: 'Develop cross-platform and native mobile applications for Android and iOS with offline-first synchronization, push notifications, and native hardware bridges. Use when developing mobile software.',
    category: 'Mobile Development',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-desktop-development',
    name: 'UASET Desktop Application Engineering',
    desc: 'Build native and cross-platform desktop applications (Windows WinUI/.NET, Electron, Tauri, macOS) with local filesystem integration, system tray, and packaging. Use when developing desktop software.',
    category: 'Desktop Development',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-ai-ml-development',
    name: 'UASET AI & Generative Engineering',
    desc: 'Implement LLM application logic, RAG pipelines, vector search, structured JSON outputs, semantic caching, and autonomous agent swarms. Use when developing AI-powered software capabilities.',
    category: 'AI & Data',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-security-engineering',
    name: 'UASET Security Engineering & Threat Modeling',
    desc: 'Perform STRIDE threat modeling, OWASP Top 10 hardening, input validation, secure session management, cryptographic hygiene, and secret scanning. Use when securing code, APIs, and infrastructure.',
    category: 'Security',
    gates: ['G1', 'G6']
  },
  {
    id: 'uaset-test-planning',
    name: 'UASET Test Planning & Strategy',
    desc: 'Design comprehensive testing strategies, test pyramids, test case matrices, and coverage targets across unit, integration, contract, and E2E layers. Use before commencing implementation or test automation.',
    category: 'Quality Engineering',
    gates: ['G5']
  },
  {
    id: 'uaset-test-automation',
    name: 'UASET Test Automation & Verification',
    desc: 'Author and execute automated test suites (Jest, Vitest, Pytest, Playwright, Cargo test) with zero test fabrication, clean assertions, and real verification evidence. Use when implementing and running tests.',
    category: 'Quality Engineering',
    gates: ['G5']
  },
  {
    id: 'uaset-debugging',
    name: 'UASET Systematic Debugging & Diagnostics',
    desc: 'Apply scientific method debugging: reproducible test cases, binary search log inspection, stack trace analysis, and root cause verification. Use when diagnosing and resolving defects or crashes.',
    category: 'Quality & Maintenance',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-code-review',
    name: 'UASET Independent Code Review',
    desc: 'Conduct rigorous code reviews verifying correctness, maintainability, type safety, boundary enforcement, and constitutional compliance. Use before merging code modifications.',
    category: 'Quality & Governance',
    gates: ['G4']
  },
  {
    id: 'uaset-performance-optimization',
    name: 'UASET Performance Profiling & Optimization',
    desc: 'Profile memory, CPU, network waterfalls, and database query execution plans (EXPLAIN ANALYZE) to identify and eliminate system bottlenecks. Use when addressing latency or resource exhaustion.',
    category: 'Systems Engineering',
    gates: ['G7']
  },
  {
    id: 'uaset-deployment',
    name: 'UASET Deployment & Release Engineering',
    desc: 'Configure production deployments, container builds, zero-downtime rolling cutovers, automated rollback triggers, and release verification. Use when deploying applications to staging or production.',
    category: 'DevOps & Operations',
    gates: ['G8', 'G9']
  },
  {
    id: 'uaset-ci-cd',
    name: 'UASET CI/CD Pipeline Automation',
    desc: 'Author automated CI/CD workflows (GitHub Actions, GitLab CI) with parallel test execution, dependency caching, linting, security scanning, and container publishing. Use when automating build and delivery pipelines.',
    category: 'DevOps & Operations',
    gates: ['G8']
  },
  {
    id: 'uaset-technical-documentation',
    name: 'UASET Technical Documentation Engineering',
    desc: 'Author comprehensive documentation: READMEs, API guides, architecture manuals, operational runbooks, and disaster recovery playbooks in clean Markdown. Use when documenting systems.',
    category: 'Documentation',
    gates: ['G0', 'G9']
  },
  {
    id: 'uaset-maintenance-refactoring',
    name: 'UASET Code Refactoring & Maintenance',
    desc: 'Safely refactor legacy code, eliminate technical debt, update dependencies, remove deprecated APIs, and preserve regression test coverage. Use during routine maintenance or code cleanup.',
    category: 'Maintenance',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-migration-modernization',
    name: 'UASET Legacy Modernization & Migration',
    desc: 'Execute zero-downtime legacy migrations using the strangler fig pattern, database synchronization, backward-compatible adapters, and phased cutovers. Use when modernizing legacy systems.',
    category: 'Maintenance & Architecture',
    gates: ['G1', 'G3', 'G5']
  },
  {
    id: 'uaset-incident-response',
    name: 'UASET Incident Response & Post-Mortem',
    desc: 'Conduct blameless post-mortems, root cause analysis (5 Whys), incident mitigation runbooks, and preventative action tracking. Use during and following production outages or severe bugs.',
    category: 'Operations & SRE',
    gates: ['G8']
  }
];

const SPECIALIZED_SKILLS = [
  {
    id: 'uaset-react-nextjs',
    name: 'UASET React & Next.js Architecture',
    desc: 'Design and build enterprise applications using React 19, Next.js App Router, React Server Components (RSC), Server Actions, and dynamic streaming. Use when building React or Next.js web applications.',
    category: 'Web & Frontend',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-vue-angular',
    name: 'UASET Vue & Angular Engineering',
    desc: 'Develop modern reactive applications using Vue 3 Composition API, Nuxt, and Angular standalone components with RxJS signals. Use when working in Vue or Angular codebases.',
    category: 'Web & Frontend',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-typescript-nodejs',
    name: 'UASET TypeScript & Node.js Backend',
    desc: 'Engineer enterprise backends using strict TypeScript, modern Node.js, Express, Fastify, NestJS, and ESM modular architecture. Use when building TypeScript/Node.js servers and microservices.',
    category: 'Backend & Server',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-python-engineering',
    name: 'UASET Python Engineering & FastAPI',
    desc: 'Develop idiomatic Python 3.12+ applications using FastAPI, Pydantic v2, SQLAlchemy 2.0, AsyncIO, and Pytest. Use when developing Python services, data pipelines, or APIs.',
    category: 'Backend & Data',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-rust-engineering',
    name: 'UASET Rust Systems & Web Engineering',
    desc: 'Author high-performance, memory-safe software in Rust using Tokio async runtime, Axum, Serde, Cargo workspace management, and Clippy. Use when building Rust microservices or systems software.',
    category: 'Systems & Backend',
    gates: ['G4', 'G5', 'G7']
  },
  {
    id: 'uaset-golang-engineering',
    name: 'UASET Go Microservices Engineering',
    desc: 'Build concurrent, high-throughput microservices in Go using goroutines, channels, Gin/Fiber, gRPC, and idiomatic error handling. Use when developing Go network services and distributed systems.',
    category: 'Backend & Distributed',
    gates: ['G4', 'G5', 'G7']
  },
  {
    id: 'uaset-dotnet-csharp',
    name: 'UASET .NET & C# Enterprise Engineering',
    desc: 'Develop enterprise software using C# 13, .NET 9, ASP.NET Core, Entity Framework Core, WinUI, and clean architecture patterns. Use when developing .NET web or desktop solutions.',
    category: 'Enterprise & Desktop',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-mobile-android-kotlin',
    name: 'UASET Android & Kotlin Development',
    desc: 'Build native Android apps using Kotlin, Jetpack Compose, Kotlin Flow/Coroutines, Room DB, Hilt DI, and Material Design 3. Use when engineering Android applications.',
    category: 'Mobile',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-mobile-ios-swift',
    name: 'UASET iOS & Swift Development',
    desc: 'Develop native iOS/iPadOS applications using Swift 6, SwiftUI, SwiftData, Combine/AsyncSequence, and Apple Human Interface Guidelines. Use when engineering Apple ecosystem mobile applications.',
    category: 'Mobile',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-mobile-flutter-reactnative',
    name: 'UASET Cross-Platform Mobile Engineering',
    desc: 'Build cross-platform mobile apps with Flutter (Dart, Riverpod/Bloc) or React Native (Expo, TypeScript, Bridgeless Architecture). Use when developing multi-platform mobile applications.',
    category: 'Mobile',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-desktop-windows-electron-tauri',
    name: 'UASET Desktop App Engineering (Windows, Tauri, Electron)',
    desc: 'Build secure, low-overhead desktop software using Tauri (Rust + Web), Electron, or Windows WinUI/.NET with native IPC and installer packaging. Use when developing desktop software.',
    category: 'Desktop',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-relational-databases',
    name: 'UASET Relational Database Engineering (PostgreSQL, MySQL, SQLite)',
    desc: 'Model and optimize relational databases: PostgreSQL advanced features (JSONB, full-text search), MySQL InnoDB tuning, and SQLite embedded persistence with strict indexing. Use when working with SQL databases.',
    category: 'Database & Storage',
    gates: ['G3', 'G4', 'G5']
  },
  {
    id: 'uaset-nosql-baas',
    name: 'UASET NoSQL & Backend-as-a-Service (Supabase, Firebase, Redis)',
    desc: 'Architect and integrate Supabase (Postgres, Auth, Realtime, Storage), Firebase, Redis caching, and MongoDB with secure access rules and optimal query patterns. Use when integrating BaaS or NoSQL.',
    category: 'Database & BaaS',
    gates: ['G3', 'G4', 'G5']
  },
  {
    id: 'uaset-containerization-k8s',
    name: 'UASET Containerization & Kubernetes Engineering',
    desc: 'Design production Docker multi-stage builds, Docker Compose local environments, Kubernetes Pod/Deployment/Service manifests, and Helm charts. Use when containerizing apps or deploying to K8s.',
    category: 'DevOps & Infrastructure',
    gates: ['G8']
  },
  {
    id: 'uaset-iac-terraform-cloud',
    name: 'UASET Infrastructure as Code (Terraform & Multi-Cloud)',
    desc: 'Author reusable Terraform/OpenTofu modules, provision multi-cloud resources on AWS, Google Cloud, and Azure, manage remote state, and enforce security policies. Use when automating cloud infrastructure.',
    category: 'Cloud & Infrastructure',
    gates: ['G8']
  },
  {
    id: 'uaset-llm-rag-agentic',
    name: 'UASET LLM, RAG & Multi-Agent Engineering',
    desc: 'Build production generative AI architectures: retrieval-augmented generation (RAG), vector embeddings, semantic reranking, prompt evaluations, and multi-agent coordination swarms. Use when building AI systems.',
    category: 'AI & Machine Learning',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-embedded-firmware-systems',
    name: 'UASET Embedded Systems & Firmware Engineering',
    desc: 'Develop firmware in C/C++ for microcontrollers (ARM Cortex, ESP32, RISC-V) with FreeRTOS, Zephyr, peripheral drivers (I2C, SPI, UART), and low-power modes. Use when developing embedded firmware.',
    category: 'Embedded & Systems',
    gates: ['G4', 'G5']
  },
  {
    id: 'uaset-systems-programming',
    name: 'UASET Systems Programming & Low-Level C/C++',
    desc: 'Engineer low-level systems in C and modern C++ (C++20/23): memory allocators, socket networking, concurrency primitives, POSIX system calls, and performance profiling. Use when developing systems software.',
    category: 'Systems Programming',
    gates: ['G4', 'G5', 'G7']
  },
  {
    id: 'uaset-automated-e2e-testing',
    name: 'UASET End-to-End Testing with Playwright',
    desc: 'Author reliable, non-flaky end-to-end browser tests using Playwright: Page Object Models, auto-waiting locators, network mocking, visual comparisons, and trace inspection. Use when creating browser tests.',
    category: 'Quality Engineering',
    gates: ['G5']
  },
  {
    id: 'uaset-appsec-vulnerability-testing',
    name: 'UASET Application Security & Vulnerability Testing',
    desc: 'Conduct automated security auditing: SAST scanning, dependency vulnerability checking, secret detection, DAST probes, and CVSS vulnerability remediation. Use when auditing or securing codebases.',
    category: 'Security',
    gates: ['G6']
  }
];

function generateSkillContent(skill) {
  const gatesList = skill.gates.map(g => `\`${g}\``).join(', ');
  
  return `---
name: ${skill.id}
description: >-
  ${skill.desc}
---

# ${skill.name}

## 1. Purpose & Overview
This skill provides production-grade engineering procedures, standards, and decision-making frameworks for **${skill.name}**. It operates under the UASET Engineering Constitution and enforces Quality Gates ${gatesList}.

## 2. Scope & Applicability
- **Category:** ${skill.category}
- **Governing Quality Gates:** ${gatesList}
- **When to Use:** Use this skill whenever the task involves ${skill.name.toLowerCase()} or when the orchestrator assigns relevant requirements.
- **When NOT to Use:** Do not use this skill for unrelated technology ecosystems or when a simpler, more targeted skill directly handles the request without multi-disciplinary overhead.

## 3. Required Inputs & Prerequisites
1. Validated project requirements or architecture context from previous quality gates.
2. Target project repository workspace initialized with relevant language/framework tooling.
3. Relevant configuration files (e.g. \`package.json\`, \`Cargo.toml\`, \`requirements.txt\`, or \`.uaset/config.json\`).

## 4. Required Tools & Environment
- File inspection and modification tools (\`view_file\`, \`write_to_file\`, \`replace_file_content\`, \`grep_search\`, \`list_dir\`).
- Command execution tool (\`run_command\`) for running builds, linters, tests, and benchmarks.
- Clean terminal sandbox environment adhering to execution policies.

## 5. Step-by-Step Engineering Procedure

### Phase A: Context & Requirements Inspection
1. Read existing project files, specifications, and architecture decisions to understand domain boundaries.
2. Identify constraints, target operating systems, runtime versions, and external dependencies.
3. Verify that prerequisite quality gates have passed before making architectural or code modifications.

### Phase B: Design & Implementation
1. Apply idiomatic engineering standards. Maintain high cohesion, loose coupling, and clear separation of concerns.
2. Author modular, readable, maintainable, and type-safe code. Follow the KISS principle: minimum code that solves the problem.
3. For user interfaces, enforce Anti-AI Slop guidelines: avoid neon gradients, card-in-card syndrome, and un-tracked typography.
4. For backend and data layers, enforce parameter sanitization, atomic transactions, and reversible migrations.

### Phase C: Verification & Quality Assurance
1. Execute build and linting commands. Verify zero errors and warnings.
2. Execute automated test suites with verifiable command exit codes. Never claim tests passed without running them.
3. Audit for security vulnerabilities, secret leaks, and edge cases (null inputs, boundary conditions).

### Phase D: Documentation & Delivery
1. Update relevant project documentation (README, specifications, or ADRs).
2. Record evidence of successful execution (command outputs, test results, benchmarks).
3. Present clean, structured summary of deliverables to parent orchestrator or user.

## 6. Engineering Standards & Decision Criteria
- **Clean Architecture:** Domain logic must remain independent of external frameworks and transport layers.
- **Type Safety:** Enforce strict typing. Disallow untyped \`any\` or unhandled exceptions across boundaries.
- **Security by Design:** Apply principle of least privilege, parameterize queries, and sanitize inputs.
- **Performance Awareness:** Measure latency and memory profiles before and after modifications.

## 7. Expected Outputs & Artifact Contracts
- Valid, compilable, tested source code and configuration files.
- Associated unit, integration, or E2E tests verifying the implemented capability.
- Updated documentation and Architecture Decision Records (ADRs) where applicable.

## 8. Validation Procedures
Run the appropriate verification suite:
\`\`\`bash
# Run linting and static analysis
npm run lint || cargo clippy || flake8

# Run automated tests
npm test || cargo test || pytest
\`\`\`
Inspect the output to confirm exit code 0 and 100% test pass rate.

## 9. Failure Handling & Remediation
- If a build or test fails, isolate the failing component using systematic debugging.
- Formulate a specific hypothesis, modify the code surgically, and re-run tests.
- If an architectural conflict arises, surface trade-offs clearly rather than picking silently.

## 10. Security Considerations
- Never commit API keys, tokens, passwords, or certificates to source control.
- Validate all incoming data at system boundaries using schemas (Zod, Pydantic, Serde).
- Prevent OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF, IDOR).

## 11. Definition of Done (DoD)
A task under this skill is complete when:
1. All functional requirements are implemented and pass unit/integration tests.
2. Code builds cleanly with zero linter errors.
3. Documentation is updated.
4. Verifiable test logs demonstrate exit code 0.
5. All applicable Quality Gates (${gatesList}) are satisfied with documented evidence.

## 12. Supporting References
- [UASET Engineering Constitution](../../CONSTITUTION.md)
- [UASET Quality Gates Specification](../../quality-gates/QUALITY_GATES.md)
- [Guide and Best Practices](./references/guide.md)
`;
}

function generateSkillReference(skill) {
  return `# ${skill.name} — Technical Reference & Runbook

**Category:** ${skill.category}  
**Governing Gates:** ${skill.gates.join(', ')}

---

## 1. Architectural Patterns & Idioms
When executing tasks within **${skill.name}**, adhere to industry-standard patterns:
- Prefer composition over deep inheritance hierarchies.
- Encapsulate side effects behind interfaces or service boundaries.
- Ensure deterministic behavior and idempotent operations.

## 2. Common Anti-Patterns to Avoid
1. **Premature Generalization:** Building complex abstraction layers for single-use routines.
2. **Silent Failure:** Swallowing exceptions without logging or propagating errors.
3. **Hardcoded Configuration:** Embedding environment-specific URLs or secrets in source code.
4. **Untracked State:** Allowing mutable global state to create non-deterministic race conditions.

## 3. Checklist for Quality Gate Sign-Off
- [ ] Requirements explicitly mapped to implementation files.
- [ ] Code adheres strictly to formatting and linter configurations.
- [ ] Unit and integration test coverage verifies both happy paths and edge cases.
- [ ] Zero security warnings from automated vulnerability scanners.
- [ ] Verifiable execution logs recorded.
`;
}

// Generate skills into canonical skills/ and .agents/skills/
const rootDir = path.join(__dirname, '..');
const canonicalSkillsDir = path.join(rootDir, 'skills');
const dotSkillsDir = path.join(rootDir, '.agents', 'skills');

[canonicalSkillsDir, dotSkillsDir].forEach(d => fs.mkdirSync(d, { recursive: true }));

const allSkills = [...CORE_SKILLS, ...SPECIALIZED_SKILLS];
let count = 0;

for (const skill of allSkills) {
  const skillDir = path.join(canonicalSkillsDir, skill.id);
  const dotSkillDir = path.join(dotSkillsDir, skill.id);
  
  [skillDir, dotSkillDir].forEach(sd => {
    fs.mkdirSync(path.join(sd, 'references'), { recursive: true });
    fs.mkdirSync(path.join(sd, 'templates'), { recursive: true });
    fs.mkdirSync(path.join(sd, 'scripts'), { recursive: true });
  });

  const content = generateSkillContent(skill);
  const refContent = generateSkillReference(skill);

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), content, 'utf8');
  fs.writeFileSync(path.join(skillDir, 'references', 'guide.md'), refContent, 'utf8');

  fs.writeFileSync(path.join(dotSkillDir, 'SKILL.md'), content, 'utf8');
  fs.writeFileSync(path.join(dotSkillDir, 'references', 'guide.md'), refContent, 'utf8');

  count++;
}

// Write master catalog in docs/skills/CATALOG.md
let catalogMd = '# UASET Master Skills Catalog\n\n';
catalogMd += `Total Production Engineering Skills: **${allSkills.length}** (${CORE_SKILLS.length} Core Skills, ${SPECIALIZED_SKILLS.length} Specialized Domain Skills).\n\n`;

catalogMd += '## 1. Core Engineering Skills (30 Skills)\n\n';
catalogMd += '| Skill ID | Name | Category | Quality Gates | Description |\n';
catalogMd += '| :--- | :--- | :--- | :---: | :--- |\n';
for (const s of CORE_SKILLS) {
  const gates = s.gates.map(g => `\`${g}\``).join(', ');
  catalogMd += `| \`${s.id}\` | **${s.name}** | ${s.category} | ${gates} | ${s.desc} |\n`;
}

catalogMd += '\n## 2. Specialized Technology & Domain Skills (20 Skills)\n\n';
catalogMd += '| Skill ID | Name | Category | Quality Gates | Description |\n';
catalogMd += '| :--- | :--- | :--- | :---: | :--- |\n';
for (const s of SPECIALIZED_SKILLS) {
  const gates = s.gates.map(g => `\`${g}\``).join(', ');
  catalogMd += `| \`${s.id}\` | **${s.name}** | ${s.category} | ${gates} | ${s.desc} |\n`;
}

fs.writeFileSync(path.join(rootDir, 'docs', 'skills', 'CATALOG.md'), catalogMd, 'utf8');

console.log(`Successfully generated ${count} comprehensive engineering skills in canonical and workspace paths.`);
