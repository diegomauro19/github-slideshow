"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  Swords,
  ChevronDown,
  ChevronRight,
  Play,
  MessageSquare,
  Send,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { WargameRound } from "@/components/wargaming/wargame-round";
import { WargameSynthesis } from "@/components/wargaming/wargame-synthesis";
import type { RoundData } from "@/components/wargaming/wargame-round";
import type { SynthesisData } from "@/components/wargaming/wargame-synthesis";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const session = {
  id: "wg-001",
  title: "Zero-Trust Migration Thesis",
  status: "running" as const,
  scenario:
    "Enterprise clients should adopt zero-trust architecture as a competitive advantage rather than treating it purely as a compliance cost center. The thesis argues that early movers gain market differentiation, reduced breach costs, and improved customer trust.",
};

const rounds: RoundData[] = [
  {
    roundNumber: 1,
    moves: [
      {
        actorName: "Thesis Defender",
        actorIcon: "shield",
        mentalModel: "Game Theory",
        move: "Zero-trust provides a first-mover advantage in regulated industries. Companies that adopt early can market their security posture as a differentiator, winning contracts from security-conscious enterprise buyers. The cost of implementation is front-loaded but creates a moat.",
        reasoning:
          "In a game-theoretic framework, the first mover in zero-trust captures the trust premium. Late movers face both the implementation cost AND the competitive disadvantage of being perceived as less secure. The Nash equilibrium shifts toward early adoption once a critical mass of competitors begins moving.",
        confidence: 82,
        counterMoves: [
          "First-mover disadvantage: bear the cost of immature tooling",
          "Competitors can leapfrog with better implementations",
        ],
      },
      {
        actorName: "Red Team",
        actorIcon: "target",
        mentalModel: "Red Team",
        move: "The competitive advantage argument is overstated. Most enterprise buyers evaluate security through compliance checkboxes (SOC2, ISO 27001), not architectural philosophy. Zero-trust is invisible to the buyer who just wants to see a certification logo.",
        reasoning:
          "Attacking the core assumption: that buyers can distinguish and value zero-trust architecture. In practice, procurement teams use standardized security questionnaires. The architecture behind the answers is rarely evaluated. The differentiation story collapses at the point of sale.",
        confidence: 71,
        counterMoves: [
          "Some sophisticated buyers DO evaluate architecture",
          "Post-breach litigation increasingly examines actual controls",
        ],
      },
      {
        actorName: "Client Executive",
        actorIcon: "briefcase",
        mentalModel: "Incentive Analysis",
        move: "The CFO will push back on front-loaded costs without clear ROI timelines. Zero-trust migrations typically span 18-36 months. My bonus cycle is 12 months. I need quick wins or the initiative dies in Q2 budget review.",
        reasoning:
          "Executive incentive structures are misaligned with long-term security investments. The personal risk-reward calculus favors smaller, visible wins over transformational architecture changes. Without board-level sponsorship, the initiative becomes a career risk.",
        confidence: 88,
        counterMoves: [
          "Phase the rollout to show quarterly milestones",
          "Tie zero-trust to a compliance mandate for urgency",
        ],
      },
      {
        actorName: "Competitor",
        actorIcon: "crosshair",
        mentalModel: "Game Theory",
        move: "We will position our legacy VPN architecture as 'battle-tested' and cast zero-trust as bleeding-edge risk. In enterprise sales, fear of the new beats promise of the better. We will run FUD campaigns targeting the migration risk.",
        reasoning:
          "The competitive response to a zero-trust differentiator is not to match it, but to reframe it as risk. Enterprise buyers are loss-averse. Positioning zero-trust as experimental exploits this bias. The counter-strategy costs almost nothing to execute.",
        confidence: 65,
        counterMoves: [
          "FUD only works until a major breach hits a legacy architecture",
          "Analyst reports increasingly favor zero-trust models",
        ],
      },
      {
        actorName: "Devil\u2019s Advocate",
        actorIcon: "flame",
        mentalModel: "Via Negativa",
        move: "What if the real value is NOT in adopting zero-trust, but in eliminating the worst legacy practices? The thesis frames this as addition (add zero-trust). The more powerful move might be subtraction (remove VPN sprawl, remove implicit trust zones, remove shared credentials).",
        reasoning:
          "Via Negativa suggests improvement through removal is more robust than improvement through addition. Many organizations would gain 80% of the security benefit by simply removing their worst practices, without the complexity and cost of a full zero-trust architecture.",
        confidence: 76,
        counterMoves: [
          "Removal without a replacement framework creates gaps",
          "Zero-trust IS the framework that guides what to remove",
        ],
      },
    ],
  },
  {
    roundNumber: 2,
    moves: [
      {
        actorName: "Thesis Defender",
        actorIcon: "shield",
        mentalModel: "Game Theory",
        move: "Incorporating the Red Team feedback: the differentiation is not in the architecture label, but in the outcomes. Zero-trust adopters show 60% lower breach costs (Forrester 2025). The essay should lead with outcomes, not architecture. Revised positioning: 'Companies that implement zero-trust principles report measurably better breach outcomes.'",
        reasoning:
          "Adapting the thesis to survive the attack. The Red Team correctly identified that buyers don't evaluate architecture. But they DO evaluate outcomes. Shifting from 'we have zero-trust' to 'we have lower breach costs' preserves the competitive advantage argument while making it empirically verifiable.",
        confidence: 85,
        counterMoves: [
          "Correlation vs. causation: better-funded companies adopt zero-trust AND have better outcomes",
        ],
      },
      {
        actorName: "Red Team",
        actorIcon: "target",
        mentalModel: "Red Team",
        move: "The 60% figure is from vendor-sponsored research. When we control for company size and security budget, the differential drops to 15-20%. The thesis is building on shaky empirical ground. An essay citing those numbers will be attacked by any informed reader.",
        reasoning:
          "Second-round attack targets the evidence base rather than the logic. Even if the argument is sound, weak evidence will undermine the essay\u2019s credibility. The Defender needs independent or self-generated data to make this hold.",
        confidence: 79,
        counterMoves: [
          "20% improvement is still significant at enterprise scale",
          "Build the case on logical first principles, not just data",
        ],
      },
      {
        actorName: "Client Executive",
        actorIcon: "briefcase",
        mentalModel: "Incentive Analysis",
        move: "The phased approach with quarterly milestones is compelling. If the essay frames zero-trust as a series of discrete wins rather than a monolithic transformation, it matches how I can actually sell this internally. Give me a 90-day win and I'll champion the rest.",
        reasoning:
          "The incentive structure responds to framing. A 3-year migration is career risk. A series of 90-day sprints with measurable outcomes is career opportunity. The essay must provide this framing or it stays theoretical.",
        confidence: 90,
        counterMoves: [
          "Phased approaches risk losing momentum after the first phase",
        ],
      },
      {
        actorName: "Competitor",
        actorIcon: "crosshair",
        mentalModel: "Game Theory",
        move: "We are pivoting. Instead of opposing zero-trust, we'll co-opt the terminology. 'Zero-trust compatible' label on our existing products. The differentiation advantage disappears when everyone claims it.",
        reasoning:
          "If you can't beat the narrative, join and dilute it. This is the most effective competitive response and the hardest to counter. It makes the term meaningless, which removes its value as a differentiator.",
        confidence: 83,
        counterMoves: [
          "Industry standards bodies are defining what 'zero-trust' actually means",
          "Informed buyers will demand proof of implementation, not just labels",
        ],
      },
      {
        actorName: "Devil\u2019s Advocate",
        actorIcon: "flame",
        mentalModel: "Via Negativa",
        move: "The competitor\u2019s co-option play proves the point about labels vs. substance. The essay should explicitly address the 'zero-trust washing' phenomenon. This actually strengthens the thesis: genuine implementation beats label adoption, and this distinction IS the competitive moat.",
        reasoning:
          "The Competitor\u2019s move creates an opportunity. If everyone claims zero-trust, the companies that actually implement it have even MORE differentiation once a breach exposes the pretenders. The essay should make this prediction explicitly.",
        confidence: 81,
        counterMoves: [
          "This requires a breach to prove the point \u2014 betting on negative events is ethically tricky",
        ],
      },
    ],
  },
  {
    roundNumber: 3,
    isActive: true,
    moves: [
      {
        actorName: "Thesis Defender",
        actorIcon: "shield",
        mentalModel: "Game Theory",
        move: "Final synthesis: The thesis holds but requires three modifications. (1) Lead with measurable outcomes, not architecture labels. (2) Frame as phased 90-day sprints, not monolithic transformation. (3) Explicitly address zero-trust washing as the greatest risk to the narrative. The competitive advantage is real but fragile \u2014 it exists in the gap between genuine and performative adoption.",
        reasoning:
          "Three rounds of adversarial pressure have refined the core thesis from a broad claim into a specific, defensible position. The original thesis was too vague to survive scrutiny. The refined version has clear boundaries and acknowledges its own vulnerabilities, which paradoxically makes it stronger.",
        confidence: 88,
        counterMoves: [],
      },
      {
        actorName: "Red Team",
        actorIcon: "target",
        mentalModel: "Red Team",
        move: "The refined thesis is significantly more defensible. Remaining vulnerability: the 'gap between genuine and performative adoption' is hard to measure and therefore hard to prove in an essay. The writer needs a concrete framework for distinguishing real from fake zero-trust.",
        reasoning:
          "The thesis has improved through adversarial refinement but still has a measurement problem. Without a clear rubric, the essay relies on the reader accepting the author\u2019s judgment about what constitutes genuine adoption. This is a persuasion weakness.",
        confidence: 72,
        counterMoves: [],
      },
      {
        actorName: "Client Executive",
        actorIcon: "briefcase",
        mentalModel: "Incentive Analysis",
        move: "This essay would now directly help me build a business case. The phased approach plus the zero-trust washing argument gives me ammunition against both internal skeptics and competitor FUD. I would share this with my board.",
        reasoning:
          "The ultimate test of a thought leadership essay: would a decision-maker use it? The refined thesis passes this test because it addresses the reader\u2019s actual constraints (budget cycles, career risk) rather than speaking from an ivory tower.",
        confidence: 91,
        counterMoves: [],
      },
      {
        actorName: "Competitor",
        actorIcon: "crosshair",
        mentalModel: "Game Theory",
        move: "If this essay is published and gains traction, our co-option strategy becomes less effective. The explicit naming of 'zero-trust washing' preempts our move. We would need to either genuinely adopt or find a new competitive vector entirely.",
        reasoning:
          "The thesis has reached a point where publishing it creates a strategic advantage for the author\u2019s clients. It changes the competitive conversation by naming the co-option tactic, which makes it harder to execute covertly.",
        confidence: 68,
        counterMoves: [],
      },
      {
        actorName: "Devil\u2019s Advocate",
        actorIcon: "flame",
        mentalModel: "Via Negativa",
        move: "One final subtraction: remove the word 'zero-trust' from the essay title entirely. Call it 'The Competitive Advantage of Verified Security Architecture.' This survives the terminology becoming obsolete and makes the thesis timeless rather than trend-dependent.",
        reasoning:
          "The strongest version of this essay may not even use the trending terminology. By abstracting up one level, the thesis becomes about verified vs. performative security, which is an evergreen argument. This protects against the entire zero-trust concept being superseded.",
        confidence: 84,
        counterMoves: [],
      },
    ],
  },
];

