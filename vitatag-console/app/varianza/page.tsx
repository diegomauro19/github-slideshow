'use client';

import { useState } from 'react';
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
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, ArrowRight, MapPin } from 'lucide-react';
import {
  varianceData,
  varianceDailyTrend,
  varianceByLocation,
  VARIANCE_STATS,
} from '@/data/mock/variance';

const periods = ['Hoy', 'Semana', 'Mes', 'Custom'] as const;
const pdvOptions = [
  'Todos',
  'Olivia Laureles',
  'Clap Laureles',
  'Olivia Viva Envigado',
  'Olivia Arkadia',
  'Clap Envigado',
];

function formatCOP(value: number): string {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString('es-CO');
  return value < 0 ? `-$${formatted}` : `$${formatted}`;
}

export default function VarianzaPage() {
  const [period, setPeriod] = useState<(typeof periods)[number]>('Semana');
  const [pdv, setPdv] = useState('Todos');

  // Prepare horizontal bar chart data — top 15 sorted by absolute variance descending
  const barData = [...varianceData]
    .sort((a, b) => Math.abs(b.varianzaCOP) - Math.abs(a.varianzaCOP))
    .slice(0, 15)
    .map((d) => ({
      name: d.ingredient,
      value: d.varianzaCOP,
      fill: d.varianzaCOP >= 0 ? '#C0392B' : '#1E8449',
    }));

  // Daily trend with threshold line
  const maxTrend = Math.max(...varianceDailyTrend.map((d) => d.value));
  const threshold = maxTrend * 0.05 > 0 ? varianceDailyTrend.map((d) => d.value).reduce((a, b) => a + b, 0) / varianceDailyTrend.length * 0.05 : 0;
  // 5% threshold as a flat reference value (simulated as 5% of average theoretical daily consumption)
  const thresholdValue = 350000; // representative threshold line

  const tendenciaIcon = (t: string) => {
    switch (t) {
      case 'empeorando':
        return <ArrowUpRight className="w-4 h-4 text-[#C0392B]" />;
      case 'mejorando':
        return <ArrowDownRight className="w-4 h-4 text-[#1E8449]" />;
      default:
        return <ArrowRight className="w-4 h-4 text-[#F39C12]" />;
    }
  };

  const tendenciaLabel = (t: string) => {
    switch (t) {
      case 'empeorando':
        return <span className="flex items-center gap-1 text-[#C0392B] font-medium">↑ Empeorando</span>;
      case 'mejorando':
        return <span className="flex items-center gap-1 text-[#1E8449] font-medium">↓ Mejorando</span>;
      default:
        return <span className="flex items-center gap-1 text-[#F39C12] font-medium">→ Estable</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold" style={{ color: '#0D1B2A' }}>
              Varianza Actual vs. Teórico
            </h1>
            <span className="px-3 py-1 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: '#148F77' }}>
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
                style={period === p ? { backgroundColor: '#0D1B2A' } : {}}
              >
                {p}
              </button>
            ))}
          </div>

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
          {/* Varianza Total */}
          <div className="rounded-xl p-6 text-white" style={{ backgroundColor: '#C0392B' }}>
            <p className="text-sm opacity-80 mb-1">Varianza Total</p>
            <p className="text-2xl font-bold">${VARIANCE_STATS.totalCOP.toLocaleString('es-CO')} COP</p>
          </div>

          {/* Varianza % */}
          <div className="rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Varianza %</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold" style={{ color: '#0D1B2A' }}>
                {VARIANCE_STATS.totalPct}%
              </p>
              <TrendingUp className="w-5 h-5 text-[#C0392B]" />
            </div>
          </div>

          {/* Ingrediente más desviado */}
          <div className="rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Ingrediente más desviado</p>
            <p className="text-2xl font-bold" style={{ color: '#0D1B2A' }}>
              {VARIANCE_STATS.topIngredient}
            </p>
          </div>

          {/* PdV más desviado */}
          <div className="rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">PdV más desviado</p>
            <p className="text-2xl font-bold" style={{ color: '#0D1B2A' }}>
              {VARIANCE_STATS.topPdV}
            </p>
          </div>
        </div>

        {/* Horizontal Bar Chart — Top 15 ingredients */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#0D1B2A' }}>
            Top 15 ingredientes por varianza ($COP)
          </h2>
          <div className="w-full" style={{ height: 500 }}>
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
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, idx) => (
                    <rect key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#C0392B' }} />
              Sobreconsumo
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1E8449' }} />
              Subconsumo
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#0D1B2A' }}>
            Detalle de varianza por ingrediente
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
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
              {varianceData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium" style={{ color: '#0D1B2A' }}>
                    {item.ingredient}
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">{item.consumoTeorico.toFixed(1)}</td>
                  <td className="text-right py-3 px-2 text-gray-600">{item.consumoReal.toFixed(1)}</td>
                  <td
                    className="text-right py-3 px-2 font-medium"
                    style={{ color: item.varianzaKg >= 0 ? '#C0392B' : '#1E8449' }}
                  >
                    {item.varianzaKg > 0 ? '+' : ''}
                    {item.varianzaKg.toFixed(1)}
                  </td>
                  <td
                    className="text-right py-3 px-2 font-medium"
                    style={{ color: item.varianzaPct >= 0 ? '#C0392B' : '#1E8449' }}
                  >
                    {item.varianzaPct > 0 ? '+' : ''}
                    {item.varianzaPct.toFixed(1)}%
                  </td>
                  <td
                    className="text-right py-3 px-2 font-medium"
                    style={{ color: item.varianzaCOP >= 0 ? '#C0392B' : '#1E8449' }}
                  >
                    {formatCOP(item.varianzaCOP)}
                  </td>
                  <td className="text-center py-3 px-2">{tendenciaLabel(item.tendencia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Daily Trend Line Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#0D1B2A' }}>
            Varianza total diaria — últimas 4 semanas
          </h2>
          <div className="w-full" style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={varianceDailyTrend} margin={{ left: 20, right: 20, top: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} fontSize={11} />
                <Tooltip formatter={((value: number) => [formatCOP(value), 'Varianza']) as never} />
                <ReferenceLine
                  y={thresholdValue}
                  stroke="#9CA3AF"
                  strokeDasharray="6 4"
                  label={{ value: 'Umbral 5%', position: 'right', fontSize: 11, fill: '#9CA3AF' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#C0392B"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#C0392B' }}
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

        {/* Location Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#0D1B2A' }}>
            Comparación por Punto de Venta
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-600">PdV</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">Varianza Total</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">Top Ingrediente</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-600">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {varianceByLocation.map((loc) => (
                <tr key={loc.pdv} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium" style={{ color: '#0D1B2A' }}>
                    {loc.pdv}
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-[#C0392B]">
                    {formatCOP(loc.varianzaTotal)}
                  </td>
                  <td className="py-3 px-2 text-gray-600">{loc.topIngredient}</td>
                  <td className="text-center py-3 px-2">{tendenciaLabel(loc.tendencia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
