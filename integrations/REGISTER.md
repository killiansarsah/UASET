# UASET Third-Party Integration Register

**Universal Antigravity Software Engineering Toolkit**  
*Document Version: 1.0.0 — Canonical Edition*  
*Standard: Evidence-Based Architectural Integration & Attribution*

---

## 1. Executive Summary & Policy

UASET integrates proven methodologies, patterns, and agent engineering capabilities from leading industry and open-source ecosystems. In accordance with the UASET Engineering Constitution and Master Build Directive:
- **No Blind Ingestion:** Third-party repositories are never imported wholesale. Every capability is researched, vetted for security, licensed properly, and adapted to Antigravity's progressive disclosure architecture.
- **License Compliance & Attribution:** Full upstream attribution and license notices are preserved.
- **Security Sandboxing:** Untrusted external scripts are never executed without prior static audit and sandboxed verification.
- **Loose Coupling:** UASET core remains 100% functional and self-contained even if optional third-party integrations are unreachable or disabled.

---

## 2. Comprehensive Candidate Evaluation Matrix

| ID | Repository / Upstream | Canonical Focus | License | Compatibility | Security Risk | Integration Decision | UASET Skill / Layer Mapping |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **INT-01** | `github/spec-kit` | Specification-driven development & executable specs | MIT | High | Low | **ADAPTED** | `uaset-requirements-engineering`, `uaset-software-specification` |
| **INT-02** | `bmad-code-org/BMAD-METHOD` | Structured multi-agent product discovery & planning | MIT / Apache 2.0 | High | Low | **ADAPTED** | `uaset-project-discovery`, `uaset-product-manager` |
| **INT-03** | `obra/superpowers` | Disciplined TDD, atomic commits, debugging runbooks | MIT | High | Low | **ADAPTED** | `uaset-test-automation`, `uaset-debugging`, `uaset-code-review` |
| **INT-04** | `supabase/agent-skills` | Postgres RLS, Edge Functions, BaaS schemas | Apache 2.0 | High | Low | **ADAPTED** | `uaset-nosql-baas`, `uaset-database-design` |
| **INT-05** | `vercel-labs/agent-skills` | Next.js App Router, RSC, Edge runtime optimization | Apache 2.0 | High | Low | **ADAPTED** | `uaset-react-nextjs`, `uaset-frontend-development` |
| **INT-06** | `vercel-labs/skills` | Modern web frontend, Vercel AI SDK patterns | Apache 2.0 | High | Low | **ADAPTED** | `uaset-frontend-development`, `uaset-llm-rag-agentic` |
| **INT-07** | `nextlevelbuilder/ui-ux-pro-max-skill` | Anti-AI slop, design system tokens, typography scales | MIT | High | Low | **ADAPTED** | `uaset-ui-ux-design`, `uaset-design-systems` |
| **INT-08** | `sickn33/antigravity-awesome-skills` | Curated Antigravity skill patterns & tools | MIT | High | Low | **ADAPTED** | Core skill schemas & Antigravity directory conventions |
| **INT-09** | `anthropics/skills` | Prompt evaluations, tool calling, defensive coding | MIT | High | Low | **ADAPTED** | `uaset-llm-rag-agentic`, `uaset-ai-ml-development` |
| **INT-10** | `trailofbits/skills` | AppSec, smart contract auditing, binary security | Apache 2.0 | High | Low | **ADAPTED** | `uaset-security-engineering`, `uaset-appsec-vulnerability-testing` |
| **INT-11** | `google/skills` | Android, Firebase, Google Cloud, Gemini APIs | Apache 2.0 | High | Low | **ADAPTED** | `uaset-mobile-android-kotlin`, `uaset-cloud-architect` |
| **INT-12** | `trailofbits/skills-curated` | Automated fuzzing, AST analysis, memory safety | Apache 2.0 | High | Low | **ADAPTED** | `uaset-systems-programming`, `uaset-security-engineering` |
| **INT-13** | `brunofbloq/embedded-agent-skills` | Microcontroller firmware, RTOS, HAL drivers | MIT | High | Low | **ADAPTED** | `uaset-embedded-firmware-systems` |
| **INT-14** | `mohitmishra786/low-level-dev-skills` | C/C++ memory safety, POSIX syscalls, socket IPC | MIT | High | Low | **ADAPTED** | `uaset-systems-programming` |

---

## 3. Detailed Architectural Adaptation Records

