"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import {
  Plus,
  Swords,
  Clock,
  CheckCircle2,
  Archive,
  Settings2,
} from "lucide-react";

type SessionStatus = "setup" | "running" | "complete" | "archived";

interface WargameSession {
  id: string;
  title: string;
  scenario: string;
  status: SessionStatus;
  mentalModels: string[];
  roundCount: number;
  date: string;
}

const statusConfig: Record<
  SessionStatus,
  { label: string; color: string; icon: React.ElementType }
> = {
  setup: {
    label: "Setup",
    color: "border-blue/20 bg-blue/10 text-blue",
    icon: Settings2,
  },
  running: {
    label: "Running",
    color: "border-amber/20 bg-amber/10 text-amber",
    icon: Clock,
  },
  complete: {
    label: "Complete",
    color: "border-green/20 bg-green/10 text-green",
    icon: CheckCircle2,
  },
  archived: {
    label: "Archived",
    color: "border-text-dim/20 bg-text-dim/10 text-text-dim",
    icon: Archive,
  },
};

const mockSessions: WargameSession[] = [
  {
    id: "wg-001",
    title: "Zero-Trust Migration Thesis",
    scenario:
      "Enterprise clients should adopt zero-trust architecture as a competitive advantage rather than a compliance cost center.",
    status: "complete",
    mentalModels: ["Game Theory", "Red Team", "Second-Order Effects"],
    roundCount: 3,
    date: "2026-03-28",
  },
  {
    id: "wg-002",
    title: "AI Governance Framework",
    scenario:
      "Centralized AI governance boards will outperform distributed responsibility models in regulated industries.",
    status: "running",
    mentalModels: ["OODA Loop", "Incentive Analysis", "Systems Thinking"],
    roundCount: 2,
    date: "2026-04-01",
  },
  {
    id: "wg-003",
    title: "Cloud Repatriation Counterargument",
    scenario:
      "The current cloud repatriation trend is a short-term cost reaction that ignores long-term strategic flexibility.",
    status: "setup",
    mentalModels: ["Scenario Planning", "Behavioral Economics"],
    roundCount: 0,
    date: "2026-04-02",
  },
  {
    id: "wg-004",
    title: "Board-Level Cyber Risk Framing",
    scenario:
      "CISOs who frame cybersecurity as business risk rather than technical risk achieve 3x more budget approval.",
    status: "archived",
    mentalModels: ["Bayesian Reasoning", "Via Negativa", "Game Theory"],
    roundCount: 3,
    date: "2026-03-15",
  },
];

export function SessionList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-text">
          Wargame Sessions
        </h2>
        <Link
          href="/wargaming?new=true"
          className="inline-flex items-center gap-2 rounded-lg bg-amber/10 px-4 py-2 text-sm font-medium text-amber transition-colors hover:bg-amber/20"
        >
          <Plus className="h-4 w-4" />
          New Wargame
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mockSessions.map((session) => {
          const sc = statusConfig[session.status];
          const StatusIcon = sc.icon;

          return (
            <Link
              key={session.id}
              href={`/wargaming/${session.id}`}
              className="group rounded-lg border border-[#1e1e22] bg-surface p-5 transition-colors hover:border-text-dim/30"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Swords className="h-4 w-4 text-amber" />
                  <h3 className="text-sm font-semibold text-text group-hover:text-amber transition-colors">
                    {session.title}
                  </h3>
                </div>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                    sc.color
                  )}
                >
                  <StatusIcon className="h-3 w-3" />
                  {sc.label}
                </span>
              </div>

              <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                {session.scenario}
              </p>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {session.mentalModels.map((model) => (
                  <span
                    key={model}
                    className="rounded-full border border-purple/20 bg-purple/10 px-2 py-0.5 text-[10px] font-medium text-purple"
                  >
                    {model}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-text-dim">
                <span>
                  {session.roundCount > 0
                    ? `${session.roundCount} round${session.roundCount !== 1 ? "s" : ""}`
                    : "No rounds yet"}
                </span>
                <span>{session.date}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
