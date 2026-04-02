"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Swords,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface BlindSpot {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

const MOCK_BLIND_SPOTS: BlindSpot[] = [
  {
    id: "bs-1",
    title: "Privilege assumption",
    description:
      'The essay assumes readers have control over their calendars and environments. Many knowledge workers — especially junior ones — have almost zero autonomy over their "attentional architecture."',
    severity: "high",
  },
  {
    id: "bs-2",
    title: "Cathedral metaphor overextension",
    description:
      "Chartres was built by communities over centuries. The essay applies this to individual daily practice, which weakens the metaphor. Consider acknowledging this gap or finding a tighter analogy.",
    severity: "medium",
  },
  {
    id: "bs-3",
    title: 'Missing the neurodivergent perspective',
    description:
      '"Inherited attention" vs. "chosen attention" doesn\'t account for ADHD or other neurodivergent experiences where the mechanism of choice itself operates differently.',
    severity: "high",
  },
  {
    id: "bs-4",
    title: "Actionable steps are too abstract",
    description:
      '"The Morning Audit" and "Weekly Demolition" sound compelling but lack enough specificity for someone to actually start tomorrow.',
    severity: "low",
  },
];

const REVISED_THESIS =
  "Attention is not a resource to be managed but an environment to be co-designed — acknowledging that our capacity to architect attention is itself shaped by privilege, neurology, and structural context. The goal is not total control but conscious participation in the construction of our awareness.";

export function WargameTab() {
  const [hasSession, setHasSession] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!hasSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
        <div className="w-16 h-16 rounded-full bg-[#18181c] border border-[#2a2a2e] flex items-center justify-center">
          <Swords className="h-7 w-7 text-[#5e5a54]" />
        </div>
        <div className="text-center max-w-md">
          <h3 className="text-lg font-semibold text-[#e8e4df] mb-2">
            Wargame This Essay
          </h3>
          <p className="text-sm text-[#9e9890] leading-relaxed">
            Run an adversarial analysis to find blind spots, weak arguments, and
            unstated assumptions. The AI will steelman counterarguments and
            suggest revisions.
          </p>
        </div>
        <Button size="lg" onClick={() => setHasSession(true)}>
          <Swords className="h-4 w-4" />
          Launch Wargame
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Swords className="h-4 w-4 text-[#d4a843]" />
          <h3 className="text-sm font-semibold text-[#e8e4df]">
            Wargame Results
          </h3>
          <Badge variant="default" className="text-[10px]">
            4 blind spots found
          </Badge>
        </div>
      </div>

      {/* Blind Spots */}
      <div>
        <h4 className="text-xs font-medium text-[#5e5a54] uppercase tracking-wider mb-3">
          Blind Spots Identified
        </h4>
        <div className="space-y-3">
          {MOCK_BLIND_SPOTS.map((spot) => (
            <Card
              key={spot.id}
              className="p-4 border-l-2 border-l-[#d47b7b]/50"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className={cn(
                    "h-4 w-4 flex-shrink-0 mt-0.5",
                    spot.severity === "high"
                      ? "text-[#d47b7b]"
                      : spot.severity === "medium"
                        ? "text-[#d4a843]"
                        : "text-[#5e5a54]"
                  )}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[#e8e4df]">
                      {spot.title}
                    </span>
                    <Badge
                      variant={
                        spot.severity === "high"
                          ? "danger"
                          : spot.severity === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {spot.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#9e9890] leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Revised Thesis */}
      <div>
        <h4 className="text-xs font-medium text-[#5e5a54] uppercase tracking-wider mb-3 flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5" />
          Revised Thesis Suggestion
        </h4>
        <Card className="p-4 border-l-2 border-l-[#6dbf7b]/50">
          <p className="text-sm text-[#e8e4df] leading-relaxed italic">
            &ldquo;{REVISED_THESIS}&rdquo;
          </p>
        </Card>
      </div>

      {/* Apply Button */}
      <div className="pt-2">
        {applied ? (
          <div className="flex items-center gap-2 text-sm text-[#6dbf7b]">
            <CheckCircle className="h-4 w-4" />
            Recommendations applied to draft
          </div>
        ) : (
          <Button size="lg" onClick={() => setApplied(true)}>
            <ArrowRight className="h-4 w-4" />
            Apply Recommendations
          </Button>
        )}
      </div>
    </div>
  );
}
