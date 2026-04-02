"use client";

import { Users, TrendingUp, UserPlus, Crown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface WeekData {
  week: string;
  total: number;
}

const mockWeeklyData: WeekData[] = [
  { week: "W1", total: 2180 },
  { week: "W2", total: 2210 },
  { week: "W3", total: 2265 },
  { week: "W4", total: 2290 },
  { week: "W5", total: 2340 },
  { week: "W6", total: 2395 },
  { week: "W7", total: 2450 },
  { week: "W8", total: 2520 },
  { week: "W9", total: 2580 },
  { week: "W10", total: 2650 },
  { week: "W11", total: 2740 },
  { week: "W12", total: 2847 },
];

const projectionData: WeekData[] = [
  { week: "W12", total: 2847 },
  { week: "W13", total: 2930 },
  { week: "W14", total: 3020 },
  { week: "W15", total: 3115 },
  { week: "W16", total: 3210 },
];

const totalSubscribers = 2847;
const freeSubscribers = 2534;
const paidSubscribers = 313;
const freePct = ((freeSubscribers / totalSubscribers) * 100).toFixed(1);
const paidPct = ((paidSubscribers / totalSubscribers) * 100).toFixed(1);
const wowGrowth = 3.9;
const momGrowth = 14.2;

function MiniLineChart() {
  const allData = [...mockWeeklyData];
  const min = Math.min(...allData.map((d) => d.total));
  const max = Math.max(...projectionData.map((d) => d.total));
  const range = max - min || 1;

  const chartW = 480;
  const chartH = 100;
  const pad = 8;
  const innerW = chartW - pad * 2;
  const innerH = chartH - pad * 2;

  const toX = (i: number, len: number) => pad + (i / (len - 1)) * innerW;
  const toY = (val: number) => pad + innerH - ((val - min) / range) * innerH;

  const mainPoints = allData.map((d, i) => `${toX(i, allData.length)},${toY(d.total)}`).join(" ");

  const projStartX = toX(allData.length - 1, allData.length);
  const projPoints = projectionData
    .map((d, i) => {
      const x = projStartX + (i / (projectionData.length - 1)) * (innerW - projStartX + pad);
      return `${x},${toY(d.total)}`;
    })
    .join(" ");

  const gradientId = "subGradient";

  // Build area path for main data
  const areaPath =
    `M ${toX(0, allData.length)},${chartH - pad} ` +
    allData.map((d, i) => `L ${toX(i, allData.length)},${toY(d.total)}`).join(" ") +
    ` L ${toX(allData.length - 1, allData.length)},${chartH - pad} Z`;

  return (
    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6dbf7b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6dbf7b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <polyline points={mainPoints} fill="none" stroke="#6dbf7b" strokeWidth="2" />
      <polyline
        points={projPoints}
        fill="none"
        stroke="#6dbf7b"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.5"
      />
    </svg>
  );
}

export function SubscriberMetrics() {
  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      <div className="flex flex-col gap-6 p-5 lg:flex-row">
        {/* Big number + breakdown */}
        <div className="flex shrink-0 flex-col justify-between gap-4 lg:w-[260px]">
          <div>
            <p className="text-xs font-medium text-text-dim">Total Subscribers</p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-text">
              {totalSubscribers.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-text-dim" />
                <span className="text-xs text-text-secondary">Free</span>
              </div>
              <span className="text-xs font-medium text-text">
                {freeSubscribers.toLocaleString()}{" "}
                <span className="text-text-dim">({freePct}%)</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5 text-amber" />
                <span className="text-xs text-text-secondary">Paid</span>
              </div>
              <span className="text-xs font-medium text-text">
                {paidSubscribers.toLocaleString()}{" "}
                <span className="text-text-dim">({paidPct}%)</span>
              </span>
            </div>
            {/* Bar */}
            <div className="flex h-2 overflow-hidden rounded-full bg-surface-raised">
              <div className="bg-green" style={{ width: `${freePct}%` }} />
              <div className="bg-amber" style={{ width: `${paidPct}%` }} />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green" />
              <span className="text-xs text-text-secondary">
                WoW <span className="font-semibold text-green">+{wowGrowth}%</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <UserPlus className="h-3 w-3 text-green" />
              <span className="text-xs text-text-secondary">
                MoM <span className="font-semibold text-green">+{momGrowth}%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1">
          <p className="mb-2 text-xs font-medium text-text-dim">Growth (12 weeks + projection)</p>
          <div className="h-[120px] w-full">
            <MiniLineChart />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-text-dim">
            {mockWeeklyData.filter((_, i) => i % 3 === 0).map((d) => (
              <span key={d.week}>{d.week}</span>
            ))}
            <span className="text-green/50">W16 (proj)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
