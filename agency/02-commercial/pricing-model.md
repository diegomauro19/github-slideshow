# Pricing Model

The numbers. Day rates, package prices, retainer tiers, and the rules for applying them.

> All prices in USD unless noted. Last updated: 2026-Q2. Review and adjust quarterly based on win rate and benchmark drift.

---

## Day Rates (T&M floor)

We use these as the basis for fixed-fee scoping and as the actual rate for any T&M work. Senior bias is intentional — every named role is filled by someone who has shipped enterprise AI in production.

| Role | Day rate | Annual fully-loaded cost basis | Target utilization |
|---|---|---|---|
| Partner | $4,500–$5,500 | $400k+ | 50% billable |
| Principal Consultant / Engineering Lead | $3,500–$4,500 | $300k+ | 65% billable |
| Senior Consultant / Senior Engineer | $2,500–$3,500 | $220k+ | 75% billable |
| Consultant / Engineer | $1,800–$2,400 | $160k+ | 80% billable |
| Specialist (governance, security, data) | $3,000–$4,000 | $260k+ | 60% billable |

**Pricing rules:**
- Day = 8 hours of focused billable work
- Travel time billed at 50% of day rate, plus expenses (passed through at cost)
- Weekend / out-of-hours work at 1.5×
- Discounts only with partner sign-off; never advertised
- Quarterly review against win/loss ratios — adjust ranges if win rate < 25% or > 60%

---

## Engagement Packages

Pre-priced, fixed-fee productized engagements. These are our foot-in-the-door offers and follow-on standards. Custom engagements are scoped from day rates.

### Strategy packages

| Package | Price | Duration | Team |
|---|---|---|---|
| **AI Readiness Audit** | $75k | 4 weeks | 1 partner (10%) + 1 principal (40%) + 1 senior (60%) |
| **AI Opportunity Assessment** | $125k | 6 weeks | 1 partner (10%) + 1 principal (60%) + 1 senior (80%) |
| **Full AI Strategy & Roadmap** | $250k | 10 weeks | 1 partner (15%) + 1 principal (80%) + 1 senior (100%) + governance specialist (20%) |
| **AI Governance Setup** | $150k | 6 weeks | 1 governance specialist (80%) + 1 principal (40%) + 1 partner (10%) |
| **EU AI Act Readiness Assessment** | $90k | 4 weeks | 1 governance specialist (100%) + 1 partner (10%) |

### Build packages

Builds are scoped per use case, but we publish reference prices so clients have anchors:

| Build complexity | Price range | Duration | Team composition |
|---|---|---|---|
| **Single-purpose agent / workflow** (low integration) | $150k–$250k | 8–12 weeks | 1 lead engineer (100%) + 1 engineer (100%) + 1 principal (30%) |
| **Multi-step agent with integrations** (medium) | $250k–$500k | 12–20 weeks | 1 lead engineer (100%) + 2 engineers (100%) + 1 principal (40%) |
| **Enterprise platform with multiple agents / governance** (high) | $500k–$1.2M | 16–28 weeks | 1 principal (100%) + 1 lead (100%) + 2–3 engineers (100%) + governance specialist (40%) |

### Managed services tiers

| Tier | Monthly retainer | Inclusions |
|---|---|---|
| **Operate** | $15k–$30k/month | 1 use case, business-hours support, monthly ops report, eval maintenance |
| **Operate+** | $40k–$75k/month | 2–3 use cases, 24×7 support, QBRs, monthly ops report, continuous improvement (1 small change/wk) |
| **Operate Premium** | $80k–$150k/month | Multi-use-case program, 24×7 with named on-call, QBRs, governance reporting, continuous improvement (2 changes/wk + 1 medium/mo), annual strategy refresh |

**Plus metered usage** for any inference/infrastructure costs we manage on behalf of the client (passed through at cost + 10% management margin, or client pays providers directly with no markup).

**Plus model-monitoring add-on**: $1,500/model/month for dedicated eval suite + drift monitoring + quarterly red-team.

---

## Outcome-based pricing (overlay)

Available on top of any base structure when:
1. The outcome metric is explicit and instrumented before work starts
2. Attribution to our work is defensible (control group, baseline, or causal logic)
3. Both sides agree on the measurement methodology in writing

**Common structures:**

| Structure | When to use | Mechanic |
|---|---|---|
| **Bonus on milestone** | Build engagements with a clear go-live | Base fee + 10% bonus on hitting eval threshold by date |
| **Revenue / cost share** | Use cases tied to a measurable financial outcome | Base fee discounted 15–25% + 10–25% of attributable annual value, capped at 2× the discount, paid quarterly for 12 months |
| **Performance retainer** | Managed services with quality SLA | Base retainer + bonus/penalty on quality + uptime SLA |

**Rules:**
- Cap the upside (typically 2× the foregone base fee) — uncapped outcome fees create enforcement nightmares
- Define attribution method in the SOW — never leave it for "we'll figure it out"
- The outcome metric must already exist in client systems or be agreed as part of Design phase
- Outcome fees are quarterly true-ups, not retroactive lump sums

---

## How to scope a custom engagement

For any engagement that doesn't fit a package:

1. **Identify the team composition** by role and FTE allocation per week
2. **Multiply by duration in working days** (4.3 weeks/month × days in scope)
3. **Apply the day rate** for each role
4. **Add 10% buffer** for ramp-up, unplanned client meetings, documentation tail
5. **Add 5% expenses** if travel involved (passed through at actual cost)
6. **Round to a clean number** (nearest $5k for engagements <$500k, nearest $25k above)
7. **Sanity check against the package prices above** — if the custom quote is more than 30% off the nearest package, re-examine

---

## Discount policy

- **No volume discounts published.** Clients who want predictability should sign multi-engagement programs (see below).
- **Multi-engagement programs**: 5% discount on the first $1M committed; 10% on $1M–$3M; 15% above $3M. Requires a Master Engagement Agreement (MEA) committing to the spend over 12–24 months.
- **Procurement-driven discounts**: 0–5% only, requires partner sign-off, must be matched by an equivalent scope reduction or favorable term elsewhere (extended payment, reference rights, exclusivity in their industry for 6 months).
- **No "first project" discounts.** They set bad precedent and don't actually win deals — the client either values our work or doesn't.

---

## Payment terms

- **Strategy engagements**: 50% on signature, 50% on final deliverable acceptance
- **Build engagements**: 25% on signature, 25% at design freeze, 25% at production cutover, 25% at end of hypercare (30 days post go-live)
- **Managed services**: Monthly in advance, net 15
- **Outcome-based fees**: Quarterly true-up, paid net 30
- **Late payments**: 1.5%/month after net terms; engagement work paused at 60 days late (with notice)

---

## When to walk

If the prospect asks for any of these and won't move:

- More than 30% discount on a published package price
- Net-90 or longer payment terms
- Unlimited liability or IP transfer of our methodology
- "We'll pay you in equity" without a salary floor
- A POC with no committed budget for the next phase if successful
- Fixed price for an undefined scope ("AI strategy for the company")

These aren't deals — they're traps. We exit politely, leave the door open, and move on.
