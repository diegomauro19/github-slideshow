"use client";

import { Clock, GitBranch, Users, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MetricCard {
  label: string;
  value: string;
  icon: React.ReactNode;
  emphasis?: boolean;
}

const metrics: MetricCard[] = [
  {
    label: "Next Essay Countdown",
    value: "4 days",
    icon: <Clock className="h-4 w-4" />,
    emphasis: true,
  },
  {
    label: "Pipeline Status",
    value: "3 in Draft",
    icon: <GitBranch className="h-4 w-4" />,
  },
  {
    label: "Subscribers",
    value: "2,847",
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Unused Insights",
    value: "18",
    icon: <Lightbulb className="h-4 w-4" />,
    emphasis: true,
  },
];

export function MetricsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-raised text-text-dim">
            {metric.icon}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs text-text-dim">{metric.label}</p>
            <p
              className={cn(
                "text-lg font-semibold leading-tight",
                metric.emphasis ? "text-amber" : "text-text"
              )}
            >
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
