"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectOption } from "@/components/ui/select";
import {
  BookOpen,
  Target,
  TrendingUp,
  GraduationCap,
  Newspaper,
  ShieldAlert,
  BarChart3,
  Rocket,
} from "lucide-react";

const RESEARCH_TYPES = [
  {
    id: "topic-deep-dive",
    name: "Topic Deep Dive",
    description: "Comprehensive exploration of a subject with key concepts and subtopics",
    icon: BookOpen,
  },
  {
    id: "competitor-scan",
    name: "Competitor Scan",
    description: "Analyze competing viewpoints, products, or entities in a space",
    icon: Target,
  },
  {
    id: "trend-analysis",
    name: "Trend Analysis",
    description: "Track emerging patterns, shifts, and momentum in a domain",
    icon: TrendingUp,
  },
  {
    id: "academic-search",
    name: "Academic Search",
    description: "Find peer-reviewed papers, citations, and scholarly sources",
    icon: GraduationCap,
  },
  {
    id: "news-scan",
    name: "News Scan",
    description: "Recent coverage, press releases, and media mentions",
    icon: Newspaper,
  },
  {
    id: "counter-argument-hunt",
    name: "Counter-Argument Hunt",
    description: "Seek opposing perspectives, critiques, and rebuttals",
    icon: ShieldAlert,
  },
  {
    id: "data-hunt",
    name: "Data Hunt",
    description: "Find statistics, datasets, and quantitative evidence",
    icon: BarChart3,
  },
] as const;

const MOCK_ESSAYS = [
  { id: "essay-1", title: "The Future of Renewable Energy" },
  { id: "essay-2", title: "AI Ethics in Healthcare" },
  { id: "essay-3", title: "Urban Planning and Climate Resilience" },
  { id: "essay-4", title: "The Gig Economy: Promise and Peril" },
];

export function ResearchLauncher() {
  const [query, setQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("topic-deep-dive");
  const [linkedEssay, setLinkedEssay] = React.useState<string>("");

  const handleLaunch = () => {
    if (!query.trim()) return;
    // In a real app this would trigger the research pipeline
    console.log("Launching research:", { query, type: selectedType, linkedEssay });
  };

  return (
    <div className="rounded-lg border border-[#1e1e22] bg-[#111114] p-6 shadow-sm shadow-black/20">
      <div className="mb-5 flex items-center gap-2">
        <Rocket className="h-5 w-5 text-[#d4a843]" />
        <h2 className="text-lg font-semibold tracking-tight text-[#e8e4df]">
          Research Station
        </h2>
      </div>

      {/* Research question input */}
      <Textarea
        placeholder="What do you want to research? Be specific for better results..."
        className="mb-5 min-h-[100px] text-base"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Research type selector */}
      <p className="mb-3 text-sm font-medium text-[#9e9890]">Research Type</p>
      <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {RESEARCH_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 text-left transition-all duration-150",
                isSelected
                  ? "border-[#d4a843]/40 bg-[#d4a843]/5 ring-1 ring-[#d4a843]/20"
                  : "border-[#1e1e22] bg-[#18181c] hover:border-[#2a2a2e] hover:bg-[#1c1c20]"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                  isSelected
                    ? "bg-[#d4a843]/10 text-[#d4a843]"
                    : "bg-[#111114] text-[#9e9890]"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-[#d4a843]" : "text-[#e8e4df]"
                  )}
                >
                  {type.name}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-[#9e9890]">
                  {type.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Link to essay + launch */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 sm:max-w-xs">
          <p className="mb-1.5 text-sm font-medium text-[#9e9890]">
            Link to essay (optional)
          </p>
          <Select
            value={linkedEssay}
            onChange={(e) => setLinkedEssay(e.target.value)}
          >
            <SelectOption value="">None</SelectOption>
            {MOCK_ESSAYS.map((essay) => (
              <SelectOption key={essay.id} value={essay.id}>
                {essay.title}
              </SelectOption>
            ))}
          </Select>
        </div>

        <Button
          size="lg"
          disabled={!query.trim()}
          onClick={handleLaunch}
          className="gap-2"
        >
          <Rocket className="h-4 w-4" />
          Launch Research
        </Button>
      </div>
    </div>
  );
}
