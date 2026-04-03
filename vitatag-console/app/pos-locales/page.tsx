'use client';

import { useState, useMemo } from 'react';
import { Store, Wifi, WifiOff, Clock, MapPin, Search, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { locations } from '@/data/mock/locations';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const AMBER = '#F39C12';
const GREEN = '#1E8449';
const RED = '#C0392B';

function brandColor(brand: string) {
  return brand === 'Olivia' ? ACCENT_BLUE : AMBER;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function PosLocalesPage() {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const cities = Array.from(new Set(locations.map(l => l.city))).sort();

  const filtered = useMemo(() => {
    return locations.filter(l => {
      if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.city.toLowerCase().includes(search.toLowerCase())) return false;
      if (brandFilter && l.brand !== brandFilter) return false;
      if (cityFilter && l.city !== cityFilter) return false;
      return true;
    });
  }, [search, brandFilter, cityFilter]);

  const activeCount = filtered.filter(l => l.status === 'active').length;
  const totalDevicesOnline = filtered.reduce((s, l) => s + l.devicesOnline, 0);
  const totalDevices = filtered.reduce((s, l) => s + l.devicesTotal, 0);

  const hasFilters = search || brandFilter || cityFilter;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Puntos de Venta</h1>
        <p className="text-gray-500 mt-1">
          {activeCount} activos de {filtered.length} totales &middot; {totalDevicesOnline}/{totalDevices} dispositivos en línea
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Locales', value: filtered.length, icon: <Store size={20} />, color: ACCENT_BLUE },
          { label: 'Activos', value: activeCount, icon: <Wifi size={20} />, color: GREEN },
          { label: 'Olivia', value: filtered.filter(l => l.brand === 'Olivia').length, icon: <MapPin size={20} />, color: ACCENT_BLUE },
          { label: 'Clap', value: filtered.filter(l => l.brand === 'Clap').length, icon: <MapPin size={20} />, color: AMBER },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.color + '15', color: k.color }}>{k.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{k.label}</p>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{k.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar local o ciudad..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <div className="flex gap-1">
          {['', 'Olivia', 'Clap'].map(b => (
            <button key={b} onClick={() => setBrandFilter(b)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${brandFilter === b ? 'text-white' : 'bg-white border border-gray-200 text-gray-700'}`}
              style={brandFilter === b ? { backgroundColor: b === 'Olivia' ? ACCENT_BLUE : b === 'Clap' ? AMBER : NAVY } : {}}>
              {b || 'Todos'}
            </button>
          ))}
        </div>
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="">Todas las ciudades</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {hasFilters && (
          <button onClick={() => { setSearch(''); setBrandFilter(''); setCityFilter(''); }}
            className="px-3 py-2 rounded-lg text-sm font-medium" style={{ color: RED }}>Limpiar</button>
        )}
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((loc) => (
          <div key={loc.id}
            className={`bg-white rounded-xl border transition-all cursor-pointer ${expandedId === loc.id ? 'border-blue-300 shadow-lg col-span-3' : 'border-gray-200 hover:shadow-md'}`}
            onClick={() => setExpandedId(expandedId === loc.id ? null : loc.id)}>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{loc.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{loc.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: brandColor(loc.brand) }}>{loc.brand}</span>
                  {expandedId === loc.id ? <ChevronRight size={16} className="text-gray-400 rotate-90" /> : <ChevronRight size={16} className="text-gray-400" />}
                </div>
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
                  <span>{loc.devicesOnline}/{loc.devicesTotal} dispositivos</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={12} />
                  <span className="text-xs">{formatDate(loc.lastUpdate)}</span>
                </div>
              </div>
            </div>

            {/* Expanded Detail */}
            {expandedId === loc.id && (
              <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">ID del Local</p>
                    <p className="font-mono text-sm font-medium">{loc.id}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Marca</p>
                    <p className="text-sm font-medium" style={{ color: brandColor(loc.brand) }}>{loc.brand}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Ciudad</p>
                    <p className="text-sm font-medium">{loc.city}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Coordenadas</p>
                    <p className="font-mono text-xs">{loc.lat?.toFixed(4)}, {loc.lng?.toFixed(4)}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link href="/dispositivos" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: ACCENT_BLUE }} onClick={(e) => e.stopPropagation()}>
                    <Wifi size={14} /> Ver dispositivos <ExternalLink size={12} />
                  </Link>
                  <Link href="/mapa" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: GREEN }} onClick={(e) => e.stopPropagation()}>
                    <MapPin size={14} /> Ver en mapa <ExternalLink size={12} />
                  </Link>
                  <Link href="/inventario" className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium text-gray-700"
                    onClick={(e) => e.stopPropagation()}>
                    Ver inventario <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
