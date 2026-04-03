'use client';

import { useState, useMemo, useRef } from 'react';
import {
  Package,
  Search,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  TrendingUp,
  Percent,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { orders, ORDER_STATS, ordersByLocal } from '@/data/mock/orders';
import type { Order } from '@/data/mock/orders';
import ExportButtons from '@/components/shared/ExportButtons';
import { useToast } from '@/components/shared/Toast';

const NAVY = '#0D1B2A';
const DARK_BLUE = '#1B4F72';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const PAGE_SIZE = 20;

const LOCALES = ['Todos', 'Olivia Viva Envigado', 'Olivia Laureles', 'Clap Laureles', 'Olivia Arkadia', 'Olivia 10b'];

const subTabs = [
  { id: 'pedidos', label: 'Pedidos', icon: ClipboardList },
  { id: 'pendientes', label: 'Pendientes', icon: Clock },
  { id: 'comparacion', label: 'Comparación', icon: BarChart3 },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const ORDER_COLUMNS = [
  { key: 'fecha', label: 'Fecha' },
  { key: 'sucursal', label: 'Sucursal' },
  { key: 'numPedido', label: 'Num Pedido' },
  { key: 'referencia', label: 'Referencia' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'ubicacion', label: 'Ubicación' },
  { key: 'unidadesPedido', label: 'Unid Pedido' },
  { key: 'unidadesTotal', label: 'Unid Total' },
  { key: 'estado', label: 'Estado' },
];

function formatNumber(n: number): string {
  return n.toLocaleString('es-CO');
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

/* ------------------------------------------------------------------ */
/*  Filters bar (shared across tabs)                                  */
/* ------------------------------------------------------------------ */
function FilterBar({
  selectedLocal,
  setSelectedLocal,
  searchPedido,
  setSearchPedido,
  selectedDate,
  setSelectedDate,
  onUploadClick,
}: {
  selectedLocal: string;
  setSelectedLocal: (v: string) => void;
  searchPedido: string;
  setSearchPedido: (v: string) => void;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  onUploadClick: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Local dropdown */}
      <div className="relative">
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

      {/* Search */}
      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: DARK_BLUE }}>
          Nro Pedido
        </label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pedido..."
            value={searchPedido}
            onChange={(e) => setSearchPedido(e.target.value)}
            className="pl-8 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 w-[180px]"
          />
        </div>
      </div>

      {/* Date picker */}
      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: DARK_BLUE }}>
          Fecha
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
        />
      </div>

      {/* Upload button */}
      <div className="ml-auto self-end">
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: ACCENT_BLUE }}
        >
          <Upload size={14} />
          Cargar Excel
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination                                                        */
/* ------------------------------------------------------------------ */
function Pagination({
  page,
  totalPages,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Mostrando{' '}
        <span className="font-medium" style={{ color: NAVY }}>
          {from}-{to}
        </span>{' '}
        de{' '}
        <span className="font-medium" style={{ color: NAVY }}>
          {formatNumber(total)}
        </span>{' '}
        pedidos
      </p>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="p-1.5 rounded-md border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
        >
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          let p: number;
          if (totalPages <= 7) {
            p = i + 1;
          } else if (page <= 4) {
            p = i + 1;
          } else if (page >= totalPages - 3) {
            p = totalPages - 6 + i;
          } else {
            p = page - 3 + i;
          }
          return (
            <button
              key={p}
              onClick={() => onPage(p)}
              className="min-w-[28px] h-7 rounded-md text-xs font-medium"
              style={{
                backgroundColor: p === page ? ACCENT_BLUE : 'transparent',
                color: p === page ? '#fff' : '#6B7280',
              }}
            >
              {p}
            </button>
          );
        })}
        <button
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          className="p-1.5 rounded-md border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Expandable order row                                              */
/* ------------------------------------------------------------------ */
function OrderRow({ order, expanded, onToggle }: { order: Order; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr onClick={onToggle} className="hover:bg-gray-50 transition-colors cursor-pointer">
        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDate(order.fecha)}</td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="font-medium" style={{ color: NAVY }}>
            {order.sucursal}
          </span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${ACCENT_BLUE}10`, color: ACCENT_BLUE }}>
            {order.numPedido}
          </span>
        </td>
        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{order.referencia}</td>
        <td className="px-4 py-3 text-gray-700">{order.descripcion}</td>
        <td className="px-4 py-3 text-gray-500 text-xs">{order.ubicacion}</td>
        <td className="px-4 py-3 text-right font-medium" style={{ color: DARK_BLUE }}>
          {formatNumber(order.unidadesPedido)}
        </td>
        <td className="px-4 py-3 text-right font-medium" style={{ color: NAVY }}>
          {formatNumber(order.unidadesTotal)}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={8} className="px-6 py-4" style={{ backgroundColor: `${ACCENT_BLUE}06` }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-400">ID</span>
                <p className="font-mono text-xs" style={{ color: NAVY }}>{order.id}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Sucursal ID</span>
                <p className="font-mono text-xs" style={{ color: NAVY }}>{order.sucursalId}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Estado</span>
                <p>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: order.estado === 'Entregado' ? `${GREEN}20` : order.estado === 'Parcial' ? `${AMBER}20` : `${RED}20`,
                      color: order.estado === 'Entregado' ? GREEN : order.estado === 'Parcial' ? AMBER : RED,
                    }}
                  >
                    {order.estado}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Fecha</span>
                <p className="text-xs" style={{ color: NAVY }}>{formatDate(order.fecha)}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Referencia</span>
                <p className="font-mono text-xs" style={{ color: NAVY }}>{order.referencia}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Descripcion</span>
                <p className="text-xs" style={{ color: NAVY }}>{order.descripcion}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Ubicacion</span>
                <p className="text-xs" style={{ color: NAVY }}>{order.ubicacion}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Unidades Pedido / Total</span>
                <p className="text-xs font-semibold" style={{ color: NAVY }}>
                  {formatNumber(order.unidadesPedido)} / {formatNumber(order.unidadesTotal)}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                         */
/* ================================================================== */
export default function PedidosPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState('pedidos');
  const [selectedLocal, setSelectedLocal] = useState('Todos');
  const [searchPedido, setSearchPedido] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [page, setPage] = useState(1);
  const [pendPage, setPendPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // reset pages when filters change
  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (selectedLocal !== 'Todos') {
      filtered = filtered.filter((o) => o.sucursal === selectedLocal);
    }
    if (searchPedido.trim()) {
      const q = searchPedido.trim().toLowerCase();
      filtered = filtered.filter((o) => o.numPedido.toLowerCase().includes(q));
    }
    if (selectedDate) {
      filtered = filtered.filter((o) => o.fecha === selectedDate);
    }
    return filtered;
  }, [selectedLocal, searchPedido, selectedDate]);

  // reset page to 1 on filter change
  useMemo(() => { setPage(1); setPendPage(1); }, [selectedLocal, searchPedido, selectedDate]);

  const pendingOrders = useMemo(() => filteredOrders.filter((o) => o.estado === 'Pendiente'), [filteredOrders]);

  const filteredLocalSummary = useMemo(() => {
    if (selectedLocal === 'Todos') return ordersByLocal;
    return ordersByLocal.filter((l) => l.name === selectedLocal);
  }, [selectedLocal]);

  // Pagination helpers
  const totalPagesPedidos = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const displayedOrders = filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalPagesPend = Math.max(1, Math.ceil(pendingOrders.length / PAGE_SIZE));
  const displayedPending = pendingOrders.slice((pendPage - 1) * PAGE_SIZE, pendPage * PAGE_SIZE);

  // Export data (as Record<string, unknown>[])
  const exportData: Record<string, unknown>[] = filteredOrders.map((o) => ({
    fecha: formatDate(o.fecha),
    sucursal: o.sucursal,
    numPedido: o.numPedido,
    referencia: o.referencia,
    descripcion: o.descripcion,
    ubicacion: o.ubicacion,
    unidadesPedido: o.unidadesPedido,
    unidadesTotal: o.unidadesTotal,
    estado: o.estado,
  }));

  // Comparacion data
  const comparisonData = useMemo(() => {
    const localMap = new Map<string, { prodPedidos: number; unidPedidas: number; prodEntregados: number; unidEntregadas: number }>();
    for (const o of filteredOrders) {
      const entry = localMap.get(o.sucursal) || { prodPedidos: 0, unidPedidas: 0, prodEntregados: 0, unidEntregadas: 0 };
      entry.prodPedidos += 1;
      entry.unidPedidas += o.unidadesPedido;
      if (o.estado === 'Entregado') {
        entry.prodEntregados += 1;
        entry.unidEntregadas += o.unidadesTotal;
      } else if (o.estado === 'Parcial') {
        entry.prodEntregados += 1;
        entry.unidEntregadas += Math.round(o.unidadesTotal * 0.6);
      }
      localMap.set(o.sucursal, entry);
    }
    return Array.from(localMap.entries()).map(([name, d]) => ({
      name,
      prodPedidos: d.prodPedidos,
      unidPedidas: d.unidPedidas,
      prodEntregados: d.prodEntregados,
      unidEntregadas: d.unidEntregadas,
      diferencia: d.unidPedidas - d.unidEntregadas,
      cumplimiento: d.unidPedidas > 0 ? Math.round((d.unidEntregadas / d.unidPedidas) * 100) : 0,
    }));
  }, [filteredOrders]);

  // Dashboard: orders by local
  const ordersByLocalChart = useMemo(() => {
    const m = new Map<string, number>();
    for (const o of filteredOrders) {
      m.set(o.sucursal, (m.get(o.sucursal) || 0) + 1);
    }
    return Array.from(m.entries()).map(([name, count]) => ({ name, pedidos: count }));
  }, [filteredOrders]);

  // Dashboard: orders by date (last 7 unique days)
  const ordersByDateChart = useMemo(() => {
    const m = new Map<string, number>();
    for (const o of filteredOrders) {
      m.set(o.fecha, (m.get(o.fecha) || 0) + 1);
    }
    const sorted = Array.from(m.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7);
    return sorted.map(([fecha, count]) => ({ fecha: formatDate(fecha), pedidos: count }));
  }, [filteredOrders]);

  // Dashboard KPIs
  const dashKpis = useMemo(() => {
    const total = filteredOrders.length;
    const pend = filteredOrders.filter((o) => o.estado === 'Pendiente').length;
    const entregados = filteredOrders.filter((o) => o.estado === 'Entregado').length;
    const tasa = total > 0 ? Math.round((entregados / total) * 100) : 0;
    return { total, pend, entregados, tasa };
  }, [filteredOrders]);

  // File upload handler
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast('success', `Archivo cargado exitosamente: ${file.name}`);
      // reset so same file can be picked again
      e.target.value = '';
    }
  };

  const TABLE_HEADERS = ['FECHA', 'SUCURSAL', 'NUM PEDIDO', 'REFERENCIA', 'DESCRIPCION', 'UBICACION', 'UNID PEDIDO', 'UNID TOTAL'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          Entrega Certificada
        </h1>
        <p className="text-sm mt-1" style={{ color: DARK_BLUE }}>
          Sistema de verificacion y trazabilidad
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="px-6 mb-4">
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#E9ECEF' }}>
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? ACCENT_BLUE : '#6B7280',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shared filters */}
      <div className="px-6">
        <FilterBar
          selectedLocal={selectedLocal}
          setSelectedLocal={setSelectedLocal}
          searchPedido={searchPedido}
          setSearchPedido={setSearchPedido}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onUploadClick={handleUploadClick}
        />
      </div>

      {/* ====== TAB: PEDIDOS ====== */}
      {activeTab === 'pedidos' && (
        <div className="px-6 pb-8">
          {/* Export */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {formatNumber(filteredOrders.length)} pedidos encontrados
            </p>
            <ExportButtons data={exportData} filename="pedidos" columns={ORDER_COLUMNS} />
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: `${NAVY}08` }}>
                    {TABLE_HEADERS.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: DARK_BLUE }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {displayedOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      expanded={expandedId === order.id}
                      onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} totalPages={totalPagesPedidos} total={filteredOrders.length} onPage={setPage} />
          </div>
        </div>
      )}

      {/* ====== TAB: PENDIENTES ====== */}
      {activeTab === 'pendientes' && (
        <div className="px-6 pb-8">
          {/* Count badge */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: `${AMBER}15`, color: AMBER }}
            >
              <Clock size={16} />
              {formatNumber(pendingOrders.length)} pedidos pendientes
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: `${AMBER}15` }}>
                    {TABLE_HEADERS.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: DARK_BLUE }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {displayedPending.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      expanded={expandedId === order.id}
                      onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={pendPage} totalPages={totalPagesPend} total={pendingOrders.length} onPage={setPendPage} />
          </div>
        </div>
      )}

      {/* ====== TAB: COMPARACION ====== */}
      {activeTab === 'comparacion' && (
        <div className="px-6 pb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: NAVY }}>
            Comparacion Pedidos vs Entregados por Local
          </h2>

          {/* Comparison table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: `${NAVY}08` }}>
                    {['LOCAL', 'PROD. PEDIDOS', 'UNID. PEDIDAS', 'PROD. ENTREGADOS', 'UNID. ENTREGADAS', 'DIFERENCIA', '% CUMPLIMIENTO'].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                          style={{ color: DARK_BLUE }}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparisonData.map((row) => (
                    <tr key={row.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium" style={{ color: NAVY }}>
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: DARK_BLUE }}>
                        {formatNumber(row.prodPedidos)}
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: DARK_BLUE }}>
                        {formatNumber(row.unidPedidas)}
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: GREEN }}>
                        {formatNumber(row.prodEntregados)}
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: GREEN }}>
                        {formatNumber(row.unidEntregadas)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium" style={{ color: RED }}>
                        {formatNumber(row.diferencia)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: row.cumplimiento >= 80 ? `${GREEN}15` : row.cumplimiento >= 50 ? `${AMBER}15` : `${RED}15`,
                            color: row.cumplimiento >= 80 ? GREEN : row.cumplimiento >= 50 ? AMBER : RED,
                          }}
                        >
                          {row.cumplimiento}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Horizontal bar chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold mb-4" style={{ color: NAVY }}>
              Unidades Pedidas vs Entregadas por Local
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData} layout="vertical" margin={{ left: 120, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={110} />
                <Tooltip formatter={(value: unknown) => String(formatNumber(Number(value)))} />
                <Legend />
                <Bar dataKey="unidPedidas" name="Unidades Pedidas" fill={ACCENT_BLUE} radius={[0, 4, 4, 0]} />
                <Bar dataKey="unidEntregadas" name="Unidades Entregadas" fill={GREEN} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ====== TAB: DASHBOARD ====== */}
      {activeTab === 'dashboard' && (
        <div className="px-6 pb-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Total Pedidos</span>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ACCENT_BLUE}15` }}>
                  <Package size={18} style={{ color: ACCENT_BLUE }} />
                </div>
              </div>
              <p className="text-3xl font-bold" style={{ color: NAVY }}>
                {formatNumber(dashKpis.total)}
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Pendientes</span>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${AMBER}15` }}>
                  <Clock size={18} style={{ color: AMBER }} />
                </div>
              </div>
              <p className="text-3xl font-bold" style={{ color: AMBER }}>
                {formatNumber(dashKpis.pend)}
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Entregados</span>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${GREEN}15` }}>
                  <CheckCircle size={18} style={{ color: GREEN }} />
                </div>
              </div>
              <p className="text-3xl font-bold" style={{ color: GREEN }}>
                {formatNumber(dashKpis.entregados)}
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Tasa de Cumplimiento</span>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${TEAL}15` }}>
                  <Percent size={18} style={{ color: TEAL }} />
                </div>
              </div>
              <p className="text-3xl font-bold" style={{ color: TEAL }}>
                {dashKpis.tasa}%
              </p>
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar chart: orders by local */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold mb-4" style={{ color: NAVY }}>
                Pedidos por Local
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersByLocalChart} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: unknown) => String(formatNumber(Number(value)))} />
                  <Bar dataKey="pedidos" name="Pedidos" fill={ACCENT_BLUE} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line chart: orders by date (last 7 days) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold mb-4" style={{ color: NAVY }}>
                Tendencia Ultimos 7 Dias
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ordersByDateChart} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: unknown) => String(formatNumber(Number(value)))} />
                  <Line type="monotone" dataKey="pedidos" name="Pedidos" stroke={TEAL} strokeWidth={2} dot={{ fill: TEAL, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
