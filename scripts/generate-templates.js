const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const templates = [
  {
    file: 'templates/architecture/ARCHITECTURE_TEMPLATE.md',
    content: `# [System Name] System Architecture Document

**Architecture Review:** Approved (Gate G1)  
**Author:** UASET Chief Software Architect & Solution Architect  
**Version:** 1.0.0

---

## 1. System Context & Overview (C4 Level 1)
\`\`\`mermaid
flowchart TD
    User([End User]) --> Client[Client Application]
    Client --> API[API Gateway / Backend]
    API --> DB[(Primary Database)]
    API --> Cache[(Redis Cache)]
    API --> Queue[[Message Queue]]
\`\`\`

## 2. Key Architectural Decisions (ADR Summary)
- Primary Language & Framework: ...
- Persistence Layer: ...
- Inter-service Communication: ...

## 3. Component Boundaries & Module Architecture (C4 Level 2)
*Detail each service, layer, and boundary.*

## 4. Scalability & Resilience Strategy
- Horizontal scaling, caching tiers, circuit breakers, and database connection pooling.

## 5. Security Architecture
- Trust boundaries, least privilege roles, token signing, and encryption in transit/at rest.
`
  },
  {
    file: 'templates/architecture/ADR_TEMPLATE.md',
    content: `# ADR-[Number]: [Title of Decision]

**Status:** Proposed | Accepted | Superseded  
**Date:** YYYY-MM-DD  
**Deciders:** Chief Software Architect, Tech Lead  
**Governing Gate:** G1 Architecture

---

## Context and Problem Statement
*What technical or business problem requires a decision?*

## Considered Options
1. Option A: ...
2. Option B: ...

## Decision Outcome
Chosen option: **[Option A]** because ...

### Positive Consequences
- ...

### Negative Consequences / Trade-offs
- ...
`
  },
  {
    file: 'templates/database/SCHEMA_TEMPLATE.sql',
    content: `-- UASET Standard Relational Database Schema Template
-- Target Database: PostgreSQL 15+ / SQLite 3
-- Governing Gate: G3 (Database & API Approval)

-- Enable UUID extension if PostgreSQL
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS audits (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audits_user_id ON audits(user_id);
`
  },
  {
    file: 'templates/api/OPENAPI_TEMPLATE.yaml',
    content: `openapi: 3.1.0
info:
  title: UASET Standard API Specification
  version: 1.0.0
  description: API contract governing inter-service and client communications.
paths:
  /healthz:
    get:
      summary: Health check endpoint
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "ok"
                  timestamp:
                    type: string
                    format: date-time
`
  },
  {
    file: 'templates/testing/TEST_PLAN_TEMPLATE.md',
    content: `# [Project Name] Quality & Test Plan

**Quality Review:** Approved (Gate G5)  
**Author:** QA Architect & Test Engineer  
**Standard:** 100% Executable Tests with Verifiable Evidence

---

## 1. Test Strategy & Pyramid
- **Unit Tests:** Business logic, algorithmic parsers, domain validations. Target: 80%+ line coverage.
- **Integration Tests:** Database transactions, API route handling, middleware pipelines.
- **End-to-End Tests:** Critical user onboarding, core task completion, error recovery flows.

## 2. Test Execution Command
\`\`\`bash
npm test
\`\`\`

## 3. Evidence Checklist
- [ ] Real test runner execution with exit code 0.
- [ ] Zero fabricated test results.
- [ ] No flaky or skipped tests in critical paths.
`
  },
  {
    file: 'templates/security/SECURITY_AUDIT_TEMPLATE.md',
    content: `# [Project Name] Security Verification Report

**Security Review:** Approved (Gate G6)  
**Author:** Application Security Engineer & Security Architect

---

## 1. Threat Modeling (STRIDE)
- **Spoofing:** Handled via cryptographically signed JWT tokens with short expiry.
- **Tampering:** Parameterized SQL queries and schema validation.
- **Repudiation:** Append-only audit logs for security-sensitive actions.
- **Information Disclosure:** HTTPS enforced, secrets kept out of version control.
- **Denial of Service:** Rate limiting per IP and request body size caps.
- **Elevation of Privilege:** RBAC checks on every protected endpoint.

## 2. Vulnerability Scan Results
- SAST Scan Status: PASSED (Zero High/Critical CVEs)
- Secret Detection: PASSED (Zero hardcoded secrets detected)
`
  },
  {
    file: 'templates/deployment/DEPLOYMENT_CHECKLIST.md',
    content: `# UASET Production Deployment Checklist

**Deployment Review:** Approved (Gate G8 & G9)  
**Author:** DevOps Engineer & Release Manager

---

## Pre-Deployment Verification
- [ ] All Quality Gates G0 through G7 verified and documented.
- [ ] Environment variable template (\`.env.example\`) verified.
- [ ] Container image builds cleanly and passes non-root security checks.
- [ ] Database migration tested in dry-run with rollback script ready.

## Release Execution
- [ ] Automated health checks (\`/healthz\`) passing post-rollout.
- [ ] Error rate telemetry monitored for 15 minutes post-deployment.
- [ ] Rollback procedure validated and ready.
`
  }
];

templates.forEach(t => {
  const full = path.join(root, t.file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, t.content, 'utf8');
});

console.log(`Successfully generated ${templates.length} engineering templates.`);
