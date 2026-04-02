/**
 * MCP Connector Registry
 *
 * Defines all Model Context Protocol server connections used by the
 * Lumen Command Center.  Each connector describes one external tool
 * that Claude can reach through the MCP transport layer.
 */

export interface MCPConnector {
  id: string;
  name: string;
  url: string;
  uses: string[];
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const mcpConnectors: Record<string, MCPConnector> = {
  slack: {
    id: "slack",
    name: "Slack",
    url: "https://mcp.slack.com/mcp",
    uses: [
      "Search channels and DMs for conversations",
      "Post messages and thread replies",
      "Gather team sentiment and discussion context",
      "Monitor channels for trending topics",
    ],
  },

  gmail: {
    id: "gmail",
    name: "Gmail",
    url: "https://gmail.mcp.claude.com/mcp",
    uses: [
      "Search emails for research material",
      "Draft and send emails",
      "Retrieve newsletter content and reader replies",
      "Manage email-based workflows",
    ],
  },

  googleCalendar: {
    id: "google-calendar",
    name: "Google Calendar",
    url: "https://gcal.mcp.claude.com/mcp",
    uses: [
      "Check upcoming schedule and availability",
      "Create and update calendar events",
      "Find meeting context for content planning",
      "Schedule content publication windows",
    ],
  },

  figma: {
    id: "figma",
    name: "Figma",
    url: "https://mcp.figma.com/mcp",
    uses: [
      "Extract design assets and visual references",
      "Review design files for content illustrations",
      "Pull brand guidelines and style tokens",
      "Generate image descriptions from design frames",
    ],
  },

  canva: {
    id: "canva",
    name: "Canva",
    url: "https://mcp.canva.com/mcp",
    uses: [
      "Create social media graphics",
      "Generate presentation slides",
      "Design newsletter header images",
      "Produce branded visual content",
    ],
  },

  gamma: {
    id: "gamma",
    name: "Gamma",
    url: "https://mcp.gamma.app/mcp",
    uses: [
      "Generate presentation decks from essay content",
      "Create visual storytelling layouts",
      "Build interactive content experiences",
      "Transform long-form writing into slide narratives",
    ],
  },

  zapier: {
    id: "zapier",
    name: "Zapier",
    url: "https://mcp.zapier.com/api/v1/connect",
    uses: [
      "Trigger cross-platform automation workflows",
      "Connect to 6000+ apps for distribution",
      "Automate content publishing pipelines",
      "Sync data between tools in the stack",
    ],
  },

  n8n: {
    id: "n8n",
    name: "n8n",
    url: "https://diegomauro19.app.n8n.cloud/mcp-server/http",
    uses: [
      "Run custom automation workflows",
      "Orchestrate multi-step content pipelines",
      "Process webhook events and triggers",
      "Execute complex data transformations",
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Return MCP server configuration objects suitable for passing to the
 * Anthropic SDK's `mcp_servers` parameter.
 *
 * @param connectorIds  Optional list of connector keys to include.
 *                      When omitted every registered connector is returned.
 */
export function getMCPServers(
  connectorIds?: string[],
): Array<{ type: "url"; url: string }> {
  const ids = connectorIds ?? Object.keys(mcpConnectors);

  return ids
    .filter((id) => id in mcpConnectors)
    .map((id) => ({
      type: "url" as const,
      url: mcpConnectors[id].url,
    }));
}

/**
 * Look up a single connector by its registry key.
 */
export function getConnector(id: string): MCPConnector | undefined {
  return mcpConnectors[id];
}

/**
 * Return every connector whose `uses` array contains a keyword match.
 */
export function findConnectorsByCapability(keyword: string): MCPConnector[] {
  const lower = keyword.toLowerCase();
  return Object.values(mcpConnectors).filter((c) =>
    c.uses.some((u) => u.toLowerCase().includes(lower)),
  );
}