### 3.1 Spec-Kit & Specification-Driven Development (`INT-01`)
- **Upstream:** `https://github.com/github/spec-kit`
- **Core Pattern Adapted:** Specification as single source of truth. Features are formally authored with non-ambiguous user stories, Given/When/Then acceptance tests, and traceability matrices before any code is generated.
- **Implemented In:** `skills/uaset-requirements-engineering/SKILL.md` and `templates/requirements/PRD_TEMPLATE.md`.
- **Quality Gate Enforced:** Gate G0 (Requirements Approval).

### 3.2 BMAD Method (`INT-02`)
- **Upstream:** `https://github.com/bmad-code-org/BMAD-METHOD`
- **Core Pattern Adapted:** Multi-stage Discovery Phase separating user problem validation, technical feasibility scoring, and MVP feature reduction.
- **Implemented In:** `skills/uaset-project-discovery/SKILL.md` and `departments/product/`.
- **Quality Gate Enforced:** Gate G0 (Requirements Approval).

### 3.3 Superpowers Disciplined Engineering (`INT-03`)
- **Upstream:** `https://github.com/obra/superpowers`
- **Core Pattern Adapted:** "Red-Green-Refactor" TDD discipline, surgical code modifications (never refactoring unrelated code), hypothesis-driven debugging, and verifiable evidence capture.
- **Implemented In:** `skills/uaset-test-automation/SKILL.md`, `skills/uaset-debugging/SKILL.md`, and `CONSTITUTION.md` (Principles 5, 9, 20).
- **Quality Gate Enforced:** Gate G4 (Implementation Review) & G5 (Automated Test Verification).

### 3.4 Supabase Agent Skills (`INT-04`)
- **Upstream:** `https://github.com/supabase/agent-skills`
- **Core Pattern Adapted:** Row Level Security (RLS) policies by default, atomic PostgreSQL migrations, Edge Functions stateless execution, and realtime event subscriptions.
- **Implemented In:** `skills/uaset-nosql-baas/SKILL.md` and `skills/uaset-database-design/SKILL.md`.
- **Quality Gate Enforced:** Gate G3 (Database & API Approval) & G6 (Security Verification).

### 3.5 Vercel Web Engineering & Design Tokens (`INT-05`, `INT-06`, `INT-07`)
- **Upstream:** `https://github.com/vercel-labs/agent-skills`, `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`
- **Core Pattern Adapted:** React Server Components (RSC) data streaming, bundle splitting, strict typography scales (tight tracking on headers, wide tracking on micro-labels), tactile hover/press states, and active avoidance of generic AI slop.
- **Implemented In:** `skills/uaset-react-nextjs/SKILL.md`, `skills/uaset-ui-ux-design/SKILL.md`, and `skills/uaset-design-systems/SKILL.md`.
- **Quality Gate Enforced:** Gate G2 (Design & UX Approval) & G7 (Performance Verification).

### 3.6 Trail of Bits Security Intelligence (`INT-10`, `INT-12`)
- **Upstream:** `https://github.com/trailofbits/skills`, `https://github.com/trailofbits/skills-curated`
- **Core Pattern Adapted:** STRIDE threat modeling, defensive coding invariants, bounds checking, memory safety in systems code, secret scanning, and automated SAST integration.
- **Implemented In:** `skills/uaset-security-engineering/SKILL.md`, `skills/uaset-appsec-vulnerability-testing/SKILL.md`, and `skills/uaset-systems-programming/SKILL.md`.
- **Quality Gate Enforced:** Gate G6 (Security Verification).

### 3.7 Embedded & Low-Level Systems (`INT-13`, `INT-14`)
- **Upstream:** `https://github.com/brunofbloq/embedded-agent-skills`, `https://github.com/mohitmishra786/low-level-dev-skills`
- **Core Pattern Adapted:** Interrupt service routine (ISR) timing constraints, hardware peripheral abstraction layers (HAL), FreeRTOS deterministic task scheduling, and zero-allocation critical loops.
- **Implemented In:** `skills/uaset-embedded-firmware-systems/SKILL.md` and `skills/uaset-systems-programming/SKILL.md`.
- **Quality Gate Enforced:** Gate G4 (Implementation) & G7 (Reliability).

---

## 4. Verification & Maintenance

All integrated techniques have been refactored into native, self-contained Antigravity skills with zero external network runtime dependencies. As upstream repositories publish new patterns, the **UASET Technical Research Lead** agent reviews them, updates this register, and merges verified improvements into UASET skills.
