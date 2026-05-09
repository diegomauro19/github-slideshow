# The Five Phases — Detailed Playbook

Each phase has: a goal, a duration, an input checklist, a fixed set of deliverables, a client checkpoint, and an exit gate.

---

## Phase 1: Discover

**Goal** — Understand the client's business, people, data, and constraints well enough to scope the engagement honestly.

**Duration** — 2 weeks

**Inputs we need from the client**
- Org chart of the relevant business unit
- Existing data inventory (what data exists, where it lives, who owns it)
- Top 3-5 candidate use cases the client has already considered
- Recent strategy decks or board materials touching AI, data, or digital
- Access to 5-10 stakeholders for interviews (exec sponsor, line managers, IT, legal, security, end users)

**Activities**
- Kickoff workshop (half-day, on-site or remote)
- 8-12 stakeholder interviews (45 min each)
- Document review
- Initial data landscape walk-through with the client's data team
- Constraint mapping (regulatory, security, infrastructure, vendor commitments)

**Deliverables**
1. **Discovery report** — what we learned, who we talked to, what's true vs. assumed
2. **Stakeholder map** — power, interest, AI literacy per person
3. **Constraint register** — every "you can't do X" we identified, with source
4. **Candidate use case longlist** — typically 15-30 use cases, no scoring yet

**Checkpoint** — 90-min readout with executive sponsor and core team. Walk through findings, get factual corrections.

**Exit gate** — Client signs off on Discovery report. Joint go/no-go on entering Assess phase.

---

## Phase 2: Assess

**Goal** — Quantify the opportunity. Score use cases. Surface the readiness gaps. Produce a roadmap the executive sponsor can fund.

**Duration** — 3-4 weeks

**Activities**
- Use case scoring against our framework (value × feasibility × strategic fit, weighted)
- Technical readiness audit (data, infrastructure, MLOps, security, talent)
- Organizational readiness audit (sponsorship, change capacity, governance, ethics)
- ROI modeling for the top 3-5 use cases
- Build-buy-partner analysis per shortlisted use case
- Risk register (model risk, regulatory, vendor, operational)
- Roadmap synthesis

**Deliverables**
1. **AI Opportunity Map** — scored use case portfolio, ranked
2. **AI Readiness Assessment** — current vs. target state across data, tech, org, governance
3. **ROI Model** — per top use case, sensitivity-tested
4. **18-month Roadmap** — sequenced waves of use cases, dependencies, hiring, infrastructure
5. **Risk Register & Mitigation Plan**
6. **Governance recommendations** — model risk policy, ethics review, ownership, escalation

**Checkpoint** — Executive readout (90 min) plus a 2-hour working session with the steering committee to pressure-test the roadmap.

**Exit gate** — Client approves roadmap and budget for the first build wave (typically 1-3 use cases).

---

## Phase 3: Design

**Goal** — For each approved use case, produce a build-ready spec — architecture, model selection, integrations, evals, and success metrics.

**Duration** — 2-3 weeks per use case (often parallel across use cases)

**Activities**
- Functional spec workshops with the line-of-business owner
- Technical architecture design (system diagrams, data flows, deployment topology)
- Model selection and rationale (closed vs. open, hosted vs. self-hosted, fine-tune vs. RAG vs. agent)
- Integration design (auth, APIs, data sources, downstream systems)
- Evaluation plan (offline evals, A/B test design, production monitoring)
- Security and compliance review (data handling, prompt injection surface, audit logging)
- Success metrics definition (leading and lagging indicators, baseline measurement plan)

**Deliverables**
1. **Solution Design Document** — one per use case, build-ready
2. **Architecture diagram + data flow**
3. **Eval plan + initial test set**
4. **Security review** — threat model, mitigations, residual risks
5. **Cost model** — inference, infrastructure, support, projected for year 1
6. **Build plan** — sprints, milestones, team composition, client-side dependencies

**Checkpoint** — Technical design review with client architects, security, and the use case owner. Plus a financial review with finance/procurement.

**Exit gate** — Statement of Work signed for the build phase.

---

## Phase 4: Build

**Goal** — Ship a production-grade system. Not a demo, not a sandbox — a system the client will rely on.

**Duration** — 8-16 weeks per use case (varies with complexity)

**Activities**
- Two-week sprints with weekly client demos
- Continuous evaluation against the test set defined in Design
- Integration into client systems (auth, data, downstream)
- Production deployment with monitoring, logging, alerting
- User acceptance testing
- Documentation (architecture, runbooks, troubleshooting, model card)
- Training for the client team that will operate it
- Go-live plan with rollback criteria

**Deliverables**
1. **Production system** — code, infrastructure, deployed
2. **Monitoring and eval dashboards** — ongoing quality and cost telemetry
3. **Runbook** — how to operate, common issues, escalation
4. **Model card** — what model, trained/configured how, known limitations, evaluation results
5. **Training materials and recorded sessions**
6. **Handover document** — what we did, what the client owns, what's outstanding

**Checkpoint** — Weekly demo. Bi-weekly steering committee. Pre-go-live readiness review.

**Exit gate** — Production cutover complete. Client team trained. 30-day hypercare period begins.

---

## Phase 5: Scale

**Goal** — Operate, improve, and expand. This is where most agencies stop and most value is created.

**Duration** — Ongoing, typically 12-24 month managed services contract with renewals

**Activities**
- 24/7 monitoring and on-call rotation
- Eval set expansion as edge cases surface
- Model and prompt improvements as new versions / techniques emerge
- Cost optimization (caching, model tier-down, batching)
- Quarterly business reviews with metric tracking against baseline
- Incremental rollout to new business units / use cases
- Re-Discovery for each major expansion (lightweight)

**Deliverables (ongoing)**
1. **Monthly operations report** — uptime, quality metrics, cost, incidents
2. **Quarterly business review** — outcome metrics vs. baseline, ROI realized, recommendations
3. **Continuous improvement backlog** — prioritized list, executed on agreed cadence
4. **Annual strategy refresh** — landscape changes, new opportunities, plan adjustments

**Checkpoint** — Monthly ops review (operational), quarterly business review (executive).

**Exit gate** — Renewal at 12 months, or graduation when the client team is fully self-sufficient and we transition to advisory-only.
