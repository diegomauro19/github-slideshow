'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  AlertTriangle,
  TrendingUp,
  Layers,
  MapPin,
  X,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

const NAVY = '#0D1B2A';
const DARK_BLUE = '#1B4F72';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const LOCALES = ['Todos los locales', 'Olivia Viva Envigado', 'Olivia Laureles', 'Clap Laureles'];
const CATEGORIAS = ['Todas las categorías', 'Congelados', 'Refrigerados', 'Secos', 'Bebidas'];

const trendData = [
  { day: 'Lun', saltos: 185 },
  { day: 'Mar', saltos: 228 },
  { day: 'Mié', saltos: 251 },
  { day: 'Jue', saltos: 215 },
  { day: 'Vie', saltos: 142 },
  { day: 'Sáb', saltos: 163 },
  { day: 'Dom', saltos: 170 },
];

const pasosOmitidos = [
  { name: 'RECEPCION LOCAL', value: 1354 },
];

const categoriasAfectadas = [
  { name: 'Congelados', value: 765 },
  { name: 'Refrigerados', value: 589 },
];

const localesConSaltos = [
  { name: 'Olivia Viva Envigado', value: 761 },
  { name: 'Olivia Laureles', value: 338 },
  { name: 'Clap Laureles', value: 255 },
];

const productosConSaltos = [
  { name: 'Pollo Pechuga', count: 89 },
  { name: 'Solomito', count: 76 },
  { name: 'Salsa Bolognesa', count: 65 },
  { name: 'Queso Parmesano', count: 58 },
  { name: 'Spaghetti', count: 52 },
];

function formatNumber(n: number): string {
  return n.toLocaleString('es-CO');
}

