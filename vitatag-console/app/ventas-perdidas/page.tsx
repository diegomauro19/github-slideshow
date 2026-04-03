'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  lostSalesData,
  lostSalesTable,
  lostSalesDaily,
} from '@/data/mock/predictions';

const BRAND = {
  navy: '#0D1B2A',
  green: '#1E8449',
  red: '#C0392B',
  amber: '#F39C12',
};

const PIE_COLORS = [BRAND.red, BRAND.navy, BRAND.amber, BRAND.green, '#8E44AD'];

function formatCOP(value: number): string {
  return `$${value.toLocaleString('es-CO')}`;
}

function formatCOPShort(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toLocaleString('es-CO')}`;
}

const pieData = lostSalesTable.map((row) => ({
  name: row.ingredient,
  value: row.copPerdidos,
}));

export default function VentasPerdidasPage() {
  const heroKpis = [
    {
      emoji: '\uD83D\uDCB0',
      label: 'Ventas Perdidas Este Mes',
      value: formatCOP(lostSalesData.totalMes) + ' COP',
      color: BRAND.red,
      dark: true,
    },
    {
      emoji: '\uD83D\uDCC9',
      label: 'Platos No Servidos',
      value: `${lostSalesData.platosNoServidos} porciones`,
      color: BRAND.navy,
      dark: false,
    },
    {
      emoji: '\uD83C\uDF7D\uFE0F',
      label: 'Plato Mas Afectado',
      value: lostSalesData.platoMasAfectado,
      color: BRAND.navy,
      dark: false,
    },
    {
      emoji: '\uD83D\uDCCA',
      label: 'Dia Mas Costoso',
      value: lostSalesData.diaMasCostoso,
      color: BRAND.amber,
      dark: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold" style={{ color: BRAND.navy }}>
              Ventas Perdidas por Agotados
            </h1>
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full text-white"
              style={{ backgroundColor: BRAND.green }}
            >
              Capa 3
            </span>
          </div>
          <p className="text-gray-500">
            Impacto en ingresos por ingredientes no disponibles
          </p>
        </div>

        {/* Hero KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {heroKpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl p-6 border border-gray-200"
              style={{
                backgroundColor: kpi.dark ? BRAND.navy : '#ffffff',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{kpi.emoji}</span>
                <p
                  className="text-sm font-medium"
                  style={{ color: kpi.dark ? 'rgba(255,255,255,0.7)' : '#6B7280' }}
                >
                  {kpi.label}
                </p>
              </div>
              <p
                className="text-2xl font-bold leading-tight"
                style={{ color: kpi.dark ? BRAND.red : kpi.color }}
              >
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 overflow-x-auto">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: BRAND.navy }}
          >
            Impacto por ingrediente agotado
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Ingrediente Agotado
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Horas sin stock
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">
                  Recetas Afectadas
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">
                  Porciones perdidas
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">
                  Precio promedio
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">
                  $COP Perdidos
                </th>
              </tr>
            </thead>
            <tbody>
              {lostSalesTable.map((row) => (
                <tr
                  key={row.ingredient}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td
                    className="py-3 px-2 font-medium"
                    style={{ color: BRAND.navy }}
                  >
                    {row.ingredient}
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    {row.horasSinStock}
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    {row.recetasAfectadas}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-600">
                    {row.porcionesPerdidas}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-600">
                    {formatCOP(row.precioPromedio)}
                  </td>
                  <td
                    className="py-3 px-2 text-right font-bold"
                    style={{ color: BRAND.red }}
                  >
                    {formatCOP(row.copPerdidos)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td
                  colSpan={3}
                  className="py-3 px-2 font-bold"
                  style={{ color: BRAND.navy }}
                >
                  TOTAL
                </td>
                <td className="py-3 px-2 text-right font-bold text-gray-700">
                  {lostSalesTable
                    .reduce((sum, r) => sum + r.porcionesPerdidas, 0)
                    .toLocaleString('es-CO')}
                </td>
                <td className="py-3 px-2" />
                <td
                  className="py-3 px-2 text-right font-bold"
                  style={{ color: BRAND.red }}
                >
                  {formatCOP(
                    lostSalesTable.reduce((sum, r) => sum + r.copPerdidos, 0)
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart: Ventas perdidas diarias */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: BRAND.navy }}
            >
              Ventas perdidas diarias (ultimos 30 dias)
            </h2>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lostSalesDaily}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    fontSize={10}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis
                    fontSize={11}
                    tickFormatter={(v: number) => formatCOPShort(v)}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value: unknown) => [formatCOP(Number(value)), 'Perdido']}
                    labelStyle={{ fontWeight: 600, color: BRAND.navy }}
                    contentStyle={{
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#E74C3C"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut / Pie Chart: Top 5 ingredientes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: BRAND.navy }}
            >
              Top 5 ingredientes por impacto economico
            </h2>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                    }
                    labelLine={{ stroke: '#9CA3AF', strokeWidth: 1 }}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: unknown) => [formatCOP(Number(value)), 'COP Perdidos']}
                    contentStyle={{
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
