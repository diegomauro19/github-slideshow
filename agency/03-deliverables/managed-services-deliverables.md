# Managed Services Deliverables

Produced ongoing during the Scale phase. Reports, reviews, and continuous improvements. Audience is the client steering committee, governance bodies, and operations team.

---

## D5.1 — Monthly Operations Report

**Cadence**: Monthly  
**Audience**: Operations team, use case owner, IT director  
**Format**: 5-10 page PDF + dashboard link  
**Owner**: Account engineering lead  

**Sections**:
1. **Executive snapshot** — uptime, quality score, cost vs. budget, traffic light per use case
2. **Operational metrics** — availability, latency, error rate, on-call activity, MTTR
3. **Quality metrics** — eval pass rate, drift indicators, sampled output quality, customer-reported issues
4. **Cost report** — actual vs. budget, cost per query / per user, optimization opportunities identified
5. **Incidents** — what happened, root cause, resolution, prevention
6. **Improvements shipped this month** — what changed, why, impact
7. **Improvements planned next month** — backlog items prioritized
8. **Open issues and risks**

**Quality bar**: Numerical metrics traceable to the dashboards. Incidents have post-mortems linked. No "all green" reports without supporting evidence.

---

## D5.2 — Quarterly Business Review (QBR)

**Cadence**: Quarterly  
**Audience**: Steering committee, executive sponsor, finance  
**Format**: 20-30 slide deck + supporting analysis docs + 90-min meeting  
**Owner**: Account lead (partner level) + engagement lead  

**Sections**:
1. **Outcome metrics vs. baseline** — the business KPIs the system was meant to move
2. **Realized ROI** — vs. ROI model from Assess phase; what assumptions held, what didn't
3. **Adoption curve** — users, queries, business units, vs. plan
4. **Quality and reliability summary** — quarter-over-quarter trends
5. **Cost trajectory** — actual vs. projected, optimization wins, cost per outcome unit
6. **Strategic update** — landscape changes, new opportunities, recommendations
7. **Renewal / expansion proposal** — what we recommend for next quarter / year
8. **Decisions requested**

**Quality bar**: Outcomes section honest — if the use case isn't performing, that's surfaced with hypotheses for why and remediation options. Never glossed.

---

## D5.3 — Continuous Improvement Backlog

**Cadence**: Living document, reviewed weekly internally, monthly with client  
**Audience**: Engineering team, use case owner  
**Format**: Issue tracker (Linear, Jira, GitHub Projects)  
**Owner**: Account engineering lead  

**Item structure** (per backlog item):
- Title
- Type: bug / quality improvement / cost optimization / new capability / governance
- Hypothesis (if quality/improvement): what we expect to change
- Estimated effort
- Estimated impact (eval points, $ saved, latency reduction, etc.)
- Priority
- Status

Improvements ship on the agreed cadence per contract — typically 1-2 small changes per week, 1 medium change per month.

---

## D5.4 — Annual Strategy Refresh

**Cadence**: Annual  
**Audience**: Executive sponsor, CTO/CDO, steering committee, board (excerpts)  
**Format**: 30-50 page report + executive summary deck  
**Owner**: Account lead  

**Sections**:
1. **Year in review** — what the program achieved, in business terms
2. **Landscape changes** — model capability shifts, new platforms, regulatory updates (EU AI Act timeline, sector-specific rules), competitive moves
3. **Re-scored opportunity map** — use cases re-evaluated against current capability and cost frontier
4. **Updated readiness assessment** — what improved, what stalled
5. **Recommended program adjustments** — sequencing changes, new bets, sunsetting
6. **18-month forward roadmap** — refreshed with current information
7. **Investment recommendation**

**Quality bar**: Treated like a fresh Assess phase, not a status update. Brings new external benchmarks, new options, new questions — not just a recap.

---

## D5.5 — Incident Post-Mortems

**Cadence**: Per incident (any P1 or P2)  
**Audience**: Operations, use case owner, occasionally exec sponsor  
**Format**: Standard template per incident  
**Owner**: Incident commander  

**Sections** (Google SRE-style):
1. **Summary** — what happened, in one paragraph
2. **Impact** — users affected, duration, business consequence
3. **Timeline** — minute-by-minute, with timestamps
4. **Root cause** — the actual cause, not the symptom
5. **What went well**
6. **What went wrong**
7. **Action items** — concrete, owned, dated. Tracked to completion in the improvement backlog.

**Cultural rule**: Blameless. Names of individuals are excluded — only roles. The point is to find systemic failures, not punish people.

---

## D5.6 — Governance and Compliance Reports

**Cadence**: Quarterly + on regulatory changes  
**Audience**: General counsel, risk/compliance, CISO, audit committee  
**Format**: 10-20 page report  
**Owner**: Governance lead + account lead  

**Sections**:
1. **Compliance posture summary** — status against agreed standards (EU AI Act, ISO/IEC 42001, NIST AI RMF, sector-specific)
2. **Model card updates** — any changes to deployed models
3. **Eval results** — adversarial / red-team / fairness evals
4. **Incident summary from a governance lens**
5. **Regulatory horizon** — upcoming changes that affect the program
6. **Recommendations**

**Quality bar**: Audit-ready. The client should be able to hand this report to an external auditor or regulator without rework.

---

## D5.7 — Knowledge Transfer Sessions

**Cadence**: Quarterly + on major changes  
**Audience**: Client engineering, ops, product  
**Format**: Recorded session + materials  
**Owner**: Technical lead  

**Topics rotate**:
- New techniques relevant to the program (new model releases, new patterns)
- Deep-dive on a specific component the team should understand more deeply
- Hands-on lab on a tool or workflow
- Lessons from incidents

The goal is: by the end of a 12-month managed services contract, the client team can run the system independently if they choose. Lock-in via dependency is a failure mode we explicitly avoid.
