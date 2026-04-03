'use client';

import { useState, useMemo, useCallback, Fragment } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Package,
  Thermometer,
  Snowflake,
  Archive,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { products, PRODUCT_STATS } from '@/data/mock/products';
import type { Product, Familia, Estado } from '@/data/mock/products';
import ExportButtons from '@/components/shared/ExportButtons';
import { useToast } from '@/components/shared/Toast';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const PAGE_SIZE = 20;

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

type SortKey = 'code' | 'internalCode' | 'reference' | 'name' | 'totalQuantity' | 'familia' | 'estado' | 'centroCosto' | 'fechaLote' | 'vencimiento';
type SortDir = 'asc' | 'desc';

const COLUMNS: { key: SortKey; label: string; exportLabel: string }[] = [
  { key: 'code', label: 'CÓDIGO', exportLabel: 'Código' },
  { key: 'internalCode', label: 'CÓD. INTERNO', exportLabel: 'Cód. Interno' },
  { key: 'reference', label: 'REFERENCIA', exportLabel: 'Referencia' },
  { key: 'name', label: 'PRODUCTO', exportLabel: 'Producto' },
  { key: 'totalQuantity', label: 'CANTIDAD', exportLabel: 'Cantidad' },
  { key: 'familia', label: 'FAMILIA', exportLabel: 'Familia' },
  { key: 'estado', label: 'ESTADO', exportLabel: 'Estado' },
  { key: 'centroCosto', label: 'CENTRO DE COSTO', exportLabel: 'Centro de Costo' },
  { key: 'fechaLote', label: 'FECHA LOTE', exportLabel: 'Fecha Lote' },
  { key: 'vencimiento', label: 'VENCIMIENTO', exportLabel: 'Vencimiento' },
];

const BREAKDOWN_COLORS: Record<string, string> = {
  'En tránsito': ACCENT_BLUE,
  Picking: AMBER,
  Almacenado: GREEN,
};

function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function expirationColor(dateStr: string): { color: string; label: string } {
  const days = daysUntil(dateStr);
  if (days < 7) return { color: RED, label: `${days}d — Crítico` };
  if (days < 30) return { color: AMBER, label: `${days}d — Próximo` };
  return { color: GREEN, label: `${days}d — OK` };
}

function BarChart({ data, colorMap }: { data: Record<string, number>; colorMap?: Record<string, string> }) {
  const entries = Object.entries(data);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (total === 0) return null;

  const palette = ['#2980B9', '#148F77', '#8E44AD', '#E67E22', '#C0392B', '#1E8449', '#2C3E50', '#D35400'];

  return (
    <div className="space-y-1.5">
      {entries.map(([label, value], i) => {
        const pct = (value / total) * 100;
        const bg = colorMap?.[label] ?? palette[i % palette.length];
        return (
          <div key={label} className="flex items-center gap-2 text-xs">
            <span className="w-28 text-right text-gray-600 truncate" title={label}>{label}</span>
            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
              <div
                className="h-full rounded transition-all"
                style={{ width: `${pct}%`, backgroundColor: bg }}
              />
            </div>
            <span className="w-16 text-gray-700 font-medium">{value} ({pct.toFixed(0)}%)</span>
          </div>
        );
      })}
    </div>
  );
}

