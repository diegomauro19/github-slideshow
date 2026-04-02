"use client";

import { useState } from "react";
import { CalendarRange, Table, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CadenceHealth } from "@/components/calendar/cadence-health";
import { TimelineView } from "@/components/calendar/timeline-view";
import { CalendarTable } from "@/components/calendar/calendar-table";

type ViewMode = "timeline" | "table";

export default function CalendarPage() {
  const [view, setView] = useState<ViewMode>("timeline");

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Editorial Calendar</h1>
          <p className="mt-1 text-sm text-text-dim">
            Plan, schedule, and track your publishing cadence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex overflow-hidden rounded-lg border border-surface-raised bg-surface">
            <button
              onClick={() => setView("timeline")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors",
                view === "timeline"
                  ? "bg-surface-raised text-text"
                  : "text-text-dim hover:text-text-secondary"
              )}
            >
              <CalendarRange className="h-3.5 w-3.5" />
              Timeline
            </button>
            <button
              onClick={() => setView("table")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors",
                view === "table"
                  ? "bg-surface-raised text-text"
                  : "text-text-dim hover:text-text-secondary"
              )}
            >
              <Table className="h-3.5 w-3.5" />
              Table
            </button>
          </div>

          {/* Suggest button */}
          <button className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-1.5 text-xs font-semibold text-bg transition-opacity hover:opacity-90">
            <Sparkles className="h-3.5 w-3.5" />
            Suggest Next 6 Essays
          </button>
        </div>
      </div>

      {/* Cadence health */}
      <CadenceHealth />

      {/* Main view */}
      {view === "timeline" ? <TimelineView /> : <CalendarTable />}
    </div>
  );
}
