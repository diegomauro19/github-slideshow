'use client';

import { useState, useMemo } from 'react';
import { MapPin, Calendar, CheckCircle2, Clock, AlertTriangle, Smartphone, X } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import { useToast } from '@/components/shared/Toast';

const pdvOptions = [
  'Olivia Laureles',
  'Clap Laureles',
  'Olivia Viva Envigado',
  'Olivia Arkadia',
  'Clap Envigado',
];

interface CountItem {
  name: string;
  unit: string;
  expectedValue: number;
  value: string;
  status: 'counted' | 'pending' | 'warning';
}

const initialCountItems: CountItem[] = [
  { name: 'Solomito', unit: 'kg', expectedValue: 4.5, value: '4.2', status: 'counted' },
  { name: 'Pollo Pechuga', unit: 'kg', expectedValue: 12.0, value: '12.5', status: 'counted' },
  { name: 'Queso Parmesano', unit: 'kg', expectedValue: 1.5, value: '0.8', status: 'warning' },
  { name: 'Tocineta', unit: 'kg', expectedValue: 3.0, value: '3.1', status: 'counted' },
  { name: 'Aguacate', unit: 'uds', expectedValue: 25, value: '24', status: 'counted' },
  { name: 'Mantequilla', unit: 'kg', expectedValue: 2.5, value: '2.4', status: 'counted' },
  { name: 'Salmón', unit: 'kg', expectedValue: 5.0, value: '', status: 'pending' },
  { name: 'Rúgula', unit: 'kg', expectedValue: 1.0, value: '', status: 'pending' },
  { name: 'Pan Sourdough', unit: 'uds', expectedValue: 20, value: '18', status: 'counted' },
  { name: 'Queso Cheddar', unit: 'kg', expectedValue: 2.0, value: '', status: 'pending' },
  { name: 'Helado Vainilla', unit: 'lt', expectedValue: 3.0, value: '', status: 'pending' },
  { name: 'Chorizo Español', unit: 'kg', expectedValue: 1.5, value: '1.5', status: 'counted' },
];

interface HistoricalCount {
  fecha: string;
  pdv: string;
  responsable: string;
  items: string;
  estado: 'Completado' | 'En proceso';
  varianza: string;
  detail?: { name: string; expected: number; counted: number; unit: string }[];
}

const initialHistorical: HistoricalCount[] = [
  {
    fecha: '2026-04-02', pdv: 'Olivia Laureles', responsable: 'Carlos M.', items: '45/45', estado: 'Completado', varianza: '$85,000 (3.2%)',
    detail: [
      { name: 'Solomito', expected: 5.0, counted: 4.6, unit: 'kg' },
      { name: 'Pollo Pechuga', expected: 12.0, counted: 11.8, unit: 'kg' },
      { name: 'Queso Parmesano', expected: 2.0, counted: 1.5, unit: 'kg' },
    ],
  },
  {
    fecha: '2026-04-02', pdv: 'Clap Laureles', responsable: 'Ana P.', items: '38/38', estado: 'Completado', varianza: '$42,000 (1.8%)',
    detail: [
      { name: 'Tocineta', expected: 3.5, counted: 3.2, unit: 'kg' },
      { name: 'Aguacate', expected: 30, counted: 28, unit: 'uds' },
    ],
  },
  {
    fecha: '2026-04-01', pdv: 'Olivia Viva Envigado', responsable: 'José R.', items: '45/45', estado: 'Completado', varianza: '$156,000 (6.1%)',
    detail: [
      { name: 'Salmón', expected: 6.0, counted: 4.5, unit: 'kg' },
      { name: 'Rúgula', expected: 1.5, counted: 0.8, unit: 'kg' },
    ],
  },
  {
    fecha: '2026-04-01', pdv: 'Olivia Laureles', responsable: 'Carlos M.', items: '45/45', estado: 'Completado', varianza: '$67,000 (2.5%)',
    detail: [
      { name: 'Mantequilla', expected: 3.0, counted: 2.5, unit: 'kg' },
    ],
  },
  {
    fecha: '2026-03-31', pdv: 'Clap Laureles', responsable: 'Ana P.', items: '38/38', estado: 'Completado', varianza: '$95,000 (4.2%)',
    detail: [
      { name: 'Pan Sourdough', expected: 25, counted: 20, unit: 'uds' },
      { name: 'Queso Cheddar', expected: 3.0, counted: 2.2, unit: 'kg' },
    ],
  },
];

