# UASET Troubleshooting & Diagnostics Guide

**Universal Antigravity Software Engineering Toolkit**  
*Document Version: 1.0.0 — Canonical Edition*

---

## Common Issues & Diagnostics

### 1. "UASET is not responding to ACTIVATE UASET in a new workspace"
- **Cause:** The global plugin has not been registered or the conversation was started before global plugin deployment.
- **Resolution:**
  1. Verify the global plugin exists at `~/.gemini/config/plugins/uaset/plugin.json`.
  2. Run `node C:\ALL PROJECT🧑‍💻\UASET\scripts\install\install-global.js` to re-sync global assets.
  3. Start a new conversation turn or type `UASET INIT` in the workspace to seed local `.uaset/config.json`.

### 2. "Gate G5 (Automated Test Verification) is pending or failing"
- **Cause:** No test files were detected in `tests/`, `test/`, or test commands exited with non-zero status.
- **Resolution:**
  - Execute `npm test`, `cargo test`, or `pytest` to inspect the exact failure.
  - Review `evaluations/reports/BENCHMARK_REPORT.md` for reference working test harnesses.
  - Remember Constitutional Principle 20: Tests must actually execute; never fake passing assertions.

### 3. "Domain detected incorrectly"
- **Cause:** Ambiguous workspace root lacking typical framework indicators.
- **Resolution:**
  - Run `uaset init` and edit `.uaset/config.json` manually to set `"domain": "Full-stack SaaS"`, `"Mobile Application"`, or your target domain.
  - UASET will honor `.uaset/config.json` over auto-detection heuristics.

### 4. "CLI command 'uaset' not found in terminal"
- **Cause:** `bin/` directory is not in your system `PATH`.
- **Resolution:**
  - Run `node ./bin/uaset.js <command>` directly, or add `C:\ALL PROJECT🧑‍💻\UASET\bin` to your environment `PATH`.
  - On Windows, `uaset.cmd` and `uaset.ps1` are provided in `bin/`.

---

## Diagnostic Self-Test Command
Run the automated diagnostic suite at any time:
```bash
node scripts/validate/validate-all.js
```
A 100% healthy installation will output:
`OVERALL SYSTEM STATUS: ✅ 100% HEALTHY & VALIDATED`.
