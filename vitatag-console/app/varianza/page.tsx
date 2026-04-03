'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, ArrowRight, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import {
  varianceData,
  varianceDailyTrend,
  varianceByLocation,
  VARIANCE_STATS,
} from '@/data/mock/variance';
import ExportButtons from '@/components/shared/ExportButtons';

const NAVY = '#0D1B2A';
const RED = '#C0392B';
const GREEN = '#1E8449';
const TEAL = '#148F77';
const AMBER = '#F39C12';

const periods = ['Hoy', 'Semana', 'Mes', 'Custom'] as const;
type Period = (typeof periods)[number];

const pdvOptions = [
  'Todos',
  'Olivia Laureles',
  'Clap Laureles',
  'Olivia Viva Envigado',
  'Olivia Arkadia',
  'Clap Envigado',
];

// Map PdV names to ingredients they specialize in (for filtering)
const pdvIngredientMap: Record<string, string[]> = {
  'Olivia Laureles': ['Solomito', 'Queso Parmesano', 'Salmón Fresco', 'Rúgula', 'Carpaccio'],
  'Clap Laureles': ['Pollo Pechuga', 'Tocineta', 'Queso Cheddar', 'Masa Pizza', 'Helado Vainilla'],
  'Olivia Viva Envigado': ['Solomito', 'Aguacate', 'Mantequilla', 'Langostinos', 'Chorizo Español'],
  'Olivia Arkadia': ['Pollo Pechuga', 'Pan Sourdough', 'Queso Parmesano', 'Aguacate', 'Carpaccio'],
  'Clap Envigado': ['Tocineta', 'Queso Cheddar', 'Masa Pizza', 'Helado Vainilla', 'Pan Sourdough'],
};

// Generate mock mini trend data for an ingredient
function generateIngredientTrend(ingredientId: string): { day: string; varianza: number }[] {
  const seed = ingredientId.charCodeAt(1) * 17;
  return Array.from({ length: 14 }, (_, i) => ({
    day: `D${i + 1}`,
    varianza: Math.round((Math.sin(seed + i * 0.7) * 3 + 4 + Math.random() * 2) * 100) / 100,
  }));
}

const recommendationsMap: Record<string, string> = {
  empeorando: 'Se recomienda auditar porciones y verificar mermas en preparación. Considerar recalibrar recetas afectadas.',
  estable: 'Varianza dentro de rango aceptable pero monitorear. Verificar estándares de porcionado periódicamente.',
  mejorando: 'Tendencia positiva. Mantener controles actuales y documentar mejores prácticas aplicadas.',
};

function formatCOP(value: number): string {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString('es-CO');
  return value < 0 ? `-$${formatted}` : `$${formatted}`;
}

