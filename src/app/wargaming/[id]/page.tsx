"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  Swords,
  Play,
  CheckCircle2,
  MessageSquare,
  Send,
} from "lucide-react";
import {
  WargameRound,
  type RoundData,
} from "@/components/wargaming/wargame-round";
import {
  WargameSynthesis,
  type SynthesisData,
} from "@/components/wargaming/wargame-synthesis";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const mockRounds: RoundData[] = [
  {
    roundNumber: 1,
    moves: [
      {
        actorName: "Institutional Defender",
        actorIcon: "shield",
        mentalModel: "Protect organizational stability and existing power structures.",
        move: "Reframe algorithmic governance as a natural evolution of bureaucratic efficiency, positioning critics as Luddites resisting progress.",
        reasoning:
          "By anchoring the conversation in efficiency gains, we shift the burden of proof to critics. Historical precedent shows that automation debates always follow this pattern — initial resistance followed by acceptance.",
        confidence: 78,
        counterMoves: [
          "Point out specific cases where efficiency-first framing caused harm (Dutch childcare scandal).",
          "Challenge the Luddite framing by showing critics include technologists themselves.",
        ],
      },
      {
        actorName: "Red Team Adversary",
        actorIcon: "target",
        mentalModel: "Exploit every weakness in the thesis to find kill shots.",
        move: "Surface satisfaction survey data showing citizens actually prefer automated government services over human-staffed equivalents.",
        reasoning:
          "This directly undermines the democratic legitimacy argument. If citizens themselves prefer algorithmic governance, the thesis collapses into paternalism — telling people they should not want what they demonstrably want.",
        confidence: 85,
        counterMoves: [
          "Distinguish between convenience satisfaction and legitimacy.",
          "Show that survey respondents have not experienced the failure modes.",
        ],
      },
      {
        actorName: "Pragmatic Regulator",
        actorIcon: "briefcase",
        mentalModel: "Find workable middle ground that acknowledges trade-offs.",
        move: "Propose a tiered governance framework — full automation for low-stakes decisions, human-in-the-loop for consequential ones.",
        reasoning:
          "This concedes the thesis partially while showing a practical path forward. Most governance essays fail because they offer no implementable alternative.",
        confidence: 72,
        counterMoves: [
          "Question where the line between low-stakes and high-stakes is drawn.",
          "Show how scope creep erodes the tiers over time.",
        ],
      },
    ],
  },
  {
    roundNumber: 2,
    moves: [
      {
        actorName: "Institutional Defender",
        actorIcon: "shield",
        mentalModel: "Absorb Round 1 criticism and adapt the defense.",
        move: "Acknowledge the Dutch scandal as an outlier while presenting five counter-examples where algorithmic governance prevented corruption and saved lives.",
        reasoning:
          "Conceding one case while presenting overwhelming counter-evidence is a classic reframing. The key is not to defend the bad case but to contextualize it.",
        confidence: 70,
        counterMoves: [
          "Question selection bias in the counter-examples.",
          "Point out that success stories do not address the structural accountability gap.",
        ],
      },
      {
        actorName: "Red Team Adversary",
        actorIcon: "target",
        mentalModel: "Escalate pressure on weakest points revealed in Round 1.",
        move: "Introduce the developing-world argument: democratic deliberation is a luxury. For countries with limited state capacity, algorithmic governance may be the only path to delivering services at scale.",
        reasoning:
          "This forces the thesis into a Western-centric corner. If the argument only applies to affluent democracies, its scope and impact shrink dramatically.",
        confidence: 79,
        counterMoves: [
          "Separate service delivery automation from consequential decision automation.",
          "Show that exported Western algorithms often fail in non-Western contexts.",
        ],
      },
      {
        actorName: "Pragmatic Regulator",
        actorIcon: "briefcase",
        mentalModel: "Refine the tiered approach based on Round 1 feedback.",
        move: "Present the EU AI Act as a real-world implementation of tiered governance, showing it is already happening — the question is not whether but how.",
        reasoning:
          "Grounding the argument in existing policy makes the thesis feel academic and behind the curve. The world has already moved past the debate the essay is having.",
        confidence: 81,
        counterMoves: [
          "Show the EU AI Act has significant enforcement gaps.",
          "Argue the Act addresses AI products, not algorithmic governance specifically.",
        ],
      },
    ],
  },
  {
    roundNumber: 3,
    moves: [
      {
        actorName: "Institutional Defender",
        actorIcon: "shield",
        mentalModel: "Make the final case for managed transition rather than opposition.",
        move: "Propose that the essay reframe from opposition to 'democratic subordination' — algorithms should serve democratic processes, not replace them.",
        reasoning:
          "Surprisingly agreeing with the revised thesis steals the essayist's conclusion while making the defender look reasonable. This is the strongest possible co-option move.",
        confidence: 83,
        counterMoves: [
          "Accept the convergence but insist on specific accountability mechanisms.",
          "Point out that co-option without structural change is meaningless.",
        ],
      },
      {
        actorName: "Red Team Adversary",
        actorIcon: "target",
        mentalModel: "Deliver the kill shot — the single strongest counter-argument.",
        move: "Final kill shot: if algorithmic governance is so dangerous, why has no democracy that adopted it ever reversed course? The revealed preference of democratic societies is to keep and expand these systems.",
        reasoning:
          "This is the hardest argument to counter because it uses democratic outcomes against the democratic legitimacy thesis. Path dependency and political economy make reversal nearly impossible, which the essay must address.",
        confidence: 91,
        counterMoves: [
          "Argue that path dependency is not the same as democratic endorsement.",
          "Show that awareness of these systems is still too low for democratic accountability to function.",
        ],
      },
      {
        actorName: "Pragmatic Regulator",
        actorIcon: "briefcase",
        mentalModel: "Synthesize the three rounds into actionable policy.",
        move: "Recommend the essay end with three concrete policy proposals rather than abstract principles. Specificity is what separates thought leadership from commentary.",
        reasoning:
          "This is constructive criticism disguised as a move. The essay will be stronger with a prescriptive ending, and the regulator's role is to push toward implementable solutions.",
        confidence: 88,
        counterMoves: [
          "Accept the recommendation while noting that essays and policy briefs serve different functions.",
        ],
      },
    ],
  },
];

