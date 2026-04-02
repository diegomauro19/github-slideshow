"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type EssayType = "manifesto" | "diagnostic" | "framework" | "reflection";
type EssayStatus = "seed" | "draft" | "editing" | "review" | "scheduled" | "published";

interface CalendarEssay {
  id: string;
  number: number;
  title: string;
  type: EssayType;
  status: EssayStatus;
  plannedDate: string;
  actualDate: string | null;
}

const statusStyles: Record<EssayStatus, string> = {
  seed: "bg-text-dim/20 text-text-dim",
  draft: "bg-blue/20 text-blue",
  editing: "bg-purple/20 text-purple",
  review: "bg-amber/20 text-amber",
  scheduled: "bg-green/20 text-green",
  published: "bg-green/30 text-green",
};

const typeStyles: Record<EssayType, string> = {
  manifesto: "text-amber",
  diagnostic: "text-red",
  framework: "text-blue",
  reflection: "text-purple",
};

const mockEssays: CalendarEssay[] = [
  { id: "e1", number: 12, title: "The Illusion of Alignment", type: "manifesto", status: "published", plannedDate: "2026-02-15", actualDate: "2026-02-15" },
  { id: "e2", number: 13, title: "Why Your Strategy Deck is Fiction", type: "diagnostic", status: "published", plannedDate: "2026-03-01", actualDate: "2026-03-03" },
  { id: "e3", number: 14, title: "The Decision Architecture", type: "framework", status: "editing", plannedDate: "2026-03-15", actualDate: null },
  { id: "e4", number: 15, title: "What I Learned Shutting Down a Product", type: "reflection", status: "draft", plannedDate: "2026-03-29", actualDate: null },
  { id: "e5", number: 16, title: "The Operator's Manifesto", type: "manifesto", status: "draft", plannedDate: "2026-04-12", actualDate: null },
  { id: "e6", number: 17, title: "Diagnosing Organizational Debt", type: "diagnostic", status: "seed", plannedDate: "2026-04-26", actualDate: null },
  { id: "e7", number: 18, title: "The Prioritization Framework", type: "framework", status: "seed", plannedDate: "2026-05-10", actualDate: null },
  { id: "e8", number: 19, title: "On Letting Go of Certainty", type: "reflection", status: "seed", plannedDate: "2026-05-24", actualDate: null },
];

type SortKey = "number" | "title" | "type" | "status" | "plannedDate" | "actualDate";

export function CalendarTable() {
  const [sortKey, setSortKey] = useState<SortKey>("number");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...mockEssays].sort((a, b) => {
    const aVal = a[sortKey] ?? "";
    const bVal = b[sortKey] ?? "";
    const cmp = typeof aVal === "number" && typeof bVal === "number"
      ? aVal - bVal
      : String(aVal).localeCompare(String(bVal));
    return sortAsc ? cmp : -cmp;
  });

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "number", label: "#", className: "w-14" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type", className: "w-28" },
    { key: "status", label: "Status", className: "w-28" },
    { key: "plannedDate", label: "Planned", className: "w-28" },
    { key: "actualDate", label: "Actual", className: "w-28" },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-surface-raised bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-raised">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-text-dim cursor-pointer hover:text-text-secondary select-none",
                    col.className
                  )}
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className={cn(
                      "h-3 w-3",
                      sortKey === col.key ? "text-amber" : "text-text-dim/50"
                    )} />
                  </div>
                </th>
              ))}
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((essay) => (
              <tr
                key={essay.id}
                className="border-b border-surface-raised/50 cursor-pointer transition-colors hover:bg-surface-raised/40"
                onClick={() => {
                  /* navigate to essay */
                }}
              >
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {essay.number}
                </td>
                <td className="px-4 py-3 font-medium text-text">{essay.title}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-medium capitalize", typeStyles[essay.type])}>
                    {essay.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      statusStyles[essay.status]
                    )}
                  >
                    {essay.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{essay.plannedDate}</td>
                <td className="px-4 py-3 text-xs text-text-secondary">
                  {essay.actualDate ?? <span className="text-text-dim">--</span>}
                </td>
                <td className="px-4 py-3">
                  <ChevronRight className="h-3.5 w-3.5 text-text-dim" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
