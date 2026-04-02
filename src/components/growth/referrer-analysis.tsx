"use client";

import { cn } from "@/lib/utils/cn";

interface ReferrerData {
  source: string;
  count: number;
  color: string;
}

const mockReferrers: ReferrerData[] = [
  { source: "Direct", count: 980, color: "#d4a843" },
  { source: "Twitter/X", count: 620, color: "#7b9fd4" },
  { source: "LinkedIn", count: 445, color: "#6dbf7b" },
  { source: "Google", count: 380, color: "#b39bd4" },
  { source: "Substack Discover", count: 290, color: "#d47b7b" },
  { source: "Other", count: 132, color: "#5e5a54" },
];

const total = mockReferrers.reduce((s, r) => s + r.count, 0);

function PieChart() {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 60;
  const innerR = 36;

  let cumAngle = -90;
  const slices = mockReferrers.map((ref) => {
    const angle = (ref.count / total) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;

    const d = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      "Z",
    ].join(" ");

    return { ...ref, d };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-[160px] w-[160px]">
      {slices.map((slice) => (
        <path
          key={slice.source}
          d={slice.d}
          fill={slice.color}
          stroke="#111114"
          strokeWidth="1.5"
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-text text-lg font-bold" fontSize="18">
        {total.toLocaleString()}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="fill-text-dim" fontSize="9">
        total referrals
      </text>
    </svg>
  );
}

export function ReferrerAnalysis() {
  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      <div className="border-b border-surface-raised px-4 py-3">
        <h3 className="text-sm font-semibold text-text">Referrer Breakdown</h3>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 sm:flex-row sm:items-start">
        <PieChart />
        <div className="flex-1 space-y-2">
          {mockReferrers.map((ref) => {
            const pct = ((ref.count / total) * 100).toFixed(1);
            return (
              <div key={ref.source} className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: ref.color }}
                />
                <span className="flex-1 text-xs text-text-secondary">{ref.source}</span>
                <span className="text-xs font-medium text-text">{ref.count.toLocaleString()}</span>
                <span className="w-10 text-right text-[10px] text-text-dim">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
