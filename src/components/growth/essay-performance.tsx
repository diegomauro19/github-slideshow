"use client";

import { useState } from "react";
import { ArrowUpDown, Filter, Trophy } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type EssayType = "manifesto" | "diagnostic" | "framework" | "reflection";

interface EssayPerf {
  id: string;
  number: number;
  title: string;
  type: EssayType;
  views: number;
  opens: number;
  openRate: number;
  clicks: number;
  subsGained: number;
  shares: number;
}

const typeColors: Record<EssayType, string> = {
  manifesto: "text-amber",
  diagnostic: "text-red",
  framework: "text-blue",
  reflection: "text-purple",
};

const mockData: EssayPerf[] = [
  { id: "e1", number: 3, title: "The CEO's Blind Spot", type: "manifesto", views: 4820, opens: 3210, openRate: 66.6, clicks: 890, subsGained: 145, shares: 67 },
  { id: "e2", number: 5, title: "Why Meetings Fail", type: "diagnostic", views: 3940, opens: 2680, openRate: 68.0, clicks: 620, subsGained: 98, shares: 45 },
  { id: "e3", number: 7, title: "The Decision Stack", type: "framework", views: 5210, opens: 3890, openRate: 74.7, clicks: 1120, subsGained: 210, shares: 89 },
  { id: "e4", number: 8, title: "On Being Wrong in Public", type: "reflection", views: 3150, opens: 2340, openRate: 74.3, clicks: 480, subsGained: 72, shares: 34 },
  { id: "e5", number: 9, title: "Organizational Scar Tissue", type: "diagnostic", views: 4100, opens: 2950, openRate: 71.9, clicks: 780, subsGained: 130, shares: 56 },
  { id: "e6", number: 10, title: "The Operator's Toolkit", type: "framework", views: 3680, opens: 2510, openRate: 68.2, clicks: 690, subsGained: 115, shares: 42 },
  { id: "e7", number: 11, title: "Against Best Practices", type: "manifesto", views: 6340, opens: 4720, openRate: 74.4, clicks: 1340, subsGained: 285, shares: 112 },
  { id: "e8", number: 12, title: "The Illusion of Alignment", type: "manifesto", views: 4560, opens: 3180, openRate: 69.7, clicks: 870, subsGained: 155, shares: 61 },
  { id: "e9", number: 13, title: "Why Your Strategy Deck is Fiction", type: "diagnostic", views: 3890, opens: 2890, openRate: 74.3, clicks: 710, subsGained: 120, shares: 48 },
  { id: "e10", number: 14, title: "The Decision Architecture", type: "framework", views: 2150, opens: 1680, openRate: 78.1, clicks: 420, subsGained: 85, shares: 29 },
];

type SortKey = keyof EssayPerf;

export function EssayPerformance() {
  const [sortKey, setSortKey] = useState<SortKey>("subsGained");
  const [sortAsc, setSortAsc] = useState(false);
  const [typeFilter, setTypeFilter] = useState<EssayType | "all">("all");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const topPerformerId = [...mockData].sort((a, b) => b.subsGained - a.subsGained)[0].id;

  const filtered = typeFilter === "all"
    ? mockData
    : mockData.filter((e) => e.type === typeFilter);

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const cmp = typeof aVal === "number" && typeof bVal === "number"
      ? aVal - bVal
      : String(aVal).localeCompare(String(bVal));
    return sortAsc ? cmp : -cmp;
  });

  const columns: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "number", label: "#" },
    { key: "title", label: "Title" },
    { key: "views", label: "Views", align: "right" },
    { key: "openRate", label: "Open %", align: "right" },
    { key: "clicks", label: "Clicks", align: "right" },
    { key: "subsGained", label: "Subs+", align: "right" },
    { key: "shares", label: "Shares", align: "right" },
  ];

  const types: (EssayType | "all")[] = ["all", "manifesto", "diagnostic", "framework", "reflection"];

  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      <div className="flex items-center justify-between border-b border-surface-raised px-4 py-3">
        <h3 className="text-sm font-semibold text-text">Essay Performance</h3>
        <div className="flex items-center gap-1.5">
          <Filter className="h-3 w-3 text-text-dim" />
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded px-2 py-0.5 text-[10px] font-medium capitalize transition-colors",
                typeFilter === t
                  ? "bg-surface-raised text-text"
                  : "text-text-dim hover:text-text-secondary"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-surface-raised">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "cursor-pointer select-none px-3 py-2 font-medium text-text-dim hover:text-text-secondary",
                    col.align === "right" ? "text-right" : "text-left"
                  )}
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className={cn("h-2.5 w-2.5", sortKey === col.key ? "text-amber" : "text-text-dim/40")} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((essay) => (
              <tr
                key={essay.id}
                className={cn(
                  "border-b border-surface-raised/50 transition-colors hover:bg-surface-raised/30",
                  essay.id === topPerformerId && "bg-amber/5"
                )}
              >
                <td className="px-3 py-2 font-mono text-text-secondary">
                  <div className="flex items-center gap-1">
                    {essay.id === topPerformerId && <Trophy className="h-3 w-3 text-amber" />}
                    {essay.number}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="font-medium text-text">{essay.title}</span>
                  <span className={cn("ml-2 text-[10px] capitalize", typeColors[essay.type])}>
                    {essay.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-right text-text-secondary">{essay.views.toLocaleString()}</td>
                <td className="px-3 py-2 text-right text-text-secondary">{essay.openRate}%</td>
                <td className="px-3 py-2 text-right text-text-secondary">{essay.clicks.toLocaleString()}</td>
                <td className="px-3 py-2 text-right font-semibold text-green">+{essay.subsGained}</td>
                <td className="px-3 py-2 text-right text-text-secondary">{essay.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
