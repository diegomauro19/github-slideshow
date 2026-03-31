/**
 * Format number as Colombian currency (abbreviated)
 * $400.000.000 → "$400M"
 * $15.800.000 → "$15.8M"
 * $4.000.000 → "$4.0M"
 * $35.000 → "$35K"
 */
export function formatCurrencyShort(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (abs >= 1_000_000_000) {
    const n = abs / 1_000_000_000;
    return `${sign}$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}B`;
  }
  if (abs >= 1_000_000) {
    const n = abs / 1_000_000;
    return `${sign}$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    const n = abs / 1_000;
    return `${sign}$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}K`;
  }
  return `${sign}$${Math.round(abs)}`;
}

/**
 * Format number as full Colombian currency
 * 17600000 → "$17.600.000"
 */
export function formatCurrencyFull(value: number): string {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(Math.round(value));
  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}$${formatted}`;
}

/**
 * Format decimal as percentage: 0.44 → "44.0%"
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Format hours: 4 → "4.0h"
 */
export function formatHours(value: number): string {
  return `${value.toFixed(1)}h`;
}

/**
 * Format a value based on its format type
 */
export function formatValue(value: number, format: 'currency' | 'percentage' | 'hours'): string {
  switch (format) {
    case 'currency':
      return formatCurrencyShort(value);
    case 'percentage':
      return formatPercentage(value);
    case 'hours':
      return formatHours(value);
  }
}

/**
 * Format days: 45 → "45 días"
 */
export function formatDays(days: number): string {
  if (days >= 9999) return '∞';
  return `${days} días`;
}

/**
 * Format ROI: 2293.5 → "2,293%"
 */
export function formatROI(roi: number): string {
  if (roi >= 10000) return `${(roi / 1000).toFixed(0)}K%`;
  return `${Math.round(roi).toLocaleString('es-CO')}%`;
}
