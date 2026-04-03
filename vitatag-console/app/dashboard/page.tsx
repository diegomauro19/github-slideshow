'use client';

import {
  Package,
  Boxes,
  Users,
  Store,
  Activity,
  Database,
  Wifi,
  AlertTriangle,
  Clock,
  TrendingUp,
  Snowflake,
  Thermometer,
  Archive,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const NAVY = '#0D1B2A';
const DARK_BLUE = '#1B4F72';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const movimientosData = [
  { dia: 'Lun', movimientos: 185 },
  { dia: 'Mar', movimientos: 228 },
  { dia: 'Mié', movimientos: 251 },
  { dia: 'Jue', movimientos: 215 },
  { dia: 'Vie', movimientos: 142 },
  { dia: 'Sáb', movimientos: 163 },
  { dia: 'Dom', movimientos: 170 },
];

const centroCostoData = [
  { nombre: 'CDP', productos: 1842, color: ACCENT_BLUE },
  { nombre: 'Logística', productos: 724, color: TEAL },
  { nombre: 'POS Olivia Laureles', productos: 245, color: GREEN },
  { nombre: 'POS Clap Laureles', productos: 187, color: AMBER },
  { nombre: 'POS Olivia Envigado', productos: 112, color: DARK_BLUE },
  { nombre: 'POS Otros', productos: 88, color: '#7F8C8D' },
];

const alertas = [
  {
    id: 1,
    tipo: 'warning',
    mensaje: 'SALMÓN FRESCO X KG — vence en 2 días',
    tiempo: 'Hace 12 min',
  },
  {
    id: 2,
    tipo: 'warning',
    mensaje: 'RÚGULA X 250G — vence en 3 días',
    tiempo: 'Hace 25 min',
  },
  {
    id: 3,
    tipo: 'error',
    mensaje: 'ATÚN FRESCO X KG — stock bajo (32 uds)',
    tiempo: 'Hace 1 hora',
  },
  {
    id: 4,
    tipo: 'info',
    mensaje: 'Transferencia completada: CDP → Olivia Laureles (45 productos)',
    tiempo: 'Hace 2 horas',
  },
];

const familias = [
  { nombre: 'Refrigerados', cantidad: 1026, color: ACCENT_BLUE, icon: Thermometer },
  { nombre: 'Congelados', cantidad: 1863, color: '#8E44AD', icon: Snowflake },
  { nombre: 'Secos', cantidad: 251, color: AMBER, icon: Archive },
];

const totalFamilias = 1026 + 1863 + 251;

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: NAVY }}>
            Bienvenido de vuelta, Diego
          </h1>
          <p className="text-gray-500 mt-1">
            Análisis completo del inventario &bull; Sistema integrado CDP &rarr; Logística &rarr; POS
          </p>
        </div>
        <span className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          MQTT Conectado
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Productos', value: '3,198', icon: Package, color: ACCENT_BLUE },
          { label: 'Cantidad Total', value: '847,293 uds', icon: Boxes, color: TEAL },
          { label: 'Personal Activo', value: '47', icon: Users, color: GREEN },
          { label: 'Puntos de Venta', value: '19', icon: Store, color: AMBER },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{ backgroundColor: kpi.color + '18' }}
            >
              <kpi.icon className="w-6 h-6" style={{ color: kpi.color }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>
                {kpi.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Familias + Estado del Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Productos por Familia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-5" style={{ color: NAVY }}>
            Productos por Familia
          </h2>
          <div className="space-y-4">
            {familias.map((f) => {
              const pct = (f.cantidad / totalFamilias) * 100;
              return (
                <div key={f.nombre}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <f.icon className="w-4 h-4" style={{ color: f.color }} />
                      <span className="text-sm font-medium text-gray-700">{f.nombre}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: f.color }}>
                      {f.cantidad.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: f.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estado del Sistema */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-5" style={{ color: NAVY }}>
            Estado del Sistema
          </h2>
          <div className="space-y-4">
            {[
              { label: 'MQTT Broker', detail: '3.20.45.172:1883', icon: Wifi },
              { label: 'Base de Datos', detail: 'PostgreSQL AWS', icon: Database },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.detail}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Activo
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Última Actualización</p>
                <p className="text-xs text-gray-500">3 de abril de 2026, 09:42:15 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5" style={{ color: ACCENT_BLUE }} />
            <h2 className="text-lg font-semibold" style={{ color: NAVY }}>
              Movimientos últimos 7 días
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={movimientosData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              />
              <Line
                type="monotone"
                dataKey="movimientos"
                stroke={ACCENT_BLUE}
                strokeWidth={2.5}
                dot={{ fill: ACCENT_BLUE, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5" style={{ color: TEAL }} />
            <h2 className="text-lg font-semibold" style={{ color: NAVY }}>
              Productos por Centro de Costo
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={centroCostoData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis
                dataKey="nombre"
                type="category"
                tick={{ fontSize: 11, fill: '#6B7280' }}
                width={130}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              />
              <Bar dataKey="productos" radius={[0, 6, 6, 0]} barSize={22}>
                {centroCostoData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="w-5 h-5" style={{ color: AMBER }} />
          <h2 className="text-lg font-semibold" style={{ color: NAVY }}>
            Alertas Recientes
          </h2>
        </div>
        <div className="space-y-3">
          {alertas.map((a) => {
            const borderColor =
              a.tipo === 'error' ? RED : a.tipo === 'warning' ? AMBER : ACCENT_BLUE;
            const bgColor =
              a.tipo === 'error'
                ? 'bg-red-50'
                : a.tipo === 'warning'
                  ? 'bg-amber-50'
                  : 'bg-blue-50';
            return (
              <div
                key={a.id}
                className={`flex items-center justify-between p-3.5 rounded-lg border-l-4 ${bgColor}`}
                style={{ borderLeftColor: borderColor }}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: borderColor }} />
                  <span className="text-sm text-gray-800">{a.mensaje}</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{a.tiempo}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
