# Deliverables Catalog

The complete catalog of artifacts the agency produces. Every artifact has a defined owner, format, audience, and quality bar. This catalog is the source of truth for what "done" means on every engagement.

## How to use this catalog

- **Engagement leads** reference this when scoping SOWs — every paid hour produces something on this list.
- **Sales** reference this when writing proposals — clients see exactly what they'll receive.
- **Quality reviewers** check final deliverables against the format and quality bar defined here.
- **New hires** read this to understand what good looks like.

## Catalog structure

Deliverables are grouped by the engagement type they serve:

- **[Strategy deliverables](./strategy-deliverables.md)** — produced in Discover, Assess, and Design phases. Documents, models, and recommendations. Audience is typically client executives and architects.
- **[Build deliverables](./build-deliverables.md)** — produced in Build phase. Code, infrastructure, monitoring, runbooks. Audience is the client team that will operate the system.
- **[Managed services deliverables](./managed-services-deliverables.md)** — produced ongoing in Scale phase. Reports, reviews, improvements. Audience is the client steering committee and operations team.

## Deliverable quality bar (universal)

Regardless of type, every deliverable meets these standards:

| Standard | Definition |
|---|---|
| **Audience-correct** | Written at the right altitude for the named audience. Exec summary works without footnotes. |
| **Sources cited** | Every claim, number, or recommendation traceable to data, interview, or stated assumption. |
| **Reviewed** | At least one peer review by another consultant. Any external-facing deliverable also gets a partner sign-off. |
| **Versioned** | Date and version on the cover. Change log if revised. |
| **Accessible** | PDF + editable source. No proprietary formats unless client requested. |
| **Branded** | Agency template, consistent with brand kit. |
| **Has a "what's next"** | Closes with explicit next steps or decision asked of the reader. |

## Naming conventions

`[ClientCode]_[EngagementCode]_[DeliverableType]_v[N].pdf`

Example: `ACME_AI001_OpportunityMap_v3.pdf`

Each deliverable also has an internal markdown source file in the engagement repo, from which the formatted output is generated.

## What is NOT a deliverable

To prevent scope creep and protect engagement margins:

- Slack messages, emails, and ad-hoc replies are not deliverables.
- Verbal recommendations not written into a document are not deliverables.
- Working sessions and workshops are activities — they may produce a deliverable (workshop summary) but the session itself is not one.
- "Quick favor" analyses outside SOW are not deliverables — they are scope creep and must be re-scoped.

If a client asks for something not in the SOW deliverable list, the engagement lead either (a) writes a change order, (b) declines, or (c) absorbs it as a goodwill gesture with explicit budget tracking. Never silently absorb it.
