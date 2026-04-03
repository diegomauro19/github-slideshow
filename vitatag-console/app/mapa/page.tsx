'use client';

import { MapPin, Circle } from 'lucide-react';
import { locations, CDP_LOCATION } from '@/data/mock/locations';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const AMBER = '#F39C12';
const RED = '#C0392B';
const GREEN = '#1E8449';

const pinPositions: Record<string, { top: string; left: string }> = {
  'oli-laureles': { top: '28%', left: '22%' },
  'oli-viva': { top: '58%', left: '35%' },
  'oli-arkadia': { top: '48%', left: '30%' },
  'oli-10b': { top: '24%', left: '55%' },
  'oli-amsterdam': { top: '40%', left: '42%' },
  'oli-sanlucas': { top: '45%', left: '52%' },
  'oli-mayorca': { top: '68%', left: '15%' },
  'oli-oviedo': { top: '44%', left: '58%' },
  'oli-fabricato': { top: '10%', left: '56%' },
  'oli-tesoro': { top: '46%', left: '48%' },
  'oli-zona2': { top: '32%', left: '36%' },
  'oli-lennon': { top: '38%', left: '44%' },
  'oli-manila': { top: '36%', left: '32%' },
  'oli-baq': { top: '8%', left: '85%' },
  'clap-laureles': { top: '26%', left: '24%' },
  'clap-envigado': { top: '56%', left: '37%' },
  'clap-visitacion': { top: '42%', left: '46%' },
  'clap-industriales': { top: '30%', left: '38%' },
  'clap-sebastiana': { top: '38%', left: '40%' },
};

function getBrandColor(brand: string) {
  if (brand === 'Olivia') return ACCENT_BLUE;
  return AMBER;
}

export default function MapaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          Mapa de Puntos de Venta
        </h1>
        <p className="text-gray-500 mt-1">Ubicación de todos los locales y el CDP</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACCENT_BLUE }} />
          <span className="text-sm text-gray-600">Olivia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: AMBER }} />
          <span className="text-sm text-gray-600">Clap</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: RED }} />
          <span className="text-sm text-gray-600">CDP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-400 ring-2 ring-gray-300" />
          <span className="text-sm text-gray-600">Inactivo</span>
        </div>
      </div>

      {/* Map Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div
          className="relative w-full"
          style={{
            height: '600px',
            background: 'linear-gradient(135deg, #E8F6F3 0%, #D5F5E3 30%, #EBF5FB 60%, #FDEBD0 100%)',
          }}
        >
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* City labels */}
          <div className="absolute top-4 left-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
            Medellín y Área Metropolitana
          </div>
          <div className="absolute" style={{ top: '6%', left: '82%' }}>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Barranquilla</span>
          </div>
          <div className="absolute" style={{ top: '64%', left: '12%' }}>
            <span className="text-xs text-gray-400">Sabaneta</span>
          </div>
          <div className="absolute" style={{ top: '52%', left: '32%' }}>
            <span className="text-xs text-gray-400">Envigado</span>
          </div>
          <div className="absolute" style={{ top: '6%', left: '53%' }}>
            <span className="text-xs text-gray-400">Bello</span>
          </div>

          {/* CDP Pin */}
          <div
            className="absolute z-20 group cursor-pointer"
            style={{ top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-white"
                style={{ backgroundColor: RED }}
              >
                <MapPin size={16} className="text-white" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                  CDP
                </span>
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-48 z-30">
                <p className="font-semibold text-sm" style={{ color: NAVY }}>{CDP_LOCATION.name}</p>
                <p className="text-xs text-gray-500 mt-1">{CDP_LOCATION.city}</p>
                <p className="text-xs text-gray-400 mt-1">{CDP_LOCATION.zones.length} zonas activas</p>
              </div>
            </div>
          </div>

          {/* Location Pins */}
          {locations.map((loc) => {
            const pos = pinPositions[loc.id];
            if (!pos) return null;
            const color = getBrandColor(loc.brand);
            const isInactive = loc.status === 'inactive';

            return (
              <div
                key={loc.id}
                className="absolute z-10 group cursor-pointer"
                style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative">
                  <div
                    className={`w-4 h-4 rounded-full shadow-md ring-2 ring-white transition-transform group-hover:scale-150 ${isInactive ? 'opacity-50' : ''}`}
                    style={{ backgroundColor: isInactive ? '#9CA3AF' : color }}
                  />
                  {loc.status === 'active' && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-52 z-30">
                    <p className="font-semibold text-sm" style={{ color: NAVY }}>{loc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{loc.city}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Circle size={8} fill={loc.status === 'active' ? GREEN : '#9CA3AF'} stroke="none" />
                      <span className="text-xs text-gray-500">{loc.status === 'active' ? 'Activo' : 'Inactivo'}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Dispositivos: {loc.devicesOnline}/{loc.devicesTotal} en línea
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACCENT_BLUE }} />
            <span className="font-semibold text-sm" style={{ color: NAVY }}>Olivia</span>
          </div>
          <p className="text-2xl font-bold" style={{ color: NAVY }}>
            {locations.filter(l => l.brand === 'Olivia').length}
          </p>
          <p className="text-xs text-gray-500">locales</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: AMBER }} />
            <span className="font-semibold text-sm" style={{ color: NAVY }}>Clap</span>
          </div>
          <p className="text-2xl font-bold" style={{ color: NAVY }}>
            {locations.filter(l => l.brand === 'Clap').length}
          </p>
          <p className="text-xs text-gray-500">locales</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: RED }} />
            <span className="font-semibold text-sm" style={{ color: NAVY }}>CDP</span>
          </div>
          <p className="text-2xl font-bold" style={{ color: NAVY }}>1</p>
          <p className="text-xs text-gray-500">centro de producción</p>
        </div>
      </div>
    </div>
  );
}
