# Contract Notes

> **This is not legal advice.** Every actual contract goes through qualified legal counsel. These notes capture the recurring issues we've seen and the positions we want to start from. They exist so engagement leads and partners can negotiate with informed defaults rather than reinventing each time.

---

## Master Service Agreement (MSA) overview

The MSA is the long-form contract that governs the overall relationship — IP, liability, confidentiality, indemnification, etc. Individual engagements are SOWs that hang off the MSA.

**Why this structure**: signing a fresh full contract per engagement adds weeks to every deal. An MSA signed once enables fast SOW execution thereafter.

**Our typical approach**:
- For new enterprise clients: negotiate MSA + first SOW in parallel
- For follow-on work: SOW only (1–2 week cycle)
- Re-papered MSA only on material change (acquisition, terms expiry, regulatory)

**MSA negotiation timeline**: 4–12 weeks for a new enterprise client with no existing relationship. Plan accordingly.

---

## Key MSA provisions and our positions

### 1. Intellectual Property (IP)

**Our default position**:
- Agency retains ownership of all pre-existing methodologies, frameworks, tools, templates, code libraries, and know-how
- Client receives a perpetual, non-exclusive license to use these as embedded in the Deliverables
- Client owns all custom deliverables created specifically for them — code, documents, configurations
- Both parties retain rights to general skills and knowledge

**Common client ask**: "All work product is work-for-hire and belongs to Client."

**Our response**: Acceptable for client-specific deliverables only. Pre-existing methodology and reusable components remain ours, with the client receiving a license. We document what's reusable vs. custom in the SOW.

**Walk-away point**: Client demands ownership of our methodology, frameworks, or any reusable IP. This destroys our business model. We exit.

---

### 2. Liability and Indemnification

**Our default position**:
- Liability cap: 1× annual fees paid under the relevant SOW (with mutual cap)
- Carve-outs from cap: gross negligence, willful misconduct, breach of confidentiality, IP indemnification
- IP indemnification: we defend client against third-party IP claims arising from our deliverables
- No consequential, indirect, or punitive damages
- Mutual indemnity for direct breaches

**Common client ask**: "Unlimited liability for breach of confidentiality / data breach / regulatory violations."

**Our response**: Cap at 2× annual fees with carve-outs as above. Unlimited liability is a non-starter — our insurance won't cover it, and one event would destroy the firm. If the client genuinely needs more, that's a sign we're not the right partner for that engagement.

**Walk-away point**: Client demands unlimited or uncapped liability with no insurability. Or demands punitive damages.

---

### 3. Confidentiality

**Standard provisions, no surprises**:
- Mutual NDA covering business, technical, and personal information
- 3–5 year survival post-termination (typical)
- Standard exceptions: publicly available, independently developed, lawfully obtained from third party
- Permitted disclosure: legal requirement (with notice when permitted), professional advisors under confidentiality
- Return / destruction on termination, with caveats for archival copies

**Sensitive areas to negotiate carefully**:
- Use of client name as reference (we want this; they often resist) — see Reference Rights below
- Right to use anonymized learnings for our methodology development (we want this; reasonable enterprise will agree to anonymized aggregate insights)

---

### 4. Reference Rights

**Why this matters**: Case studies and named references are our biggest sales asset. A client willing to be a reference is worth multiples of a quiet client.

**Our default position**:
- Right to name Client as a customer (logo only) on our website and in pitches, starting 90 days after engagement start
- Anonymized case studies (industry only, no client name) at our discretion
- Named case studies require separate written approval per case study
- Reference calls require client consent per request

**Common client objection**: "We don't allow vendor references."

**Our response**: Negotiate for at least the logo right, even with delay. If client refuses all reference rights, factor it into pricing — we accept lower margin without reference value but not silent reduction. Document this in SOW special terms.

---

### 5. Data Handling

Increasingly the most-negotiated section as enterprise AI engagements involve sensitive data.

**Our default position**:
- We process Client data only for the purposes set out in the SOW
- We meet specified security standards (SOC 2, ISO 27001, sector-specific)
- We notify Client of any data incident within 24 hours of detection
- We delete or return Client data within 30 days of engagement end
- We do not use Client data to train any model that benefits other clients
- Subprocessors disclosed in advance

