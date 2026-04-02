"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { EssayPipeline } from "@/components/essays/essay-pipeline";
import { Plus, LayoutGrid, List } from "lucide-react";

export default function EssaysPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="min-h-screen bg-[#08080a] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e4df] tracking-tight">
            Essay Pipeline
          </h1>
          <p className="text-sm text-[#5e5a54] mt-1">
            Manage your essays from seed to publication
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-[#1e1e22] bg-[#111114] p-0.5">
            <button
              onClick={() => setView("kanban")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                view === "kanban"
                  ? "bg-[#18181c] text-[#e8e4df]"
                  : "text-[#5e5a54] hover:text-[#9e9890]"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Kanban
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                view === "list"
                  ? "bg-[#18181c] text-[#e8e4df]"
                  : "text-[#5e5a54] hover:text-[#9e9890]"
              )}
            >
              <List className="h-3.5 w-3.5" />
              List
            </button>
          </div>

          <Button>
            <Plus className="h-4 w-4" />
            New Essay
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {view === "kanban" ? (
        <EssayPipeline />
      ) : (
        <div className="rounded-lg border border-[#1e1e22] bg-[#111114] p-8 text-center text-sm text-[#5e5a54]">
          List view coming soon
        </div>
      )}
    </div>
  );
}