const synthesisData: SynthesisData = {
  blindSpots: [
    {
      title: "Vendor-Sponsored Evidence",
      description:
        "The primary data supporting breach cost reduction comes from vendor-funded research. Independent studies show lower but still positive improvements. The essay must cite carefully or risk credibility damage.",
      severity: "high",
    },
    {
      title: "Incentive Misalignment",
      description:
        "The thesis assumes rational enterprise decision-making, but executive bonus cycles and career risk create structural barriers to long-term architecture investments.",
      severity: "medium",
    },
    {
      title: "Terminology Fragility",
      description:
        "The term 'zero-trust' is being co-opted by vendors to describe legacy products. Building an essay around this specific term creates obsolescence risk.",
      severity: "medium",
    },
  ],
  stressTests: [
    {
      model: "Game Theory",
      score: 78,
      verdict:
        "Thesis holds under competitive pressure but requires acknowledging that differentiation is temporary and depends on the gap between genuine and performative adoption.",
    },
    {
      model: "Red Team",
      score: 55,
      verdict:
        "Evidence base is weaker than originally assumed. The essay needs first-principles reasoning more than statistical claims.",
    },
    {
      model: "Incentive Analysis",
      score: 85,
      verdict:
        "Phased implementation framing significantly improves executive buy-in. Original monolithic framing would have failed.",
    },
    {
      model: "Via Negativa",
      score: 72,
      verdict:
        "Removing the trending terminology and abstracting to 'verified security architecture' creates a more durable thesis.",
    },
  ],
  revisedThesis:
    "Companies that implement verified security architecture principles \u2014 often called zero-trust \u2014 through phased 90-day sprints gain measurable competitive advantages: lower breach costs, stronger buyer confidence, and strategic differentiation from vendors engaged in security washing. The advantage is real but fragile, existing in the gap between genuine implementation and performative certification.",
  essayRecommendations: [
    "Lead with a case study of a phased zero-trust migration showing quarterly ROI, not a theoretical argument about architecture benefits.",
    "Coin and define 'zero-trust washing' early in the essay \u2014 this is the most memorable and shareable concept from the wargame.",
    "Include a concrete rubric (5-7 criteria) for distinguishing genuine from performative zero-trust adoption. This addresses the measurement gap identified by Red Team.",
    "Frame the entire piece around a client executive persona who needs to build a board-level business case. Address budget cycles, career risk, and phased wins explicitly.",
    "Avoid citing the Forrester 60% breach cost reduction figure unless you can corroborate independently. Lead with logical reasoning instead.",
    "Consider the title 'The Competitive Advantage of Verified Security' to future-proof against terminology shifts.",
  ],
  killShots: [
    {
      title: "The Evidence Gap",
      description:
        "If a well-informed reader challenges the breach cost statistics, the entire competitive advantage argument collapses unless you have independent data or a strong first-principles case. This is the single most dangerous vulnerability.",
    },
    {
      title: "Zero-Trust Washing Normalizes the Label",
      description:
        "If enough vendors successfully co-opt the term, 'zero-trust' becomes meaningless marketing language. The thesis then needs to survive without its central terminology \u2014 which is possible (see revised thesis) but requires the essay to be deliberately terminology-agnostic.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

const statusBadge: Record<string, string> = {
  setup: "border-blue/20 bg-blue/10 text-blue",
  running: "border-amber/20 bg-amber/10 text-amber",
  complete: "border-green/20 bg-green/10 text-green",
  archived: "border-text-dim/20 bg-text-dim/10 text-text-dim",
};

export default function WargameSessionPage() {
  const [expandedRounds, setExpandedRounds] = useState<number[]>([1, 2, 3]);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
    {}
  );
  const [comments, setComments] = useState<
    Record<number, string[]>
  >({
    1: ["Consider adding a regulatory compliance angle to the first-mover argument."],
  });

  const toggleRound = (n: number) =>
    setExpandedRounds((prev) =>
      prev.includes(n) ? prev.filter((r) => r !== n) : [...prev, n]
    );

  const submitComment = (afterRound: number) => {
    const text = commentInputs[afterRound]?.trim();
    if (!text) return;
    setComments((prev) => ({
      ...prev,
      [afterRound]: [...(prev[afterRound] ?? []), text],
    }));
    setCommentInputs((prev) => ({ ...prev, [afterRound]: "" }));
  };

  return (
    <div className="min-h-screen bg-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <Link
          href={"/wargaming" as any}
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-text-dim transition-colors hover:text-text-secondary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Wargaming
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Swords className="h-5 w-5 text-amber" />
            <h1 className="font-serif text-xl font-semibold text-text">
              {session.title}
            </h1>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                statusBadge[session.status]
              )}
            >
              {session.status}
            </span>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
            {session.scenario}
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Rounds Timeline */}
          <div className="flex-1 space-y-6">
            {rounds.map((round) => {
              const expanded = expandedRounds.includes(round.roundNumber);
              const roundComments = comments[round.roundNumber] ?? [];

              return (
                <div key={round.roundNumber}>
                  {/* Round toggle */}
                  <button
                    type="button"
                    onClick={() => toggleRound(round.roundNumber)}
                    className="mb-3 flex w-full items-center gap-2 text-left"
                  >
                    {expanded ? (
                      <ChevronDown className="h-4 w-4 text-text-dim" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-text-dim" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        round.isActive ? "text-amber" : "text-text"
                      )}
                    >
                      Round {round.roundNumber}
                    </span>
                    {round.isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber/20 bg-amber/10 px-2 py-0.5 text-[10px] font-medium text-amber animate-pulse">
                        Active
                      </span>
                    )}
                    <span className="text-xs text-text-dim">
                      {round.moves.length} moves
                    </span>
                  </button>

                  {expanded && <WargameRound round={round} />}

                  {/* Comment injection between rounds */}
                  <div className="mt-4 space-y-2">
                    {/* Existing comments */}
                    {roundComments.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-lg border border-amber/10 bg-amber/5 px-3 py-2"
                      >
                        <MessageSquare className="mt-0.5 h-3 w-3 shrink-0 text-amber" />
                        <p className="text-xs leading-relaxed text-text-secondary">
                          {c}
                        </p>
                      </div>
                    ))}

                    {/* Comment input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInputs[round.roundNumber] ?? ""}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [round.roundNumber]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            submitComment(round.roundNumber);
                        }}
                        placeholder={`Inject comment after Round ${round.roundNumber}...`}
                        className="flex-1 rounded-lg border border-[#1e1e22] bg-surface px-3 py-2 text-xs text-text placeholder:text-text-dim focus:border-amber/40 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => submitComment(round.roundNumber)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface transition-colors hover:bg-surface-raised"
                      >
                        <Send className="h-3.5 w-3.5 text-amber" />
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  {round.roundNumber < rounds.length && (
                    <div className="my-6 border-t border-[#1e1e22]" />
                  )}
                </div>
              );
            })}

            {/* Execute Next Round */}
            {session.status === "running" && (
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-bg transition-colors hover:bg-amber-bright"
              >
                <Play className="h-4 w-4" />
                Execute Next Round
              </button>
            )}
          </div>

          {/* Right Sidebar: Synthesis */}
          <div className="w-full lg:w-80 xl:w-96">
            <div className="lg:sticky lg:top-8">
              <div className="rounded-xl border border-[#1e1e22] bg-surface p-5">
                <WargameSynthesis data={synthesisData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
