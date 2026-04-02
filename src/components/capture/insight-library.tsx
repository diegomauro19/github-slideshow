"use client";

import * as React from "react";
import {
  Search,
  Mic,
  FileText,
  Hash,
  Link,
  MessageSquare,
  BookOpen,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type InsightSource = "voice" | "text" | "slack" | "research";
type FilterType = "all" | "unused" | InsightSource;

interface Insight {
  id: string;
  content: string;
  source: InsightSource;
  tags: string[];
  date: string;
  used: boolean;
  client?: string;
}

const MOCK_INSIGHTS: Insight[] = [
  {
    id: "1",
    content:
      "The shift from feature-driven to narrative-driven product launches is accelerating. Companies that tell stories outperform those that list specs by 3x in engagement.",
    source: "voice",
    tags: ["product-strategy", "storytelling"],
    date: "2026-04-01",
    used: false,
    client: "@alpine",
  },
  {
    id: "2",
    content:
      "Internal research shows that onboarding flows with emotional resonance reduce churn by 18% in the first 30 days.",
    source: "research",
    tags: ["onboarding", "retention"],
    date: "2026-03-30",
    used: true,
  },
  {
    id: "3",
    content:
      "Client mentioned that their board is pushing for a thought leadership strategy. They want to own the conversation around sustainable supply chains.",
    source: "text",
    tags: ["thought-leadership", "sustainability"],
    date: "2026-03-28",
    used: false,
    client: "@meridian",
  },
  {
    id: "4",
    content:
      "Slack thread about the gap between B2B brand voice guides and actual LinkedIn execution. Most companies sound identical.",
    source: "slack",
    tags: ["brand-voice", "linkedin"],
    date: "2026-03-27",
    used: false,
  },
  {
    id: "5",
    content:
      "Voice note: The best ghostwritten essays feel like overhearing a private conversation between two experts. That intimacy is the magic.",
    source: "voice",
    tags: ["ghostwriting", "craft"],
    date: "2026-03-25",
    used: true,
  },
  {
    id: "6",
    content:
      "Research finding: LinkedIn posts with a single concrete metric in the opening line see 2.4x higher click-through than abstract openings.",
    source: "research",
    tags: ["linkedin", "metrics"],
    date: "2026-03-24",
    used: false,
  },
  {
    id: "7",
    content:
      "Team discussion about building a content flywheel where each essay spawns 5 derivative pieces. Need to systematize this.",
    source: "slack",
    tags: ["content-ops", "repurposing"],
    date: "2026-03-22",
    used: true,
  },
  {
    id: "8",
    content:
      "The concept of 'strategic ambiguity' in executive comms - saying enough to be bold, not enough to be wrong. Explore this for @northstar.",
    source: "text",
    tags: ["exec-comms", "strategy"],
    date: "2026-03-20",
    used: false,
    client: "@northstar",
  },
  {
    id: "9",
    content:
      "Noticed that essays framed as 'lessons learned' consistently outperform 'how-to' formats for senior audiences. Worth testing more.",
    source: "voice",
    tags: ["content-format", "audience"],
    date: "2026-03-18",
    used: false,
  },
];

const SOURCE_ICON: Record<InsightSource, React.ReactNode> = {
  voice: <Mic className="h-3 w-3" />,
  text: <FileText className="h-3 w-3" />,
  slack: <MessageSquare className="h-3 w-3" />,
  research: <BookOpen className="h-3 w-3" />,
};

const SOURCE_VARIANT: Record<InsightSource, "default" | "secondary" | "info" | "purple"> = {
  voice: "default",
  text: "secondary",
  slack: "info",
  research: "purple",
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Unused", value: "unused" },
  { label: "Voice", value: "voice" },
  { label: "Text", value: "text" },
  { label: "Slack", value: "slack" },
  { label: "Research", value: "research" },
];

export function InsightLibrary() {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<FilterType>("all");

  const filtered = React.useMemo(() => {
    let results = MOCK_INSIGHTS;

    if (filter === "unused") {
      results = results.filter((i) => !i.used);
    } else if (filter !== "all") {
      results = results.filter((i) => i.source === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (i) =>
          i.content.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)) ||
          (i.client && i.client.toLowerCase().includes(q))
      );
    }

    return results;
  }, [search, filter]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#d4a843]" />
          Insight Library
          <Badge variant="secondary" className="ml-auto">
            {MOCK_INSIGHTS.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5e5a54]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search insights..."
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                filter === f.value
                  ? "bg-[#d4a843]/15 text-[#d4a843] border border-[#d4a843]/30"
                  : "bg-[#18181c] text-[#9e9890] border border-[#2a2a2e] hover:border-[#3a3a3e] hover:text-[#e8e4df]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Insight list */}
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-[#5e5a54]">
              No insights match your search.
            </p>
          )}
          {filtered.map((insight) => (
            <div
              key={insight.id}
              className={cn(
                "rounded-lg border border-[#1e1e22] bg-[#18181c] p-3 transition-colors hover:border-[#2a2a2e]",
                insight.used && "opacity-60"
              )}
            >
              {/* Top row: source badge + used indicator */}
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={SOURCE_VARIANT[insight.source]}>
                    <span className="mr-1 inline-flex">{SOURCE_ICON[insight.source]}</span>
                    {insight.source}
                  </Badge>
                  {insight.client && (
                    <span className="text-xs font-medium text-[#d4a843]">
                      {insight.client}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {insight.used ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6dbf7b]" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-[#9e9890]" />
                  )}
                  <span className="text-[10px] text-[#9e9890]">
                    {insight.used ? "Used" : "Unused"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <p className="mb-2 text-sm leading-relaxed text-[#e8e4df] line-clamp-3">
                {insight.content}
              </p>

              {/* Tags + date */}
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-0.5 text-[10px] text-[#7b9fd4]"
                  >
                    <Hash className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-[10px] text-[#5e5a54]">
                  {insight.date}
                </span>
              </div>

              {/* Link to essay */}
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
              >
                <Link className="mr-1 h-3 w-3" />
                Link to essay
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
