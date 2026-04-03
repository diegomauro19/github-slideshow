'use client';

import { useState } from 'react';
import { ArrowRight, Clock, Package, Filter, Search, User } from 'lucide-react';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const AMBER = '#F39C12';

const movimientos = [
  { id: 1, time: '14:32', date: '2026-04-03', product: 'Salmón Fresco 500g', from: 'Nevera 1', to: 'Picking', qty: 12, user: 'Carlos Mejía' },
  { id: 2, time: '14:28', date: '2026-04-03', product: 'Queso Mozzarella 1kg', from: 'Nevera 2', to: 'Despacho', qty: 8, user: 'María López' },
  { id: 3, time: '14:15', date: '2026-04-03', product: 'Pasta Fresca Fettuccine', from: 'Logística', to: 'Olivia Laureles', qty: 24, user: 'Carlos Mejía' },
  { id: 4, time: '13:55', date: '2026-04-03', product: 'Aceite de Oliva 750ml', from: 'CDP Logística', to: 'Clap Laureles', qty: 6, user: 'Andrés García' },
  { id: 5, time: '13:42', date: '2026-04-03', product: 'Carne Res Premium 2kg', from: 'Nevera 3', to: 'Picking', qty: 10, user: 'María López' },
  { id: 6, time: '13:30', date: '2026-04-03', product: 'Rúgula Orgánica 250g', from: 'Nevera 1', to: 'Despacho', qty: 15, user: 'Diana Torres' },
  { id: 7, time: '13:18', date: '2026-04-03', product: 'Tomate San Marzano 1kg', from: 'Logística', to: 'Olivia Viva Envigado', qty: 20, user: 'Andrés García' },
  { id: 8, time: '12:55', date: '2026-04-03', product: 'Hongos Portobello 500g', from: 'Nevera 2', to: 'Picking', qty: 8, user: 'Carlos Mejía' },
  { id: 9, time: '12:40', date: '2026-04-03', product: 'Vino Tinto Reserva', from: 'Logística', to: 'Olivia Tesoro', qty: 12, user: 'Diana Torres' },
  { id: 10, time: '12:22', date: '2026-04-03', product: 'Camarón Jumbo 1kg', from: 'Nevera 3', to: 'Despacho', qty: 5, user: 'María López' },
  { id: 11, time: '12:05', date: '2026-04-03', product: 'Harina 00 Caputo 1kg', from: 'Logística', to: 'Clap Envigado', qty: 15, user: 'Andrés García' },
  { id: 12, time: '11:48', date: '2026-04-03', product: 'Mantequilla Sin Sal 500g', from: 'Nevera 1', to: 'Picking', qty: 10, user: 'Carlos Mejía' },
  { id: 13, time: '11:30', date: '2026-04-03', product: 'Albahaca Fresca', from: 'Nevera 2', to: 'Olivia Laureles', qty: 30, user: 'Diana Torres' },
  { id: 14, time: '11:15', date: '2026-04-03', product: 'Pechuga de Pollo 1kg', from: 'Nevera 3', to: 'Picking', qty: 18, user: 'María López' },
  { id: 15, time: '10:58', date: '2026-04-03', product: 'Limón Tahití x20', from: 'Logística', to: 'Olivia Arkadia', qty: 4, user: 'Andrés García' },
];

function zoneColor(zone: string) {
  if (zone.includes('Nevera')) return ACCENT_BLUE;
  if (zone.includes('Logística') || zone.includes('CDP')) return GREEN;
  if (zone.includes('Picking')) return AMBER;
  if (zone.includes('Despacho')) return '#E67E22';
  return TEAL;
}

export default function MovimientosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('2026-04-03');

  const filtered = movimientos.filter((m) => {
    const matchSearch = !searchTerm || m.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = !dateFilter || m.date === dateFilter;
    return matchSearch && matchDate;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Movimientos de Inventario</h1>
        <p className="text-gray-500 mt-1">Trazabilidad de cada movimiento de producto entre zonas y locales</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>
        <span className="text-sm text-gray-400">{filtered.length} movimientos</span>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold" style={{ color: NAVY }}>Línea de Tiempo</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map((mov) => (
            <div key={mov.id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-5">
              {/* Time */}
              <div className="w-16 flex-shrink-0 text-center">
                <p className="text-lg font-bold" style={{ color: NAVY }}>{mov.time}</p>
                <p className="text-[10px] text-gray-400">{mov.date}</p>
              </div>

              {/* Timeline dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full ring-4 ring-blue-50" style={{ backgroundColor: ACCENT_BLUE }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-gray-400 flex-shrink-0" />
                  <p className="font-medium text-gray-900 truncate">{mov.product}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">x{mov.qty}</span>
                </div>

                {/* From → To */}
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: zoneColor(mov.from) + '15', color: zoneColor(mov.from) }}
                  >
                    {mov.from}
                  </span>
                  <ArrowRight size={12} className="text-gray-300" />
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: zoneColor(mov.to) + '15', color: zoneColor(mov.to) }}
                  >
                    {mov.to}
                  </span>
                </div>
              </div>

              {/* User */}
              <div className="flex items-center gap-2 text-sm text-gray-400 flex-shrink-0">
                <User size={14} />
                <span>{mov.user}</span>
              </div>
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
