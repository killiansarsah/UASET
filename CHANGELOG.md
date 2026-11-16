# UASET Changelog

All notable changes to the Universal Antigravity Software Engineering Toolkit (UASET) are documented here following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-16

### Added
- **Core Engineering Ecosystem:**
  - 85 Specialized Engineering Agents across 9 departments (Leadership, Product, Architecture, Design, Development, Quality, Security, Infrastructure, Documentation).
  - 50 Production Engineering Skills (30 Core, 20 Domain & Technology) with progressive disclosure (`SKILL.md` + `references/guide.md`).
- **Autonomous Orchestration Engine:**
  - UASET Chief Engineering Orchestrator (`uaset-orchestrator`) as central project director.
  - Dynamic specialist selection matching workspace fingerprints to engineering disciplines.
  - Full CLI tooling (`uaset`, `uaset.cmd`, `uaset.ps1`) supporting `status`, `init`, `activate`, `plan`, `build`, `review`, `test`, `audit`, `security`, `performance`, `deploy`, `doc`, `update`.
- **Engineering Governance & Quality:**
  - `CONSTITUTION.md`: 20 immutable engineering principles and 8 zero-tolerance operational invariants.
  - Quality Gates G0 through G9 specification and programmatic gate runner (`quality-gates/gate-runner.js`).
- **Global Deployment & Multi-Workspace Independence:**
  - Single global plugin at `~/.gemini/config/plugins/uaset` enabling machine-wide activation without project duplication.
  - Project configuration engine (`.uaset/config.json`) supporting isolated project governance.
- **Third-Party Curated Integration Register:**
  - 14 candidate integration mapping from Spec-Kit, BMAD, Superpowers, Supabase, Vercel, Trail of Bits, and Google Skills.
- **Benchmark Suite & Evidence:**
  - 6 real, executable benchmark projects (Full-stack SaaS, Mobile, Desktop, AI, Distributed Backend, Embedded Firmware) tested with 100% pass rates.
  - Automated diagnostic and validation suite (`scripts/validate/validate-all.js`).
  - Independent 20-point Principal Engineer Final Audit (`evaluations/reports/FINAL_ENGINEERING_AUDIT.md`).