const mockSynthesis: SynthesisData = {
  blindSpots: [
    {
      title: "Private-Sector Contractor Gap",
      description:
        "None of the actors addressed the role of private-sector contractors who build and maintain these systems. The accountability gap between government clients and technology vendors is a critical missing piece.",
      severity: "high",
    },
    {
      title: "International Export Dynamics",
      description:
        "Algorithmic governance systems developed in one jurisdiction are being exported to others without adaptation. What works in the Netherlands may fail catastrophically in India.",
      severity: "medium",
    },
    {
      title: "Workforce Displacement Effects",
      description:
        "No actor considered the workforce effects — what happens to the civil servants whose judgment is being replaced? Their institutional knowledge is being lost without a transition plan.",
      severity: "medium",
    },
  ],
  stressTests: [
    {
      model: "Original Thesis",
      score: 62,
      verdict:
        "The binary framing of efficiency vs. accountability is too simplistic. Vulnerable to real-world counter-examples.",
    },
    {
      model: "Revised Thesis",
      score: 84,
      verdict:
        'The "democratic subordination" framing survives stress testing. Addresses the strongest counter-arguments while maintaining a clear position.',
    },
    {
      model: "Kill Shot Resilience",
      score: 71,
      verdict:
        "The path-dependency argument remains partially unaddressed. Essay needs a section on why revealed preference is insufficient evidence of democratic endorsement.",
    },
  ],
  revisedThesis:
    "Algorithmic governance systems are not inherently anti-democratic, but their current deployment pattern — rapid, poorly audited, and optimized for narrow metrics — systematically undermines the accountability structures that democratic governance requires. The solution is not rejection but democratic subordination.",
  essayRecommendations: [
    "Lead with the Dutch toeslagenaffaire as the central case study.",
    "Address the strongest counter-argument head-on in the second section.",
    "Add a section on the private-contractor blind spot.",
    'End with the revised "democratic subordination" framing.',
    "Use the wargame actors as rhetorical devices in the essay.",
  ],
  killShots: [
    {
      title: "Revealed Preference Paradox",
      description:
        "If algorithmic governance is so dangerous, why has no democracy that adopted it ever reversed course? The revealed preference of democratic societies is to keep and expand these systems.",
    },
    {
      title: "Developing-World Counter",
      description:
        "Democratic deliberation is a luxury of affluent societies. For countries with limited state capacity, algorithmic governance may be the only path to service delivery at scale.",
    },
  ],
};