**Hot issues for AI engagements specifically**:
- **Training data clauses** — explicit prohibition on Client data being used to train any general-purpose model. Critical for retention of proprietary advantage.
- **Model output ownership** — outputs of AI systems built for Client are Client's IP
- **Data residency** — EU clients increasingly require EU-only processing; specify infrastructure region in SOW
- **Right to delete** — data subject deletion requests must be supportable

---

### 6. Insurance

**What we maintain (and disclose in MSAs)**:
- Professional Indemnity / Errors & Omissions: £/$2M minimum, $5M+ for enterprise
- Cyber Liability: $5M minimum, with breach response and notification
- General Liability: $2M
- Workers Compensation: per local requirement

**Common client requirement**: "$10M cyber, $10M E&O." For enterprise, this is achievable. For SMB, it can be a deal-killer for a small agency. Quote insurance increases as a line-item in pricing if the client demands above-standard coverage.

---

### 7. Termination

**Our default position**:
- Either party may terminate for convenience with 30 days written notice
- Either party may terminate for material breach with 30 days cure period
- On termination: Client pays for all work performed and all expenses incurred to termination date
- Deliverables in progress transferred in current state
- Confidentiality, IP, and liability provisions survive

**Common client ask**: "Termination for convenience with no payment for incomplete work."

**Our response**: Decline. Work performed is paid for. Incomplete deliverables transferred as-is.

---

### 8. Warranty and Performance

**Our default position**:
- Warrant that services will be performed in a professional and workmanlike manner consistent with industry standards
- Warrant that deliverables conform to acceptance criteria as specified in SOWs
- Warranty period: 60 days post-deliverable acceptance for documents; for software/code, per SOW specifics
- Sole remedy for breach of warranty: re-perform the services or refund fees for the defective portion

**What we do NOT warrant**:
- Specific business outcomes (we warrant deliverables, not results)
- That AI models will achieve a specific accuracy without an agreed eval methodology
- That third-party services we recommend will perform to their vendor's specifications

This last point matters: we recommend tools and platforms. Their performance is between the client and that vendor.

---

## SOW-specific contract provisions

Things that vary per engagement and live in the SOW (not the MSA):

- Specific scope and deliverables
- Fees and payment schedule
- Timeline and milestones
- Team and any substitution restrictions
- Engagement-specific data handling (e.g., specific data sets accessed, retention)
- Engagement-specific reference rights (override or supplement MSA defaults)
- Engagement-specific outcome-based fees and attribution methodology
- Specific subprocessors used in the engagement
- Specific success criteria and acceptance tests

---

## Red flags in client paper

If we receive a client-drafted MSA or SOW, watch for:

- **"Most favored client" clauses** — we'd be obligated to give this client our best terms always. Decline.
- **Audit rights** — limited audit rights for compliance verification are fine; broad audit rights into our books are not
- **Right to acquire / right of first refusal** on our company. Decline.
- **Personnel poaching restrictions** that go beyond our internal policy. Mutual reasonable terms only.
- **IP grab on derivatives** — clauses that claim our methodology because we used it on their engagement. Decline.
- **Indemnification for IP claims arising from open-source software they instructed us to use.** We indemnify our work, not their tool selection.
- **Penalty clauses for missed deadlines without corresponding client obligation clauses.** We accept SLAs only when client responsibilities are equally bound.

---

## Process for a new MSA negotiation

1. **Pre-call** with client legal: understand their standard paper and any non-negotiables (15 min)
2. **Decide which paper to start from** — ours is faster for them; theirs is faster for us. Default to ours.
3. **Send our MSA + redlines explanation** within 3 business days of green light
4. **First-pass legal review** by both sides (1–2 weeks)
5. **Negotiation calls** — typically 2–4 calls, each focused on a specific cluster of issues
6. **Final review and signature**

**Internal rule**: No contract terms negotiated without legal counsel review. Even when a client makes a "small ask," route it. Bad precedents survive.

---

## When to involve external counsel

Always (no exceptions) for:
- Initial MSA negotiation with any new client
- Any liability cap above $5M or below 1× annual fees
- Any change to IP terms
- Any sector-specific compliance terms (HIPAA, GLBA, FedRAMP, etc.)
- Outcome-based fee structures with disputed attribution
- International engagements with non-US client entities
- Insurance requirements above standard policy limits

For follow-on SOWs under an existing MSA, partner-in-charge can sign without legal if the SOW uses our standard template and pricing.
