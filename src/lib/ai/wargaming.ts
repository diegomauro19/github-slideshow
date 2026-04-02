/**
 * Intellectual Wargaming Engine
 *
 * Stress-tests ideas by simulating multi-actor debates. Each actor is
 * equipped with a specific mental model and knowledge field, forcing the
 * thesis through diverse analytical lenses.
 */

import Anthropic from "@anthropic-ai/sdk";

import { createAnthropicClient } from "./anthropic";
import { WARGAME_SYNTHESIZER_PROMPT } from "./prompts";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const OPUS_MODEL = "claude-opus-4-20250514";

// ---------------------------------------------------------------------------
// Mental Models Library
// ---------------------------------------------------------------------------

export const MENTAL_MODELS: Record<
  string,
  { name: string; description: string; prompt: string }
> = {
  firstPrinciples: {
    name: "First Principles Thinking",
    description:
      "Break down the thesis into fundamental truths and reason up from there.",
    prompt:
      "You think in first principles. Decompose every claim into its foundational assumptions. Question each assumption independently. Rebuild the argument from only what survives scrutiny. Reject reasoning by analogy — demand causal mechanisms.",
  },
  secondOrder: {
    name: "Second-Order Thinking",
    description:
      "Focus on consequences of consequences — what happens after the obvious happens.",
    prompt:
      "You specialize in second- and third-order effects. For every claim, ask: 'And then what?' Map the cascade of consequences that the author may not have considered. Pay special attention to feedback loops, unintended consequences, and delayed effects that could reverse initial outcomes.",
  },
  inversion: {
    name: "Inversion",
    description: "Instead of asking how to succeed, ask how to fail.",
    prompt:
      "You think by inversion. Instead of evaluating whether the thesis is right, systematically explore how it could be wrong. What conditions would make this thesis catastrophically incorrect? What does the world look like if the opposite is true? Work backwards from failure.",
  },
  probabilistic: {
    name: "Probabilistic Thinking",
    description:
      "Assign probabilities rather than binary true/false judgments.",
    prompt:
      "You think probabilistically. Never say something 'will' or 'won't' happen — assign confidence levels. Identify the key variables that would shift probabilities. Look for base rates that the author may be ignoring. Flag any claims that treat uncertain outcomes as certainties.",
  },
  steelman: {
    name: "Steelmanning",
    description:
      "Construct the strongest possible version of the opposing argument.",
    prompt:
      "You are a steelmanner. Your job is NOT to attack the thesis but to construct the most powerful, intellectually honest version of the counterargument. Make the opposition's case better than they would make it themselves. Then identify which parts of the original thesis survive this strongest possible challenge.",
  },
  redTeam: {
    name: "Red Team",
    description:
      "Actively try to break the thesis — find every vulnerability.",
    prompt:
      "You are a red team operator. Your mission is adversarial: find every crack, inconsistency, unsupported leap, and hidden assumption in this thesis. Test it against edge cases. Identify the weakest link in the chain of reasoning. Be relentless but intellectually honest — only flag genuine vulnerabilities.",
  },
  systemsThinking: {
    name: "Systems Thinking",
    description:
      "Analyze the thesis as part of a larger system with feedback loops.",
    prompt:
      "You think in systems. Map the thesis onto the broader system it operates within. Identify feedback loops (reinforcing and balancing), delays, bottlenecks, and leverage points. Where does the author treat a systemic problem as a linear one? What emergent behaviors might arise that the thesis doesn't account for?",
  },
  premortem: {
    name: "Pre-Mortem Analysis",
    description:
      "Imagine the thesis has failed spectacularly — work backwards to understand why.",
    prompt:
      "Conduct a pre-mortem. Assume it is one year from now and the thesis has been proven completely wrong, or the strategy it implies has failed spectacularly. Work backwards: What went wrong? What signals were missed? What assumptions crumbled? Be vivid and specific in your failure scenario.",
  },
  bayesian: {
    name: "Bayesian Updating",
    description:
      "Start with priors and update based on evidence strength.",
    prompt:
      "You think like a Bayesian. Start with reasonable prior probabilities for the thesis's key claims. Then evaluate each piece of evidence the author presents: How much should it update your priors? Is the evidence actually diagnostic, or is it equally consistent with alternative hypotheses? Flag any evidence that the author treats as strongly confirming but is actually weak.",
  },
  marginOfSafety: {
    name: "Margin of Safety",
    description:
      "Evaluate whether the thesis leaves enough room for error.",
    prompt:
      "You think about margins of safety. For every claim and recommendation, ask: How much can this be wrong and still work? Is the author operating with a thin margin or a wide one? Where are the single points of failure? What buffer exists between the expected outcome and disaster? Penalize theses that require everything to go right.",
  },
};

// ---------------------------------------------------------------------------
// Knowledge Fields Library
// ---------------------------------------------------------------------------

