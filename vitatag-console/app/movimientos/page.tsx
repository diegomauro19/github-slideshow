'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Clock, Package, Search, User, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import ExportButtons from '@/components/shared/ExportButtons';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const AMBER = '#F39C12';
const RED = '#C0392B';

interface Movement {
  id: number;
  time: string;
  date: string;
  product: string;
  code: string;
  from: string;
  to: string;
  qty: number;
  unit: string;
  user: string;
  type: 'entrada' | 'salida' | 'transferencia' | 'ajuste';
}

const movimientos: Movement[] = [
  { id: 1, time: '14:32', date: '2026-04-03', product: 'Salmón Fresco 500g', code: 'SAL-890', from: 'Nevera 1', to: 'Picking', qty: 12, unit: 'kg', user: 'Carlos Mejía', type: 'transferencia' },
  { id: 2, time: '14:28', date: '2026-04-03', product: 'Queso Parmesano 250g', code: 'QPR-578', from: 'Nevera 2', to: 'Despacho', qty: 8, unit: 'kg', user: 'María López', type: 'transferencia' },
  { id: 3, time: '14:15', date: '2026-04-03', product: 'Spaghetti Fresco 500g', code: 'SPG-215', from: 'Logística', to: 'Olivia Laureles', qty: 24, unit: 'und', user: 'Carlos Mejía', type: 'salida' },
  { id: 4, time: '13:55', date: '2026-04-03', product: 'Emulsión Balsámica 250ml', code: 'EBS-410', from: 'CDP Logística', to: 'Clap Laureles', qty: 6, unit: 'und', user: 'Andrés García', type: 'salida' },
  { id: 5, time: '13:42', date: '2026-04-03', product: 'Solomito x 5 und', code: 'SOL-245', from: 'Nevera 3', to: 'Picking', qty: 10, unit: 'und', user: 'María López', type: 'transferencia' },
  { id: 6, time: '13:30', date: '2026-04-03', product: 'Rúgula 250g', code: 'RGL-705', from: 'Nevera 1', to: 'Despacho', qty: 15, unit: 'und', user: 'Diana Torres', type: 'transferencia' },
  { id: 7, time: '13:18', date: '2026-04-03', product: 'Salsa Bolognesa 500g', code: 'BOL-136', from: 'Logística', to: 'Olivia Viva Envigado', qty: 20, unit: 'und', user: 'Andrés García', type: 'salida' },
  { id: 8, time: '12:55', date: '2026-04-03', product: 'Ravioli de Carne 500g', code: 'RVC-200', from: 'Nevera 2', to: 'Picking', qty: 8, unit: 'und', user: 'Carlos Mejía', type: 'transferencia' },
  { id: 9, time: '12:40', date: '2026-04-03', product: 'Volcán de Chocolate', code: 'VCH-600', from: 'Logística', to: 'Olivia Tesoro', qty: 12, unit: 'und', user: 'Diana Torres', type: 'salida' },
  { id: 10, time: '12:22', date: '2026-04-03', product: 'Camarón Grande x kg', code: 'CMR-480', from: 'Nevera 3', to: 'Despacho', qty: 5, unit: 'kg', user: 'María López', type: 'transferencia' },
  { id: 11, time: '12:05', date: '2026-04-03', product: 'Garbanzos Cocidos 1kg', code: 'GRB-055', from: 'CDP Almacén', to: 'Clap Envigado', qty: 15, unit: 'kg', user: 'Andrés García', type: 'salida' },
  { id: 12, time: '11:48', date: '2026-04-03', product: 'Mantequilla Sin Sal 500g', code: 'MNT-325', from: 'Nevera 1', to: 'Picking', qty: 10, unit: 'und', user: 'Carlos Mejía', type: 'transferencia' },
  { id: 13, time: '11:30', date: '2026-04-03', product: 'Salsa Pesto 250g', code: 'PST-155', from: 'Nevera 2', to: 'Olivia Laureles', qty: 30, unit: 'und', user: 'Diana Torres', type: 'salida' },
  { id: 14, time: '11:15', date: '2026-04-03', product: 'Pollo Pechuga x 10 und', code: 'PCH-301', from: 'Nevera 3', to: 'Picking', qty: 18, unit: 'und', user: 'María López', type: 'transferencia' },
  { id: 15, time: '10:58', date: '2026-04-03', product: 'Aguacate Hass', code: 'AGU-700', from: 'Logística', to: 'Olivia Arkadia', qty: 4, unit: 'und', user: 'Andrés García', type: 'salida' },
  { id: 16, time: '10:45', date: '2026-04-03', product: 'Pan Multicereal x 6', code: 'PMC-500', from: 'Proveedor Externo', to: 'CDP Nevera 2', qty: 50, unit: 'und', user: 'Juan Pérez', type: 'entrada' },
  { id: 17, time: '10:30', date: '2026-04-03', product: 'Helado Vainilla x lt', code: 'HVN-620', from: 'CDP Nevera 2', to: 'CDP Nevera 2', qty: -3, unit: 'lt', user: 'Carlos Mejía', type: 'ajuste' },
  { id: 18, time: '09:45', date: '2026-04-03', product: 'Pulpa Fresa-Mango x lt', code: 'PFM-800', from: 'Proveedor Externo', to: 'CDP Nevera 2', qty: 30, unit: 'lt', user: 'Juan Pérez', type: 'entrada' },
  { id: 19, time: '09:30', date: '2026-04-02', product: 'Masa Pizza', code: 'MPZ-510', from: 'CDP Nevera 2', to: 'Olivia Laureles', qty: 20, unit: 'und', user: 'Diana Torres', type: 'salida' },
  { id: 20, time: '09:15', date: '2026-04-02', product: 'Torta de Queso Vasca', code: 'TQV-605', from: 'CDP Nevera 2', to: 'Olivia Viva Envigado', qty: 8, unit: 'und', user: 'Andrés García', type: 'salida' },
  { id: 21, time: '16:45', date: '2026-04-02', product: 'Galleta Pistacho x 12', code: 'GPL-610', from: 'CDP Almacén', to: 'CDP Almacén', qty: -5, unit: 'und', user: 'María López', type: 'ajuste' },
  { id: 22, time: '15:30', date: '2026-04-02', product: 'Pepperoni 500g', code: 'PPR-520', from: 'Proveedor Externo', to: 'CDP Nevera 1', qty: 40, unit: 'und', user: 'Juan Pérez', type: 'entrada' },
  { id: 23, time: '14:20', date: '2026-04-02', product: 'Langostinos x kg', code: 'LGS-485', from: 'Nevera 2', to: 'Picking', qty: 5, unit: 'kg', user: 'Carlos Mejía', type: 'transferencia' },
  { id: 24, time: '13:10', date: '2026-04-02', product: 'Chorizo Español x 6', code: 'CHE-510', from: 'Nevera 1', to: 'Clap Laureles', qty: 12, unit: 'und', user: 'Diana Torres', type: 'salida' },
  { id: 25, time: '12:00', date: '2026-04-02', product: 'Carpaccio de Res 200g', code: 'CRP-505', from: 'Nevera 2', to: 'Olivia Arkadia', qty: 8, unit: 'und', user: 'Andrés García', type: 'salida' },
];

