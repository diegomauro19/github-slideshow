"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { EssayStatus } from "@/types/database";

interface PipelineEssay {
  id: string;
  title: string;
  number: number;
  active?: boolean;
}

interface PipelineColumn {
  status: EssayStatus;
  label: string;
  essays: PipelineEssay[];
}

const columns: PipelineColumn[] = [
  {
    status: "idea",
    label: "Seed",
    essays: [
      { id: "9", title: "Information Asymmetry in AI Adoption", number: 9 },
      { id: "10", title: "The Compliance Paradox", number: 10 },
    ],
  },
  {
    status: "drafting",
    label: "Draft",
    essays: [
      { id: "7", title: "Strategic Patience in Digital Transformation", number: 7, active: true },
      { id: "8", title: "Why CIOs Fail at Board Communication", number: 8 },
      { id: "11", title: "Zero-Trust as Business Strategy", number: 11 },
    ],
  },
  {
    status: "editing",
    label: "Review",
    essays: [
      { id: "6", title: "The Hidden Cost of Technical Debt", number: 6 },
    ],
  },
  {
    status: "ready",
    label: "Approved",
    essays: [
      { id: "5", title: "Rethinking Vendor Lock-In", number: 5 },
    ],
  },
  {
    status: "research",
    label: "Scheduled",
    essays: [],
  },
  {
    status: "published",
    label: "Published",
    essays: [
      { id: "4", title: "Why Your Security Budget is Wrong", number: 4 },
      { id: "3", title: "The CEO's Guide to AI Risk", number: 3 },
    ],
  },
];

export function PipelineKanban() {
  return (
    <div className="rounded-lg bg-surface p-4">
      <h2 className="mb-4 text-sm font-medium text-text-secondary">
        Essay Pipeline
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {columns.map((col) => (
          <div key={col.status} className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-md bg-surface-raised px-3 py-1.5">
              <span className="text-xs font-medium text-text-dim">
                {col.label}
              </span>
              <span className="text-xs text-text-dim">{col.essays.length}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {col.essays.map((essay) => (
                <Link
                  key={essay.id}
                  href={`/essays/${essay.id}` as any}
                  className={cn(
                    "group rounded-md border border-transparent bg-surface-raised px-3 py-2 transition-colors hover:border-text-dim/20",
                    essay.active &&
                      "ring-1 ring-amber/30 border-amber/20 bg-amber-dim"
                  )}
                >
                  <span className="block text-xs text-text-dim">
                    #{essay.number}
                  </span>
                  <span
                    className={cn(
                      "block text-xs leading-snug text-text-secondary group-hover:text-text",
                      essay.active && "text-text"
                    )}
                  >
                    {essay.title}
                  </span>
                </Link>
              ))}
              {col.essays.length === 0 && (
                <div className="rounded-md border border-dashed border-text-dim/20 px-3 py-4 text-center text-xs text-text-dim">
                  Empty
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
