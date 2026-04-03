'use client';

import { useState, useMemo } from 'react';
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
  Filter,
  BarChart3,
  ClipboardList,
  LayoutDashboard,
} from 'lucide-react';
import { orders, ORDER_STATS, ordersByLocal } from '@/data/mock/orders';

const NAVY = '#0D1B2A';
const DARK_BLUE = '#1B4F72';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const LOCALES = ['Todos', 'Olivia Viva Envigado', 'Olivia Laureles', 'Clap Laureles', 'Olivia Arkadia', 'Olivia 10b'];

const subTabs = [
  { id: 'pedidos', label: 'Pedidos', icon: ClipboardList },
  { id: 'pendientes', label: 'Pendientes', icon: Clock },
  { id: 'comparacion', label: 'Comparación', icon: BarChart3 },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

function formatNumber(n: number): string {
  return n.toLocaleString('es-CO');
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function PedidosPage() {
  const [activeTab, setActiveTab] = useState('pedidos');
  const [selectedLocal, setSelectedLocal] = useState('Todos');
  const [searchPedido, setSearchPedido] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

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

  const displayedOrders = filteredOrders.slice(0, 100);

  const filteredLocalSummary = useMemo(() => {
    if (selectedLocal === 'Todos') return ordersByLocal;
    return ordersByLocal.filter((l) => l.name === selectedLocal);
  }, [selectedLocal]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          Entrega Certificada
        </h1>
        <p className="text-sm mt-1" style={{ color: DARK_BLUE }}>
          Sistema de verificación y trazabilidad
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

      {activeTab === 'pedidos' && (
        <div className="px-6 pb-8">
          {/* Filter Row */}
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
                  style={{ focusRingColor: ACCENT_BLUE } as React.CSSProperties}
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: ACCENT_BLUE }}
              >
                <Upload size={14} />
                Cargar Excel
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Total Pedidos</span>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ACCENT_BLUE}15` }}>
                  <Package size={18} style={{ color: ACCENT_BLUE }} />
                </div>
              </div>
              <p className="text-3xl font-bold" style={{ color: NAVY }}>
                {formatNumber(ORDER_STATS.total)}
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
                {formatNumber(ORDER_STATS.pendientes)}
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
                {formatNumber(ORDER_STATS.entregados)}
              </p>
            </div>
          </div>

          {/* Resumen por Local */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3" style={{ color: NAVY }}>
              Resumen por Local
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {filteredLocalSummary.map((loc) => (
                <div
                  key={loc.name}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} style={{ color: TEAL }} />
                      <span className="text-sm font-semibold" style={{ color: NAVY }}>
                        {loc.name}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium" style={{ color: DARK_BLUE }}>
                        {formatNumber(loc.productos)}
                      </span>{' '}
                      productos
                    </p>
                    {loc.unidades !== loc.productos && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium" style={{ color: DARK_BLUE }}>
                          {formatNumber(loc.unidades)}
                        </span>{' '}
                        unidades
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${AMBER}20`,
                        color: AMBER,
                      }}
                    >
                      {loc.estado}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={10} />
                      {formatDate(loc.fecha)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: `${NAVY}08` }}>
                    {['FECHA', 'SUCURSAL', 'NUM PEDIDO', 'REFERENCIA', 'DESCRIPCIÓN', 'UBICACIÓN', 'UNID PEDIDO', 'UNID TOTAL'].map(
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
                  {displayedOrders.map((order, idx) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Mostrando{' '}
                <span className="font-medium" style={{ color: NAVY }}>
                  {Math.min(100, filteredOrders.length)}
                </span>{' '}
                de{' '}
                <span className="font-medium" style={{ color: NAVY }}>
                  {formatNumber(filteredOrders.length)}
                </span>{' '}
                pedidos
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Filter size={12} />
                {selectedLocal !== 'Todos' || searchPedido || selectedDate ? 'Filtros activos' : 'Sin filtros'}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'pedidos' && (
        <div className="px-6 pb-8">
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <AlertCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-400">
              Sección {subTabs.find((t) => t.id === activeTab)?.label} en construcción
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
