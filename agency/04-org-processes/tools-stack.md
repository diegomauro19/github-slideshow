# Tools Stack

The software we use to run the firm and deliver engagements. Each tool has a specific job; we resist accumulating tools.

> **Principle**: One tool per job. If two tools overlap >70%, kill one. The cost of tools isn't the licenses — it's the cognitive overhead of remembering where things live.

---

## Engagement delivery tools

### Project / engagement management
**Choice**: Linear (preferred) or Notion projects  
**Why**: Linear is fast, opinionated, and has a great keyboard-first UX. Notion projects works if you're already on Notion. Avoid Jira unless a client mandates it for collaboration.  
**Fallback**: GitHub Projects when the engagement is engineering-only and lives entirely in a repo.

### Document collaboration
**Choice**: Google Workspace (Docs, Slides, Sheets) for client-facing  
**Why**: Universal compatibility, mature collaboration, easy sharing controls. Word / PowerPoint when the client mandates it.  
**Internal docs**: Markdown in Git (this repo's pattern). Keeps internal knowledge versioned and reviewable.

### Diagrams
**Choice**: Excalidraw (sketches), Mermaid (in markdown), draw.io (formal architecture)  
**Why**: All free, all exportable, none lock you in. Avoid Lucidchart unless a client demands it.

### Code repositories
**Choice**: GitHub for our IP and engagements where the client agrees; otherwise the client's chosen VCS (GitLab, Bitbucket, Azure DevOps)  
**Why**: GitHub has the best AI coding tooling integration. We adapt to the client's environment when needed.

### CI/CD
**Choice**: GitHub Actions when in GitHub; client's chosen CI otherwise  
**Why**: Workflow-as-code, well-integrated, easy to fork/share patterns

### Engagement repo template
Every engagement starts from a template repo with this structure:

```
engagement-[client]-[code]/
├── README.md                  # Engagement summary + active links
├── 00-context/                # Client docs, prior decks, background
├── 01-discovery/              # Interview notes, transcripts
├── 02-analysis/               # Working models, evaluations
├── 03-deliverables/           # Final client-facing artifacts
├── 04-internal/               # Status reports, internal notes
└── 05-handover/               # Final handover materials
```

---

## AI / engineering tools

### LLM access
**Choice**: Direct API access to Anthropic, OpenAI, and Google Vertex AI; observability via [Helicone](https://helicone.ai/) or LangSmith  
**Why**: Vendor-neutrality requires direct API relationships, not platform middleware. Observability is non-negotiable per our principles.

### AI development frameworks
**Choice**: We don't pick a default — we pick per use case. Common: LangChain (when graph-of-tools is the pattern), LlamaIndex (RAG-heavy), Pydantic AI (typed agents), or hand-rolled with raw SDKs (when frameworks add more complexity than value).  
**Principle**: Frameworks earn their place. We document the choice in the SDD per use case.

### Eval tooling
**Choice**: [promptfoo](https://www.promptfoo.dev/) for offline evals; client-environment custom dashboards for production  
**Why**: promptfoo is open-source, model-agnostic, and integrates into CI cleanly.

### Vector DBs
**Choice**: We don't standardize. Common picks: Postgres+pgvector (default — leverages existing infra), Qdrant (high-scale standalone), Pinecone (when client prefers managed).

### Coding assistance
**Choice**: Claude Code or Cursor for engineers; Copilot when client environment requires it.  
**Why**: Better leverage on senior engineers' time. Documented in our internal coding playbook.

---

## Sales and marketing tools

### CRM
**Choice**: HubSpot (recommended for early stage — generous free tier) → Salesforce (when team > 15 or enterprise sales hire)  
**Why**: HubSpot is fast to set up, integrates with everything, scales reasonably. Move to Salesforce only when you have a dedicated SalesOps person.

### Email
**Choice**: Google Workspace Gmail (alongside the rest of Workspace)

### Calendar / scheduling
**Choice**: Google Calendar + [Cal.com](https://cal.com/) or [Calendly](https://calendly.com/) for client booking  
**Why**: Cal.com is open-source if that matters to the firm; Calendly is more polished.

### Newsletter / content distribution
**Choice**: [Beehiiv](https://www.beehiiv.com/) or [Substack](https://substack.com/) for thought leadership / newsletter  
**Why**: Both have good free tiers and writer-friendly UX.

### Website
**Choice**: [Astro](https://astro.build/) or [Next.js](https://nextjs.org/) on Vercel for the marketing site  
**Why**: Engineer-friendly, fast, content lives in markdown / MDX (versionable). Avoid Wix/Squarespace — the brand cost of a generic-looking site exceeds the time saved.

### Design
**Choice**: Figma for any visual design work  
**Why**: Industry standard, excellent collaboration, good free tier

---

## Operations tools

### Accounting / Bookkeeping
**Choice**: QuickBooks Online (US) or Xero (UK / international)  
**Why**: Universal accountant compatibility. Don't try to be clever here.

### Payroll
**Choice**: Gusto (US), Deel (international contractors), local provider (other geographies)  
**Why**: Gusto is dramatically simpler than ADP; Deel is the cleanest international setup we've found.

### Banking
**Choice**: Mercury (US, recommended for new firms) or Brex; whichever your accountant prefers  
**Why**: Both have good cards, clean UX, and bookkeeping integrations.

### Document signing
**Choice**: DocuSign (enterprise-recognized) or HelloSign for cheaper alternative  
**Why**: Enterprise procurement teams sometimes require DocuSign. HelloSign is fine when not constrained.

### Expense management
**Choice**: Brex / Ramp (corporate cards with built-in expense management)  
**Why**: Eliminates the receipt-collecting overhead of manual expense reports.

### Internal communication
**Choice**: Slack (default) or MS Teams (when most clients are on Teams)  
**Why**: Pick one and commit. Don't run both.

### Internal knowledge base
**Choice**: This repo (Git + markdown) for methodology and processes; Notion or similar for less-structured ops knowledge  
**Why**: Versioning, review, and accessibility from any device. Notion adds value for less-formal docs (team handbook, vacation tracker, etc.).

### Time tracking
**Choice**: [Harvest](https://www.getharvest.com/) or built-in Linear time tracking  
**Why**: Required for T&M engagements and utilization reporting. Make it as low-friction as possible — burdensome time tracking gets ignored.

### Password management
**Choice**: 1Password (Teams plan)  
**Why**: Mature, well-engineered, has the integrations for shared client credentials.

### Single sign-on / Identity
**Choice**: Google Workspace SSO (early); add Okta if SOC 2 / enterprise client requires (later)  
**Why**: Avoid premature SSO complexity; add when needed for compliance.

---

## Compliance and security tools

### Compliance automation
**Choice**: [Vanta](https://www.vanta.com/) or [Drata](https://drata.com/) for SOC 2, ISO 27001, ISO 42001  
**Why**: Pursuing these compliance certifications without automation is a full-time job. Either tool dramatically accelerates and maintains certification.  
**When**: When your largest deal in pipeline requires it (typically by Year 2 for an enterprise-targeting firm).

### Endpoint security
**Choice**: Whatever your compliance framework requires. [Kandji](https://www.kandji.io/) (Mac) or [Jamf](https://www.jamf.com/) for managed devices.

### Secrets management
**Choice**: Cloud-native (AWS Secrets Manager, GCP Secret Manager) for engagement secrets; 1Password Teams for shared business secrets  
**Why**: Different jobs. Don't conflate.

---

## Tool selection process

When considering a new tool:

1. **What problem does it solve?** Be specific. "We need better project management" is not a problem; "We can't see across all engagements at a glance" is.
2. **What does it replace?** Net-add tools are rarely worth it. Net-replace tools are.
3. **Who's the owner?** Every tool has a named owner accountable for setup, training, and renewal.
4. **What's the all-in cost over 12 months?** License + admin time + training time + integration time.
5. **What's the lock-in?** Can we export everything if we need to switch?
6. **30-day pilot.** No more than one new tool in trial at a time.
7. **Decision after pilot.** Buy, kill, or extend pilot for one more cycle (max).

---

## Tool retirement

Annually, every tool gets reviewed:
- Is it still used? (check actual usage, not just license count)
- Is it still the best option?
- What would breaking up cost?

Cancel anything not actively used. Re-evaluate anything where the market has moved (LLM tooling shifts every 6 months — check).
