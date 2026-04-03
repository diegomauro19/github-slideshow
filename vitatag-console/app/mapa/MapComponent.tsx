'use client';

import { useState, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { locations, CDP_LOCATION } from '@/data/mock/locations';
import type { Location } from '@/data/mock/locations';

const GREEN = '#1E8449';
const BLUE = '#2980B9';
const RED = '#C0392B';
const NAVY = '#0D1B2A';

type BrandFilter = 'All' | 'Olivia' | 'Clap';

function createColoredIcon(color: string, size: number = 14): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${color};
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

const oliviaIcon = createColoredIcon(GREEN);
const clapIcon = createColoredIcon(BLUE);
const cdpIcon = createColoredIcon(RED, 22);

function getMarkerIcon(brand: string): L.DivIcon {
  return brand === 'Olivia' ? oliviaIcon : clapIcon;
}

function Legend() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: '12px 16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        fontSize: 13,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8, color: NAVY }}>Leyenda</div>
      {[
        { color: GREEN, label: 'Olivia' },
        { color: BLUE, label: 'Clap' },
        { color: RED, label: 'CDP' },
      ].map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: item.color,
              border: '2px solid white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function MapComponent() {
  const [filter, setFilter] = useState<BrandFilter>('All');

  const filteredLocations = useMemo(() => {
    if (filter === 'All') return locations;
    return locations.filter((loc) => loc.brand === filter);
  }, [filter]);

  const oliviaCount = locations.filter((l) => l.brand === 'Olivia').length;
  const clapCount = locations.filter((l) => l.brand === 'Clap').length;
  const activeCount = locations.filter((l) => l.status === 'active').length;

  return (
    <div className="space-y-4">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Locales</p>
          <p className="text-2xl font-bold" style={{ color: NAVY }}>{locations.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: GREEN }} />
            <p className="text-xs text-gray-500">Olivia</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: NAVY }}>{oliviaCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BLUE }} />
            <p className="text-xs text-gray-500">Clap</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: NAVY }}>{clapCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Activos</p>
          <p className="text-2xl font-bold" style={{ color: GREEN }}>{activeCount}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Filtrar:</span>
        {(['All', 'Olivia', 'Clap'] as BrandFilter[]).map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              filter === opt
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt === 'All' ? 'Todos' : opt}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden relative">
        <MapContainer
          center={[6.2442, -75.5812]}
          zoom={12}
          style={{ height: 'calc(100vh - 200px)', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* POS Location Markers */}
          {filteredLocations.map((loc: Location) => {
            if (loc.lat == null || loc.lng == null) return null;
            return (
              <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={getMarkerIcon(loc.brand)}>
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <strong style={{ color: NAVY }}>{loc.name}</strong>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                      Marca: <span style={{ color: loc.brand === 'Olivia' ? GREEN : BLUE, fontWeight: 600 }}>{loc.brand}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>Ciudad: {loc.city}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>
                      Estado:{' '}
                      <span style={{ color: loc.status === 'active' ? GREEN : RED, fontWeight: 600 }}>
                        {loc.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>
                      Dispositivos: {loc.devicesOnline}/{loc.devicesTotal} en linea
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* CDP Marker */}
          {CDP_LOCATION.lat != null && CDP_LOCATION.lng != null && (
            <Marker position={[CDP_LOCATION.lat, CDP_LOCATION.lng]} icon={cdpIcon}>
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <strong style={{ color: NAVY }}>{CDP_LOCATION.name}</strong>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>Ciudad: {CDP_LOCATION.city}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>
                    Zonas: {CDP_LOCATION.zones.length} activas
                  </div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                    {CDP_LOCATION.zones.join(', ')}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Legend overlay */}
        <Legend />
      </div>
    </div>
  );
}
