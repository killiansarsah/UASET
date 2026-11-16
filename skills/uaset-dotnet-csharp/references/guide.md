# UASET .NET & C# Enterprise Engineering — Technical Reference & Runbook

**Category:** Enterprise & Desktop  
**Governing Gates:** G4, G5

---

## 1. Architectural Patterns & Idioms
When executing tasks within **UASET .NET & C# Enterprise Engineering**, adhere to industry-standard patterns:
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
