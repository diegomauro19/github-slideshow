'use client';

import { Store, Wifi, WifiOff, Clock, MapPin } from 'lucide-react';
import { locations } from '@/data/mock/locations';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const AMBER = '#F39C12';
const GREEN = '#1E8449';

function brandColor(brand: string) {
  return brand === 'Olivia' ? ACCENT_BLUE : AMBER;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function PosLocalesPage() {
  const activeCount = locations.filter(l => l.status === 'active').length;
  const totalDevicesOnline = locations.reduce((s, l) => s + l.devicesOnline, 0);
  const totalDevices = locations.reduce((s, l) => s + l.devicesTotal, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Puntos de Venta</h1>
        <p className="text-gray-500 mt-1">
          {activeCount} activos de {locations.length} totales &middot; {totalDevicesOnline}/{totalDevices} dispositivos en línea
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: ACCENT_BLUE + '15' }}>
              <Store size={20} style={{ color: ACCENT_BLUE }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Locales</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{locations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: GREEN + '15' }}>
              <Wifi size={20} style={{ color: GREEN }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Activos</p>
              <p className="text-2xl font-bold" style={{ color: GREEN }}>{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
              <MapPin size={20} style={{ color: ACCENT_BLUE }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Olivia</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{locations.filter(l => l.brand === 'Olivia').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-50">
              <MapPin size={20} style={{ color: AMBER }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Clap</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{locations.filter(l => l.brand === 'Clap').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{loc.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{loc.city}</p>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: brandColor(loc.brand) }}
              >
                {loc.brand}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {loc.status === 'active' ? (
                <>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: GREEN }} />
                  <span className="text-sm font-medium" style={{ color: GREEN }}>Activo</span>
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  <span className="text-sm font-medium text-gray-400">Inactivo</span>
                </>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-gray-500">
                {loc.devicesOnline === loc.devicesTotal ? (
                  <Wifi size={14} style={{ color: GREEN }} />
                ) : (
                  <WifiOff size={14} className="text-amber-500" />
                )}
                <span>
                  {loc.devicesOnline}/{loc.devicesTotal} dispositivos
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock size={12} />
                <span className="text-xs">{formatDate(loc.lastUpdate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
