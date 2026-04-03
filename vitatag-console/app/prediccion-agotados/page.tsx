'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';
import {
  AlertTriangle,
  Clock,
  ShoppingCart,
  Eye,
  ChefHat,
  TrendingDown,
  Package,
} from 'lucide-react';
import { predictions, type Prediction } from '@/data/mock/predictions';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';
const ACCENT_BLUE = '#2980B9';

function formatCOP(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function StatusBadge({ status }: { status: Prediction['status'] }) {
  const map = {
    critical: { bg: 'bg-red-100 text-red-800 border-red-300', label: 'Crítico' },
    warning: { bg: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Warning' },
    ok: { bg: 'bg-green-100 text-green-800 border-green-300', label: 'OK' },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.bg}`}>
      {s.label}
    </span>
  );
}

function TrafficSection({
  emoji,
  label,
  color,
  borderColor,
  bgColor,
  items,
  selectedId,
  onSelect,
}: {
  emoji: string;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  items: Prediction[];
  selectedId: string | null;
  onSelect: (p: Prediction) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className={`rounded-xl border-2 ${borderColor} ${bgColor} overflow-hidden`}>
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: color + '18' }}>
        <span className="text-lg">{emoji}</span>
        <span className="font-bold text-sm tracking-wide" style={{ color }}>{label}</span>
        <span className="ml-auto text-xs font-medium" style={{ color }}>{items.length} item{items.length > 1 ? 's' : ''}</span>
      </div>
      <div className="divide-y divide-gray-200">
        {items.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={`w-full text-left px-4 py-3 flex items-center gap-4 transition-all hover:bg-white/60 ${
              selectedId === p.id ? 'bg-white ring-2 ring-offset-1' : ''
            }`}
            style={selectedId === p.id ? { '--tw-ring-color': ACCENT_BLUE } as React.CSSProperties : {}}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm" style={{ color: NAVY }}>{p.ingredient}</span>
                <span className="text-xs text-gray-500">{p.stockActual} {p.stockUnit} restante</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Se agota: {p.horaAgotamiento}
                </span>
                {p.recetasAfectadas > 0 && (
                  <span className="flex items-center gap-1">
                    <ChefHat size={12} />
                    {p.recetasAfectadas} receta{p.recetasAfectadas > 1 ? 's' : ''}
                  </span>
                )}
                {p.riesgoCOP > 0 && (
                  <span className="flex items-center gap-1 font-semibold" style={{ color: RED }}>
                    <TrendingDown size={12} />
                    {formatCOP(p.riesgoCOP)} en riesgo
                  </span>
                )}
              </div>
            </div>
            <div className="text-gray-400 text-xs flex items-center gap-1">
              <Eye size={14} />
              <span>Ver</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PrediccionAgotadosPage() {
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  const critical = predictions.filter((p) => p.status === 'critical');
  const warning = predictions.filter((p) => p.status === 'warning');
  const ok = predictions.filter((p) => p.status === 'ok');

  const chartData = selectedPrediction?.projectionData ?? [];
  const zeroIndex = chartData.findIndex((d) => d.stock <= 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                Predicci&oacute;n de Agotados
              </h1>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: GREEN }}
              >
                Capa 3
              </span>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Proyecci&oacute;n de inventario vs. consumo esperado
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertTriangle size={16} style={{ color: AMBER }} />
            <span>
              {critical.length + warning.length} alerta{critical.length + warning.length !== 1 ? 's' : ''} activa{critical.length + warning.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Traffic light panels */}
        <div className="grid gap-4 mb-8">
          <TrafficSection
            emoji="🔴"
            label="CR&Iacute;TICO — se agota hoy"
            color={RED}
            borderColor="border-red-300"
            bgColor="bg-red-50/60"
            items={critical}
            selectedId={selectedPrediction?.id ?? null}
            onSelect={setSelectedPrediction}
          />
          <TrafficSection
            emoji="🟡"
            label="WARNING — se agota ma&ntilde;ana"
            color={AMBER}
            borderColor="border-yellow-300"
            bgColor="bg-yellow-50/60"
            items={warning}
            selectedId={selectedPrediction?.id ?? null}
            onSelect={setSelectedPrediction}
          />
          <TrafficSection
            emoji="🟢"
            label="OK — &gt;48h de stock"
            color={GREEN}
            borderColor="border-green-300"
            bgColor="bg-green-50/60"
            items={ok}
            selectedId={selectedPrediction?.id ?? null}
            onSelect={setSelectedPrediction}
          />
        </div>

        {/* Projection chart */}
        {selectedPrediction && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
              <h2 className="text-lg font-bold" style={{ color: NAVY }}>
                Proyecci&oacute;n: {selectedPrediction.ingredient}
              </h2>
              <StatusBadge status={selectedPrediction.status} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Stock actual</p>
                <p className="font-bold text-lg" style={{ color: NAVY }}>
                  {selectedPrediction.stockActual} {selectedPrediction.stockUnit}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Consumo/d&iacute;a</p>
                <p className="font-bold text-lg" style={{ color: NAVY }}>
                  {selectedPrediction.consumoDia} {selectedPrediction.stockUnit}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Se agota</p>
                <p className="font-bold text-lg" style={{ color: selectedPrediction.status === 'critical' ? RED : selectedPrediction.status === 'warning' ? AMBER : NAVY }}>
                  {selectedPrediction.horaAgotamiento}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Recetas afectadas</p>
                <p className="font-bold text-lg" style={{ color: NAVY }}>
                  {selectedPrediction.recetasAfectadas}
                </p>
              </div>
            </div>

            {selectedPrediction.recetasNombres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selectedPrediction.recetasNombres.map((r) => (
                  <span key={r} className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-xs font-medium">
                    {r}
                  </span>
                ))}
              </div>
            )}

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hora" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    label={{
                      value: selectedPrediction.stockUnit,
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 12, fill: '#6B7280' },
                    }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 13, borderColor: '#E5E7EB' }}
                    formatter={(value) => [`${value} ${selectedPrediction.stockUnit}`, 'Stock']}
                  />
                  <ReferenceLine y={0} stroke={RED} strokeDasharray="6 3" strokeWidth={2} label={{ value: 'Agotado', fill: RED, fontSize: 11, position: 'right' }} />
                  {zeroIndex >= 0 && (
                    <ReferenceArea
                      x1={chartData[Math.max(0, zeroIndex - 1)]?.hora}
                      x2={chartData[chartData.length - 1]?.hora}
                      fill={RED}
                      fillOpacity={0.08}
                      stroke="none"
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="stock"
                    stroke={ACCENT_BLUE}
                    strokeWidth={3}
                    dot={{ r: 4, fill: ACCENT_BLUE, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Summary table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold" style={{ color: NAVY }}>
              Resumen de predicciones
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Ingrediente</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Stock actual</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Consumo/d&iacute;a</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">D&iacute;as restantes</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Estado</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Recetas afectadas</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Acci&oacute;n</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {predictions.map((p) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedPrediction?.id === p.id ? 'bg-blue-50/60' : ''
                    }`}
                    onClick={() => setSelectedPrediction(p)}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: NAVY }}>
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-gray-400" />
                        {p.ingredient}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {p.stockActual} {p.stockUnit}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {p.consumoDia} {p.stockUnit}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className="font-semibold"
                        style={{
                          color: p.status === 'critical' ? RED : p.status === 'warning' ? AMBER : GREEN,
                        }}
                      >
                        {p.diasRestantes.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{p.recetasAfectadas}</td>
                    <td className="px-4 py-3 text-center">
                      {p.status === 'critical' || p.status === 'warning' ? (
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                          style={{ backgroundColor: p.status === 'critical' ? RED : AMBER }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <ShoppingCart size={12} />
                          Pedir ahora
                        </button>
                      ) : (
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-transform hover:scale-105 active:scale-95"
                          style={{ color: GREEN, borderColor: GREEN }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Eye size={12} />
                          Monitorear
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
