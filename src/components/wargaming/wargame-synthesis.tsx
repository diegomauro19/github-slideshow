"use client";

import { cn } from "@/lib/utils/cn";
import {
  AlertTriangle,
  Target,
  FileText,
  Crosshair,
  Download,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface BlindSpot {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

export interface StressTestResult {
  model: string;
  score: number; // 0-100
  verdict: string;
}

export interface KillShot {
  title: string;
  description: string;
}

export interface SynthesisData {
  blindSpots: BlindSpot[];
  stressTests: StressTestResult[];
  revisedThesis: string;
  essayRecommendations: string[];
  killShots: KillShot[];
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StressGauge({
  result,
}: {
  result: StressTestResult;
}) {
  const color =
    result.score >= 70
      ? "bg-green"
      : result.score >= 40
        ? "bg-amber"
        : "bg-red";
  const textColor =
    result.score >= 70
      ? "text-green"
      : result.score >= 40
        ? "text-amber"
        : "text-red";

  return (
    <div className="rounded-lg border border-[#1e1e22] bg-bg p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-text">{result.model}</span>
        <span className={cn("text-xs font-bold", textColor)}>
          {result.score}%
        </span>
      </div>
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-surface">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${result.score}%` }}
        />
      </div>
      <p className="text-[11px] leading-relaxed text-text-dim">
        {result.verdict}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Synthesis Panel                                               */
/* ------------------------------------------------------------------ */

export function WargameSynthesis({ data }: { data: SynthesisData }) {
  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-sm font-bold tracking-tight text-text">
        <Target className="h-4 w-4 text-amber" />
        Synthesis
      </h2>

      {/* Blind Spots */}
      <section>
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red">
          <AlertTriangle className="h-3.5 w-3.5" />
          Blind Spots Found
        </h3>
        <div className="space-y-2">
          {data.blindSpots.map((spot, i) => (
            <div
              key={i}
              className="rounded-lg border border-red/20 bg-red/5 p-3"
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-semibold text-text">
                  {spot.title}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase",
                    spot.severity === "high"
                      ? "bg-red/20 text-red"
                      : spot.severity === "medium"
                        ? "bg-amber/20 text-amber"
                        : "bg-text-dim/20 text-text-dim"
                  )}
                >
                  {spot.severity}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-secondary">
                {spot.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stress Test Results */}
      <section>
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue">
          <TrendingUp className="h-3.5 w-3.5" />
          Stress Test Results
        </h3>
        <div className="space-y-2">
          {data.stressTests.map((result, i) => (
            <StressGauge key={i} result={result} />
          ))}
        </div>
      </section>

      {/* Revised Thesis */}
      <section>
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber">
          <FileText className="h-3.5 w-3.5" />
          Revised Thesis
        </h3>
        <div className="rounded-lg border border-amber/30 bg-amber/5 p-4">
          <p className="text-sm leading-relaxed text-text">
            {data.revisedThesis}
          </p>
        </div>
      </section>

      {/* Essay Recommendations */}
      <section>
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-green">
          <FileText className="h-3.5 w-3.5" />
          Essay Recommendations
        </h3>
        <ul className="space-y-2">
          {data.essayRecommendations.map((rec, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg border border-[#1e1e22] bg-bg p-3 text-xs leading-relaxed text-text-secondary"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-green/10 text-[9px] font-bold text-green">
                {i + 1}
              </span>
              {rec}
            </li>
          ))}
        </ul>
      </section>

      {/* Kill Shots */}
      <section>
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red">
          <Crosshair className="h-3.5 w-3.5" />
          Kill Shots
        </h3>
        <div className="space-y-2">
          {data.killShots.map((ks, i) => (
            <div
              key={i}
              className="rounded-lg border border-red/30 bg-red/10 p-4"
            >
              <div className="mb-1 flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-red" />
                <span className="text-xs font-bold text-red">{ks.title}</span>
              </div>
              <p className="text-xs leading-relaxed text-text-secondary">
                {ks.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Export */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber/30 bg-amber/10 px-4 py-2.5 text-sm font-medium text-amber transition-colors hover:bg-amber/20"
      >
        <Download className="h-4 w-4" />
        Export to Essay
      </button>
    </div>
  );
}
