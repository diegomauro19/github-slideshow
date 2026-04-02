"use client";

import { useState, useCallback } from "react";
import { GripVertical, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type EssayType = "manifesto" | "diagnostic" | "framework" | "reflection";
type EssayStatus = "seed" | "draft" | "editing" | "published";

interface TimelineEssay {
  id: string;
  number: number;
  title: string;
  type: EssayType;
  status: EssayStatus;
  seedWeek: number;
  publishWeek: number;
}

const typeColors: Record<EssayType, string> = {
  manifesto: "bg-amber/80 border-amber",
  diagnostic: "bg-red/80 border-red",
  framework: "bg-blue/80 border-blue",
  reflection: "bg-purple/80 border-purple",
};

const typeDotColors: Record<EssayType, string> = {
  manifesto: "bg-amber",
  diagnostic: "bg-red",
  framework: "bg-blue",
  reflection: "bg-purple",
};

const mockEssays: TimelineEssay[] = [
  { id: "e1", number: 12, title: "The Illusion of Alignment", type: "manifesto", status: "published", seedWeek: 0, publishWeek: 3 },
  { id: "e2", number: 13, title: "Why Your Strategy Deck is Fiction", type: "diagnostic", status: "published", seedWeek: 2, publishWeek: 5 },
  { id: "e3", number: 14, title: "The Decision Architecture", type: "framework", status: "editing", seedWeek: 4, publishWeek: 7 },
  { id: "e4", number: 15, title: "What I Learned Shutting Down a Product", type: "reflection", status: "draft", seedWeek: 6, publishWeek: 9 },
  { id: "e5", number: 16, title: "The Operator's Manifesto", type: "manifesto", status: "draft", seedWeek: 7, publishWeek: 10 },
  { id: "e6", number: 17, title: "Diagnosing Organizational Debt", type: "diagnostic", status: "seed", seedWeek: 9, publishWeek: 12 },
  { id: "e7", number: 18, title: "The Prioritization Framework", type: "framework", status: "seed", seedWeek: 11, publishWeek: 14 },
  { id: "e8", number: 19, title: "On Letting Go of Certainty", type: "reflection", status: "seed", seedWeek: 13, publishWeek: 15 },
];

const WEEK_WIDTH = 80;
const ROW_HEIGHT = 48;
const TOTAL_WEEKS = 16;
const TODAY_WEEK = 6;

export function TimelineView() {
  const [essays, setEssays] = useState<TimelineEssay[]>(mockEssays);
  const [dragItem, setDragItem] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, essayId: string) => {
    setDragItem(essayId);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetWeek: number) => {
      e.preventDefault();
      if (!dragItem) return;

      setEssays((prev) =>
        prev.map((essay) => {
          if (essay.id !== dragItem) return essay;
          const span = essay.publishWeek - essay.seedWeek;
          const newSeed = Math.max(0, Math.min(targetWeek, TOTAL_WEEKS - span));
          return { ...essay, seedWeek: newSeed, publishWeek: newSeed + span };
        })
      );
      setDragItem(null);
    },
    [dragItem]
  );

  const weekLabels = Array.from({ length: TOTAL_WEEKS }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (i - TODAY_WEEK) * 7);
    return `W${i + 1}`;
  });

  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      {/* Legend */}
      <div className="flex items-center gap-4 border-b border-surface-raised px-4 py-3">
        <CalendarDays className="h-4 w-4 text-text-dim" />
        <span className="text-xs font-medium text-text-secondary">Legend:</span>
        {(Object.keys(typeColors) as EssayType[]).map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={cn("h-2.5 w-2.5 rounded-full", typeDotColors[type])} />
            <span className="text-xs capitalize text-text-dim">{type}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: TOTAL_WEEKS * WEEK_WIDTH + 200 }}>
          {/* Header */}
          <div className="flex border-b border-surface-raised">
            <div className="w-[200px] shrink-0 px-4 py-2 text-xs font-medium text-text-dim">
              Essay
            </div>
            <div className="relative flex flex-1">
              {weekLabels.map((label, i) => (
                <div
                  key={i}
                  style={{ width: WEEK_WIDTH }}
                  className={cn(
                    "shrink-0 border-l border-surface-raised px-1 py-2 text-center text-xs",
                    i === TODAY_WEEK ? "text-amber font-medium" : "text-text-dim"
                  )}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="relative">
            {/* Today marker */}
            <div
              className="absolute top-0 bottom-0 z-10 w-px bg-amber/50"
              style={{ left: 200 + TODAY_WEEK * WEEK_WIDTH + WEEK_WIDTH / 2 }}
            >
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded bg-amber px-1 py-0.5 text-[9px] font-bold text-bg whitespace-nowrap">
                TODAY
              </div>
            </div>

            {essays.map((essay) => (
              <div
                key={essay.id}
                className="flex border-b border-surface-raised/50 hover:bg-surface-raised/30"
                style={{ height: ROW_HEIGHT }}
                onDragOver={handleDragOver}
                onDrop={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - 200;
                  const week = Math.floor(x / WEEK_WIDTH);
                  handleDrop(e, week);
                }}
              >
                <div className="flex w-[200px] shrink-0 items-center gap-2 px-4">
                  <GripVertical className="h-3 w-3 shrink-0 text-text-dim/50" />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-text-secondary">#{essay.number}</span>
                    <p className="truncate text-xs text-text">{essay.title}</p>
                  </div>
                </div>
                <div className="relative flex flex-1 items-center">
                  {/* Grid lines */}
                  {weekLabels.map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 border-l border-surface-raised/30"
                      style={{ left: i * WEEK_WIDTH }}
                    />
                  ))}
                  {/* Essay bar */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, essay.id)}
                    className={cn(
                      "absolute flex cursor-grab items-center rounded border px-2 text-[10px] font-medium text-bg",
                      typeColors[essay.type],
                      dragItem === essay.id && "opacity-50"
                    )}
                    style={{
                      left: essay.seedWeek * WEEK_WIDTH + 4,
                      width: (essay.publishWeek - essay.seedWeek) * WEEK_WIDTH - 8,
                      height: ROW_HEIGHT - 16,
                    }}
                  >
                    <span className="truncate">{essay.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
