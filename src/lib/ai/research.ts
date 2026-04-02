/**
 * Research Session Runner
 *
 * Orchestrates deep research sessions using Claude Opus with web search
 * and optional MCP integrations (Slack, Gmail) for internal context.
 */

import Anthropic from "@anthropic-ai/sdk";

import { createAnthropicClient } from "./anthropic";
import { RESEARCH_AGENT_PROMPT } from "./prompts";
import { getMCPServers } from "@/lib/mcp/connectors";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const OPUS_MODEL = "claude-opus-4-20250514";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ResearchType =
  | "landscape"
  | "deep-dive"
  | "contrarian"
  | "data-hunt"
  | "competitive";

export interface ResearchFinding {
  source: string;
  url: string;
  date: string;
  insight: string;
  credibility: "primary" | "reputable" | "opinion" | "unknown";
}

export interface ResearchResult {
  summary: string;
  keyFindings: ResearchFinding[];
  contrarian: string[];
  gaps: string[];
  suggestedAngles: string[];
  model: string;
  usage: { inputTokens: number; outputTokens: number };
}

// ---------------------------------------------------------------------------
// Research Type Descriptions
// ---------------------------------------------------------------------------

const RESEARCH_TYPE_INSTRUCTIONS: Record<ResearchType, string> = {
  landscape:
    "Perform a broad landscape scan. Map the key players, recent developments, and prevailing narratives around this topic. Identify the 3-5 dominant viewpoints.",
  "deep-dive":
    "Go deep on this specific topic. Find the most authoritative primary sources, data sets, and expert analyses. Prioritize depth over breadth.",
  contrarian:
    "Actively search for contrarian and heterodox viewpoints on this topic. What do smart dissenters believe, and why? Find the strongest counterarguments to the mainstream narrative.",
  "data-hunt":
    "Focus on finding hard data: statistics, benchmarks, survey results, financial figures, and quantitative research. Every finding should include a specific number.",
  competitive:
    "Analyze the competitive landscape. Who are the key competitors or alternative approaches? What are their strengths, weaknesses, and recent moves?",
};

// ---------------------------------------------------------------------------
// Main Runner
// ---------------------------------------------------------------------------

/**
 * Run a full research session using Claude Opus with web search and
 * optionally Slack + Gmail MCP for internal context.
 *
 * @param query         The research question or topic
 * @param researchType  The type of research to perform
 * @param essayContext   Optional context about the essay being written
 */
export async function runResearchSession(
  query: string,
  researchType: ResearchType = "landscape",
  essayContext?: string,
): Promise<ResearchResult> {
  const client = createAnthropicClient();

  // Use Slack and Gmail MCP servers for internal context
  const mcpServers = getMCPServers(["slack", "gmail"]);

  const typeInstruction = RESEARCH_TYPE_INSTRUCTIONS[researchType];

  const userMessage = [
    `## Research Query`,
    query,
    "",
    `## Research Type: ${researchType}`,
    typeInstruction,
    "",
    ...(essayContext
      ? [`## Essay Context`, essayContext, ""]
      : []),
    "## Output Requirements",
    "Return your findings as a JSON object with these exact fields:",
    "- summary (string): 2-3 sentence overview",
    "- keyFindings (array): each with { source, url, date, insight, credibility }",
    "- contrarian (string[]): counternarrative angles",
    "- gaps (string[]): unanswered questions",
    "- suggestedAngles (string[]): 3-5 specific angles for the author",
    "",
    "Wrap the JSON in a ```json code block.",
  ].join("\n");

  const response = await client.messages.create({
    model: OPUS_MODEL,
    max_tokens: 16384,
    stream: true,
    system: RESEARCH_AGENT_PROMPT,
    tools: [{ type: "web_search_20250305" }],
    mcp_servers: mcpServers.length > 0 ? mcpServers : undefined,
    messages: [{ role: "user", content: userMessage }],
  } as Anthropic.MessageCreateParams);

  let fullContent = "";
  let inputTokens = 0;
  let outputTokens = 0;

  for await (const event of response) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      fullContent += event.delta.text;
    }
    if (event.type === "message_start") {
      const msg = (event as Record<string, unknown>).message as
        | Record<string, unknown>
        | undefined;
      const usage = msg?.usage as Record<string, number> | undefined;
      inputTokens = usage?.input_tokens ?? 0;
    }
    if (event.type === "message_delta") {
      const usage = (event as Record<string, unknown>).usage as
        | Record<string, number>
        | undefined;
      outputTokens = usage?.output_tokens ?? outputTokens;
    }
  }

  // Parse the JSON from the response
  const parsed = parseResearchJSON(fullContent);

  return {
    ...parsed,
    model: OPUS_MODEL,
    usage: { inputTokens, outputTokens },
  };
}

// ---------------------------------------------------------------------------
// JSON Parsing Helper
// ---------------------------------------------------------------------------

function parseResearchJSON(
  content: string,
): Omit<ResearchResult, "model" | "usage"> {
  // Extract JSON from code block
  const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch?.[1]?.trim() ?? content;

  try {
    const data = JSON.parse(jsonStr);
    return {
      summary: data.summary ?? "",
      keyFindings: Array.isArray(data.keyFindings) ? data.keyFindings : [],
      contrarian: Array.isArray(data.contrarian) ? data.contrarian : [],
      gaps: Array.isArray(data.gaps) ? data.gaps : [],
      suggestedAngles: Array.isArray(data.suggestedAngles)
        ? data.suggestedAngles
        : [],
    };
  } catch {
    // If JSON parsing fails, return the raw content as summary
    return {
      summary: content.slice(0, 500),
      keyFindings: [],
      contrarian: [],
      gaps: [],
      suggestedAngles: [],
    };
  }
}
