"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// Subscriber data points for sparkline (last 14 days)
const subscriberData = [
  2680, 2695, 2702, 2710, 2718, 2730, 2735, 2748, 2760, 2770, 2785, 2800,
  2820, 2847,
];

function Sparkline({
  data,
  color = "var(--amber)",
}: {
  data: number[];
  color?: string;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 200;
  const height = 40;
  const padding = 2;

  const points = data
    .map((value, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  // Area fill path
  const firstX = padding;
  const lastX = padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2);
  const areaPath = `M${firstX},${height} L${points.split(" ").map((p) => p).join(" L")} L${lastX},${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-10"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkGrad)" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface StatBox {
  label: string;
  value: string;
}

const essayStats: StatBox[] = [
  { label: "Views", value: "1,243" },
  { label: "Opens", value: "847" },
  { label: "Clicks", value: "156" },
];

export function MiniAnalytics() {
  const growthPercent = 6.2;
  const isPositive = growthPercent > 0;

  return (
    <div className="rounded-lg bg-surface p-4">
      <h2 className="mb-4 text-sm font-medium text-text-secondary">
        Analytics
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Subscriber Sparkline */}
        <div className="md:col-span-1">
          <p className="mb-1 text-xs text-text-dim">Subscribers (14 days)</p>
          <Sparkline data={subscriberData} />
          <div className="mt-1 flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-green" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                isPositive ? "text-green" : "text-red"
              )}
            >
              {isPositive ? "+" : ""}
              {growthPercent}%
            </span>
            <span className="text-[10px] text-text-dim">growth</span>
          </div>
        </div>

        {/* Last Essay Performance */}
        <div className="md:col-span-2">
          <p className="mb-2 text-xs text-text-dim">
            Last Essay Performance
          </p>
          <div className="grid grid-cols-3 gap-2">
            {essayStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md bg-surface-raised px-3 py-2 text-center"
              >
                <p className="text-lg font-semibold text-text">{stat.value}</p>
                <p className="text-[10px] text-text-dim">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
