"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lightbulb,
  BarChart3,
  ShieldAlert,
  Sparkles,
  Paperclip,
  FileText,
} from "lucide-react";

interface Finding {
  id: string;
  title: string;
  summary: string;
  detail: string;
  sourceUrl: string;
  sourceName: string;
  confidence: number; // 0-100
  relevance: number; // 0-100
  category: "key-finding" | "data-point" | "counter-argument" | "synthesis";
}

const MOCK_FINDINGS: Finding[] = [
  {
    id: "f1",
    title: "Renewable capacity surpassed fossil fuels in 2025",
    summary:
      "Global renewable energy capacity additions overtook fossil fuel additions for the first time, driven by solar and wind deployment in Asia and Europe.",
    detail:
      "According to the International Energy Agency, 2025 marked a historic tipping point where new renewable energy capacity installations (547 GW) exceeded new fossil fuel capacity (312 GW) globally. China alone accounted for 42% of new solar installations, while Europe led in offshore wind. The cost of utility-scale solar fell to $0.028/kWh, making it the cheapest source of electricity in most markets.",
    sourceUrl: "https://www.iea.org/reports/renewables-2025",
    sourceName: "IEA World Energy Outlook",
    confidence: 92,
    relevance: 95,
    category: "key-finding",
  },
  {
    id: "f2",
    title: "Battery storage costs declined 14% year-over-year",
    summary:
      "Lithium-ion battery pack prices dropped to $98/kWh, crossing the critical $100 threshold for grid-scale viability.",
    detail:
      "Bloomberg NEF reports that the average lithium-ion battery pack price reached $98/kWh in late 2025, a 14% decline from the previous year. This milestone is significant because $100/kWh has long been considered the threshold at which electric vehicles reach cost parity with internal combustion engines without subsidies. Grid-scale storage deployments grew 78% year-over-year as a result.",
    sourceUrl: "https://about.bnef.com/battery-price-survey/",
    sourceName: "Bloomberg NEF",
    confidence: 88,
    relevance: 82,
    category: "data-point",
  },
  {
    id: "f3",
    title: "Solar panel waste reaches 1.2M tonnes annually",
    summary:
      "Growing e-waste from first-generation solar panels poses recycling and environmental challenges that are largely unaddressed.",
    detail:
      "A Nature Sustainability study found that decommissioned solar panels generated approximately 1.2 million tonnes of waste in 2025, projected to reach 8 million tonnes by 2035. Current recycling rates sit at just 12%, with most panels ending up in landfills. The study argues that without robust recycling infrastructure, the environmental gains from solar adoption are partially offset by hazardous waste concerns including cadmium and lead leaching.",
    sourceUrl: "https://www.nature.com/articles/s41893-025-01234",
    sourceName: "Nature Sustainability",
    confidence: 79,
    relevance: 71,
    category: "counter-argument",
  },
  {
    id: "f4",
    title: "Grid intermittency remains the core technical barrier",
    summary:
      "Critics argue that renewables cannot reliably replace baseload power without massive storage or nuclear supplementation.",
    detail:
      "A report from the National Academy of Engineering highlights that even with battery storage breakthroughs, managing grid intermittency from wind and solar remains the primary technical challenge. The 'duck curve' phenomenon in California, where solar overproduction midday creates steep evening ramp-up requirements, has worsened. The report recommends a diversified portfolio including nuclear and green hydrogen to ensure grid reliability during extreme weather events.",
    sourceUrl: "https://www.nae.edu/grid-reliability-2025",
    sourceName: "National Academy of Engineering",
    confidence: 85,
    relevance: 88,
    category: "counter-argument",
  },
  {
    id: "f5",
    title: "Global investment in clean energy hit $1.8 trillion",
    summary:
      "Clean energy investment reached record highs, with private capital increasingly flowing into emerging markets.",
    detail:
      "The Climate Policy Initiative's Global Landscape of Climate Finance report shows $1.8 trillion in clean energy investment for 2025, up from $1.4 trillion in 2024. Notably, 34% of investment went to emerging and developing economies, up from 26% the previous year. However, the report notes this still falls short of the $4.3 trillion annual investment needed by 2030 to meet Paris Agreement targets.",
    sourceUrl: "https://www.climatepolicyinitiative.org/2025",
    sourceName: "Climate Policy Initiative",
    confidence: 91,
    relevance: 77,
    category: "data-point",
  },
  {
    id: "f6",
    title: "Synthesis: Renewable transition accelerating but incomplete",
    summary:
      "The evidence points to a clear acceleration in renewable energy adoption, but significant technical, economic, and environmental challenges remain unresolved.",
    detail:
      "Taken together, the research paints a nuanced picture. On one hand, renewables have achieved cost parity, record investment flows, and are outpacing fossil fuel capacity additions. On the other hand, grid intermittency, panel waste, and insufficient investment in developing nations represent real barriers. A credible argument for renewable energy must acknowledge these counter-arguments while emphasizing the accelerating trend lines and decreasing cost curves that make transition increasingly inevitable, if not yet complete.",
    sourceUrl: "",
    sourceName: "AI Synthesis",
    confidence: 82,
    relevance: 98,
    category: "synthesis",
  },
];

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1e1e22]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs tabular-nums text-[#9e9890]">{value}%</span>
    </div>
  );
}

