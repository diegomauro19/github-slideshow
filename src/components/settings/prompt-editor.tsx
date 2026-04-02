"use client";

import { useState } from "react";
import { Save, RotateCcw, History, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type PromptTab = "draft" | "copy-edit" | "research" | "wargaming" | "social" | "growth";

const defaultPrompts: Record<PromptTab, string> = {
  draft: `You are a writing assistant for a leadership newsletter called "Lumen." Your role is to help draft essays that are sharp, opinionated, and grounded in real operational experience.

Tone: Direct, confident, occasionally provocative. Avoid corporate jargon. Write like you're explaining something to a smart friend over coffee.

Structure: Open with a hook (counterintuitive insight or vivid scenario). Build the argument in 3-4 sections. Close with a clear takeaway the reader can apply Monday morning.

Length: 1,200-1,800 words.`,
  "copy-edit": `You are a meticulous copy editor for the Lumen newsletter. Your job is to tighten prose, fix grammar, improve clarity, and ensure consistency with the Lumen style guide.

Rules: Prefer active voice. Cut adverbs ruthlessly. One idea per paragraph. No sentences over 25 words. Oxford comma always.`,
  research: `You are a research assistant for the Lumen newsletter. Your job is to find supporting evidence, counterarguments, and real-world examples for essay topics.

Focus on: academic research, industry reports, historical case studies, and contrarian viewpoints. Always cite sources with links.`,
  wargaming: `You are a strategic wargaming partner. When given an essay draft or argument, your job is to stress-test it from multiple angles.

Approach: Play devil's advocate. Identify logical gaps. Surface counterexamples. Rate argument strength on a 1-10 scale. Suggest the strongest possible counter-argument.`,
  social: `You are a social media strategist for the Lumen newsletter. Your job is to create engaging social posts that drive traffic to new essays.

Platforms: Twitter/X (threads of 3-5 tweets), LinkedIn (professional angle), and email teaser copy. Each should have a unique angle, not just a summary.`,
  growth: `You are a growth strategist for the Lumen newsletter. Your job is to analyze subscriber data, suggest growth tactics, and optimize conversion funnels.

Focus on: subscriber acquisition, retention, paid conversion, and strategic partnerships. Be specific and data-driven in recommendations.`,
};

const mockVersionHistory: Record<PromptTab, string[]> = {
  draft: ["2026-04-01 14:32", "2026-03-18 09:15", "2026-03-02 16:48", "2026-02-14 11:20"],
  "copy-edit": ["2026-03-25 10:00", "2026-02-20 14:30"],
  research: ["2026-03-30 08:45", "2026-03-01 12:00"],
  wargaming: ["2026-04-01 16:00", "2026-03-15 09:30"],
  social: ["2026-03-28 13:20"],
  growth: ["2026-03-22 11:10"],
};

const tabLabels: Record<PromptTab, string> = {
  draft: "Draft",
  "copy-edit": "Copy Edit",
  research: "Research",
  wargaming: "Wargaming",
  social: "Social",
  growth: "Growth",
};

export function PromptEditor() {
  const [activeTab, setActiveTab] = useState<PromptTab>("draft");
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [showHistory, setShowHistory] = useState(false);

  const tabs = Object.keys(tabLabels) as PromptTab[];
  const versions = mockVersionHistory[activeTab];

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Main editor */}
      <div className="flex-1">
        {/* Tab selector */}
        <div className="flex flex-wrap gap-1 rounded-lg border border-surface-raised bg-surface-raised/30 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab
                  ? "bg-surface-raised text-text"
                  : "text-text-dim hover:text-text-secondary"
              )}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={prompts[activeTab]}
          onChange={(e) =>
            setPrompts((prev) => ({ ...prev, [activeTab]: e.target.value }))
          }
          className="mt-3 h-[280px] w-full resize-y rounded-lg border border-surface-raised bg-bg p-4 text-xs leading-relaxed text-text outline-none placeholder:text-text-dim focus:border-amber/50"
          spellCheck={false}
        />

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 text-[11px] text-text-dim transition-colors hover:text-text-secondary lg:hidden"
          >
            <History className="h-3 w-3" />
            Version History
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPrompts((prev) => ({ ...prev, [activeTab]: defaultPrompts[activeTab] }))}
              className="flex items-center gap-1 rounded-md border border-surface-raised px-3 py-1.5 text-[11px] font-medium text-text-secondary transition-colors hover:border-text-dim hover:text-text"
            >
              <RotateCcw className="h-3 w-3" />
              Reset to Default
            </button>
            <button className="flex items-center gap-1 rounded-md bg-amber px-4 py-1.5 text-[11px] font-semibold text-bg transition-opacity hover:opacity-90">
              <Save className="h-3 w-3" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Version history sidebar */}
      <div
        className={cn(
          "w-full shrink-0 lg:block lg:w-48",
          showHistory ? "block" : "hidden"
        )}
      >
        <div className="rounded-lg border border-surface-raised bg-surface-raised/30 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
            <History className="h-3 w-3" />
            Version History
          </div>
          <div className="mt-3 space-y-1.5">
            {versions.map((v, i) => (
              <button
                key={v}
                className={cn(
                  "flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-[10px] transition-colors",
                  i === 0
                    ? "bg-surface-raised text-text"
                    : "text-text-dim hover:bg-surface-raised/50 hover:text-text-secondary"
                )}
              >
                <Clock className="h-2.5 w-2.5 shrink-0" />
                <span>{v}</span>
                {i === 0 && (
                  <span className="ml-auto text-[9px] text-amber">current</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