const initialComments: { round: number; text: string; timestamp: string }[] = [
  {
    round: 1,
    text: "The satisfaction survey argument from Red Team is the strongest — need to address this head-on in the essay.",
    timestamp: "2026-03-30 10:42",
  },
  {
    round: 2,
    text: "The developing-world angle is important but I think it conflates two different claims. Need to separate service delivery from consequential decision-making.",
    timestamp: "2026-03-30 11:15",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function WargameSessionPage() {
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState(initialComments);

  const addComment = (afterRound: number) => {
    if (!commentText.trim()) return;
    setLocalComments((prev) => [
      ...prev,
      {
        round: afterRound,
        text: commentText.trim(),
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      },
    ]);
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Swords className="mt-1 h-5 w-5 shrink-0 text-amber" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-2xl font-semibold text-text">
                  Operation Clarity
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2.5 py-0.5 text-[11px] font-medium text-green">
                  <CheckCircle2 className="h-3 w-3" />
                  Complete
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
                Stress-testing the thesis that algorithmic governance undermines
                democratic legitimacy by prioritizing efficiency over
                accountability. Three actors play adversarial roles across three
                rounds of escalating pressure.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left: Round timeline */}
          <div className="flex-1 space-y-4">
            {mockRounds.map((round, i) => (
              <div key={round.roundNumber}>
                <WargameRound round={round} />

                {/* Comments between rounds */}
                {localComments
                  .filter((c) => c.round === round.roundNumber)
                  .map((c, ci) => (
                    <div
                      key={ci}
                      className="ml-6 mt-3 flex items-start gap-2 rounded-lg border border-surface-raised bg-surface-raised/40 px-4 py-3"
                    >
                      <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" />
                      <div>
                        <p className="text-xs leading-relaxed text-text-secondary">
                          {c.text}
                        </p>
                        <span className="mt-1 block text-[10px] text-text-dim">
                          {c.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                {/* Comment input after each round */}
                {i < mockRounds.length - 1 && (
                  <div className="ml-6 mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a note between rounds..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          addComment(round.roundNumber);
                      }}
                      className="flex-1 rounded-md border border-surface-raised bg-bg px-3 py-1.5 text-xs text-text placeholder:text-text-dim outline-none focus:border-amber/50"
                    />
                    <button
                      onClick={() => addComment(round.roundNumber)}
                      className="rounded-md p-1.5 text-text-dim transition-colors hover:text-amber"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Execute Next Round button */}
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber/30 bg-amber/10 px-4 py-3 text-sm font-medium text-amber transition-colors hover:bg-amber/20">
              <Play className="h-4 w-4" />
              Execute Next Round
            </button>
          </div>

          {/* Right sidebar: Synthesis */}
          <div className="w-full shrink-0 lg:w-[380px]">
            <div className="sticky top-8">
              <WargameSynthesis data={mockSynthesis} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
