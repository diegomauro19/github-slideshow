# Build Deliverables

Produced in the Build phase. Code, infrastructure, monitoring, and documentation. Audience is the client team that will operate the system.

---

## D4.1 — Production System

**Audience**: Client engineering team  
**Format**: Code repository + deployed infrastructure  
**Owner**: Technical lead + engineers  

**Includes**:
- All source code in client's chosen VCS (GitHub, GitLab, Bitbucket)
- Infrastructure as code (Terraform, Pulumi, or equivalent — never click-ops)
- CI/CD pipelines configured and running
- Production deployment in client's chosen environment
- Staging / preview environment for safe iteration
- Rollback procedure tested at least once before go-live

**Quality bar**:
- 100% of production code has automated tests (unit + integration)
- Type-checked, linted, formatted (CI enforces)
- Secrets in a secrets manager — never in code or env files committed
- All dependencies pinned and security-scanned
- Eval suite passing on the agreed quality bar

---

## D4.2 — Monitoring and Eval Dashboards

**Audience**: Client operations, use case owner  
**Format**: Live dashboards (Grafana, Datadog, custom, or equivalent)  
**Owner**: Technical lead  

**Required dashboards**:

| Dashboard | What it shows | Refresh cadence |
|---|---|---|
| **System health** | Uptime, error rate, latency p50/p95/p99 | Real-time |
| **Quality** | Eval pass rate, drift indicators, sample of recent outputs | Hourly |
| **Cost** | Token usage, inference $, infrastructure $, per use case and per user | Hourly |
| **Usage** | Active users, queries per day, adoption by team | Daily |
| **Incident** | Recent incidents, MTTR, on-call paging | Real-time |

Dashboards are owned by the client at handover. We provide the IaC to recreate them.

---

## D4.3 — Runbook

**Audience**: Client on-call engineers, operations team  
**Format**: Markdown in the system's repo + linked from monitoring  
**Owner**: Technical lead  

**Sections**:
1. **System overview** — what it does, who uses it, who owns it
2. **Architecture** — components, dependencies, links to diagrams
3. **Deployment** — how to deploy, how to roll back
4. **Configuration** — every env var, secret, feature flag explained
5. **Common operations** — how to update prompts, swap models, add eval cases
6. **Incident response** — playbook for the top 10 likely incidents
7. **Escalation** — who to call, when, and how
8. **Known limitations** — what the system doesn't handle well, what to watch for

**Quality bar**: Tested by walking a client engineer who has never seen the system through it. They must be able to run, deploy, troubleshoot, and rollback using only the runbook.

---

## D4.4 — Model Card

**Audience**: Risk, compliance, legal, use case owner  
**Format**: 5-10 page document, follows industry-standard model card format  
**Owner**: Technical lead + governance  

**Sections**:
1. **Model details** — base model, version, provider, fine-tuning if any, prompt engineering approach
2. **Intended use** — primary use case, in-scope and out-of-scope behaviors
3. **Training/configuration data** — what was used, sources, dates
4. **Evaluation data** — eval set composition, where it came from, how it's maintained
5. **Performance metrics** — eval results, segmented by relevant dimensions
6. **Known limitations** — failure modes, biases, edge cases
7. **Ethical considerations** — risks identified, mitigations, residual concerns
8. **Maintenance plan** — re-eval cadence, model update process, deprecation plan

**Quality bar**: Reviewed by client risk/compliance before go-live. Updated on every material change to the system.

---

## D4.5 — Training Materials

**Audience**: Client team that will operate, extend, and govern the system  
**Format**: Slides + recorded sessions + hands-on labs  
**Owner**: Technical lead  

**Required tracks**:

| Track | Audience | Duration | Format |
|---|---|---|---|
| **Operator** | On-call engineers, ops | 4 hours | Workshop + lab |
| **Developer** | Engineers extending the system | 8 hours | Workshop + lab + paired build |
| **Owner** | Use case owner, product team | 2 hours | Workshop |
| **Executive** | Steering committee, exec sponsor | 1 hour | Briefing |

All sessions recorded. Materials live in the engagement repo.

---

## D4.6 — Handover Document

**Audience**: Exec sponsor, client engagement lead  
**Format**: 10-15 page PDF  
**Owner**: Engagement lead  

**Sections**:
1. **Engagement summary** — what was scoped, what was delivered
2. **What the client now owns** — every artifact, where it lives, who has access
3. **What's outstanding** — anything not delivered, with rationale and recommendation
4. **Lessons and recommendations** — what we learned that affects future waves
5. **Recommended next steps** — Scale phase services, follow-on use cases, governance maturation
6. **Acceptance** — signature block

**Quality bar**: Signed by client at handover. The engagement is not closed until this is signed.
