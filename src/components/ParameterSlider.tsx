'use client';

import { ParameterConfig } from '@/lib/types';
import { formatValue } from '@/lib/format';

interface Props {
  config: ParameterConfig;
  value: number;
  onChange: (value: number) => void;
}

export default function ParameterSlider({ config, value, onChange }: Props) {
  const percentage = ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-1.5">
        <label className="text-xs font-medium text-text-primary leading-tight">
          {config.label}
        </label>
        <span className="font-mono-num text-sm font-semibold text-accent ml-2 shrink-0">
          {formatValue(value, config.format)}
        </span>
      </div>
      {config.sublabel && (
        <p className="text-[10px] text-text-secondary mb-2 leading-tight">
          {config.sublabel}
        </p>
      )}
      <div className="relative">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #2980B9 0%, #2980B9 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
          }}
        />
      </div>
    </div>
  );
}