function HorizontalBarSection({
  title,
  data,
  maxValue,
  color,
}: {
  title: string;
  data: { name: string; value: number }[];
  maxValue: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold mb-4" style={{ color: NAVY }}>
        {title}
      </h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-700">{item.name}</span>
              <span className="text-sm font-semibold" style={{ color: NAVY }}>
                {formatNumber(item.value)}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MetricasPage() {
  const [searchPunto, setSearchPunto] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('Todos los locales');
  const [selectedCategoria, setSelectedCategoria] = useState('Todas las categorías');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const hasFilters = searchPunto || selectedLocal !== 'Todos los locales' || selectedCategoria !== 'Todas las categorías' || dateFrom || dateTo;

  function clearFilters() {
    setSearchPunto('');
    setSelectedLocal('Todos los locales');
    setSelectedCategoria('Todas las categorías');
    setDateFrom('');
    setDateTo('');
  }

  const filteredLocales = useMemo(() => {
    if (selectedLocal === 'Todos los locales') return localesConSaltos;
    return localesConSaltos.filter((l) => l.name === selectedLocal);
  }, [selectedLocal]);

  const filteredCategorias = useMemo(() => {
    if (selectedCategoria === 'Todas las categorías') return categoriasAfectadas;
    return categoriasAfectadas.filter((c) => c.name === selectedCategoria);
  }, [selectedCategoria]);

  const filteredProductos = useMemo(() => {
    if (!searchPunto.trim()) return productosConSaltos;
    const q = searchPunto.trim().toLowerCase();
    return productosConSaltos.filter((p) => p.name.toLowerCase().includes(q));
  }, [searchPunto]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          Métricas de Flujo
        </h1>
        <p className="text-sm mt-1" style={{ color: DARK_BLUE }}>
          Análisis de saltos de flujo
        </p>
      </div>

      <div className="px-6 pb-8">
        {/* Filter Row */}
        <div className="flex flex-wrap items-end gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Search punto */}
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: DARK_BLUE }}>
              Punto
            </label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar punto..."
                value={searchPunto}
                onChange={(e) => setSearchPunto(e.target.value)}
                className="pl-8 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 w-[180px]"
                style={{ '--tw-ring-color': ACCENT_BLUE } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Local dropdown */}
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: DARK_BLUE }}>
              Local
            </label>
            <div className="relative">
              <select
                value={selectedLocal}
                onChange={(e) => setSelectedLocal(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 min-w-[200px]"
              >
                {LOCALES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Categoria dropdown */}
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: DARK_BLUE }}>
              Categoría
            </label>
            <div className="relative">
              <select
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 min-w-[200px]"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Date range */}
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: DARK_BLUE }}>
              Desde
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: DARK_BLUE }}>
              Hasta
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Limpiar button */}
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
            style={{
              borderColor: hasFilters ? RED : '#D1D5DB',
              color: hasFilters ? RED : '#9CA3AF',
              backgroundColor: hasFilters ? `${RED}08` : 'transparent',
            }}
          >
            <X size={14} />
            Limpiar
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Total Saltos</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${RED}15` }}>
                <AlertTriangle size={18} style={{ color: RED }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: NAVY }}>
              {formatNumber(1354)}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Saltos Hoy</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${AMBER}15` }}>
                <TrendingUp size={18} style={{ color: AMBER }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: AMBER }}>
              {formatNumber(215)}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Categoría más afectada</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${TEAL}15` }}>
                <Layers size={18} style={{ color: TEAL }} />
              </div>
            </div>
            <p className="text-xl font-bold" style={{ color: NAVY }}>
              Congelados
            </p>
            <p className="text-sm text-gray-400 mt-0.5">{formatNumber(765)} saltos</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Paso más saltado</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ACCENT_BLUE}15` }}>
                <ArrowRight size={18} style={{ color: ACCENT_BLUE }} />
              </div>
            </div>
            <p className="text-base font-bold" style={{ color: NAVY }}>
              RECEPCION LOCAL
            </p>
            <p className="text-sm text-gray-400 mt-0.5">{formatNumber(1354)} saltos</p>
          </div>
        </div>

        {/* Line Chart - Tendencia 7 días */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: NAVY }}>
            Tendencia 7 días
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                  labelStyle={{ color: NAVY, fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="saltos"
                  stroke={RED}
                  strokeWidth={2.5}
                  dot={{ fill: RED, r: 4, strokeWidth: 2, stroke: '#FFF' }}
                  activeDot={{ r: 6, fill: RED, stroke: '#FFF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Three horizontal bar sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <HorizontalBarSection
            title="Pasos Omitidos"
            data={pasosOmitidos}
            maxValue={1354}
            color={RED}
          />
          <HorizontalBarSection
            title="Categorías Afectadas"
            data={filteredCategorias}
            maxValue={765}
            color={AMBER}
          />
          <HorizontalBarSection
            title="Locales con Saltos"
            data={filteredLocales}
            maxValue={761}
            color={ACCENT_BLUE}
          />
        </div>

        {/* Table - Productos con más Saltos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold" style={{ color: NAVY }}>
              Productos con más Saltos
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: `${NAVY}08` }}>
                  <th
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: DARK_BLUE }}
                  >
                    #
                  </th>
                  <th
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: DARK_BLUE }}
                  >
                    Producto
                  </th>
                  <th
                    className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                    style={{ color: DARK_BLUE }}
                  >
                    Saltos
                  </th>
                  <th
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider w-[40%]"
                    style={{ color: DARK_BLUE }}
                  >
                    Proporción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProductos.map((prod, idx) => (
                  <tr key={prod.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: idx === 0 ? RED : idx === 1 ? AMBER : ACCENT_BLUE }}
                      >
                        {idx + 1}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium" style={{ color: NAVY }}>
                      {prod.name}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold" style={{ color: DARK_BLUE }}>
                      {prod.count}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(prod.count / 89) * 100}%`,
                              backgroundColor: idx === 0 ? RED : idx === 1 ? AMBER : ACCENT_BLUE,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-10 text-right">
                          {((prod.count / 1354) * 100).toFixed(1)}%
                        </span>
                      </div>
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
