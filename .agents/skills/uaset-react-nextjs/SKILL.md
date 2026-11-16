---
name: uaset-react-nextjs
description: >-
  Design and build enterprise applications using React 19, Next.js App Router, React Server Components (RSC), Server Actions, and dynamic streaming. Use when building React or Next.js web applications.
---

# UASET React & Next.js Architecture

## 1. Purpose & Overview
This skill provides production-grade engineering procedures, standards, and decision-making frameworks for **UASET React & Next.js Architecture**. It operates under the UASET Engineering Constitution and enforces Quality Gates `G4`, `G5`.

## 2. Scope & Applicability
- **Category:** Web & Frontend
- **Governing Quality Gates:** `G4`, `G5`
- **When to Use:** Use this skill whenever the task involves uaset react & next.js architecture or when the orchestrator assigns relevant requirements.
- **When NOT to Use:** Do not use this skill for unrelated technology ecosystems or when a simpler, more targeted skill directly handles the request without multi-disciplinary overhead.

## 3. Required Inputs & Prerequisites
1. Validated project requirements or architecture context from previous quality gates.
2. Target project repository workspace initialized with relevant language/framework tooling.
3. Relevant configuration files (e.g. `package.json`, `Cargo.toml`, `requirements.txt`, or `.uaset/config.json`).

## 4. Required Tools & Environment
- File inspection and modification tools (`view_file`, `write_to_file`, `replace_file_content`, `grep_search`, `list_dir`).
- Command execution tool (`run_command`) for running builds, linters, tests, and benchmarks.
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
- **Type Safety:** Enforce strict typing. Disallow untyped `any` or unhandled exceptions across boundaries.
- **Security by Design:** Apply principle of least privilege, parameterize queries, and sanitize inputs.
- **Performance Awareness:** Measure latency and memory profiles before and after modifications.

## 7. Expected Outputs & Artifact Contracts
- Valid, compilable, tested source code and configuration files.
- Associated unit, integration, or E2E tests verifying the implemented capability.
- Updated documentation and Architecture Decision Records (ADRs) where applicable.

## 8. Validation Procedures
Run the appropriate verification suite:
```bash
# Run linting and static analysis
npm run lint || cargo clippy || flake8

# Run automated tests
npm test || cargo test || pytest
```
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
5. All applicable Quality Gates (`G4`, `G5`) are satisfied with documented evidence.

## 12. Supporting References
- [UASET Engineering Constitution](../../CONSTITUTION.md)
- [UASET Quality Gates Specification](../../quality-gates/QUALITY_GATES.md)
- [Guide and Best Practices](./references/guide.md)
