"use client";

import { useState } from "react";
import { Plus, Sparkles, Megaphone, Share2, Mail, PenTool, Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ActionType = "cross-post" | "collaboration" | "outreach" | "content" | "community";
type ActionStatus = "planned" | "executed" | "measured";

interface GrowthAction {
  id: string;
  type: ActionType;
  description: string;
  status: ActionStatus;
  resultNotes: string;
  subsAttributed: number;
}

const typeConfig: Record<ActionType, { icon: React.ReactNode; color: string; bg: string }> = {
  "cross-post": { icon: <Share2 className="h-3 w-3" />, color: "text-blue", bg: "bg-blue/15" },
  collaboration: { icon: <PenTool className="h-3 w-3" />, color: "text-purple", bg: "bg-purple/15" },
  outreach: { icon: <Mail className="h-3 w-3" />, color: "text-amber", bg: "bg-amber/15" },
  content: { icon: <Megaphone className="h-3 w-3" />, color: "text-green", bg: "bg-green/15" },
  community: { icon: <Globe className="h-3 w-3" />, color: "text-red", bg: "bg-red/15" },
};

const statusStyles: Record<ActionStatus, string> = {
  planned: "bg-text-dim/20 text-text-dim",
  executed: "bg-blue/20 text-blue",
  measured: "bg-green/20 text-green",
};

const mockActions: GrowthAction[] = [
  {
    id: "a1",
    type: "cross-post",
    description: "Share Essay #11 thread on Twitter/X with key takeaways",
    status: "measured",
    resultNotes: "Thread got 45K impressions, 320 profile clicks",
    subsAttributed: 48,
  },
  {
    id: "a2",
    type: "collaboration",
    description: "Guest paragraph swap with The Generalist newsletter",
    status: "executed",
    resultNotes: "Published in their Wednesday edition",
    subsAttributed: 0,
  },
  {
    id: "a3",
    type: "outreach",
    description: "Email 15 C-suite contacts with Essay #12 personal note",
    status: "executed",
    resultNotes: "8 opens confirmed, 3 replied",
    subsAttributed: 5,
  },
  {
    id: "a4",
    type: "content",
    description: "Create LinkedIn carousel from Decision Stack framework",
    status: "planned",
    resultNotes: "",
    subsAttributed: 0,
  },
  {
    id: "a5",
    type: "community",
    description: "Host Twitter/X Space on 'Organizational Scar Tissue'",
    status: "planned",
    resultNotes: "",
    subsAttributed: 0,
  },
];

export function GrowthActions() {
  const [actions] = useState(mockActions);

  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      <div className="flex items-center justify-between border-b border-surface-raised px-4 py-3">
        <h3 className="text-sm font-semibold text-text">Growth Actions</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-md bg-amber px-3 py-1 text-[11px] font-semibold text-bg transition-opacity hover:opacity-90">
            <Sparkles className="h-3 w-3" />
            Get AI Suggestions
          </button>
          <button className="flex items-center gap-1 rounded-md border border-surface-raised px-3 py-1 text-[11px] font-medium text-text-secondary transition-colors hover:border-text-dim hover:text-text">
            <Plus className="h-3 w-3" />
            Add Action
          </button>
        </div>
      </div>
      <div className="divide-y divide-surface-raised/50">
        {actions.map((action) => {
          const config = typeConfig[action.type];
          return (
            <div
              key={action.id}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-surface-raised/20"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded",
                  config.bg,
                  config.color
                )}
              >
                {config.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-text">{action.description}</p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                      statusStyles[action.status]
                    )}
                  >
                    {action.status}
                  </span>
                </div>
                {action.resultNotes && (
                  <p className="mt-1 text-[11px] text-text-dim">{action.resultNotes}</p>
                )}
                {action.subsAttributed > 0 && (
                  <span className="mt-1 inline-block text-[10px] font-semibold text-green">
                    +{action.subsAttributed} subscribers attributed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
