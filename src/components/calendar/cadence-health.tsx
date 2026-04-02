"use client";

import { Activity, Flame, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type CadenceStatus = "on-track" | "slight-delay" | "behind";

interface CadenceData {
  status: CadenceStatus;
  daysSinceLastPublish: number;
  daysUntilNext: number;
  streak: number;
  targetCadenceDays: number;
}

const mockCadence: CadenceData = {
  status: "on-track",
  daysSinceLastPublish: 10,
  daysUntilNext: 4,
  streak: 6,
  targetCadenceDays: 14,
};

const statusConfig: Record<CadenceStatus, { color: string; bg: string; label: string }> = {
  "on-track": { color: "text-green", bg: "bg-green/15", label: "On Track" },
  "slight-delay": { color: "text-amber", bg: "bg-amber/15", label: "Slight Delay" },
  behind: { color: "text-red", bg: "bg-red/15", label: "Behind Schedule" },
};

export function CadenceHealth() {
  const data = mockCadence;
  const config = statusConfig[data.status];
  const progress = Math.min(
    (data.daysSinceLastPublish / data.targetCadenceDays) * 100,
    100
  );

  return (
    <div className="rounded-lg border border-surface-raised bg-surface px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {/* Status badge */}
        <div className="flex items-center gap-2">
          <Activity className={cn("h-4 w-4", config.color)} />
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              config.bg,
              config.color
            )}
          >
            {config.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex min-w-[180px] flex-1 items-center gap-2">
          <span className="whitespace-nowrap text-xs text-text-dim">Cycle</span>
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-raised">
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full transition-all",
                data.status === "behind" ? "bg-red" : data.status === "slight-delay" ? "bg-amber" : "bg-green"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-xs text-text-dim">
            {data.daysSinceLastPublish}d / {data.targetCadenceDays}d
          </span>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-text-dim" />
            <span className="text-xs text-text-secondary">
              Last: <span className="font-medium text-text">{data.daysSinceLastPublish}d ago</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <ArrowRight className="h-3.5 w-3.5 text-text-dim" />
            <span className="text-xs text-text-secondary">
              Next: <span className="font-medium text-amber">{data.daysUntilNext}d</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-amber" />
            <span className="text-xs text-text-secondary">
              Streak: <span className="font-semibold text-amber">{data.streak}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
