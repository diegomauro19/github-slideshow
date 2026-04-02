/**
 * Anthropic Client & AI Helper Functions
 *
 * Core AI interaction layer for Lumen Command Center.
 * All generation functions support streaming via the Anthropic SDK.
 */

import Anthropic from "@anthropic-ai/sdk";

import { getMCPServers } from "@/lib/mcp/connectors";
import {
  LUMEN_DRAFT_PROMPT,
  COPY_EDIT_PROMPT,
  SOCIAL_GENERATION_PROMPT,
} from "./prompts";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SONNET_MODEL = "claude-sonnet-4-20250514";

// ---------------------------------------------------------------------------
// Client Factory
// ---------------------------------------------------------------------------

let _client: Anthropic | null = null;

/**
 * Create (or return cached) Anthropic client.
 * Reads `ANTHROPIC_API_KEY` from the environment.
 */
export function createAnthropicClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return _client;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DraftInput {
  seedContent: string;
  insights: string[];
  research: string;
  mcpConnectorIds?: string[];
}

export interface DraftResult {
  content: string;
  model: string;
  usage: { inputTokens: number; outputTokens: number };
}

export interface CopyEditResult {
  editedDraft: string;
  editorNotes: string;
  model: string;
}

export interface SocialOutput {
  twitter: string;
  linkedin: string;
  newsletter: string;
  model: string;
}

// ---------------------------------------------------------------------------
// generateDraft
// ---------------------------------------------------------------------------

/**
 * Generate a long-form draft using Claude Sonnet with web search and MCP
 * servers for real-time context gathering.
 */
export async function generateDraft(
  seedContent: string,
  insights: string[],
  research: string,
  mcpConnectorIds?: string[],
): Promise<DraftResult> {
  const client = createAnthropicClient();

  const mcpServers = getMCPServers(mcpConnectorIds);

  const userMessage = [
    "## Seed Content",
    seedContent,
    "",
    "## Author Insights",
    insights.map((i, idx) => `${idx + 1}. ${i}`).join("\n"),
    "",
    "## Research Context",
    research,
    "",
    "## Instructions",
    "Write a publication-ready essay based on the above material.",
    "Follow the system prompt guidelines precisely.",
  ].join("\n");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {
    model: SONNET_MODEL,
    max_tokens: 16384,
    system: LUMEN_DRAFT_PROMPT,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{ role: "user", content: userMessage }],
  };
  if (mcpServers.length > 0) {
    params.mcp_servers = mcpServers;
  }
  const response = await client.messages.create(params);

  let fullContent = "";
  for (const block of response.content) {
    if (block.type === "text") {
      fullContent += block.text;
    }
  }

  return {
    content: fullContent,
    model: SONNET_MODEL,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  };
}

// ---------------------------------------------------------------------------
// copyEdit
// ---------------------------------------------------------------------------

/**
 * Run a copy-editing pass on a draft using Claude Sonnet.
 */
export async function copyEdit(draft: string): Promise<CopyEditResult> {
  const client = createAnthropicClient();

  const response = await client.messages.create({
    model: SONNET_MODEL,
    max_tokens: 16384,
    system: COPY_EDIT_PROMPT,
    messages: [
      {
        role: "user",
        content: `Please copy-edit the following draft:\n\n${draft}`,
      },
    ],
  });

  let fullContent = "";
  for (const block of response.content) {
    if (block.type === "text") {
      fullContent += block.text;
    }
  }

  // Split at the Editor's Notes section
  const notesMarker = "## Editor's Notes";
  const markerIndex = fullContent.indexOf(notesMarker);

  const editedDraft =
    markerIndex !== -1 ? fullContent.slice(0, markerIndex).trim() : fullContent;

  const editorNotes =
    markerIndex !== -1 ? fullContent.slice(markerIndex).trim() : "";

  return {
    editedDraft,
    editorNotes,
    model: SONNET_MODEL,
  };
}

// ---------------------------------------------------------------------------
// generateSocial
// ---------------------------------------------------------------------------

/**
 * Transform an essay into platform-native social media content.
 */
export async function generateSocial(essay: string): Promise<SocialOutput> {
  const client = createAnthropicClient();

  const response = await client.messages.create({
    model: SONNET_MODEL,
    max_tokens: 8192,
    system: SOCIAL_GENERATION_PROMPT,
    messages: [
      {
        role: "user",
        content: `Transform the following essay into social media content for Twitter/X, LinkedIn, and Newsletter teaser:\n\n${essay}`,
      },
    ],
  });

  let fullContent = "";
  for (const block of response.content) {
    if (block.type === "text") {
      fullContent += block.text;
    }
  }

  // Parse out the three platform sections
  const twitterMatch = fullContent.match(
    /### Twitter\/X Thread\n([\s\S]*?)(?=### LinkedIn|$)/i,
  );
  const linkedinMatch = fullContent.match(
    /### LinkedIn Post\n([\s\S]*?)(?=### Newsletter|$)/i,
  );
  const newsletterMatch = fullContent.match(
    /### Newsletter Teaser\n([\s\S]*?)$/i,
  );

  return {
    twitter: twitterMatch?.[1]?.trim() ?? fullContent,
    linkedin: linkedinMatch?.[1]?.trim() ?? "",
    newsletter: newsletterMatch?.[1]?.trim() ?? "",
    model: SONNET_MODEL,
  };
}
