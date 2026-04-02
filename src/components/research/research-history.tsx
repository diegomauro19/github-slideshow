"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Target,
  TrendingUp,
  Newspaper,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Clock,
  Link2,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ResearchSession {
  id: string;
  query: string;
  type: string;
  typeBadge: string;
  date: string;
  status: "running" | "complete" | "failed";
  sourcesCount: number;
  summary?: string;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  "Topic Deep Dive": BookOpen,
  "Competitor Scan": Target,
  "Trend Analysis": TrendingUp,
  "News Scan": Newspaper,
  "Counter-Argument Hunt": ShieldAlert,
};

const MOCK_SESSIONS: ResearchSession[] = [
  {
    id: "rs-1",
    query: "Impact of renewable energy subsidies on grid modernization in the EU",
    type: "Topic Deep Dive",
    typeBadge: "default",
    date: "2026-04-02",
    status: "complete",
    sourcesCount: 14,
    summary:
      "Found 6 key findings and 4 data points on EU renewable subsidy programs, grid infrastructure investments, and policy frameworks across 14 sources including IEA, European Commission reports, and academic papers.",
  },
  {
    id: "rs-2",
    query: "Tesla vs BYD market share 2025-2026 comparison",
    type: "Competitor Scan",
    typeBadge: "purple",
    date: "2026-04-01",
    status: "complete",
    sourcesCount: 9,
    summary:
      "BYD overtook Tesla in global EV sales volume in Q4 2025. Tesla maintains higher revenue per unit and dominance in North America. Key battleground is Southeast Asia.",
  },
  {
    id: "rs-3",
    query: "Generative AI adoption trends in K-12 education",
    type: "Trend Analysis",
    typeBadge: "info",
    date: "2026-03-30",
    status: "running",
    sourcesCount: 6,
    summary:
      "Research in progress. Early findings suggest 43% of US school districts have adopted some form of AI-assisted learning tools.",
  },
  {
    id: "rs-4",
    query: "Arguments against universal basic income from conservative economists",
    type: "Counter-Argument Hunt",
    typeBadge: "danger",
    date: "2026-03-28",
    status: "complete",
    sourcesCount: 11,
    summary:
      "Identified 7 major counter-arguments including labor force participation decline, inflation risk, moral hazard, fiscal sustainability concerns, and crowding out of targeted welfare programs.",
  },
  {
    id: "rs-5",
    query: "Latest developments in CRISPR gene therapy clinical trials",
    type: "News Scan",
    typeBadge: "success",
    date: "2026-03-25",
    status: "failed",
    sourcesCount: 0,
    summary:
      "Research failed due to rate limiting. Please retry.",
  },
];

const STATUS_CONFIG = {
  running: {
    icon: Loader2,
    label: "Running",
    variant: "info" as const,
    iconClass: "animate-spin",
  },
  complete: {
    icon: CheckCircle2,
    label: "Complete",
    variant: "success" as const,
    iconClass: "",
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    variant: "danger" as const,
    iconClass: "",
  },
};

function SessionItem({ session }: { session: ResearchSession }) {
  const [expanded, setExpanded] = React.useState(false);
  const statusConfig = STATUS_CONFIG[session.status];
  const StatusIcon = statusConfig.icon;
  const TypeIcon = TYPE_ICONS[session.type] || BookOpen;

  return (
    <div
      className={cn(
        "rounded-lg border border-[#1e1e22] bg-[#18181c] transition-colors",
        expanded && "bg-[#1c1c20]"
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        <TypeIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#9e9890]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[#e8e4df]">
            {session.query}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <Badge variant={session.typeBadge as any} className="text-[10px]">
              {session.type}
            </Badge>
            <Badge variant={statusConfig.variant} className="gap-1 text-[10px]">
              <StatusIcon
                className={cn("h-3 w-3", statusConfig.iconClass)}
              />
              {statusConfig.label}
            </Badge>
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-[#9e9890]/70">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {session.date}
            </span>
            {session.sourcesCount > 0 && (
              <span className="flex items-center gap-1">
                <Link2 className="h-3 w-3" />
                {session.sourcesCount} sources
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 pt-0.5 text-[#9e9890]">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {expanded && session.summary && (
        <div className="border-t border-[#1e1e22] px-3 py-3 pl-10">
          <p className="text-xs leading-relaxed text-[#9e9890]">
            {session.summary}
          </p>
        </div>
      )}
    </div>
  );
}

export function ResearchHistory() {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#9e9890]">
        Research History
      </h3>
      <div className="space-y-2">
        {MOCK_SESSIONS.map((session) => (
          <SessionItem key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
