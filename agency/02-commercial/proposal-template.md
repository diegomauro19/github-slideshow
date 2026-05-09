# Proposal Template

The standard structure for an enterprise AI consulting proposal. Designed to address the explicit and implicit evaluation criteria documented from Gartner / Forrester procurement guidance and recent enterprise RFPs.

> Sections marked **REQUIRED** must appear in every proposal. Sections marked **CONDITIONAL** appear when relevant.

---

## Cover

```
[Client logo]                                              [Our logo]

Proposal for [Engagement Name]
Prepared for [Client Name]

Submitted [Date]
Version [N]

Confidential — for internal review by [Client Name] only
```

---

## 1. Executive Summary [REQUIRED — 1 page]

The single page that gets read. Everything else is supporting evidence.

**Structure**:
- One sentence: what they want to achieve
- One sentence: what we're proposing
- Three bullets: the deliverables / outcomes
- One number: the investment
- One number: the timeline
- One sentence: why us, not Big 4

**Quality bar**: A board member who has read nothing else can decide whether to fund this from the executive summary alone.

---

## 2. Understanding [REQUIRED — 2-4 pages]

Demonstrates that we listened. The exec sponsor's first quality test of the proposal.

**Sections**:
- Business context (what's happening in their business)
- Stated objectives (what they told us they want)
- Implicit needs (what we heard between the lines)
- Constraints (what they told us they can't change)
- Success criteria (how we'll all know it worked)

**Quality bar**: Quotes / specific references from at least 3 conversations or documents the client gave us. No generic industry blah.

---

## 3. Our Approach [REQUIRED — 3-5 pages]

The methodology, applied to their situation.

**Sections**:
- Phase plan (which of our 5 phases applies, in what order)
- Per-phase: goal, activities, duration, deliverables, decision gate
- Diagram: timeline view (Gantt-style)
- Methodology callouts: the 1-2 things we do that they should care about (e.g., eval-first, vendor-neutral)

**Reference**: link to or excerpt the public-facing version of [our methodology](../01-methodology/README.md).

---

## 4. Team [REQUIRED — 2-3 pages]

Who's on the engagement. Counters the Big 4 "partner-sells, juniors-deliver" complaint by showing exactly who works on what.

**Per team member**:
- Name and role
- 2-sentence bio with directly relevant experience (named clients if cleared, named systems if not)
- Allocation (% of time on this engagement)
- What they're personally accountable for in this engagement

**Org chart**: Simple visual showing engagement team and reporting to the partner-in-charge.

**Commitments we make**:
- Named team — no bait-and-switch
- Senior bias — no learning on the client's dime
- Continuity — replacement only with client approval

---

## 5. Deliverables [REQUIRED — 2-4 pages]

What the client receives. Reference the deliverables catalog with specifics for this engagement.

**Format**: Table per phase with deliverable name, brief description, format, week of delivery, and acceptance criteria.

**Quality bar**: Acceptance criteria are objective and testable. No "to client satisfaction" — that's a dispute generator.

---

## 6. Investment [REQUIRED — 1-2 pages]

The price.

**Sections**:
- Total investment (one number)
- Breakdown by phase (table)
- Payment schedule
- What's included (people, materials, deliverables)
- What's not included (client-side dependencies, infrastructure costs, third-party software)
- Optional add-ons (e.g., extended hypercare, additional training)

**Quality bar**: No surprises. Anything the client could be charged for later is named here.

---

## 7. Why Us [REQUIRED — 2-3 pages]

Differentiation. This is the section where we earn the right to be considered against the Big 4.

**Sections (mix and match)**:
- Senior-only delivery model (with team bios as proof)
- Vendor-neutrality (with documented examples of recommending against revenue-generating choices)
- Production-shaped methodology (not just decks)
- Speed (case study of a recent comparable engagement and its timeline)
- Eval-first technical approach
- EU AI Act / governance readiness

**Reference assets**:
- 2-3 case studies with quantified outcomes
- Named references the client can call
- Public methodology / artifacts they can review

---

## 8. Risk and Mitigation [CONDITIONAL but recommended — 1-2 pages]

For builds and complex programs. Shows maturity.

**Format**: Table with: risk, likelihood, impact, mitigation, owner.

Cover at minimum: model performance, data availability, integration complexity, change management, regulatory.

---

## 9. Security, Compliance, Governance [REQUIRED for enterprise — 2-3 pages]

Increasingly weighted in enterprise RFPs (10-20% of scoring per Gartner / Forrester).

**Sections**:
- Our security posture (SOC 2 Type II, ISO 27001 status; if not yet certified, what we follow and roadmap)
- Data handling (where data flows, what's stored, retention, deletion)
- Identity and access (every action tied to authenticated user)
- Logging and traceability (signed logs, audit trail)
- Compliance frameworks we operate against (NIST AI RMF, ISO/IEC 42001)
- EU AI Act risk classification of the proposed system + compliance posture
- Sector-specific (HIPAA, GLBA, PCI-DSS, FedRAMP if relevant)
- Insurance coverage

---

## 10. Case Studies [REQUIRED — 2-4 pages]

3-5 named, quantified case studies in the client's industry or analogous domain.

**Per case study**:
- Client (named or anonymized as "Fortune 500 financial services firm")
- Problem (1 paragraph)
- Approach (1 paragraph)
- Outcome (numbers — % improvement, $ saved, time reduced)
- Reference contact (with permission)
- Engagement duration and scope (calibrates expectations)

**Quality bar**: Outcomes are specific. "Improved customer experience" is not a case study — "reduced average response time from 4 hours to 18 minutes" is.

---

## 11. Terms [REQUIRED — 1-2 pages]

Standard terms, called out for the client legal review.

**Sections**:
- Validity period of this proposal (typically 60 days)
- Standard MSA reference (or new MSA negotiation expected)
- IP ownership (our methodology / tools remain ours; client deliverables and custom code are theirs)
- Confidentiality
- Liability cap (typically 2× annual fees)
- Payment terms (per pricing model)
- Change control process (how scope changes get re-priced)
- Termination (typically 30 days notice with payment for work performed)

---

## 12. Acceptance [REQUIRED — 1 page]

Signature page.

```
This proposal is accepted on the terms above:

[Client Name]                          [Agency Name]
By:  ___________________               By:  ___________________
Name: __________________               Name: __________________
Title: _________________               Title: _________________
Date: __________________               Date: __________________
```

---

## Appendices [CONDITIONAL]

- A: Detailed methodology (full version of the approach summary)
- B: Detailed deliverable specs
- C: Detailed team bios
- D: Sample artifacts from prior engagements
- E: Master Service Agreement (if proposing one)

---

## Proposal hygiene checklist

Before sending any proposal, verify:

- [ ] Client name spelled correctly throughout
- [ ] Their logo in the right place, with permission, current version
- [ ] All numbers cross-checked (executive summary matches pricing section)
- [ ] Dates current and consistent (no leftover dates from template)
- [ ] No "[CLIENT_NAME]" or "[TODO]" markers anywhere
- [ ] Signed by the partner-in-charge on the cover page
- [ ] PDF generated cleanly (no broken images, fonts, or layout)
- [ ] File named per convention: `[ClientCode]_[EngagementCode]_Proposal_v[N].pdf`
- [ ] Reviewed by at least one other partner before send
- [ ] Sent to the right people (sponsor + procurement, typically separate emails)

A typo in a proposal isn't a typo — it's a signal about how we'll handle their work.
