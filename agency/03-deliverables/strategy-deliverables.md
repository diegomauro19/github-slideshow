# Strategy Deliverables

Produced in Discover, Assess, and Design phases. Documents, models, and recommendations.

---

## D1.1 — Discovery Report

**Phase**: Discover  
**Audience**: Executive sponsor, core program team  
**Format**: 15-25 page PDF + executive summary deck  
**Owner**: Engagement lead  

**Sections**:
1. Executive summary (1 page)
2. Engagement context and objectives
3. Stakeholder map (who we talked to)
4. Current state — business, technology, data, talent, governance
5. Constraints and dependencies
6. Initial observations and themes
7. Open questions for Assess phase
8. Recommended next steps

**Quality bar**: Every observation backed by an interview citation or document reference. No "we sense that" — only what was explicitly said or shown.

---

## D1.2 — Stakeholder Map

**Phase**: Discover  
**Audience**: Internal + executive sponsor (with discretion)  
**Format**: Visual map + supporting table  
**Owner**: Engagement lead  

**Content**:
- Each stakeholder plotted on power × interest × AI literacy
- Notes on each: position on AI, key concerns, what they need from us
- Recommended engagement strategy per stakeholder

**Quality bar**: Internal-only by default. Sanitized version may be shared with sponsor.

---

## D1.3 — Constraint Register

**Phase**: Discover (created), Assess + Design (extended)  
**Audience**: Internal + technical client team  
**Format**: Living spreadsheet  
**Owner**: Engagement lead  

**Columns**: Constraint, Source, Type (regulatory / technical / commercial / political), Impact, Workaround if any.

---

## D2.1 — AI Opportunity Map

**Phase**: Assess  
**Audience**: Steering committee, executive sponsor  
**Format**: 30-50 page PDF + interactive scoring spreadsheet  
**Owner**: Engagement lead + strategy consultant  

**Sections**:
1. Executive summary with the top 5 opportunities
2. Methodology — how we scored
3. Long list of identified use cases (typically 15-30)
4. Scored shortlist (typically 8-12)
5. Detailed write-up of top 5 — problem, value hypothesis, feasibility notes, risk
6. Use case dependencies and sequencing logic
7. Recommendations

**Quality bar**: Top 5 use cases each include: estimated annual value, named exec sponsor, named line-of-business owner, key data dependencies, key risks. No use case advances without these.

---

## D2.2 — AI Readiness Assessment

**Phase**: Assess  
**Audience**: CIO/CTO, CDO, executive sponsor  
**Format**: 20-30 page PDF + radar chart + remediation roadmap  
**Owner**: Technical lead  

**Sections**:
1. Executive summary with overall readiness score
2. Methodology
3. Per-dimension assessment (data, technology, talent, governance, strategy)
4. Gap analysis vs. target state
5. Remediation roadmap with effort estimates
6. Recommendations

**Quality bar**: Every score backed by specific evidence (named systems, specific people, specific policies). No generic "data quality is medium."

---

## D2.3 — ROI Model

**Phase**: Assess (per top use case)  
**Audience**: CFO, finance, exec sponsor  
**Format**: Excel or Google Sheets model with documentation tab  
**Owner**: Strategy consultant  

**Content**:
- Input assumptions (volume, value per unit, costs) — clearly flagged
- Calculations — formulas visible, no hardcoded numbers
- Sensitivity tables (low / base / high)
- Year 1, Year 3, Year 5 projections
- NPV, payback, IRR
- Documentation tab explaining methodology and assumption sources

**Quality bar**: Every assumption sourced (interview, industry benchmark, client data). Sensitivity ranges defensible. Reviewed by partner before client release.

---

## D2.4 — 18-Month AI Roadmap

**Phase**: Assess  
**Audience**: Steering committee, executive sponsor, board  
**Format**: 15-20 page PDF + 1-page summary visual  
**Owner**: Engagement lead  

**Sections**:
1. Vision (3-5 year horizon)
2. 18-month wave plan (typically 3-4 waves)
3. Per wave: use cases, dependencies, investment, expected outcomes
4. Hiring and capability plan
5. Infrastructure and tooling investments
6. Governance setup milestones
7. Decision points and re-planning cadence

**Quality bar**: Roadmap is realistic given the readiness assessment — no proposing a Year 1 wave that the org isn't ready for.

---

## D2.5 — Risk Register and Mitigation Plan

**Phase**: Assess (created), Design + Build (extended)  
**Audience**: Steering committee, risk/compliance, exec sponsor  
**Format**: Spreadsheet + executive summary  
**Owner**: Engagement lead  

**Columns**: Risk, Category (per [framework](../01-methodology/frameworks.md)), Likelihood, Impact, Owner, Mitigation, Trigger, Status.

---

## D2.6 — Governance Recommendations

**Phase**: Assess  
**Audience**: General counsel, risk/compliance, CISO, exec sponsor  
**Format**: 10-15 page PDF  
**Owner**: Strategy consultant + governance lead  

**Sections**:
1. Recommended AI governance operating model
2. Model risk policy (template + rationale)
3. Ethics review process
4. Roles and accountabilities (RACI)
5. Audit and reporting requirements
6. Regulatory mapping (EU AI Act, sector-specific)

---

## D3.1 — Solution Design Document (SDD)

**Phase**: Design (one per use case)  
**Audience**: Client architects, security, engineering, use case owner  
**Format**: 20-40 page PDF + architecture diagrams + spec docs  
**Owner**: Technical lead  

**Sections**:
1. Use case definition and success metrics
2. Functional spec (user stories, acceptance criteria)
3. Architecture (system, data, deployment)
4. Model selection and rationale
5. Integration design
6. Evaluation plan
7. Security review
8. Cost model
9. Build plan (sprints, milestones, team)

**Quality bar**: Build-ready. Another team should be able to execute from this document. Reviewed by client architect before sign-off.

---

## D3.2 — Architecture Diagrams

**Phase**: Design  
**Audience**: Client architects, engineering  
**Format**: Editable source (Mermaid, draw.io, Excalidraw) + rendered PNG/PDF  
**Owner**: Technical lead  

**Required diagrams**:
- System context (the AI system in its environment)
- Component diagram (internal structure)
- Data flow (where data moves, what's stored where)
- Deployment topology (where components run)

---

## D3.3 — Evaluation Plan

**Phase**: Design  
**Audience**: Client engineering, use case owner  
**Format**: 5-10 page document + initial test set in repo  
**Owner**: Technical lead  

**Content**:
- Eval philosophy and approach
- Offline eval methodology + initial test set (50-200 cases)
- A/B / shadow test design
- Production monitoring metrics and thresholds
- Eval ownership and update cadence

---

## D3.4 — Security Review

**Phase**: Design  
**Audience**: CISO, security architecture  
**Format**: 10-15 page PDF  
**Owner**: Security lead  

**Sections**:
1. Threat model
2. Mitigations (with implementation pointers)
3. Residual risks
4. Compliance mapping (relevant standards)
5. Required security review touchpoints during Build

---

## D3.5 — Statement of Work (SOW) for Build

**Phase**: Design (final deliverable of phase)  
**Audience**: Procurement, legal, exec sponsor  
**Format**: Standard SOW template  
**Owner**: Engagement lead + sales  

**Content**:
- Scope (what we'll do, what we won't)
- Team and roles
- Timeline and milestones
- Deliverables list
- Pricing and payment schedule
- Acceptance criteria
- Change management process
- Standard T&Cs (per MSA)

See [commercial proposal docs](../02-commercial/) for the SOW template.
