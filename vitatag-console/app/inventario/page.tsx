'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  FileSpreadsheet,
  FileText,
  FileDown,
  ChevronDown,
  X,
  Package,
  Thermometer,
  Snowflake,
  Archive,
} from 'lucide-react';
import { products, PRODUCT_STATS } from '@/data/mock/products';
import type { Familia, Estado } from '@/data/mock/products';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const FAMILIA_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Refrigerados: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Congelados: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Secos: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Items: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
};

const ESTADO_COLORS: Record<string, string> = {
  Almacenado: 'text-green-700 bg-green-50',
  'En tránsito': 'text-blue-700 bg-blue-50',
  Picking: 'text-amber-700 bg-amber-50',
  'Almacenado (POS)': 'text-teal-700 bg-teal-50',
  Desechado: 'text-red-700 bg-red-50',
  Devuelto: 'text-orange-700 bg-orange-50',
  Uso: 'text-indigo-700 bg-indigo-50',
};

const FAMILIAS: Familia[] = ['Refrigerados', 'Congelados', 'Secos', 'Items'];
const ESTADOS: Estado[] = [
  'Almacenado',
  'En tránsito',
  'Picking',
  'Almacenado (POS)',
  'Desechado',
  'Devuelto',
  'Uso',
];
const CENTROS = ['CDP', 'Logística', 'POS'];

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [familiaFilter, setFamiliaFilter] = useState<string>('');
  const [estadoFilter, setEstadoFilter] = useState<string>('');
  const [centroFilter, setCentroFilter] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.internalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.reference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFamilia = !familiaFilter || p.familia === familiaFilter;
      const matchesEstado = !estadoFilter || p.estado === estadoFilter;
      const matchesCentro = !centroFilter || p.centroCosto === centroFilter;

      return matchesSearch && matchesFamilia && matchesEstado && matchesCentro;
    });
  }, [searchTerm, familiaFilter, estadoFilter, centroFilter]);

  const hasFilters = searchTerm || familiaFilter || estadoFilter || centroFilter;

  const clearFilters = () => {
    setSearchTerm('');
    setFamiliaFilter('');
    setEstadoFilter('');
    setCentroFilter('');
  };

  const kpiCards = [
    { label: 'Total', value: PRODUCT_STATS.total, color: ACCENT_BLUE, icon: Package },
    { label: 'Secos', value: PRODUCT_STATS.secos, color: AMBER, icon: Archive },
    { label: 'Refrigerados', value: PRODUCT_STATS.refrigerados, color: TEAL, icon: Thermometer },
    { label: 'Congelados', value: PRODUCT_STATS.congelados, color: '#8E44AD', icon: Snowflake },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: NAVY }}>
          Dashboard de Inventario
        </h1>
        <p className="text-gray-500 mt-1">
          Gestión y seguimiento de productos en tiempo real
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar producto por nombre, código o referencia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl shadow-sm border-l-4 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            style={{ borderLeftColor: kpi.color }}
          >
            <div
              className="flex items-center justify-center w-11 h-11 rounded-lg"
              style={{ backgroundColor: kpi.color + '18' }}
            >
              <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>
                {kpi.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Export Buttons */}
          <div className="flex items-center gap-2 mr-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" />
              Excel
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <FileText className="w-3.5 h-3.5 text-red-500" />
              PDF
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <FileDown className="w-3.5 h-3.5 text-blue-500" />
              CSV
            </button>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          {/* Dropdowns */}
          <div className="relative">
            <select
              value={centroFilter}
              onChange={(e) => setCentroFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            >
              <option value="">Centro de Costo</option>
              {CENTROS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            >
              <option value="">Estado</option>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={familiaFilter}
              onChange={(e) => setFamiliaFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            >
              <option value="">Familia</option>
              {FAMILIAS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200" style={{ backgroundColor: NAVY }}>
                {[
                  'CÓDIGO',
                  'CÓD. INTERNO',
                  'REFERENCIA',
                  'PRODUCTO',
                  'CANTIDAD',
                  'FAMILIA',
                  'ESTADO',
                  'CENTRO DE COSTO',
                  'FECHA LOTE',
                  'VENCIMIENTO',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                    No se encontraron productos con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p, idx) => {
                  const famStyle = FAMILIA_COLORS[p.familia] || FAMILIA_COLORS.Items;
                  const estStyle = ESTADO_COLORS[p.estado] || 'text-gray-700 bg-gray-50';
                  const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60';

                  return (
                    <tr
                      key={p.id}
                      className={`${rowBg} border-b border-gray-100 hover:bg-blue-50/40 transition-colors`}
                    >
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700 whitespace-nowrap">
                        {p.code}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">
                        {p.internalCode}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">
                        {p.reference}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {p.name}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-800 text-right whitespace-nowrap">
                        {p.totalQuantity.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${famStyle.bg} ${famStyle.text} ${famStyle.border}`}
                        >
                          {p.familia}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${estStyle}`}
                        >
                          {p.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {p.centroCosto}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {p.fechaLote}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {p.vencimiento}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500">
          Mostrando{' '}
          <span className="font-semibold text-gray-700">{filteredProducts.length}</span> de{' '}
          <span className="font-semibold text-gray-700">{products.length}</span> productos
        </p>
        {hasFilters && (
          <p className="text-xs text-gray-400">
            Filtros activos &mdash;{' '}
            <button onClick={clearFilters} className="text-blue-500 hover:underline">
              limpiar todos
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
