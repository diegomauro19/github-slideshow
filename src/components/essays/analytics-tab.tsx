"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Mail,
  MousePointer,
  UserPlus,
  Share2,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
} from "lucide-react";

interface Metric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const METRICS: Metric[] = [
  { label: "Views", value: "4,218", change: 12, icon: <Eye className="h-4 w-4" /> },
  { label: "Opens", value: "2,847", change: 8, icon: <Mail className="h-4 w-4" /> },
  { label: "Clicks", value: "312", change: -3, icon: <MousePointer className="h-4 w-4" /> },
  { label: "New Subscribers", value: "47", change: 22, icon: <UserPlus className="h-4 w-4" /> },
  { label: "Shares", value: "89", change: 15, icon: <Share2 className="h-4 w-4" /> },
];

const DAILY_DATA = [
  { day: "Mon", value: 820 },
  { day: "Tue", value: 1240 },
  { day: "Wed", value: 680 },
  { day: "Thu", value: 520 },
  { day: "Fri", value: 410 },
  { day: "Sat", value: 290 },
  { day: "Sun", value: 258 },
];

const REFERRERS = [
  { source: "Substack email", visits: 1842, pct: 43.7 },
  { source: "Twitter / X", visits: 891, pct: 21.1 },
  { source: "LinkedIn", visits: 624, pct: 14.8 },
  { source: "Direct", visits: 418, pct: 9.9 },
  { source: "Google Search", visits: 267, pct: 6.3 },
  { source: "Other", visits: 176, pct: 4.2 },
];

const MAX_BAR_VALUE = Math.max(...DAILY_DATA.map((d) => d.value));

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-5 gap-3">
        {METRICS.map((metric) => (
          <Card key={metric.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#5e5a54]">{metric.icon}</span>
              <div className="flex items-center gap-1">
                {metric.change > 0 && (
                  <TrendingUp className="h-3 w-3 text-[#6dbf7b]" />
                )}
                {metric.change < 0 && (
                  <TrendingDown className="h-3 w-3 text-[#d47b7b]" />
                )}
                {metric.change === 0 && (
                  <Minus className="h-3 w-3 text-[#5e5a54]" />
                )}
                <span
                  className={cn(
                    "text-[11px]",
                    metric.change > 0
                      ? "text-[#6dbf7b]"
                      : metric.change < 0
                        ? "text-[#d47b7b]"
                        : "text-[#5e5a54]"
                  )}
                >
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
              </div>
            </div>
            <p className="text-xl font-bold text-[#e8e4df]">{metric.value}</p>
            <p className="text-xs text-[#5e5a54] mt-0.5">{metric.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* Bar Chart */}
        <div>
          <h3 className="text-sm font-medium text-[#9e9890] mb-3">
            Daily Performance
          </h3>
          <Card className="p-6">
            <div className="flex items-end gap-3 h-[200px]">
              {DAILY_DATA.map((d) => {
                const height = (d.value / MAX_BAR_VALUE) * 100;
                return (
                  <div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <span className="text-[10px] text-[#5e5a54]">
                      {d.value}
                    </span>
                    <div className="w-full flex items-end h-[160px]">
                      <div
                        className="w-full rounded-t-sm bg-[#d4a843]/20 border border-[#d4a843]/30 hover:bg-[#d4a843]/30 transition-colors"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-[#5e5a54]">{d.day}</span>
                  </div>
                );
              })}
            </div>
            {/* Average line label */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1e1e22]">
              <div className="w-6 h-px bg-[#9e9890]" />
              <span className="text-[11px] text-[#5e5a54]">
                Essay average: 3,120 views
              </span>
              <Badge
                variant="success"
                className="text-[10px] ml-auto"
              >
                +35% above avg
              </Badge>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* AI Performance Note */}
          <div>
            <h3 className="text-sm font-medium text-[#9e9890] mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#d4a843]" />
              AI Performance Note
            </h3>
            <Card className="p-4 border-l-2 border-l-[#d4a843]/40">
              <p className="text-sm text-[#e8e4df]/80 leading-relaxed">
                This essay outperformed your average by 35%. The strong opening
                hook (&ldquo;cathedral on quicksand&rdquo;) drove high initial
                engagement. The Twitter thread format generated 3x more shares
                than your typical LinkedIn-only distribution. Consider using
                thread format for future essays with strong metaphors.
              </p>
            </Card>
          </div>

          {/* Referrer Breakdown */}
          <div>
            <h3 className="text-sm font-medium text-[#9e9890] mb-3">
              Referrer Breakdown
            </h3>
            <Card className="p-0 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#1e1e22]">
                    <th className="text-left text-[#5e5a54] font-medium p-3 pb-2">
                      Source
                    </th>
                    <th className="text-right text-[#5e5a54] font-medium p-3 pb-2">
                      Visits
                    </th>
                    <th className="text-right text-[#5e5a54] font-medium p-3 pb-2">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {REFERRERS.map((ref) => (
                    <tr
                      key={ref.source}
                      className="border-b border-[#1e1e22] last:border-0"
                    >
                      <td className="p-3 text-[#e8e4df]">{ref.source}</td>
                      <td className="p-3 text-right text-[#9e9890]">
                        {ref.visits.toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-[#5e5a54]">
                        {ref.pct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
