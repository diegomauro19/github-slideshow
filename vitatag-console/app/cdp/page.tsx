'use client';

import { Snowflake, Package, Truck, Store, ArrowRight, Clock, Thermometer } from 'lucide-react';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const AMBER = '#F39C12';
const RED = '#C0392B';

const zones = [
  { name: 'Nevera 1', products: 456, color: ACCENT_BLUE, bgClass: 'bg-blue-50 border-blue-200', icon: Snowflake, temp: '2.4°C', lastScan: 'Hace 3 min' },
  { name: 'Nevera 2', products: 823, color: ACCENT_BLUE, bgClass: 'bg-blue-50 border-blue-200', icon: Snowflake, temp: '3.1°C', lastScan: 'Hace 5 min' },
  { name: 'Nevera 3', products: 312, color: ACCENT_BLUE, bgClass: 'bg-blue-50 border-blue-200', icon: Snowflake, temp: '1.8°C', lastScan: 'Hace 8 min' },
  { name: 'Logística', products: 1245, color: GREEN, bgClass: 'bg-green-50 border-green-200', icon: Package, temp: null, lastScan: 'Hace 2 min' },
  { name: 'Picking', products: 89, color: AMBER, bgClass: 'bg-amber-50 border-amber-200', icon: Package, temp: null, lastScan: 'Hace 1 min' },
  { name: 'Despacho', products: 34, color: '#E67E22', bgClass: 'bg-orange-50 border-orange-200', icon: Truck, temp: null, lastScan: 'Ahora' },
];

const flowSteps = [
  { label: 'CDP', sublabel: 'Almacenamiento', color: ACCENT_BLUE, icon: Snowflake },
  { label: 'Logística', sublabel: 'Preparación', color: GREEN, icon: Package },
  { label: 'Transporte', sublabel: 'En ruta', color: AMBER, icon: Truck },
  { label: 'PdV', sublabel: 'Punto de Venta', color: TEAL, icon: Store },
];

export default function CdpPage() {
  const totalProducts = zones.reduce((s, z) => s + z.products, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Centro de Producción (CDP)</h1>
        <p className="text-gray-500 mt-1">
          Visualización de zonas del CDP &middot; {totalProducts.toLocaleString()} productos en inventario
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Productos</p>
          <p className="text-2xl font-bold mt-1" style={{ color: NAVY }}>{totalProducts.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Zonas Frías</p>
          <p className="text-2xl font-bold mt-1" style={{ color: ACCENT_BLUE }}>3</p>
          <p className="text-xs text-gray-400">Neveras activas</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">En Despacho</p>
          <p className="text-2xl font-bold mt-1" style={{ color: AMBER }}>34</p>
          <p className="text-xs text-gray-400">Listos para envío</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Temp. Promedio</p>
          <p className="text-2xl font-bold mt-1" style={{ color: ACCENT_BLUE }}>2.4°C</p>
          <p className="text-xs text-green-600">Dentro del rango</p>
        </div>
      </div>

      {/* Zone Cards */}
      <div>
        <h2 className="font-semibold text-lg mb-4" style={{ color: NAVY }}>Zonas del CDP</h2>
        <div className="grid grid-cols-3 gap-4">
          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.name}
                className={`rounded-xl border p-5 ${zone.bgClass} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: zone.color + '20' }}
                    >
                      <Icon size={20} style={{ color: zone.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{zone.name}</h3>
                      <p className="text-sm text-gray-500">{zone.products.toLocaleString()} productos</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {zone.temp && (
                    <div className="flex items-center gap-2 text-sm">
                      <Thermometer size={14} style={{ color: zone.color }} />
                      <span className="text-gray-600">Temperatura:</span>
                      <span className="font-semibold" style={{ color: zone.color }}>{zone.temp}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={14} />
                    <span>Último escaneo: {zone.lastScan}</span>
                  </div>
                </div>

                {/* Mini capacity bar */}
                <div className="mt-3 w-full bg-white/60 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.min((zone.products / 1300) * 100, 100)}%`,
                      backgroundColor: zone.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-lg mb-6" style={{ color: NAVY }}>Flujo de Producto</h2>
        <div className="flex items-center justify-center gap-2">
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: step.color + '15', border: `2px solid ${step.color}` }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>
                  <p className="text-sm font-semibold mt-2" style={{ color: step.color }}>{step.label}</p>
                  <p className="text-xs text-gray-400">{step.sublabel}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="flex items-center mx-3 -mt-6">
                    <div className="w-16 h-0.5 bg-gray-200" />
                    <ArrowRight size={16} className="text-gray-300 -ml-1" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