function StatusEmoji({ status }: { status: CountItem['status'] }) {
  switch (status) {
    case 'counted':
      return <CheckCircle2 className="w-5 h-5 text-[#1E8449]" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-[#F39C12]" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
}

export default function ConteoCierrePage() {
  const { toast } = useToast();
  const [selectedPdv, setSelectedPdv] = useState('Olivia Laureles');
  const [selectedDate, setSelectedDate] = useState('2026-04-03');
  const [items, setItems] = useState<CountItem[]>(initialCountItems);
  const [historicalCounts, setHistoricalCounts] = useState<HistoricalCount[]>(initialHistorical);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedHistorical, setSelectedHistorical] = useState<HistoricalCount | null>(null);

  const counted = items.filter((i) => i.status === 'counted' || i.status === 'warning').length;
  const total = items.length;
  const progressPct = Math.round((counted / total) * 100);
  const allCounted = counted === total;

  const handleValueChange = (idx: number, value: string) => {
    setItems((prev) => {
      const next = [...prev];
      const item = { ...next[idx] };
      item.value = value;
      if (value.trim() !== '') {
        const numVal = parseFloat(value);
        const diff = Math.abs(numVal - item.expectedValue) / item.expectedValue;
        item.status = diff > 0.15 ? 'warning' : 'counted';
      } else {
        item.status = 'pending';
      }
      next[idx] = item;
      return next;
    });
  };

  const varianceItems = useMemo(() => {
    return items
      .filter((i) => i.value.trim() !== '')
      .map((i) => {
        const counted = parseFloat(i.value);
        const diff = counted - i.expectedValue;
        const pct = ((diff / i.expectedValue) * 100).toFixed(1);
        return { name: i.name, expected: i.expectedValue, counted, diff, pct, unit: i.unit };
      });
  }, [items]);

  const totalVariance = useMemo(() => {
    return varianceItems.reduce((sum, v) => sum + Math.abs(v.diff) * 5000, 0);
  }, [varianceItems]);

  const handleConfirm = () => {
    if (!allCounted) return;
    setShowSummaryModal(true);
  };

  const handleFinalConfirm = () => {
    const newRecord: HistoricalCount = {
      fecha: selectedDate,
      pdv: selectedPdv,
      responsable: 'Usuario actual',
      items: `${total}/${total}`,
      estado: 'Completado',
      varianza: `$${totalVariance.toLocaleString('es-CO')} (${((totalVariance / (total * 50000)) * 100).toFixed(1)}%)`,
      detail: varianceItems.map((v) => ({ name: v.name, expected: v.expected, counted: v.counted, unit: v.unit })),
    };
    setHistoricalCounts((prev) => [newRecord, ...prev]);
    setShowSummaryModal(false);
    toast('success', 'Conteo de cierre confirmado exitosamente');
    // Reset items
    setItems(initialCountItems.map((i) => ({ ...i, value: '', status: 'pending' as const })));
  };

  const handleRowClick = (row: HistoricalCount) => {
    setSelectedHistorical(row);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold" style={{ color: '#0D1B2A' }}>Conteo de Cierre</h1>
            <span className="px-3 py-1 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: '#148F77' }}>Capa 2</span>
          </div>
          <p className="text-gray-500">Registro de inventario al final del turno</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <select
              value={selectedPdv}
              onChange={(e) => setSelectedPdv(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#148F77]"
            >
              {pdvOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#148F77]" />
          </div>
          <div className="flex items-center">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${allCounted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <span className={`w-2 h-2 rounded-full ${allCounted ? 'bg-green-500' : 'bg-yellow-500'}`} />
              {allCounted ? 'Completo' : 'En proceso'}
            </span>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center mb-12">
          <div className="relative max-w-sm w-full">
            <div className="rounded-[2.5rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
              <div className="flex justify-center pt-2 pb-1 bg-gray-800">
                <div className="w-28 h-5 rounded-full bg-gray-900" />
              </div>
              <div className="bg-white">
                <div className="px-5 pt-4 pb-3" style={{ backgroundColor: '#0D1B2A' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-white/70" />
                    <p className="text-white text-sm font-semibold">Conteo de Cierre</p>
                  </div>
                  <p className="text-white/70 text-xs">{selectedPdv} — {selectedDate}</p>
                </div>

                {/* Progress bar */}
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">Progreso</span>
                    <span className="text-xs font-bold" style={{ color: '#148F77' }}>
                      {counted} de {total} ingredientes ({progressPct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%`, backgroundColor: allCounted ? '#1E8449' : '#148F77' }}
                    />
                  </div>
                </div>

                {/* Ingredient list */}
                <div className="divide-y divide-gray-100" style={{ maxHeight: 420, overflowY: 'auto' }}>
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-5 py-3">
                      <StatusEmoji status={item.status} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#0D1B2A' }}>{item.name}</p>
                        <p className="text-xs text-gray-400">{item.unit}</p>
                      </div>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={item.value}
                        onChange={(e) => handleValueChange(idx, e.target.value)}
                        placeholder="--"
                        className={`w-16 text-right text-sm font-medium rounded-lg px-2 py-1.5 border focus:outline-none focus:ring-2 focus:ring-teal-200 ${
                          item.status === 'pending'
                            ? 'border-gray-200 bg-gray-50 text-gray-400'
                            : item.status === 'warning'
                            ? 'border-[#F39C12] bg-amber-50 text-[#F39C12]'
                            : 'border-[#1E8449] bg-green-50 text-[#1E8449]'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4">
                  <button
                    onClick={handleConfirm}
                    disabled={!allCounted}
                    className={`w-full py-3 rounded-xl text-white text-sm font-semibold transition-all ${
                      allCounted ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{ backgroundColor: '#148F77' }}
                  >
                    Confirmar conteo de cierre
                  </button>
                  {!allCounted && (
                    <p className="text-xs text-center text-gray-400 mt-2">
                      Faltan {total - counted} ingredientes por contar
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center pb-2 pt-1 bg-white">
                <div className="w-32 h-1 rounded-full bg-gray-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Historical Counts Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#0D1B2A' }}>Historial de conteos</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-600">Fecha</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">PdV</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-600">Responsable</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-600"># Items</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-600">Estado</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-600">Varianza detectada</th>
              </tr>
            </thead>
            <tbody>
              {historicalCounts.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(row)}
                >
                  <td className="py-3 px-2 text-gray-600">{row.fecha}</td>
                  <td className="py-3 px-2 font-medium" style={{ color: '#0D1B2A' }}>{row.pdv}</td>
                  <td className="py-3 px-2 text-gray-600">{row.responsable}</td>
                  <td className="text-center py-3 px-2 text-gray-600">{row.items}</td>
                  <td className="text-center py-3 px-2">
                    {row.estado === 'Completado' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-[#1E8449]">
                        <CheckCircle2 className="w-3 h-3" /> Completado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3" /> En proceso
                      </span>
                    )}
                  </td>
                  <td className="text-right py-3 px-2 font-medium" style={{ color: '#C0392B' }}>{row.varianza}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Modal */}
      <Modal isOpen={showSummaryModal} onClose={() => setShowSummaryModal(false)} title="Resumen de Conteo de Cierre" size="lg">
        <div>
          <div className="mb-4 text-sm text-gray-600">
            <p><strong>PdV:</strong> {selectedPdv}</p>
            <p><strong>Fecha:</strong> {selectedDate}</p>
            <p><strong>Items contados:</strong> {counted}/{total}</p>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Ingrediente</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Esperado</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Contado</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Varianza</th>
                </tr>
              </thead>
              <tbody>
                {varianceItems.map((v) => (
                  <tr key={v.name} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-700">{v.name}</td>
                    <td className="text-right px-4 py-2 text-gray-500">{v.expected} {v.unit}</td>
                    <td className="text-right px-4 py-2 font-medium" style={{ color: '#0D1B2A' }}>{v.counted} {v.unit}</td>
                    <td className={`text-right px-4 py-2 font-medium ${Math.abs(parseFloat(v.pct)) > 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {parseFloat(v.pct) > 0 ? '+' : ''}{v.pct}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg mb-6">
            <span className="text-sm font-medium text-gray-700">Varianza total estimada</span>
            <span className="text-lg font-bold" style={{ color: '#C0392B' }}>${totalVariance.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowSummaryModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">
              Cancelar
            </button>
            <button onClick={handleFinalConfirm} className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: '#148F77' }}>
              Confirmar y guardar
            </button>
          </div>
        </div>
      </Modal>

      {/* Historical Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={() => { setShowDetailModal(false); setSelectedHistorical(null); }} title={`Detalle - ${selectedHistorical?.pdv || ''} (${selectedHistorical?.fecha || ''})`} size="lg">
        {selectedHistorical && (
          <div>
            <div className="mb-4 text-sm text-gray-600">
              <p><strong>Responsable:</strong> {selectedHistorical.responsable}</p>
              <p><strong>Items:</strong> {selectedHistorical.items}</p>
              <p><strong>Varianza:</strong> <span style={{ color: '#C0392B' }}>{selectedHistorical.varianza}</span></p>
            </div>
            {selectedHistorical.detail && selectedHistorical.detail.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Ingrediente</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600">Esperado</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600">Contado</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600">Diferencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHistorical.detail.map((d) => (
                      <tr key={d.name} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-gray-700">{d.name}</td>
                        <td className="text-right px-4 py-2 text-gray-500">{d.expected} {d.unit}</td>
                        <td className="text-right px-4 py-2 font-medium" style={{ color: '#0D1B2A' }}>{d.counted} {d.unit}</td>
                        <td className={`text-right px-4 py-2 font-medium ${d.counted - d.expected < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {(d.counted - d.expected).toFixed(1)} {d.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No hay detalles disponibles para este conteo.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
