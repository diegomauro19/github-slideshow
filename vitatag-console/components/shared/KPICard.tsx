import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  color?: string;
  trend?: "up" | "down" | "stable";
}

const trendConfig = {
  up: { icon: TrendingUp, color: "text-green", label: "En alza" },
  down: { icon: TrendingDown, color: "text-red", label: "En baja" },
  stable: { icon: Minus, color: "text-gray-400", label: "Estable" },
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "#2980B9",
  trend,
}: KPICardProps) {
  const trendInfo = trend ? trendConfig[trend] : null;
  const TrendIcon = trendInfo?.icon;

  return (
    <div className="bg-card rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
      {Icon && (
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-gray-500 font-medium mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-data font-semibold text-navy">
            {value}
          </span>
          {TrendIcon && trendInfo && (
            <TrendIcon
              className={`w-4 h-4 ${trendInfo.color}`}
              aria-label={trendInfo.label}
            />
          )}
        </div>
        {subtitle && (
          <p className="text-[12px] text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