const typeConfig: Record<string, { label: string; color: string }> = {
  entrada: { label: 'Entrada', color: GREEN },
  salida: { label: 'Salida', color: ACCENT_BLUE },
  transferencia: { label: 'Transferencia', color: AMBER },
  ajuste: { label: 'Ajuste', color: RED },
};

function zoneColor(zone: string) {
  if (zone.includes('Nevera')) return ACCENT_BLUE;
  if (zone.includes('Logística') || zone.includes('CDP') || zone.includes('Almacén')) return GREEN;
  if (zone.includes('Picking')) return AMBER;
  if (zone.includes('Despacho')) return '#E67E22';
  if (zone.includes('Proveedor')) return TEAL;
  return TEAL;
}

export default function MovimientosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return movimientos.filter((m) => {
      if (searchTerm && !m.product.toLowerCase().includes(searchTerm.toLowerCase()) && !m.code.toLowerCase().includes(searchTerm.toLowerCase()) && !m.user.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (dateFilter && m.date !== dateFilter) return false;
      if (typeFilter && m.type !== typeFilter) return false;
      return true;
    });
  }, [searchTerm, dateFilter, typeFilter]);

  const counts = {
    total: filtered.length,
    entradas: filtered.filter(m => m.type === 'entrada').length,
    salidas: filtered.filter(m => m.type === 'salida').length,
    transferencias: filtered.filter(m => m.type === 'transferencia').length,
    ajustes: filtered.filter(m => m.type === 'ajuste').length,
  };

  const hasFilters = searchTerm || dateFilter || typeFilter;

  const exportData = filtered.map(m => ({
    Fecha: m.date, Hora: m.time, Producto: m.product, Código: m.code,
    Tipo: m.type, Desde: m.from, Hacia: m.to, Cantidad: m.qty, Unidad: m.unit, Usuario: m.user,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Movimientos de Inventario</h1>
        <p className="text-gray-500 mt-1">Trazabilidad de cada movimiento de producto entre zonas y locales</p>
      </div>

      {/* Type KPIs */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total', value: counts.total, color: NAVY },
          { label: 'Entradas', value: counts.entradas, color: GREEN },
          { label: 'Salidas', value: counts.salidas, color: ACCENT_BLUE },
          { label: 'Transferencias', value: counts.transferencias, color: AMBER },
          { label: 'Ajustes', value: counts.ajustes, color: RED },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">{k.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar producto, código o usuario..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <ExportButtons data={exportData} filename="movimientos" />
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm">
          <option value="">Todos los tipos</option>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
          <option value="transferencia">Transferencia</option>
          <option value="ajuste">Ajuste</option>
        </select>
        {hasFilters && (
          <button onClick={() => { setSearchTerm(''); setDateFilter(''); setTypeFilter(''); }}
            className="px-3 py-2 rounded-lg text-sm font-medium" style={{ color: RED }}>Limpiar</button>
        )}
        <span className="text-sm text-gray-400">{filtered.length} movimientos</span>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.map((mov) => (
            <div key={mov.id}>
              <div className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === mov.id ? null : mov.id)}>
                {/* Time */}
                <div className="w-16 flex-shrink-0 text-center">
                  <p className="text-lg font-bold font-mono" style={{ color: NAVY }}>{mov.time}</p>
                  <p className="text-[10px] text-gray-400">{mov.date}</p>
                </div>

                {/* Timeline dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full ring-4 ring-blue-50" style={{ backgroundColor: typeConfig[mov.type].color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-gray-400 flex-shrink-0" />
                    <p className="font-medium text-gray-900 truncate">{mov.product}</p>
                    <span className="text-xs font-mono text-gray-400 flex-shrink-0">{mov.code}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">x{mov.qty} {mov.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: zoneColor(mov.from) + '15', color: zoneColor(mov.from) }}>{mov.from}</span>
                    <ArrowRight size={12} className="text-gray-300" />
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: zoneColor(mov.to) + '15', color: zoneColor(mov.to) }}>{mov.to}</span>
                  </div>
                </div>

                {/* Type badge */}
                <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: typeConfig[mov.type].color + '15', color: typeConfig[mov.type].color }}>
                  {typeConfig[mov.type].label}
                </span>

                {/* User */}
                <div className="flex items-center gap-2 text-sm text-gray-400 flex-shrink-0">
                  <User size={14} />
                  <span>{mov.user}</span>
                </div>

                <div className="flex-shrink-0 text-gray-300">
                  {expandedId === mov.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === mov.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Código Producto</p>
                      <p className="font-mono font-medium">{mov.code}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Tipo de Movimiento</p>
                      <p className="font-medium" style={{ color: typeConfig[mov.type].color }}>{typeConfig[mov.type].label}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Cantidad</p>
                      <p className="font-mono font-medium">{mov.qty} {mov.unit}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Registrado por</p>
                      <p className="font-medium">{mov.user}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-gray-500 text-xs mb-1">Ruta</p>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ backgroundColor: zoneColor(mov.from) + '15', color: zoneColor(mov.from) }}>{mov.from}</span>
                      <ArrowRight size={16} className="text-gray-400" />
                      <span className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ backgroundColor: zoneColor(mov.to) + '15', color: zoneColor(mov.to) }}>{mov.to}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p>No se encontraron movimientos con los filtros seleccionados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
