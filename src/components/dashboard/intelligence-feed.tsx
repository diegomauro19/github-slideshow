"use client";

import { Search, Swords } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FeedItem {
  id: string;
  type: "research" | "wargame";
  title: string;
  summary: string;
  timestamp: string;
}

const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "research",
    title: "AI Governance Frameworks Analysis",
    summary:
      "Compared NIST AI RMF, EU AI Act, and ISO 42001. Key finding: most C-suites underestimate compliance timelines by 12-18 months.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "wargame",
    title: "Board Presentation Crisis Scenario",
    summary:
      "Simulated data breach disclosure during quarterly review. Optimal response: lead with business impact, not technical details.",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "research",
    title: "Zero-Trust Adoption Barriers",
    summary:
      "Surveyed 14 sources on enterprise zero-trust failures. Cultural resistance outweighs technical challenges 3:1.",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "wargame",
    title: "Vendor Lock-In Negotiation Drill",
    summary:
      "Tested multi-cloud exit strategies. Hybrid approach reduces switching costs by 40% but requires 6-month prep window.",
    timestamp: "2 days ago",
  },
  {
    id: "5",
    type: "research",
    title: "Technical Debt Quantification Methods",
    summary:
      "Reviewed CAST, SonarQube, and custom scoring models. Board-friendly metric: cost-of-delay per sprint as percentage of revenue.",
    timestamp: "3 days ago",
  },
];

const typeConfig = {
  research: {
    icon: Search,
    badge: "Research",
    badgeClass: "bg-blue/10 text-blue",
  },
  wargame: {
    icon: Swords,
    badge: "Wargame",
    badgeClass: "bg-purple/10 text-purple",
  },
} as const;

export function IntelligenceFeed() {
  return (
    <div className="rounded-lg bg-surface p-4">
      <h2 className="mb-4 text-sm font-medium text-text-secondary">
        Intelligence Feed
      </h2>
      <div className="flex flex-col gap-3">
        {feedItems.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className="group flex gap-3 rounded-md bg-surface-raised p-3 transition-colors hover:bg-surface-raised/80"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface text-text-dim">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-block rounded px-1.5 py-0.5 text-[10px] font-medium",
                      config.badgeClass
                    )}
                  >
                    {config.badge}
                  </span>
                  <span className="text-[10px] text-text-dim">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs font-medium text-text group-hover:text-amber-bright">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-text-dim line-clamp-2">
                  {item.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
