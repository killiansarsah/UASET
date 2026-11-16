# UASET Production Deployment Checklist

**Deployment Review:** Approved (Gate G8 & G9)  
**Author:** DevOps Engineer & Release Manager

---

## Pre-Deployment Verification
- [ ] All Quality Gates G0 through G7 verified and documented.
- [ ] Environment variable template (`.env.example`) verified.
- [ ] Container image builds cleanly and passes non-root security checks.
- [ ] Database migration tested in dry-run with rollback script ready.

## Release Execution
- [ ] Automated health checks (`/healthz`) passing post-rollout.
- [ ] Error rate telemetry monitored for 15 minutes post-deployment.
- [ ] Rollback procedure validated and ready.
