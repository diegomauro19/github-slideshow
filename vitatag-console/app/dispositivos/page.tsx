'use client';

import { Smartphone, Wifi, WifiOff, Printer, ScanBarcode, Tablet, BatteryMedium, BatteryLow, BatteryFull, BatteryWarning } from 'lucide-react';

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
}

const devices: Device[] = [
  { id: 1, name: 'ZBR-LAU-001', tipo: 'Scanner Zebra', pdv: 'Olivia Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 92 },
  { id: 2, name: 'ZBR-LAU-002', tipo: 'Scanner Zebra', pdv: 'Olivia Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 78 },
  { id: 3, name: 'IMP-LAU-001', tipo: 'Impresora etiquetas', pdv: 'Olivia Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 100 },
  { id: 4, name: 'TAB-VIV-001', tipo: 'Tablet Samsung', pdv: 'Olivia Viva Envigado', estado: 'En línea', lastConn: 'Hace 2 min', bateria: 65 },
  { id: 5, name: 'ZBR-VIV-001', tipo: 'Scanner Zebra', pdv: 'Olivia Viva Envigado', estado: 'En línea', lastConn: 'Hace 1 min', bateria: 88 },
  { id: 6, name: 'CEL-VIV-001', tipo: 'Celular Motorola', pdv: 'Olivia Viva Envigado', estado: 'Offline', lastConn: 'Hace 3 horas', bateria: 12 },
  { id: 7, name: 'ZBR-CLA-001', tipo: 'Scanner Zebra', pdv: 'Clap Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 95 },
  { id: 8, name: 'IMP-CLA-001', tipo: 'Impresora etiquetas', pdv: 'Clap Laureles', estado: 'En línea', lastConn: 'Ahora', bateria: 100 },
  { id: 9, name: 'TAB-ARK-001', tipo: 'Tablet Samsung', pdv: 'Olivia Arkadia', estado: 'En línea', lastConn: 'Hace 5 min', bateria: 54 },
  { id: 10, name: 'ZBR-ARK-001', tipo: 'Scanner Zebra', pdv: 'Olivia Arkadia', estado: 'Offline', lastConn: 'Hace 6 horas', bateria: 3 },
  { id: 11, name: 'CEL-CDP-001', tipo: 'Celular Motorola', pdv: 'CDP', estado: 'En línea', lastConn: 'Ahora', bateria: 71 },
  { id: 12, name: 'ZBR-CDP-002', tipo: 'Scanner Zebra', pdv: 'CDP', estado: 'Offline', lastConn: 'Hace 1 día', bateria: 0 },
];

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
  const total = devices.length;
  const online = devices.filter(d => d.estado === 'En línea').length;
  const offline = total - online;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Gestión de Dispositivos</h1>
        <p className="text-gray-500 mt-1">Monitoreo de dispositivos de escaneo y etiquetado en todos los locales</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: ACCENT_BLUE + '15' }}>
              <Smartphone size={20} style={{ color: ACCENT_BLUE }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Dispositivos</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: GREEN + '15' }}>
              <Wifi size={20} style={{ color: GREEN }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">En línea</p>
              <p className="text-2xl font-bold" style={{ color: GREEN }}>{online}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: RED + '15' }}>
              <WifiOff size={20} style={{ color: RED }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Offline</p>
              <p className="text-2xl font-bold" style={{ color: RED }}>{offline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold" style={{ color: NAVY }}>Inventario de Dispositivos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 font-medium text-gray-500">Dispositivo</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Tipo</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">PdV</th>
                <th className="text-center px-6 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Última conexión</th>
                <th className="text-center px-6 py-3 font-medium text-gray-500">Batería</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {devices.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-sm font-medium text-gray-900">{d.name}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      {tipoIcon(d.tipo)}
                      <span className="text-gray-700">{d.tipo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{d.pdv}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                      d.estado === 'En línea' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${d.estado === 'En línea' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {d.estado}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{d.lastConn}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <BatteryIcon pct={d.bateria} />
                      <span className="font-medium" style={{ color: batteryColor(d.bateria) }}>
                        {d.bateria}%
                      </span>
                    </div>
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