function FindingCard({ finding }: { finding: Finding }) {
  const [expanded, setExpanded] = React.useState(false);

  const borderColor =
    finding.category === "counter-argument"
      ? "border-l-[#d47b7b]"
      : finding.category === "data-point"
        ? "border-l-[#7b9fd4]"
        : finding.category === "synthesis"
          ? "border-l-[#d4a843]"
          : "border-l-[#6dbf7b]";

  const categoryIcon =
    finding.category === "counter-argument" ? (
      <ShieldAlert className="h-3.5 w-3.5" />
    ) : finding.category === "data-point" ? (
      <BarChart3 className="h-3.5 w-3.5" />
    ) : finding.category === "synthesis" ? (
      <Sparkles className="h-3.5 w-3.5" />
    ) : (
      <Lightbulb className="h-3.5 w-3.5" />
    );

  const categoryBadgeVariant =
    finding.category === "counter-argument"
      ? "danger"
      : finding.category === "data-point"
        ? "info"
        : finding.category === "synthesis"
          ? "default"
          : "success";

  const categoryLabel =
    finding.category === "counter-argument"
      ? "Counter-Argument"
      : finding.category === "data-point"
        ? "Data Point"
        : finding.category === "synthesis"
          ? "Synthesis"
          : "Key Finding";

  const isSynthesis = finding.category === "synthesis";

  return (
    <div
      className={cn(
        "rounded-lg border border-l-[3px] border-[#1e1e22] transition-colors",
        borderColor,
        isSynthesis ? "bg-[#d4a843]/[0.03]" : "bg-[#18181c]"
      )}
    >
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={categoryBadgeVariant as any} className="gap-1">
              {categoryIcon}
              {categoryLabel}
            </Badge>
          </div>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 rounded-md p-1 text-[#9e9890] transition-colors hover:bg-[#111114] hover:text-[#e8e4df]"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        <h4 className="mb-1 text-sm font-medium text-[#e8e4df]">
          {finding.title}
        </h4>
        <p className="text-sm leading-relaxed text-[#9e9890]">
          {finding.summary}
        </p>

        {expanded && (
          <div className="mt-3 space-y-3">
            <p className="text-sm leading-relaxed text-[#e8e4df]/80">
              {finding.detail}
            </p>

            {finding.sourceUrl && (
              <a
                href={finding.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#7b9fd4] transition-colors hover:text-[#93b3e0]"
              >
                <ExternalLink className="h-3 w-3" />
                {finding.sourceName}
              </a>
            )}
            {!finding.sourceUrl && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#d4a843]">
                <Sparkles className="h-3 w-3" />
                {finding.sourceName}
              </span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center gap-4">
          <div className="flex-1">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-[#9e9890]/60">
              Confidence
            </p>
            <ConfidenceBar
              value={finding.confidence}
              color={finding.confidence >= 85 ? "#6dbf7b" : "#d4a843"}
            />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-[#9e9890]/60">
              Relevance
            </p>
            <ConfidenceBar
              value={finding.relevance}
              color={finding.relevance >= 85 ? "#6dbf7b" : "#7b9fd4"}
            />
          </div>
          <Button variant="ghost" size="sm" className="shrink-0 gap-1.5 text-xs">
            <FileText className="h-3 w-3" />
            Use in essay
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ResearchResults() {
  const keyFindings = MOCK_FINDINGS.filter((f) => f.category === "key-finding");
  const dataPoints = MOCK_FINDINGS.filter((f) => f.category === "data-point");
  const counterArguments = MOCK_FINDINGS.filter(
    (f) => f.category === "counter-argument"
  );
  const synthesis = MOCK_FINDINGS.filter((f) => f.category === "synthesis");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#e8e4df]">
          Research Results
        </h3>
        <Button variant="secondary" size="sm" className="gap-1.5">
          <Paperclip className="h-3.5 w-3.5" />
          Attach to essay
        </Button>
      </div>

      {/* Key Findings */}
      {keyFindings.length > 0 && (
        <section>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#6dbf7b]">
            <Lightbulb className="h-4 w-4" />
            Key Findings
          </h4>
          <div className="space-y-2">
            {keyFindings.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </div>
        </section>
      )}

      {/* Data Points */}
      {dataPoints.length > 0 && (
        <section>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#7b9fd4]">
            <BarChart3 className="h-4 w-4" />
            Data Points
          </h4>
          <div className="space-y-2">
            {dataPoints.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </div>
        </section>
      )}

      {/* Counter-Arguments */}
      {counterArguments.length > 0 && (
        <section>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#d47b7b]">
            <ShieldAlert className="h-4 w-4" />
            Counter-Arguments
          </h4>
          <div className="space-y-2">
            {counterArguments.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </div>
        </section>
      )}

      {/* Synthesis */}
      {synthesis.length > 0 && (
        <section>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#d4a843]">
            <Sparkles className="h-4 w-4" />
            Synthesis
          </h4>
          <div className="space-y-2">
            {synthesis.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