export default function VarianzaPage() {
  const [period, setPeriod] = useState<Period>('Mes');
  const [pdv, setPdv] = useState('Todos');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [customStart, setCustomStart] = useState('2026-03-20');
  const [customEnd, setCustomEnd] = useState('2026-04-03');

  // Filter daily trend data based on period
  const filteredTrend = useMemo(() => {
    switch (period) {
      case 'Hoy':
        return varianceDailyTrend.slice(-1);
      case 'Semana':
        return varianceDailyTrend.slice(-7);
      case 'Mes':
        return varianceDailyTrend;
      case 'Custom': {
        // Parse custom date range and map to indices
        const startDate = new Date(customStart);
        const endDate = new Date(customEnd);
        const baseDate = new Date('2026-03-07');
        const startIdx = Math.max(0, Math.floor((startDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)));
        const endIdx = Math.min(varianceDailyTrend.length, Math.floor((endDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
        if (startIdx >= endIdx) return varianceDailyTrend.slice(-7);
        return varianceDailyTrend.slice(startIdx, endIdx);
      }
      default:
        return varianceDailyTrend;
    }
  }, [period, customStart, customEnd]);

  // Filter variance table by PdV
  const filteredVarianceData = useMemo(() => {
    if (pdv === 'Todos') return varianceData;
    const allowedIngredients = pdvIngredientMap[pdv] || [];
    return varianceData.filter((item) => allowedIngredients.includes(item.ingredient));
  }, [pdv]);

  // Prepare horizontal bar chart data
  const barData = useMemo(() => {
    return [...filteredVarianceData]
      .sort((a, b) => Math.abs(b.varianzaCOP) - Math.abs(a.varianzaCOP))
      .slice(0, 15)
      .map((d) => ({
        name: d.ingredient,
        value: d.varianzaCOP,
        fill: d.varianzaCOP >= 0 ? RED : GREEN,
      }));
  }, [filteredVarianceData]);

  // Location comparison bar chart data
  const locationBarData = useMemo(() => {
    return varianceByLocation.map((loc) => ({
      name: loc.pdv,
      varianza: loc.varianzaTotal,
      fill:
        loc.tendencia === 'empeorando' ? RED : loc.tendencia === 'mejorando' ? GREEN : AMBER,
    }));
  }, []);

  const thresholdValue = 350000;

  const tendenciaLabel = (t: string) => {
    switch (t) {
      case 'empeorando':
        return <span className="flex items-center gap-1 text-[#C0392B] font-medium">&uarr; Empeorando</span>;
      case 'mejorando':
        return <span className="flex items-center gap-1 text-[#1E8449] font-medium">&darr; Mejorando</span>;
      default:
        return <span className="flex items-center gap-1 text-[#F39C12] font-medium">&rarr; Estable</span>;
    }
  };

  // Export data
  const exportData = filteredVarianceData.map((item) => ({
    Ingrediente: item.ingredient,
    'Consumo Teórico (kg)': item.consumoTeorico,
    'Consumo Real (kg)': item.consumoReal,
    'Varianza (kg)': item.varianzaKg,
    'Varianza (%)': item.varianzaPct,
    'Varianza ($COP)': item.varianzaCOP,
    Tendencia: item.tendencia,
  }));

  const exportColumns = [
    { key: 'Ingrediente', label: 'Ingrediente' },
    { key: 'Consumo Teórico (kg)', label: 'Consumo Teórico (kg)' },
    { key: 'Consumo Real (kg)', label: 'Consumo Real (kg)' },
    { key: 'Varianza (kg)', label: 'Varianza (kg)' },
    { key: 'Varianza (%)', label: 'Varianza (%)' },
    { key: 'Varianza ($COP)', label: 'Varianza ($COP)' },
    { key: 'Tendencia', label: 'Tendencia' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold" style={{ color: NAVY }}>
              Varianza Actual vs. Teórico
            </h1>
            <span className="px-3 py-1 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: TEAL }}>
              Capa 2
            </span>
          </div>
          <p className="text-gray-500">Consumo real vs. consumo esperado por recetas</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Period selector */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  period === p
                    ? 'text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                style={period === p ? { backgroundColor: NAVY } : {}}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Custom date range */}
          {period === 'Custom' && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#148F77]"
              />
              <span className="text-gray-400 text-sm">a</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#148F77]"
              />
            </div>
          )}

          {/* PdV selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <select
              value={pdv}
              onChange={(e) => setPdv(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#148F77]"
            >
              {pdvOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl p-6 text-white" style={{ backgroundColor: RED }}>
            <p className="text-sm opacity-80 mb-1">Varianza Total</p>
            <p className="text-2xl font-bold">${VARIANCE_STATS.totalCOP.toLocaleString('es-CO')} COP</p>
          </div>
          <div className="rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Varianza %</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold" style={{ color: NAVY }}>
                {VARIANCE_STATS.totalPct}%
              </p>
              <TrendingUp className="w-5 h-5 text-[#C0392B]" />
            </div>
          </div>
          <div className="rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Ingrediente más desviado</p>
            <p className="text-2xl font-bold" style={{ color: NAVY }}>
              {VARIANCE_STATS.topIngredient}
            </p>
          </div>
          <div className="rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">PdV más desviado</p>
            <p className="text-2xl font-bold" style={{ color: NAVY }}>
              {VARIANCE_STATS.topPdV}
            </p>
          </div>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: NAVY }}>
            Top ingredientes por varianza ($COP){pdv !== 'Todos' ? ` — ${pdv}` : ''}
          </h2>
          <div className="w-full" style={{ height: Math.max(300, barData.length * 35) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 100, right: 30, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v: number) => formatCOP(v)}
                  fontSize={12}
                />
                <YAxis type="category" dataKey="name" width={90} fontSize={12} />
                <Tooltip
                  formatter={((value: number) => [formatCOP(value), 'Varianza']) as never}
                  labelStyle={{ fontWeight: 600 }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: RED }} />
              Sobreconsumo
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: GREEN }} />
              Subconsumo
            </div>
          </div>
        </div>

        {/* Detailed Table with Expandable Rows */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: NAVY }}>
              Detalle de varianza por ingrediente{pdv !== 'Todos' ? ` — ${pdv}` : ''}
            </h2>
            <ExportButtons
              data={exportData as Record<string, unknown>[]}
              filename={`varianza-${pdv === 'Todos' ? 'todos' : pdv.toLowerCase().replace(/ /g, '-')}`}
              columns={exportColumns}
            />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-600 w-8" />
                <th className="text-left py-3 px-2 font-semibold text-gray-600">Ingrediente</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">Consumo Teórico (kg)</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">Consumo Real (kg)</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">Varianza (kg)</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">Varianza (%)</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">Varianza ($COP)</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-600">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {filteredVarianceData.map((item) => {
                const isExpanded = expandedRow === item.id;
                const trendData = isExpanded ? generateIngredientTrend(item.id) : [];
                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                    >
                      <td className="py-3 px-2 text-gray-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </td>
                      <td className="py-3 px-2 font-medium" style={{ color: NAVY }}>
                        {item.ingredient}
                      </td>
                      <td className="text-right py-3 px-2 text-gray-600">{item.consumoTeorico.toFixed(1)}</td>
                      <td className="text-right py-3 px-2 text-gray-600">{item.consumoReal.toFixed(1)}</td>
                      <td
                        className="text-right py-3 px-2 font-medium"
                        style={{ color: item.varianzaKg >= 0 ? RED : GREEN }}
                      >
                        {item.varianzaKg > 0 ? '+' : ''}
                        {item.varianzaKg.toFixed(1)}
                      </td>
                      <td
                        className="text-right py-3 px-2 font-medium"
                        style={{ color: item.varianzaPct >= 0 ? RED : GREEN }}
                      >
                        {item.varianzaPct > 0 ? '+' : ''}
                        {item.varianzaPct.toFixed(1)}%
                      </td>
                      <td
                        className="text-right py-3 px-2 font-medium"
                        style={{ color: item.varianzaCOP >= 0 ? RED : GREEN }}
                      >
                        {formatCOP(item.varianzaCOP)}
                      </td>
                      <td className="text-center py-3 px-2">{tendenciaLabel(item.tendencia)}</td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <td colSpan={8} className="py-4 px-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Mini trend chart */}
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-3">
                                Tendencia de varianza — {item.ingredient}
                              </p>
                              <div style={{ height: 160 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={trendData} margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" fontSize={10} />
                                    <YAxis fontSize={10} />
                                    <Tooltip
                                      contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                                      formatter={((value: number) => [`${value} kg`, 'Varianza']) as never}
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="varianza"
                                      stroke={item.varianzaCOP >= 0 ? RED : GREEN}
                                      strokeWidth={2}
                                      dot={{ r: 2 }}
                                      activeDot={{ r: 4 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                            {/* Recommendations */}
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-3">
                                Recomendaciones
                              </p>
                              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                {recommendationsMap[item.tendencia]}
                              </p>
                              <div className="flex items-center gap-4">
                                <Link
                                  href="/patrones"
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
                                  style={{ backgroundColor: TEAL }}
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Ver patrón
                                </Link>
                                <span className="text-xs text-gray-400">
                                  Varianza acumulada: {formatCOP(item.varianzaCOP)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Daily Trend Line Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: NAVY }}>
            Varianza total diaria — {period === 'Hoy' ? 'hoy' : period === 'Semana' ? 'últimos 7 días' : period === 'Custom' ? 'rango personalizado' : 'últimas 4 semanas'}
          </h2>
          <div className="w-full" style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredTrend} margin={{ left: 20, right: 20, top: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} fontSize={11} />
                <Tooltip
                  formatter={((value: number) => [formatCOP(value), 'Varianza']) as never}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
                <ReferenceLine
                  y={thresholdValue}
                  stroke="#9CA3AF"
                  strokeDasharray="6 4"
                  label={{ value: 'Umbral 5%', position: 'right', fontSize: 11, fill: '#9CA3AF' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={RED}
                  strokeWidth={2}
                  dot={{ r: 3, fill: RED }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-[#C0392B]" />
              Varianza real
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 border-t-2 border-dashed border-gray-400" />
              Umbral 5%
            </div>
          </div>
        </div>

        {/* Location Comparison — Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4" style={{ color: NAVY }}>
            Comparación por Punto de Venta
          </h2>
          <div className="w-full" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationBarData} margin={{ left: 20, right: 20, top: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={11} tick={{ fill: '#6B7280' }} />
                <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} fontSize={11} />
                <Tooltip
                  formatter={((value: number) => [formatCOP(value), 'Varianza Total']) as never}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Bar dataKey="varianza" radius={[6, 6, 0, 0]} barSize={48}>
                  {locationBarData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend table below chart */}
          <table className="w-full text-sm mt-6">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 font-semibold text-gray-600">PdV</th>
                <th className="text-right py-2 px-2 font-semibold text-gray-600">Varianza Total</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-600">Top Ingrediente</th>
                <th className="text-center py-2 px-2 font-semibold text-gray-600">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {varianceByLocation.map((loc) => (
                <tr key={loc.pdv} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 font-medium" style={{ color: NAVY }}>
                    {loc.pdv}
                  </td>
                  <td className="text-right py-2 px-2 font-medium text-[#C0392B]">
                    {formatCOP(loc.varianzaTotal)}
                  </td>
                  <td className="py-2 px-2 text-gray-600">{loc.topIngredient}</td>
                  <td className="text-center py-2 px-2">{tendenciaLabel(loc.tendencia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
