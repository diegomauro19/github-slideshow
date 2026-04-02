"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type Stage = "seed" | "draft" | "review" | "approved" | "scheduled" | "published";

interface StageInfo {
  key: Stage;
  label: string;
  completedAt?: string;
}

interface EssayStatusTrackerProps {
  currentStage: Stage;
  stages?: StageInfo[];
  className?: string;
}

const DEFAULT_STAGES: StageInfo[] = [
  { key: "seed", label: "Seed", completedAt: "Mar 20, 10:14am" },
  { key: "draft", label: "Draft", completedAt: "Mar 23, 2:30pm" },
  { key: "review", label: "Review" },
  { key: "approved", label: "Approved" },
  { key: "scheduled", label: "Scheduled" },
  { key: "published", label: "Published" },
];

const STAGE_ORDER: Stage[] = [
  "seed",
  "draft",
  "review",
  "approved",
  "scheduled",
  "published",
];

export function EssayStatusTracker({
  currentStage,
  stages = DEFAULT_STAGES,
  className,
}: EssayStatusTrackerProps) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className={cn("flex flex-col", className)}>
      {stages.map((stage, index) => {
        const stageIndex = STAGE_ORDER.indexOf(stage.key);
        const isCompleted = stageIndex < currentIndex;
        const isCurrent = stageIndex === currentIndex;
        const isFuture = stageIndex > currentIndex;
        const isLast = index === stages.length - 1;

        return (
          <div key={stage.key} className="flex gap-3">
            {/* Vertical line + dot */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                {isCompleted && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6dbf7b]" />
                )}
                {isCurrent && (
                  <>
                    <div className="absolute w-4 h-4 rounded-full bg-[#d4a843]/20 animate-ping" />
                    <div className="relative w-2.5 h-2.5 rounded-full bg-[#d4a843] shadow-[0_0_8px_rgba(212,168,67,0.4)]" />
                  </>
                )}
                {isFuture && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2e] border border-[#3a3a3e]" />
                )}
              </div>
              {/* Line */}
              {!isLast && (
                <div
                  className={cn(
                    "w-px flex-1 min-h-[28px]",
                    stageIndex < currentIndex
                      ? "bg-[#6dbf7b]/30"
                      : stageIndex === currentIndex
                        ? "bg-gradient-to-b from-[#d4a843]/30 to-[#2a2a2e]"
                        : "bg-[#1e1e22]"
                  )}
                />
              )}
            </div>

            {/* Label + timestamp */}
            <div className="pb-4 -mt-0.5">
              <span
                className={cn(
                  "text-sm font-medium",
                  isCompleted && "text-[#6dbf7b]",
                  isCurrent && "text-[#d4a843]",
                  isFuture && "text-[#5e5a54]"
                )}
              >
                {stage.label}
              </span>
              {stage.completedAt && isCompleted && (
                <p className="text-[11px] text-[#5e5a54] mt-0.5">
                  {stage.completedAt}
                </p>
              )}
              {isCurrent && (
                <p className="text-[11px] text-[#d4a843]/60 mt-0.5">
                  In progress
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
