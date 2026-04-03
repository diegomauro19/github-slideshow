'use client';

import { useState, useMemo } from 'react';
import { Smartphone, Wifi, WifiOff, Printer, ScanBarcode, Tablet, BatteryMedium, BatteryLow, BatteryFull, BatteryWarning, Search, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';
const ACCENT_BLUE = '#2980B9';

interface Device {
  id: number;
  name: string;
  tipo: string;
  pdv: string;
  estado: 'En línea' | 'Offline';
  lastConn: string;
  bateria: number;
  modelo: string;
  serial: string;
  firmware: string;
}

const devices: Device[] = [
  { id: 1, name: 'ZBR-LAU-001', tipo: 'Scanner Zebra', pdv: 'Olivia Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 92, modelo: 'Zebra TC21', serial: 'ZBR-2024-001', firmware: 'v3.2.1' },
  { id: 2, name: 'ZBR-LAU-002', tipo: 'Scanner Zebra', pdv: 'Olivia Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 78, modelo: 'Zebra TC21', serial: 'ZBR-2024-002', firmware: 'v3.2.1' },
  { id: 3, name: 'IMP-LAU-001', tipo: 'Impresora etiquetas', pdv: 'Olivia Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 100, modelo: 'Zebra ZD421', serial: 'IMP-2024-001', firmware: 'v2.1.0' },
  { id: 4, name: 'TAB-VIV-001', tipo: 'Tablet Samsung', pdv: 'Olivia Viva Envigado', estado: 'En línea', lastConn: 'Hace 2 min', bateria: 65, modelo: 'Galaxy Tab A8', serial: 'TAB-2024-001', firmware: 'Android 14' },
  { id: 5, name: 'ZBR-VIV-001', tipo: 'Scanner Zebra', pdv: 'Olivia Viva Envigado', estado: 'En línea', lastConn: 'Hace 1 min', bateria: 88, modelo: 'Zebra TC21', serial: 'ZBR-2024-003', firmware: 'v3.2.1' },
  { id: 6, name: 'CEL-VIV-001', tipo: 'Celular Motorola', pdv: 'Olivia Viva Envigado', estado: 'Offline', lastConn: 'Hace 3 horas', bateria: 12, modelo: 'Moto G54', serial: 'CEL-2024-001', firmware: 'Android 13' },
  { id: 7, name: 'ZBR-CLA-001', tipo: 'Scanner Zebra', pdv: 'Clap Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 95, modelo: 'Zebra TC21', serial: 'ZBR-2024-004', firmware: 'v3.2.1' },
  { id: 8, name: 'IMP-CLA-001', tipo: 'Impresora etiquetas', pdv: 'Clap Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 100, modelo: 'Zebra ZD421', serial: 'IMP-2024-002', firmware: 'v2.1.0' },
  { id: 9, name: 'TAB-ARK-001', tipo: 'Tablet Samsung', pdv: 'Olivia Arkadia', estado: 'En línea', lastConn: 'Hace 5 min', bateria: 54, modelo: 'Galaxy Tab A8', serial: 'TAB-2024-002', firmware: 'Android 14' },
  { id: 10, name: 'ZBR-ARK-001', tipo: 'Scanner Zebra', pdv: 'Olivia Arkadia', estado: 'Offline', lastConn: 'Hace 6 horas', bateria: 3, modelo: 'Zebra TC21', serial: 'ZBR-2024-005', firmware: 'v3.1.0' },
  { id: 11, name: 'CEL-CDP-001', tipo: 'Celular Motorola', pdv: 'CDP', estado: 'En línea', lastConn: 'Ahora', bateria: 71, modelo: 'Moto G54', serial: 'CEL-2024-002', firmware: 'Android 13' },
  { id: 12, name: 'ZBR-CDP-002', tipo: 'Scanner Zebra', pdv: 'CDP', estado: 'Offline', lastConn: 'Hace 1 día', bateria: 0, modelo: 'Zebra TC21', serial: 'ZBR-2024-006', firmware: 'v3.0.5' },
  { id: 13, name: 'TAB-10B-001', tipo: 'Tablet Samsung', pdv: 'Olivia 10b', estado: 'En línea', lastConn: 'Hace 3 min', bateria: 82, modelo: 'Galaxy Tab A8', serial: 'TAB-2024-003', firmware: 'Android 14' },
  { id: 14, name: 'ZBR-ENV-001', tipo: 'Scanner Zebra', pdv: 'Clap Envigado', estado: 'En línea', lastConn: 'Ahora', bateria: 67, modelo: 'Zebra TC21', serial: 'ZBR-2024-007', firmware: 'v3.2.1' },
  { id: 15, name: 'IMP-CDP-001', tipo: 'Impresora etiquetas', pdv: 'CDP', estado: 'En línea', lastConn: 'Ahora', bateria: 100, modelo: 'Zebra ZD620', serial: 'IMP-2024-003', firmware: 'v2.2.0' },
];

const pdvs = Array.from(new Set(devices.map(d => d.pdv))).sort();
const tipos = Array.from(new Set(devices.map(d => d.tipo))).sort();

function tipoIcon(tipo: string) {
  if (tipo.includes('Scanner')) return <ScanBarcode size={16} style={{ color: ACCENT_BLUE }} />;
  if (tipo.includes('Impresora')) return <Printer size={16} style={{ color: GREEN }} />;
  if (tipo.includes('Tablet')) return <Tablet size={16} style={{ color: AMBER }} />;
  return <Smartphone size={16} style={{ color: '#8B5CF6' }} />;
}

function BatteryIcon({ pct }: { pct: number }) {
  if (pct > 70) return <BatteryFull size={16} style={{ color: GREEN }} />;
  if (pct > 40) return <BatteryMedium size={16} style={{ color: AMBER }} />;
  if (pct > 10) return <BatteryLow size={16} style={{ color: RED }} />;
  return <BatteryWarning size={16} style={{ color: RED }} />;
}

function batteryColor(pct: number) {
  if (pct > 70) return GREEN;
  if (pct > 40) return AMBER;
  return RED;
}

export default function DispositivosPage() {
  const [search, setSearch] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterPdv, setFilterPdv] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return devices.filter(d => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.pdv.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterTipo && d.tipo !== filterTipo) return false;
      if (filterEstado === 'online' && d.estado !== 'En línea') return false;
      if (filterEstado === 'offline' && d.estado !== 'Offline') return false;
      if (filterPdv && d.pdv !== filterPdv) return false;
      return true;
    });
  }, [search, filterTipo, filterEstado, filterPdv]);

  const total = filtered.length;
  const online = filtered.filter(d => d.estado === 'En línea').length;
  const offline = total - online;
  const lowBattery = filtered.filter(d => d.bateria < 20 && d.bateria > 0).length;
  const hasFilters = search || filterTipo || filterEstado || filterPdv;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Gestión de Dispositivos</h1>
        <p className="text-gray-500 mt-1">Monitoreo de dispositivos de escaneo y etiquetado en todos los locales</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Dispositivos', value: total, icon: <Smartphone size={20} />, color: ACCENT_BLUE },
          { label: 'En línea', value: online, icon: <Wifi size={20} />, color: GREEN },
          { label: 'Offline', value: offline, icon: <WifiOff size={20} />, color: RED },
          { label: 'Batería baja', value: lowBattery, icon: <AlertTriangle size={20} />, color: AMBER },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.color + '15', color: k.color }}>{k.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{k.label}</p>
                <p className="text-2xl font-bold" style={{ color: k.label === 'Offline' ? RED : k.label === 'Batería baja' ? AMBER : NAVY }}>{k.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar dispositivo o PdV..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="">Todos los tipos</option>
          {tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="">Todos los estados</option>
          <option value="online">En línea</option>
          <option value="offline">Offline</option>
        </select>
        <select value={filterPdv} onChange={(e) => setFilterPdv(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="">Todos los PdV</option>
          {pdvs.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {hasFilters && (
          <button onClick={() => { setSearch(''); setFilterTipo(''); setFilterEstado(''); setFilterPdv(''); }}
            className="px-3 py-2 rounded-lg text-sm font-medium" style={{ color: RED }}>Limpiar</button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 px-4 py-3"></th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Dispositivo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">PdV</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Última conexión</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Batería</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((d) => (
                <>
                  <tr key={d.id} className={`hover:bg-gray-50 cursor-pointer ${d.bateria > 0 && d.bateria < 20 ? 'bg-red-50/30' : ''}`}
                    onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}>
                    <td className="px-4 py-3 text-gray-400">{expandedId === d.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</td>
                    <td className="px-4 py-3 font-mono text-sm font-medium text-gray-900">{d.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {tipoIcon(d.tipo)}
                        <span className="text-gray-700">{d.tipo}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{d.pdv}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                        d.estado === 'En línea' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${d.estado === 'En línea' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {d.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{d.lastConn}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <BatteryIcon pct={d.bateria} />
                        <span className="font-medium font-mono text-xs" style={{ color: batteryColor(d.bateria) }}>{d.bateria}%</span>
                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${d.bateria}%`, backgroundColor: batteryColor(d.bateria) }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {expandedId === d.id && (
                    <tr key={`${d.id}-detail`}>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Modelo</p>
                            <p className="font-medium">{d.modelo}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Serial</p>
                            <p className="font-mono font-medium">{d.serial}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Firmware</p>
                            <p className="font-medium">{d.firmware}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Batería</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all" style={{ width: `${d.bateria}%`, backgroundColor: batteryColor(d.bateria) }} />
                              </div>
                              <span className="font-mono text-sm font-bold" style={{ color: batteryColor(d.bateria) }}>{d.bateria}%</span>
                            </div>
                          </div>
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
          {filtered.length} dispositivos mostrados
        </div>
      </div>
    </div>
  );
}