function DetailPanel({ product }: { product: Product }) {
  const exp = expirationColor(product.vencimiento);

  return (
    <tr>
      <td colSpan={10} className="px-0 py-0">
        <div className="bg-slate-50 border-t border-b border-blue-100 px-6 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Distribution by PdV */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Distribución por PdV</h4>
              <BarChart data={product.distribution} />
            </div>

            {/* Status breakdown */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Desglose por Estado</h4>
              <BarChart data={product.breakdown} colorMap={BREAKDOWN_COLORS} />
            </div>

            {/* Lot & Expiration */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Lote y Vencimiento</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Fecha Lote:</span>
                  <span className="font-medium text-gray-800">{product.fechaLote}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Vencimiento:</span>
                  <span className="font-medium text-gray-800">{product.vencimiento}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: '100%',
                      background: `linear-gradient(90deg, ${exp.color}33 0%, ${exp.color} 100%)`,
                    }}
                  />
                </div>
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: exp.color + '1A', color: exp.color }}
                >
                  {exp.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function InventarioPage() {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [familiaFilter, setFamiliaFilter] = useState<string>('');
  const [estadoFilter, setEstadoFilter] = useState<string>('');
  const [centroFilter, setCentroFilter] = useState<string>('');

  const [sortKey, setSortKey] = useState<SortKey>('code');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    return sorted;
  }, [filteredProducts, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, safePage]);

  const hasFilters = searchTerm || familiaFilter || estadoFilter || centroFilter;

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFamiliaFilter('');
    setEstadoFilter('');
    setCentroFilter('');
    setCurrentPage(1);
    setExpandedRow(null);
    toast('info', 'Filtros limpiados');
  }, [toast]);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDir('asc');
      return key;
    });
    setCurrentPage(1);
  }, []);

  const handleRowClick = useCallback((id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  }, []);

  // Export data
  const exportData = useMemo(() => {
    return sortedProducts.map((p) => ({
      code: p.code,
      internalCode: p.internalCode,
      reference: p.reference,
      name: p.name,
      totalQuantity: p.totalQuantity,
      familia: p.familia,
      estado: p.estado,
      centroCosto: p.centroCosto,
      fechaLote: p.fechaLote,
      vencimiento: p.vencimiento,
    }));
  }, [sortedProducts]);

  const exportColumns = useMemo(
    () => COLUMNS.map((c) => ({ key: c.key, label: c.exportLabel })),
    []
  );

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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setCurrentPage(1);
            }}
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
          <ExportButtons
            data={exportData as Record<string, unknown>[]}
            filename="inventario"
            columns={exportColumns}
          />

          <div className="w-px h-8 bg-gray-200" />

          {/* Dropdowns */}
          <div className="relative">
            <select
              value={centroFilter}
              onChange={(e) => {
                setCentroFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              onChange={(e) => {
                setEstadoFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              onChange={(e) => {
                setFamiliaFilter(e.target.value);
                setCurrentPage(1);
              }}
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
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap cursor-pointer select-none hover:bg-white/10 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )
                      ) : (
                        <span className="w-3.5 h-3.5 inline-block opacity-0">.</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                    No se encontraron productos con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p, idx) => {
                  const famStyle = FAMILIA_COLORS[p.familia] || FAMILIA_COLORS.Items;
                  const estStyle = ESTADO_COLORS[p.estado] || 'text-gray-700 bg-gray-50';
                  const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60';
                  const isExpanded = expandedRow === p.id;

                  return (
                    <Fragment key={p.id}>
                      <tr
                        onClick={() => handleRowClick(p.id)}
                        className={`${rowBg} border-b border-gray-100 hover:bg-blue-50/40 transition-colors cursor-pointer ${isExpanded ? 'bg-blue-50/60' : ''}`}
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
                      {isExpanded && <DetailPanel product={p} />}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination & Footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500">
          Mostrando{' '}
          <span className="font-semibold text-gray-700">
            {sortedProducts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}
            &ndash;
            {Math.min(safePage * PAGE_SIZE, sortedProducts.length)}
          </span>{' '}
          de <span className="font-semibold text-gray-700">{sortedProducts.length}</span> productos
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Anterior
          </button>
          <span className="text-sm text-gray-600 font-medium px-2">
            Página {safePage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {hasFilters && (
        <div className="flex justify-end px-2 mt-2">
          <p className="text-xs text-gray-400">
            Filtros activos &mdash;{' '}
            <button onClick={clearFilters} className="text-blue-500 hover:underline">
              limpiar todos
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
