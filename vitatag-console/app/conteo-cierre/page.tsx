'use client';

import { useState } from 'react';
import { MapPin, Calendar, CheckCircle2, Clock, AlertTriangle, Smartphone } from 'lucide-react';

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
  value: string;
  status: 'counted' | 'pending' | 'warning';
}

const countItems: CountItem[] = [
  { name: 'Solomito', unit: 'kg', value: '4.2', status: 'counted' },
  { name: 'Pollo Pechuga', unit: 'kg', value: '12.5', status: 'counted' },
  { name: 'Queso Parmesano', unit: 'kg', value: '0.8', status: 'warning' },
  { name: 'Tocineta', unit: 'kg', value: '3.1', status: 'counted' },
  { name: 'Aguacate', unit: 'uds', value: '24', status: 'counted' },
  { name: 'Mantequilla', unit: 'kg', value: '2.4', status: 'counted' },
  { name: 'Salmón', unit: 'kg', value: '', status: 'pending' },
  { name: 'Rúgula', unit: 'kg', value: '', status: 'pending' },
  { name: 'Pan Sourdough', unit: 'uds', value: '18', status: 'counted' },
  { name: 'Queso Cheddar', unit: 'kg', value: '', status: 'pending' },
  { name: 'Helado Vainilla', unit: 'lt', value: '', status: 'pending' },
  { name: 'Chorizo Español', unit: 'kg', value: '1.5', status: 'counted' },
];

interface HistoricalCount {
  fecha: string;
  pdv: string;
  responsable: string;
  items: string;
  estado: 'Completado' | 'En proceso';
  varianza: string;
}

const historicalCounts: HistoricalCount[] = [
  { fecha: '2026-04-02', pdv: 'Olivia Laureles', responsable: 'Carlos M.', items: '45/45', estado: 'Completado', varianza: '$85,000 (3.2%)' },
  { fecha: '2026-04-02', pdv: 'Clap Laureles', responsable: 'Ana P.', items: '38/38', estado: 'Completado', varianza: '$42,000 (1.8%)' },
  { fecha: '2026-04-01', pdv: 'Olivia Viva Envigado', responsable: 'José R.', items: '45/45', estado: 'Completado', varianza: '$156,000 (6.1%)' },
  { fecha: '2026-04-01', pdv: 'Olivia Laureles', responsable: 'Carlos M.', items: '45/45', estado: 'Completado', varianza: '$67,000 (2.5%)' },
  { fecha: '2026-03-31', pdv: 'Clap Laureles', responsable: 'Ana P.', items: '38/38', estado: 'Completado', varianza: '$95,000 (4.2%)' },
];

function StatusIcon({ status }: { status: CountItem['status'] }) {
  switch (status) {
    case 'counted':
      return <CheckCircle2 className="w-5 h-5 text-[#1E8449]" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-[#F39C12]" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
}

function StatusEmoji({ status }: { status: CountItem['status'] }) {
  switch (status) {
    case 'counted':
      return <span className="text-lg">✅</span>;
    case 'warning':
      return <span className="text-lg">⚠️</span>;
    case 'pending':
      return <span className="text-lg">⏳</span>;
  }
}

export default function ConteoCierrePage() {
  const [selectedPdv, setSelectedPdv] = useState('Olivia Laureles');
  const [selectedDate, setSelectedDate] = useState('2026-04-03');

  const counted = countItems.filter((i) => i.status === 'counted' || i.status === 'warning').length;
  const total = 45;
  const progressPct = Math.round((32 / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold" style={{ color: '#0D1B2A' }}>
              Conteo de Cierre
            </h1>
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full text-white"
              style={{ backgroundColor: '#148F77' }}
            >
              Capa 2
            </span>
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
              {pdvOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#148F77]"
            />
          </div>

          <div className="flex items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              En proceso
            </span>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center mb-12">
          <div className="relative max-w-sm w-full">
            {/* Phone frame */}
            <div className="rounded-[2.5rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="flex justify-center pt-2 pb-1 bg-gray-800">
                <div className="w-28 h-5 rounded-full bg-gray-900" />
              </div>

              {/* Phone screen content */}
              <div className="bg-white">
                {/* Phone header */}
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
                      32 de {total} ingredientes ({progressPct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%`, backgroundColor: '#148F77' }}
                    />
                  </div>
                </div>

                {/* Ingredient list */}
                <div className="divide-y divide-gray-100" style={{ maxHeight: 420, overflowY: 'auto' }}>
                  {countItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-5 py-3">
                      <StatusEmoji status={item.status} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#0D1B2A' }}>
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">{item.unit}</p>
                      </div>
                      <input
                        type="text"
                        readOnly
                        value={item.value}
                        placeholder="—"
                        className={`w-16 text-right text-sm font-medium rounded-lg px-2 py-1.5 border focus:outline-none ${
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

                {/* Submit button */}
                <div className="px-5 py-4">
                  <button
                    className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#148F77' }}
                  >
                    Confirmar conteo de cierre
                  </button>
                </div>
              </div>

              {/* Phone bottom bar */}
              <div className="flex justify-center pb-2 pt-1 bg-white">
                <div className="w-32 h-1 rounded-full bg-gray-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Historical Counts Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#0D1B2A' }}>
            Historial de conteos
          </h2>
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
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-gray-600">{row.fecha}</td>
                  <td className="py-3 px-2 font-medium" style={{ color: '#0D1B2A' }}>
                    {row.pdv}
                  </td>
                  <td className="py-3 px-2 text-gray-600">{row.responsable}</td>
                  <td className="text-center py-3 px-2 text-gray-600">{row.items}</td>
                  <td className="text-center py-3 px-2">
                    {row.estado === 'Completado' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-[#1E8449]">
                        <CheckCircle2 className="w-3 h-3" />
                        Completado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3" />
                        En proceso
                      </span>
                    )}
                  </td>
                  <td className="text-right py-3 px-2 font-medium" style={{ color: '#C0392B' }}>
                    {row.varianza}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
