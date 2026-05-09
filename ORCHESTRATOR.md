# Orchestrator agent UI

The orchestrator agent project lives in a sibling repository at `/home/user/orchestrator` (separate from this tutorial repo).

It's a Slack bot powered by the Claude Agent SDK that triages user requests and delegates to specialist subagents:

- **coder** — code reading/writing/editing, shell, git
- **planner** — personal-productivity reasoning (no tools)
- **researcher** — web search and source-cited summaries

## Quick start

```bash
cd /home/user/orchestrator
cp .env.example .env       # fill in Slack + Anthropic keys
npm install
npm run dev
```

See `/home/user/orchestrator/README.md` for the full Slack app setup walkthrough.

## Architecture

```
Slack DM / @-mention
  ↓
@slack/bolt (Socket Mode, runs locally — no public URL needed)
  ↓
@anthropic-ai/claude-agent-sdk → query() with subagent definitions
  ↓
Streamed text + subagent activity → throttled chat.update back to Slack thread
```

Per-thread Claude session IDs are persisted so each Slack thread is its own conversation.
