'use client';

import { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';
import { Brain, AlertTriangle, Leaf, Target } from 'lucide-react';
import { patterns, heatmapData, PATTERN_STATS } from '@/data/mock/patterns';
import type { Pattern } from '@/data/mock/patterns';

function formatCOP(value: number): string {
  return `$${value.toLocaleString('es-CO')}`;
}

function confianzaColor(value: number): string {
  if (value >= 85) return '#1E8449';
  if (value >= 70) return '#F39C12';
  return '#C0392B';
}

function heatColor(value: number): string {
  if (value >= 80) return '#C0392B';
  if (value >= 60) return '#E74C3C';
  if (value >= 40) return '#F39C12';
  if (value >= 20) return '#F8C471';
  return '#FEF9E7';
}

const scatterData = [
  { varianza: 12, volumen: 85, nombre: 'Solomito' },
  { varianza: 8, volumen: 120, nombre: 'Queso Parmesano' },
  { varianza: 15, volumen: 60, nombre: 'Pollo Pechuga' },
  { varianza: 6, volumen: 45, nombre: 'Salsa Bolognesa' },
  { varianza: 18, volumen: 30, nombre: 'Pulpa Fresa-Mango' },
  { varianza: 22, volumen: 95, nombre: 'Aguacate' },
  { varianza: 10, volumen: 70, nombre: 'Tocineta' },
  { varianza: 3, volumen: 150, nombre: 'Arroz' },
  { varianza: 5, volumen: 110, nombre: 'Pasta' },
  { varianza: 25, volumen: 40, nombre: 'Salmón' },
  { varianza: 2, volumen: 200, nombre: 'Aceite' },
  { varianza: 7, volumen: 90, nombre: 'Tomate' },
];

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const hours = ['10:00', '12:00', '14:00', '18:00', '20:00'];

export default function PatronesPage() {
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

  const kpis = [
    {
      label: 'Patrones Activos',
      value: PATTERN_STATS.activos,
      icon: Brain,
      color: '#0D1B2A',
      bg: 'bg-white',
    },
    {
      label: 'Alertas esta semana',
      value: PATTERN_STATS.alertasSemana,
      icon: AlertTriangle,
      color: '#C0392B',
      bg: 'bg-white',
    },
    {
      label: 'Ingredientes monitoreados',
      value: PATTERN_STATS.ingredientesMonitoreados,
      icon: Leaf,
      color: '#0D1B2A',
      bg: 'bg-white',
    },
    {
      label: 'Precisión del modelo',
      value: `${PATTERN_STATS.precisionModelo}%`,
      icon: Target,
      color: '#1E8449',
      bg: 'bg-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold" style={{ color: '#0D1B2A' }}>
              Análisis de Patrones
            </h1>
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full text-white"
              style={{ backgroundColor: '#1E8449' }}
            >
              Capa 3
            </span>
          </div>
          <p className="text-gray-500">
            Detección automática de varianza sistemática
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-xl p-6 bg-white border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">{kpi.label}</p>
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: kpi.color }}
                >
                  {kpi.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Patterns Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 overflow-x-auto">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: '#0D1B2A' }}
          >
            Patrones detectados
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  #
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Patrón
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Tipo
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Ingrediente
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  PdV
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Frecuencia
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">
                  Impacto mensual
                </th>
                <th className="text-center py-3 px-2 font-semibold text-gray-600">
                  Confianza
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Acción sugerida
                </th>
              </tr>
            </thead>
            <tbody>
              {patterns.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedPattern?.id === p.id
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() =>
                    setSelectedPattern(
                      selectedPattern?.id === p.id ? null : p
                    )
                  }
                >
                  <td className="py-3 px-2 text-gray-500">{idx + 1}</td>
                  <td
                    className="py-3 px-2 font-medium"
                    style={{ color: '#0D1B2A' }}
                  >
                    {p.name}
                  </td>
                  <td className="py-3 px-2 text-gray-600">{p.tipo}</td>
                  <td className="py-3 px-2 text-gray-600">
                    {p.ingredient}
                  </td>
                  <td className="py-3 px-2 text-gray-600">{p.pdv}</td>
                  <td className="py-3 px-2 text-gray-600">
                    {p.frecuencia}
                  </td>
                  <td
                    className="text-right py-3 px-2 font-medium"
                    style={{ color: '#C0392B' }}
                  >
                    {formatCOP(p.impactoMensual)}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${p.confianza}%`,
                            backgroundColor: confianzaColor(p.confianza),
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium whitespace-nowrap"
                        style={{ color: confianzaColor(p.confianza) }}
                      >
                        {p.confianza}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    {p.accionSugerida}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Section — shown when a pattern is selected */}
        {selectedPattern && (
          <div className="space-y-8 animate-in fade-in">
            {/* Section title */}
            <div className="flex items-center gap-3">
              <h2
                className="text-xl font-bold"
                style={{ color: '#0D1B2A' }}
              >
                Detalle: {selectedPattern.name}
              </h2>
              <span className="text-sm text-gray-500">
                {selectedPattern.ingredient} — {selectedPattern.pdv}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Heatmap */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3
                  className="text-base font-semibold mb-4"
                  style={{ color: '#0D1B2A' }}
                >
                  Mapa de calor — Intensidad por día y hora
                </h3>
                <div className="overflow-x-auto">
                  <div className="inline-block">
                    {/* Header row */}
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-12" />
                      {hours.map((h) => (
                        <div
                          key={h}
                          className="w-14 text-center text-xs text-gray-500 font-medium"
                        >
                          {h}
                        </div>
                      ))}
                    </div>
                    {/* Day rows */}
                    {days.map((day) => (
                      <div key={day} className="flex items-center gap-1 mb-1">
                        <div className="w-12 text-xs text-gray-600 font-medium">
                          {day}
                        </div>
                        {hours.map((hour) => {
                          const cell = heatmapData.find(
                            (d) => d.day === day && d.hour === hour
                          );
                          const val = cell?.value ?? 0;
                          return (
                            <div
                              key={`${day}-${hour}`}
                              className="w-14 h-10 rounded flex items-center justify-center text-xs font-medium"
                              style={{
                                backgroundColor: heatColor(val),
                                color: val >= 60 ? '#fff' : '#333',
                              }}
                              title={`${day} ${hour}: ${val}%`}
                            >
                              {val}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                    {/* Legend */}
                    <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
                      <span>Bajo</span>
                      <div className="flex gap-0.5">
                        {['#FEF9E7', '#F8C471', '#F39C12', '#E74C3C', '#C0392B'].map(
                          (c) => (
                            <div
                              key={c}
                              className="w-6 h-3 rounded-sm"
                              style={{ backgroundColor: c }}
                            />
                          )
                        )}
                      </div>
                      <span>Alto</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scatter Chart: Varianza vs Volumen */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3
                  className="text-base font-semibold mb-4"
                  style={{ color: '#0D1B2A' }}
                >
                  Varianza vs. Volumen de consumo
                </h3>
                <div className="w-full" style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ left: 10, right: 20, top: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        dataKey="volumen"
                        name="Volumen (kg/sem)"
                        fontSize={11}
                        label={{
                          value: 'Volumen (kg/sem)',
                          position: 'insideBottom',
                          offset: -5,
                          fontSize: 11,
                        }}
                      />
                      <YAxis
                        type="number"
                        dataKey="varianza"
                        name="Varianza (%)"
                        fontSize={11}
                        label={{
                          value: 'Varianza (%)',
                          angle: -90,
                          position: 'insideLeft',
                          fontSize: 11,
                        }}
                      />
                      <ZAxis range={[60, 200]} />
                      <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value: unknown, name: unknown) => [
                          name === 'Volumen (kg/sem)'
                            ? `${value} kg`
                            : `${value}%`,
                          String(name),
                        ]}
                        labelFormatter={(_, payload) => {
                          if (payload && payload.length > 0) {
                            return (payload[0].payload as { nombre: string })
                              .nombre;
                          }
                          return '';
                        }}
                      />
                      <Scatter
                        data={scatterData}
                        fill="#C0392B"
                        fillOpacity={0.7}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Systematic variance indicator */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle
                  className="w-6 h-6 flex-shrink-0"
                  style={{ color: '#C0392B' }}
                />
                <div>
                  <p className="text-base font-semibold" style={{ color: '#0D1B2A' }}>
                    Varianza{' '}
                    <span
                      className="uppercase"
                      style={{
                        color: '#C0392B',
                        textDecoration: 'underline',
                        textDecorationColor: '#C0392B',
                        textUnderlineOffset: '4px',
                      }}
                    >
                      SISTEMÁTICA
                    </span>{' '}
                    — No es aleatoria (p-value &lt; 0.01)
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    El patrón &quot;{selectedPattern.name}&quot; en{' '}
                    {selectedPattern.ingredient} muestra una desviación
                    estadísticamente significativa que requiere intervención
                    operativa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
