'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface Props {
  label: string;
  value: string;
  numericValue: number;
  sublabel?: string;
  color: string;
  prefix?: string;
  suffix?: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => {
    const abs = Math.abs(v);
    const sign = v < 0 ? '-' : '';
    if (abs >= 1_000_000) {
      const n = abs / 1_000_000;
      return `${sign}$${n.toFixed(1)}M`;
    }
    if (abs >= 1_000) {
      const n = abs / 1_000;
      return `${sign}$${n.toFixed(0)}K`;
    }
    return `${sign}$${Math.round(abs)}`;
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function KPICard({
  label,
  value,
  sublabel,
  color,
}: Props) {
  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ backgroundColor: color }}
      />
      <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide mt-1 mb-2">
        {label}
      </p>
      <p className="font-mono-num text-2xl font-bold text-text-primary num-transition">
        {value}
      </p>
      {sublabel && (
        <p className="text-[10px] text-text-secondary mt-1">{sublabel}</p>
      )}
    </div>
  );
}
