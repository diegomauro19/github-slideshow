"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Pencil,
  CheckCircle,
  ThumbsUp,
  Clock,
  Globe,
} from "lucide-react";

type EssayStage =
  | "seed"
  | "draft"
  | "review"
  | "approved"
  | "scheduled"
  | "published";

interface EssayCard {
  id: string;
  number: number;
  title: string;
  type: "essay" | "letter" | "manifesto" | "reflection";
  stage: EssayStage;
  date: string;
  isCurrent?: boolean;
}

const STAGES: { key: EssayStage; label: string; icon: React.ReactNode }[] = [
  { key: "seed", label: "Seed", icon: <FileText className="h-3.5 w-3.5" /> },
  { key: "draft", label: "Draft", icon: <Pencil className="h-3.5 w-3.5" /> },
  {
    key: "review",
    label: "Review",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
  },
  {
    key: "approved",
    label: "Approved",
    icon: <ThumbsUp className="h-3.5 w-3.5" />,
  },
  {
    key: "scheduled",
    label: "Scheduled",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  {
    key: "published",
    label: "Published",
    icon: <Globe className="h-3.5 w-3.5" />,
  },
];

const TYPE_VARIANTS: Record<
  EssayCard["type"],
  "default" | "info" | "purple" | "success"
> = {
  essay: "default",
  letter: "info",
  manifesto: "purple",
  reflection: "success",
};

const MOCK_ESSAYS: EssayCard[] = [
  {
    id: "essay-1",
    number: 42,
    title: "The Architecture of Attention",
    type: "essay",
    stage: "seed",
    date: "2026-03-28",
  },
  {
    id: "essay-2",
    number: 43,
    title: "Why Founders Should Study Philosophy",
    type: "letter",
    stage: "seed",
    date: "2026-03-30",
  },
  {
    id: "essay-3",
    number: 41,
    title: "Dissolving the Productivity Myth",
    type: "essay",
    stage: "draft",
    date: "2026-03-25",
    isCurrent: true,
  },
  {
    id: "essay-4",
    number: 40,
    title: "Against Best Practices",
    type: "manifesto",
    stage: "review",
    date: "2026-03-20",
  },
  {
    id: "essay-5",
    number: 39,
    title: "The Quiet Power of Subtraction",
    type: "reflection",
    stage: "approved",
    date: "2026-03-15",
  },
  {
    id: "essay-6",
    number: 38,
    title: "Building in Public is a Lie",
    type: "essay",
    stage: "scheduled",
    date: "2026-03-10",
  },
  {
    id: "essay-7",
    number: 37,
    title: "The Three Movements of Thought",
    type: "essay",
    stage: "published",
    date: "2026-03-05",
  },
  {
    id: "essay-8",
    number: 36,
    title: "Letters to a Young Operator",
    type: "letter",
    stage: "published",
    date: "2026-02-28",
  },
];

export function EssayPipeline() {
  const [essays, setEssays] = useState<EssayCard[]>(MOCK_ESSAYS);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<EssayStage | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.dataTransfer.setData("text/plain", id);
      setDraggedId(id);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, stage: EssayStage) => {
      e.preventDefault();
      setDragOverStage(stage);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDragOverStage(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetStage: EssayStage) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      setEssays((prev) =>
        prev.map((essay) =>
          essay.id === id ? { ...essay, stage: targetStage } : essay
        )
      );
      setDraggedId(null);
      setDragOverStage(null);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverStage(null);
  }, []);

  const getColumnEssays = (stage: EssayStage) =>
    essays.filter((e) => e.stage === stage);

  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {STAGES.map((stage) => {
        const columnEssays = getColumnEssays(stage.key);
        return (
          <div
            key={stage.key}
            className="flex-shrink-0 w-[260px]"
            onDragOver={(e) => handleDragOver(e, stage.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.key)}
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="text-[#5e5a54]">{stage.icon}</span>
              <span className="text-sm font-medium text-[#9e9890]">
                {stage.label}
              </span>
              <span className="ml-auto text-xs text-[#5e5a54] bg-[#18181c] rounded-full px-2 py-0.5">
                {columnEssays.length}
              </span>
            </div>

            {/* Droppable Area */}
            <div
              className={cn(
                "min-h-[200px] rounded-lg border border-[#1e1e22] bg-[#111114]/50 p-2 space-y-2 transition-colors duration-200",
                dragOverStage === stage.key &&
                  "border-[#d4a843]/30 bg-[#d4a843]/5"
              )}
            >
              {columnEssays.map((essay) => (
                <div
                  key={essay.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, essay.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    window.location.href = `/essays/${essay.id}`;
                  }}
                  className={cn(
                    "rounded-md border border-[#1e1e22] bg-[#18181c] p-3 cursor-grab active:cursor-grabbing transition-all duration-200",
                    "hover:border-[#2a2a2e] hover:bg-[#1e1e22]",
                    draggedId === essay.id && "opacity-40",
                    essay.isCurrent &&
                      "ring-1 ring-[#d4a843]/50 shadow-[0_0_12px_rgba(212,168,67,0.15)]"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-[#5e5a54]">
                      #{essay.number}
                    </span>
                    <Badge
                      variant={TYPE_VARIANTS[essay.type]}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {essay.type}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-[#e8e4df] leading-snug mb-2">
                    {essay.title}
                  </p>
                  <span className="text-[11px] text-[#5e5a54]">
                    {essay.date}
                  </span>
                </div>
              ))}

              {columnEssays.length === 0 && (
                <div className="flex items-center justify-center h-24 text-xs text-[#5e5a54]">
                  Drop essay here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
