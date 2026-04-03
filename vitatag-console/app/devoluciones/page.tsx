'use client';

import { useState, useMemo } from 'react';
import { RotateCcw, DollarSign, CalendarDays, Search, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/components/shared/Toast';
import ExportButtons from '@/components/shared/ExportButtons';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';

interface Devolucion {
  id: number;
  fecha: string;
  producto: string;
  codigo: string;
  cantidad: number;
  razon: 'Vencimiento próximo' | 'Daño en transporte' | 'Error en pedido' | 'Calidad no conforme' | 'Temperatura inadecuada';
  local: string;
  estado: 'Aprobada' | 'Pendiente' | 'Rechazada';
  valor: number;
  notas: string;
}

const devoluciones: Devolucion[] = [
  { id: 1, fecha: '2026-04-03', producto: 'Salmón Fresco 500g', codigo: 'SAL-890', cantidad: 3, razon: 'Vencimiento próximo', local: 'Olivia Laureles', estado: 'Aprobada', valor: 187500, notas: 'Producto a 2 días de vencer, devuelto al CDP para uso inmediato' },
  { id: 2, fecha: '2026-04-02', producto: 'Queso Parmesano Rallado 250g', codigo: 'QPR-578', cantidad: 2, razon: 'Daño en transporte', local: 'Clap Laureles', estado: 'Aprobada', valor: 56000, notas: 'Empaque roto durante el transporte' },
  { id: 3, fecha: '2026-04-02', producto: 'Emulsión Balsámica 250ml', codigo: 'EBS-410', cantidad: 1, razon: 'Error en pedido', local: 'Olivia Viva Envigado', estado: 'Pendiente', valor: 45000, notas: 'Se pidió vinagreta Olivia, llegó emulsión balsámica' },
  { id: 4, fecha: '2026-04-01', producto: 'Solomito x 5 und', codigo: 'SOL-245', cantidad: 2, razon: 'Calidad no conforme', local: 'Olivia Arkadia', estado: 'Aprobada', valor: 198000, notas: 'Color y textura no cumplen estándar de calidad' },
  { id: 5, fecha: '2026-03-31', producto: 'Rúgula 250g', codigo: 'RGL-705', cantidad: 5, razon: 'Vencimiento próximo', local: 'Clap Envigado', estado: 'Rechazada', valor: 87500, notas: 'Rechazada: producto aún tiene 3 días de vida útil' },
  { id: 6, fecha: '2026-03-30', producto: 'Spaghetti Fresco 500g', codigo: 'SPG-215', cantidad: 4, razon: 'Daño en transporte', local: 'Olivia 10b', estado: 'Aprobada', valor: 68000, notas: 'Paquetes aplastados durante la entrega' },
  { id: 7, fecha: '2026-03-29', producto: 'Aguacate Hass', codigo: 'AGU-700', cantidad: 8, razon: 'Calidad no conforme', local: 'Olivia Tesoro', estado: 'Aprobada', valor: 120000, notas: 'Aguacates muy maduros, no aptos para servicio' },
  { id: 8, fecha: '2026-03-28', producto: 'Salsa Bolognesa 500g', codigo: 'BOL-136', cantidad: 6, razon: 'Temperatura inadecuada', local: 'Clap Visitación', estado: 'Pendiente', valor: 96000, notas: 'Llegó a 12°C, debe llegar a máx 4°C' },
  { id: 9, fecha: '2026-03-27', producto: 'Camarón Grande x kg', codigo: 'CMR-480', cantidad: 2, razon: 'Error en pedido', local: 'Olivia Oviedo', estado: 'Aprobada', valor: 234000, notas: 'Se pidieron langostinos, llegaron camarones' },
  { id: 10, fecha: '2026-03-26', producto: 'Volcán de Chocolate', codigo: 'VCH-600', cantidad: 3, razon: 'Daño en transporte', local: 'Olivia San Lucas', estado: 'Aprobada', valor: 153000, notas: 'Se derritieron por cadena de frío rota' },
  { id: 11, fecha: '2026-03-25', producto: 'Pollo Pechuga x 10 und', codigo: 'PCH-301', cantidad: 4, razon: 'Temperatura inadecuada', local: 'Olivia Mayorca', estado: 'Aprobada', valor: 176000, notas: 'Temperatura de entrega fuera de rango' },
  { id: 12, fecha: '2026-03-24', producto: 'Yogurt Griego Natural x lt', codigo: 'YGN-320', cantidad: 3, razon: 'Vencimiento próximo', local: 'Clap Industriales', estado: 'Aprobada', valor: 54000, notas: 'Vencimiento al día siguiente de la entrega' },
  { id: 13, fecha: '2026-03-23', producto: 'Pan Sourdough', codigo: 'PSD-505', cantidad: 10, razon: 'Calidad no conforme', local: 'Olivia Lennon', estado: 'Pendiente', valor: 95000, notas: 'Pan no leudó correctamente, textura inadecuada' },
  { id: 14, fecha: '2026-03-22', producto: 'Torta de Queso Vasca', codigo: 'TQV-605', cantidad: 2, razon: 'Daño en transporte', local: 'Olivia Amsterdam', estado: 'Aprobada', valor: 78000, notas: 'Tortas aplastadas en la caja de transporte' },
  { id: 15, fecha: '2026-03-21', producto: 'Salsa Pesto 250g', codigo: 'PST-155', cantidad: 3, razon: 'Vencimiento próximo', local: 'Olivia Fabricato', estado: 'Rechazada', valor: 67500, notas: 'Rechazada: aún 5 días de vida útil' },
];

const razones = ['Vencimiento próximo', 'Daño en transporte', 'Error en pedido', 'Calidad no conforme', 'Temperatura inadecuada'];
const estados = ['Aprobada', 'Pendiente', 'Rechazada'];
const locales = Array.from(new Set(devoluciones.map(d => d.local))).sort();

function estadoBadge(estado: string) {
  if (estado === 'Aprobada') return 'bg-green-100 text-green-700';
  if (estado === 'Pendiente') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

function razonColor(razon: string) {
  if (razon.includes('Vencimiento')) return 'bg-red-50 text-red-700';
  if (razon.includes('Daño')) return 'bg-amber-50 text-amber-700';
  if (razon.includes('Error')) return 'bg-blue-50 text-blue-700';
  if (razon.includes('Temperatura')) return 'bg-purple-50 text-purple-700';
  return 'bg-orange-50 text-orange-700';
}

function formatCurrency(n: number) {
  return '$' + n.toLocaleString('es-CO');
}

export default function DevolucionesPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filterLocal, setFilterLocal] = useState('');
  const [filterRazon, setFilterRazon] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [items, setItems] = useState<Devolucion[]>(devoluciones);

  // New return form
  const [newForm, setNewForm] = useState({ producto: '', codigo: '', cantidad: 1, razon: razones[0], local: locales[0], valor: 0, notas: '' });

  const filtered = useMemo(() => {
    return items.filter((d) => {
      if (search && !d.producto.toLowerCase().includes(search.toLowerCase()) && !d.codigo.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterLocal && d.local !== filterLocal) return false;
      if (filterRazon && d.razon !== filterRazon) return false;
      if (filterEstado && d.estado !== filterEstado) return false;
      if (dateFrom && d.fecha < dateFrom) return false;
      if (dateTo && d.fecha > dateTo) return false;
      return true;
    });
  }, [items, search, filterLocal, filterRazon, filterEstado, dateFrom, dateTo]);

  const total = filtered.length;
  const esteMes = filtered.filter(d => d.fecha >= '2026-04-01').length;
  const valorTotal = filtered.reduce((s, d) => s + d.valor, 0);
  const pendientes = filtered.filter(d => d.estado === 'Pendiente').length;

  function handleApprove(id: number) {
    setItems(prev => prev.map(d => d.id === id ? { ...d, estado: 'Aprobada' as const } : d));
    toast('success', 'Devolución aprobada exitosamente');
  }

  function handleReject(id: number) {
    setItems(prev => prev.map(d => d.id === id ? { ...d, estado: 'Rechazada' as const } : d));
    toast('warning', 'Devolución rechazada');
  }

  function handleNewReturn() {
    const newId = Math.max(...items.map(d => d.id)) + 1;
    const newItem: Devolucion = {
      id: newId,
      fecha: new Date().toISOString().split('T')[0],
      producto: newForm.producto,
      codigo: newForm.codigo,
      cantidad: newForm.cantidad,
      razon: newForm.razon as Devolucion['razon'],
      local: newForm.local,
      estado: 'Pendiente',
      valor: newForm.valor,
      notas: newForm.notas,
    };
    setItems(prev => [newItem, ...prev]);
    setShowNewModal(false);
    setNewForm({ producto: '', codigo: '', cantidad: 1, razon: razones[0], local: locales[0], valor: 0, notas: '' });
    toast('success', 'Devolución registrada exitosamente');
  }

  function clearFilters() {
    setSearch(''); setFilterLocal(''); setFilterRazon(''); setFilterEstado(''); setDateFrom(''); setDateTo('');
  }

  const hasFilters = search || filterLocal || filterRazon || filterEstado || dateFrom || dateTo;

  const exportData = filtered.map(d => ({
    Fecha: d.fecha, Producto: d.producto, Código: d.codigo, Cantidad: d.cantidad,
    Razón: d.razon, Local: d.local, Estado: d.estado, Valor: d.valor, Notas: d.notas,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Gestión de Devoluciones</h1>
          <p className="text-gray-500 mt-1">Seguimiento de devoluciones de producto a proveedores y entre locales</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: ACCENT_BLUE }}
        >
          <Plus size={16} /> Nueva Devolución
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Devoluciones', value: total, icon: <RotateCcw size={20} />, color: ACCENT_BLUE },
          { label: 'Este Mes', value: esteMes, icon: <CalendarDays size={20} />, color: AMBER },
          { label: 'Pendientes', value: pendientes, icon: <RotateCcw size={20} />, color: AMBER },
          { label: 'Valor Total', value: formatCurrency(valorTotal), icon: <DollarSign size={20} />, color: RED },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.color + '15', color: kpi.color }}>{kpi.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-2xl font-bold" style={{ color: kpi.label === 'Valor Total' ? RED : NAVY }}>{kpi.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar producto o código..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <ExportButtons data={exportData} filename="devoluciones" />
        <select value={filterLocal} onChange={(e) => setFilterLocal(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="">Todos los locales</option>
          {locales.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={filterRazon} onChange={(e) => setFilterRazon(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="">Todas las razones</option>
          {razones.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="">Todos los estados</option>
          {estados.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
        <span className="text-gray-400 text-sm">—</span>
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
        {hasFilters && (
          <button onClick={clearFilters} className="px-3 py-2 rounded-lg text-sm font-medium" style={{ color: RED }}>Limpiar</button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 px-4 py-3"></th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Fecha</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Producto</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Código</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Cant.</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Razón</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Local</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((d) => (
                <>
                  <tr key={d.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedRow(expandedRow === d.id ? null : d.id)}>
                    <td className="px-4 py-3 text-gray-400">{expandedRow === d.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap font-mono text-xs">{d.fecha}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{d.producto}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{d.codigo}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{d.cantidad}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${razonColor(d.razon)}`}>{d.razon}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{d.local}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${estadoBadge(d.estado)}`}>{d.estado}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900 font-mono text-xs">{formatCurrency(d.valor)}</td>
                  </tr>
                  {expandedRow === d.id && (
                    <tr key={`${d.id}-detail`}>
                      <td colSpan={9} className="px-6 py-4 bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Notas:</p>
                            <p className="text-sm text-gray-600">{d.notas}</p>
                          </div>
                          {d.estado === 'Pendiente' && (
                            <div className="flex gap-2 ml-4">
                              <button onClick={(e) => { e.stopPropagation(); handleApprove(d.id); }}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: GREEN }}>
                                Aprobar
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); handleReject(d.id); }}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: RED }}>
                                Rechazar
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 text-sm text-gray-500">
          Mostrando {filtered.length} de {items.length} devoluciones
        </div>
      </div>

      {/* New Return Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowNewModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: NAVY }}>
              <h3 className="text-lg font-semibold text-white">Nueva Devolución</h3>
              <button onClick={() => setShowNewModal(false)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                  <input type="text" value={newForm.producto} onChange={(e) => setNewForm({ ...newForm, producto: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" placeholder="Nombre del producto" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                  <input type="text" value={newForm.codigo} onChange={(e) => setNewForm({ ...newForm, codigo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" placeholder="SAL-890" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input type="number" min={1} value={newForm.cantidad} onChange={(e) => setNewForm({ ...newForm, cantidad: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor ($COP)</label>
                  <input type="number" min={0} value={newForm.valor} onChange={(e) => setNewForm({ ...newForm, valor: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                <select value={newForm.local} onChange={(e) => setNewForm({ ...newForm, local: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                  {locales.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Razón</label>
                <select value={newForm.razon} onChange={(e) => setNewForm({ ...newForm, razon: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                  {razones.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea value={newForm.notas} onChange={(e) => setNewForm({ ...newForm, notas: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" rows={2} placeholder="Detalles de la devolución..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowNewModal(false)} className="px-4 py-2 rounded-lg border text-sm font-medium text-gray-700">Cancelar</button>
              <button onClick={handleNewReturn} disabled={!newForm.producto || !newForm.codigo}
                className="px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: ACCENT_BLUE }}>
                Registrar Devolución
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
