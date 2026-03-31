'use client';

import { motion } from 'framer-motion';
import { Solution } from '@/lib/types';

interface Props {
  solution: Solution;
  active: boolean;
  onToggle: () => void;
}

export default function SolutionToggle({ solution, active, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left rounded-xl p-4 border-2 transition-all duration-300 ${
        active
          ? 'bg-white shadow-sm'
          : 'bg-gray-50/50 border-gray-200 opacity-70 hover:opacity-90'
      }`}
      style={{
        borderColor: active ? solution.color : undefined,
        boxShadow: active ? `0 0 0 1px ${solution.color}15` : undefined,
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">{solution.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading font-semibold text-sm text-text-primary truncate">
              {solution.shortName}
            </span>
            <span
              className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full shrink-0"
              style={{
                backgroundColor: active ? `${solution.color}15` : '#F3F4F6',
                color: active ? solution.color : '#9CA3AF',
              }}
            >
              {solution.type}
            </span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
            {solution.description}
          </p>
        </div>
        {/* Toggle indicator */}
        <div
          className={`w-10 h-6 rounded-full flex items-center shrink-0 transition-all duration-300 ${
            active ? 'justify-end' : 'justify-start bg-gray-300'
          }`}
          style={{ backgroundColor: active ? solution.color : undefined }}
        >
          <motion.div
            layout
            className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm"
          />
        </div>
      </div>
    </motion.button>
  );
}
