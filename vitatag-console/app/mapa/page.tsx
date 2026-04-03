'use client';

import dynamic from 'next/dynamic';

const NAVY = '#0D1B2A';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
      <p className="text-gray-400">Cargando mapa...</p>
    </div>
  ),
});

export default function MapaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          Mapa de Puntos de Venta
        </h1>
        <p className="text-gray-500 mt-1">Ubicacion de todos los locales y el CDP</p>
      </div>

      <MapComponent />
    </div>
  );
}
