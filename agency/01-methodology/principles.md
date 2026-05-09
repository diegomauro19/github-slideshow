# Operating Principles

Twelve commitments that govern how every engagement is run, from the first email to the final handover. These exist to make our quality predictable and our judgment legible to clients.

---

## Engagement principles

### 1. Outcome before output
Every engagement opens with the question: "What changes for the business if this works?" If we can't answer in one sentence, we don't start. The answer is written into the SOW and tracked through to the QBR.

### 2. Production-shaped from day one
Every artifact — even in Discover — is shaped to support a production system. Discovery interviews ask about deployment constraints. Assess scoring weighs operability. Design specifies monitoring before functionality. We refuse engagements that explicitly mandate a non-production POC; they're a waste of everyone's money.

### 3. Vendor-neutral
We don't have reseller relationships, model partnerships, or platform commissions. Our model selection is documented with rationale. If we recommend OpenAI over Anthropic over open-weights for a use case, the SDD says why. This is our single biggest differentiator vs. firms that earn margin on cloud or model resale.

### 4. Smallest credible team
Each engagement has the smallest team that can do the work well. We don't pad teams to inflate billings. The lead consultant is senior enough to make decisions in the room. We deploy juniors only where they add value, not as a margin lever.

---

## Technical principles

### 5. Eval-driven development
Nothing ships without an eval set. The eval set is built before the system is. Every prompt change, model change, or version bump runs against it. This is how we make AI systems behave like software, not magic.

### 6. Observability is a feature, not an addon
Logging, tracing, cost telemetry, and quality monitoring are part of every Build deliverable. Not "we'll add monitoring later." A system without observability is a system the client can't operate, which means we haven't delivered what we promised.

### 7. Smallest model that works
We start every Design with the cheapest, smallest, simplest model that could plausibly handle the use case and only scale up when evals demand it. Defaulting to the most powerful model is intellectual laziness and bad client economics.

### 8. Reversibility wherever possible
Architecture choices favor reversibility. Use abstraction layers that let us swap models, prompts, or providers without rewrites. Avoid lock-in to a single vendor's tools (a client decision, not just a technical one).

---

## Client relationship principles

### 9. Plain language, no jargon
We translate. Internal docs can be technical. Client-facing docs explain "model evaluation" before they use the term. The executive summary works without footnotes. If the CFO can't understand the deliverable, the deliverable is broken.

### 10. Bad news fast
When something is going to be late, over budget, harder than expected, or wrong — the client knows within 24 hours, not at the next steering committee. We have never lost a client by escalating early. We have lost clients by hiding problems.

### 11. The client team owns it
Every system we build is operated by the client by the end of Build. Our hand-off plan is written in week one. Training is a deliverable, not a courtesy. Ongoing managed services is a choice, not a dependency.

---

## Internal principles

### 12. Document the work, not just the outcome
For every engagement, we capture what we tried, what worked, what didn't, and what we'd do differently. These post-engagement reviews feed our internal playbooks. Our methodology gets sharper every quarter because of this discipline; without it, we'd be re-deriving the same lessons.

---

## How these are enforced

- **Engagement leads sign a one-pager** at SOW affirming the engagement is structured around these principles.
- **Quality reviews at every phase gate** check for principle adherence (e.g., does the SDD include eval plan? does the build include monitoring?).
- **Post-engagement retros** explicitly ask: "Where did we deviate from a principle? Was it the right call?"
- **Hiring filters** for these principles — we screen for production mindset, vendor-skepticism, and ability to translate technical concepts to executives.
