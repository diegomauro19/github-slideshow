# Reusable Frameworks

The analytical tools we apply inside the methodology. Each one is a specific structure for a specific recurring decision.

---

## 1. Use Case Scoring Matrix (used in Assess)

For each candidate use case, score 1-5 across:

| Dimension | Weight | What 1 looks like | What 5 looks like |
|---|---|---|---|
| **Business value** | 30% | Speculative or feel-good | Tied to a P&L line, $1M+ annual impact, exec sponsor identified |
| **Feasibility (technical)** | 25% | Required data doesn't exist or is inaccessible | Data exists, accessible, of known quality |
| **Feasibility (organizational)** | 15% | Requires major change management | Drops into existing workflow; minimal user retraining |
| **Strategic fit** | 15% | Tangential to stated strategy | Directly supports a top-3 strategic priority |
| **Risk profile** | 15% | High regulatory exposure, hard to reverse | Low blast radius, easy to roll back |

Weighted score is the primary input to ranking. Use cases below 3.0 are dropped. Cases between 3.0 and 4.0 are "fast follow." Cases above 4.0 enter the build wave plan.

---

## 2. AI Readiness Audit (used in Assess)

Five dimensions, scored 1-5 each. Output is a radar chart and a gap remediation plan.

| Dimension | Sub-dimensions |
|---|---|
| **Data** | Availability, quality, accessibility, governance, observability |
| **Technology** | Compute, MLOps tooling, deployment infra, integration surface |
| **Talent** | In-house ML/AI capability, data engineering, product, change capacity |
| **Governance** | Model risk policy, ethics review, compliance posture, audit trail |
| **Strategy** | Exec sponsorship, prioritization clarity, funding stability, success metrics |

Below 3.0 on any dimension is a flag — we recommend addressing it before scaling AI broadly.

---

## 3. Build-Buy-Partner Decision Tree (used in Design)

Per use case, walk this tree:

```
Is there a credible commercial product that solves this directly?
├─ Yes → How well does it fit the workflow?
│         ├─ >85% → BUY (buy + light integration)
│         ├─ 50-85% → PARTNER (buy + custom orchestration on top)
│         └─ <50% → continue
└─ No  → continue

Does the use case require proprietary data, IP, or differentiation?
├─ Yes (high) → BUILD (custom system on a foundation model)
├─ Yes (medium) → PARTNER (composable platform + custom layer)
└─ No → re-examine; may not be worth building
```

The output goes into the SDD with the rationale.

---

## 4. Model Selection Framework (used in Design)

Always start with the cheapest viable option and only scale up when evals demand it.

```
                              ↑ More capable / more expensive
                              │
   Frontier (Opus, GPT-class)  │   Used for: complex agentic tasks,
                              │   high-stakes reasoning, novel domains
                              │
   Mid-tier (Sonnet, similar)  │   Default for: most production agents,
                              │   knowledge work, structured generation
                              │
   Small + tuned (Haiku, OS)   │   Used for: high-volume, low-complexity,
                              │   classification, latency-sensitive
                              │
   Embeddings + retrieval      │   Used for: search, RAG retrieval,
                              │   when generation isn't needed
                              ↓
```

**Decision rules:**
- Always evaluate at least two tiers and document the tradeoff.
- Cost projection (year 1) is mandatory in the SDD.
- For high-volume use cases, model the cost at 10× projected volume — clients consistently underestimate adoption when it works.

---

## 5. ROI Modeling Template (used in Assess)

Standard structure, applied per use case:

```
Annual benefit
  = (Volume × value_per_unit × adoption_rate) − (cost_of_running)
  
Cost_of_running
  = Inference + Infrastructure + Support + Amortized_build_cost
  
Sensitivity tested on:
  • Adoption rate (low / base / high)
  • Volume (current / projected / 5x scenario)
  • Inference cost (current model price / +50% / -50%)
  • Time to value (months until benefit accrues)
```

Output: NPV over 3 years, payback month, and a clear sensitivity table. We never present a single point estimate — always a range.

---

## 6. Risk Register Categories (used in Assess and Design)

Every engagement maintains a risk register with these categories. Each risk gets owner, likelihood, impact, mitigation, and trigger.

| Category | Examples |
|---|---|
| **Model risk** | Hallucination, bias, drift, degradation under load |
| **Data risk** | Quality, availability, leakage, privacy violation |
| **Security risk** | Prompt injection, data exfiltration, unauthorized access |
| **Regulatory risk** | EU AI Act, sector-specific (HIPAA, GLBA), data residency |
| **Vendor risk** | Provider outage, price change, deprecation, lock-in |
| **Operational risk** | Cost overrun, on-call burden, knowledge concentration |
| **Reputational risk** | Public failure mode, ethical concerns, customer trust |
| **Adoption risk** | Users don't use it, shadow workarounds, rollback |

---

## 7. Evaluation Strategy Framework (used in Design and Build)

Three evaluation surfaces, all required:

| Surface | What it measures | Cadence |
|---|---|---|
| **Offline evals** | Quality on a curated test set | Pre-deploy, every change, nightly |
| **A/B / shadow tests** | Quality vs. existing baseline (human or system) | Pre-launch, on major changes |
| **Production monitoring** | Quality, cost, latency, drift in the wild | Continuous, alerts on threshold |

The eval test set is owned by the client team — they sign off on the cases. The agency builds the test infrastructure and runs it.

---

## 8. Engagement Health Dashboard (used internally, every engagement)

Every engagement is scored weekly across 6 dimensions:

| Dimension | Green | Yellow | Red |
|---|---|---|---|
| **Schedule** | On track | <2 wks slip | >2 wks slip |
| **Budget** | <90% burn vs. plan | 90-110% | >110% |
| **Quality** | Evals passing | Yellow on eval | Red on eval |
| **Client sentiment** | NPS-style 9-10 | 7-8 | <7 |
| **Scope** | No scope creep | Scope drift discussed | Active dispute |
| **Team** | Stable | One change | Multiple changes / burnout signs |

Anything yellow or red triggers a partner-level review within the week.