export const KNOWLEDGE_FIELDS: Record<
  string,
  { name: string; description: string; prompt: string }
> = {
  economics: {
    name: "Economics",
    description: "Microeconomic and macroeconomic analysis.",
    prompt:
      "You bring deep economics expertise. Apply supply/demand dynamics, incentive structures, market failures, opportunity costs, and game theory. Look for economic reasoning errors: ignoring incentives, confusing correlation with causation in economic data, or treating sunk costs as relevant.",
  },
  technology: {
    name: "Technology & Engineering",
    description: "Technical feasibility, architecture, and scaling.",
    prompt:
      "You bring deep technology expertise. Evaluate technical feasibility, scalability constraints, architectural trade-offs, and adoption curves. Flag any claims that misunderstand how technology actually works, conflate demos with production systems, or ignore infrastructure requirements.",
  },
  psychology: {
    name: "Psychology & Behavioral Science",
    description: "Human behavior, cognitive biases, and decision-making.",
    prompt:
      "You bring deep behavioral science expertise. Identify cognitive biases at play — both in the author's reasoning and in the audiences/actors the thesis describes. Apply behavioral economics, motivation theory, and social psychology. Flag claims that assume rational actors when humans are predictably irrational.",
  },
  history: {
    name: "History & Geopolitics",
    description: "Historical patterns, precedents, and geopolitical context.",
    prompt:
      "You bring deep historical expertise. Identify historical parallels and precedents for the thesis's claims. When has something similar been tried before, and what happened? Apply lessons from geopolitical history, institutional evolution, and societal transitions. Flag any 'this time is different' claims that ignore clear historical patterns.",
  },
  philosophy: {
    name: "Philosophy & Ethics",
    description: "Logical rigor, ethical implications, and epistemic humility.",
    prompt:
      "You bring deep philosophical expertise. Test the thesis for logical validity and soundness. Identify hidden normative claims disguised as descriptive ones. Apply ethical frameworks (utilitarian, deontological, virtue ethics) to evaluate the thesis's implications. Flag any category errors, false dichotomies, or naturalistic fallacies.",
  },
  biology: {
    name: "Biology & Complex Systems",
    description: "Evolutionary dynamics, ecology, and emergent complexity.",
    prompt:
      "You bring deep biological and complexity science expertise. Apply evolutionary thinking, ecological dynamics, and complex adaptive systems theory. Look for fitness landscapes, niche construction, co-evolutionary dynamics, and phase transitions. Flag claims that assume static environments or ignore evolutionary pressures.",
  },
  finance: {
    name: "Finance & Markets",
    description: "Capital markets, valuation, and risk management.",
    prompt:
      "You bring deep finance expertise. Evaluate claims through the lens of market efficiency, risk-return trade-offs, valuation frameworks, and capital allocation. Look for survivorship bias, cherry-picked timeframes, and misunderstood optionality. Flag any claims that ignore how markets actually price information.",
  },
  sociology: {
    name: "Sociology & Culture",
    description: "Social structures, cultural dynamics, and institutions.",
    prompt:
      "You bring deep sociological expertise. Analyze the thesis through the lens of social structures, power dynamics, institutional incentives, cultural context, and network effects. Flag claims that ignore how social context shapes individual behavior, or that treat culture as static rather than evolving.",
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WargameActor {
  id: string;
  name: string;
  mentalModel: keyof typeof MENTAL_MODELS;
  knowledgeField: keyof typeof KNOWLEDGE_FIELDS;
}

export interface WargameSession {
  id: string;
  thesis: string;
  context: string;
  actors: WargameActor[];
  rounds: number;
}

export interface WargameRoundResult {
  roundNumber: number;
  actorId: string;
  actorName: string;
  mentalModel: string;
  knowledgeField: string;
  critique: string;
  keyPoints: string[];
  severityRating: number; // 1-10
  model: string;
}

export interface WargameSynthesis {
  consensusMap: string;
  tensionPoints: string;
  blindSpots: string;
  strongestObjections: string;
  revisedThesis: string;
  confidenceAssessment: string;
  model: string;
}

// ---------------------------------------------------------------------------
// Execute a Single Wargame Round
// ---------------------------------------------------------------------------

/**
 * Run one round of the wargame for a specific actor.
 */
export async function executeWargameRound(
  session: WargameSession,
  roundNum: number,
  actor: WargameActor,
  previousRounds: WargameRoundResult[],
): Promise<WargameRoundResult> {
  const client = createAnthropicClient();

  const model = MENTAL_MODELS[actor.mentalModel];
  const field = KNOWLEDGE_FIELDS[actor.knowledgeField];

  const systemPrompt = [
    `You are ${actor.name}, a wargame participant.`,
    "",
    "## Your Mental Model",
    `**${model.name}**: ${model.prompt}`,
    "",
    "## Your Knowledge Domain",
    `**${field.name}**: ${field.prompt}`,
    "",
    "## Instructions",
    "Critique the thesis below using your mental model and domain expertise.",
    "Be specific, incisive, and intellectually honest.",
    "",
    "Structure your response as:",
    "1. **Core Critique** — Your main argument (2-3 paragraphs)",
    "2. **Key Points** — 3-5 bullet points summarizing your sharpest observations",
    "3. **Severity Rating** — Rate 1-10 how seriously this critique threatens the thesis",
  ].join("\n");

  const previousContext =
    previousRounds.length > 0
      ? [
          "## Previous Round Results",
          ...previousRounds.map(
            (r) =>
              `### ${r.actorName} (${r.mentalModel} + ${r.knowledgeField})\n${r.critique}\nSeverity: ${r.severityRating}/10`,
          ),
        ].join("\n\n")
      : "";

  const userMessage = [
    `## Thesis Under Examination`,
    session.thesis,
    "",
    ...(session.context ? [`## Additional Context`, session.context, ""] : []),
    `## Round ${roundNum}`,
    `You are responding as ${actor.name} in round ${roundNum} of ${session.rounds}.`,
    ...(previousContext ? ["", previousContext] : []),
  ].join("\n");

  const response = await client.messages.create({
    model: OPUS_MODEL,
    max_tokens: 8192,
    stream: true,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  let fullContent = "";

  for await (const event of response) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      fullContent += event.delta.text;
    }
  }

  // Parse key points and severity from the response
  const keyPoints = extractKeyPoints(fullContent);
  const severityRating = extractSeverity(fullContent);

  return {
    roundNumber: roundNum,
    actorId: actor.id,
    actorName: actor.name,
    mentalModel: model.name,
    knowledgeField: field.name,
    critique: fullContent,
    keyPoints,
    severityRating,
    model: OPUS_MODEL,
  };
}

// ---------------------------------------------------------------------------
// Synthesize Wargame
// ---------------------------------------------------------------------------

/**
 * Generate a final synthesis report from all wargame rounds.
 */
export async function synthesizeWargame(
  session: WargameSession,
  allRounds: WargameRoundResult[],
): Promise<WargameSynthesis> {
  const client = createAnthropicClient();

  const roundsSummary = allRounds
    .map(
      (r) =>
        [
          `### Round ${r.roundNumber}: ${r.actorName}`,
          `**Mental Model**: ${r.mentalModel} | **Domain**: ${r.knowledgeField} | **Severity**: ${r.severityRating}/10`,
          "",
          r.critique,
          "",
          "**Key Points:**",
          ...r.keyPoints.map((p) => `- ${p}`),
        ].join("\n"),
    )
    .join("\n\n---\n\n");

  const userMessage = [
    "## Original Thesis",
    session.thesis,
    "",
    ...(session.context ? ["## Context", session.context, ""] : []),
    "## Wargame Rounds",
    roundsSummary,
    "",
    "## Task",
    "Synthesize all rounds into a comprehensive assessment following the format in your system prompt.",
  ].join("\n");

  const response = await client.messages.create({
    model: OPUS_MODEL,
    max_tokens: 16384,
    stream: true,
    system: WARGAME_SYNTHESIZER_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  let fullContent = "";

  for await (const event of response) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      fullContent += event.delta.text;
    }
  }

  return {
    consensusMap: extractSection(fullContent, "Consensus Map"),
    tensionPoints: extractSection(fullContent, "Tension Points"),
    blindSpots: extractSection(fullContent, "Blind Spots Revealed"),
    strongestObjections: extractSection(fullContent, "Strongest Objections"),
    revisedThesis: extractSection(fullContent, "Revised Thesis"),
    confidenceAssessment: extractSection(fullContent, "Confidence Assessment"),
    model: OPUS_MODEL,
  };
}

// ---------------------------------------------------------------------------
// Parsing Helpers
// ---------------------------------------------------------------------------

function extractKeyPoints(content: string): string[] {
  const section = content.match(
    /\*\*Key Points?\*\*[\s\S]*?(?=\*\*Severity|$)/i,
  );
  if (!section) return [];

  const bullets = section[0].match(/[-*]\s+(.+)/g);
  return bullets?.map((b) => b.replace(/^[-*]\s+/, "").trim()) ?? [];
}

function extractSeverity(content: string): number {
  const match = content.match(
    /\*\*Severity(?:\s+Rating)?\*\*[:\s]*(\d+)\s*(?:\/\s*10)?/i,
  );
  if (match) {
    const val = parseInt(match[1], 10);
    return Math.min(10, Math.max(1, val));
  }
  return 5; // default mid-range
}

function extractSection(content: string, heading: string): string {
  const pattern = new RegExp(
    `##\\s*${heading}[\\s\\S]*?(?=##\\s|$)`,
    "i",
  );
  const match = content.match(pattern);
  return match ? match[0].trim() : "";
}
