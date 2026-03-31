'use client';

import { formatCurrencyShort } from '@/lib/format';

interface Props {
  label: string;
  manualValue: number;
  proposedValue: number;
}

export default function ComparisonBar({ label, manualValue, proposedValue }: Props) {
  const maxVal = Math.max(manualValue, proposedValue, 1);
  const manualWidth = (manualValue / maxVal) * 100;
  const proposedWidth = (proposedValue / maxVal) * 100;

  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-text-primary mb-2">{label}</p>
      <div className="space-y-1.5">
        {/* Manual bar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary w-14 shrink-0">Manual</span>
          <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full bg-negative/80 rounded-full flex items-center justify-end px-2 transition-all duration-500"
              style={{ width: `${Math.max(manualWidth, 8)}%` }}
            >
              <span className="font-mono-num text-[10px] font-semibold text-white whitespace-nowrap">
                {formatCurrencyShort(manualValue)}
              </span>
            </div>
          </div>
        </div>
        {/* Proposed bar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary w-14 shrink-0">Propuesto</span>
          <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full bg-positive/80 rounded-full flex items-center justify-end px-2 transition-all duration-500"
              style={{ width: `${Math.max(proposedWidth, 8)}%` }}
            >
              <span className="font-mono-num text-[10px] font-semibold text-white whitespace-nowrap">
                {formatCurrencyShort(proposedValue)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
