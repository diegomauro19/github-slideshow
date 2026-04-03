'use client';

import { RotateCcw, DollarSign, CalendarDays, Package, Clock } from 'lucide-react';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';
const ACCENT_BLUE = '#2980B9';

const devoluciones = [
  { id: 1, fecha: '2026-04-03', producto: 'Salmón Fresco 500g', cantidad: 3, razon: 'Producto vencido', local: 'Olivia Laureles', estado: 'Aprobada', valor: 187500 },
  { id: 2, fecha: '2026-04-02', producto: 'Queso Mozzarella 1kg', cantidad: 2, razon: 'Daño en transporte', local: 'Clap Laureles', estado: 'Aprobada', valor: 56000 },
  { id: 3, fecha: '2026-04-02', producto: 'Aceite de Oliva 750ml', cantidad: 1, razon: 'Error de pedido', local: 'Olivia Viva Envigado', estado: 'Pendiente', valor: 45000 },
  { id: 4, fecha: '2026-04-01', producto: 'Carne Res Premium 2kg', cantidad: 2, razon: 'Calidad no conforme', local: 'Olivia Arkadia', estado: 'Aprobada', valor: 198000 },
  { id: 5, fecha: '2026-03-31', producto: 'Hongos Portobello 500g', cantidad: 5, razon: 'Producto vencido', local: 'Clap Envigado', estado: 'Rechazada', valor: 87500 },
  { id: 6, fecha: '2026-03-30', producto: 'Pasta Fresca Fettuccine', cantidad: 4, razon: 'Daño en transporte', local: 'Olivia 10b', estado: 'Aprobada', valor: 68000 },
  { id: 7, fecha: '2026-03-29', producto: 'Rúgula Orgánica 250g', cantidad: 8, razon: 'Calidad no conforme', local: 'Olivia Tesoro', estado: 'Aprobada', valor: 120000 },
  { id: 8, fecha: '2026-03-28', producto: 'Tomate San Marzano 1kg', cantidad: 6, razon: 'Producto vencido', local: 'Clap Visitación', estado: 'Pendiente', valor: 96000 },
  { id: 9, fecha: '2026-03-27', producto: 'Camarón Jumbo 1kg', cantidad: 2, razon: 'Error de pedido', local: 'Olivia Oviedo', estado: 'Aprobada', valor: 234000 },
  { id: 10, fecha: '2026-03-26', producto: 'Vino Tinto Reserva', cantidad: 3, razon: 'Daño en transporte', local: 'Olivia San Lucas', estado: 'Aprobada', valor: 153000 },
];

function estadoBadge(estado: string) {
  if (estado === 'Aprobada') return 'bg-green-100 text-green-700';
  if (estado === 'Pendiente') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

function razonColor(razon: string) {
  if (razon === 'Producto vencido') return 'bg-red-50 text-red-700';
  if (razon === 'Daño en transporte') return 'bg-amber-50 text-amber-700';
  if (razon === 'Error de pedido') return 'bg-blue-50 text-blue-700';
  return 'bg-purple-50 text-purple-700';
}

function formatCurrency(n: number) {
  return '$' + n.toLocaleString('es-CO');
}

export default function DevolucionesPage() {
  const total = devoluciones.length;
  const esteMes = devoluciones.filter(d => d.fecha >= '2026-04-01').length;
  const valorTotal = devoluciones.reduce((s, d) => s + d.valor, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Gestión de Devoluciones</h1>
        <p className="text-gray-500 mt-1">Seguimiento de devoluciones de producto a proveedores y entre locales</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: ACCENT_BLUE + '15' }}>
              <RotateCcw size={20} style={{ color: ACCENT_BLUE }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Devoluciones</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: AMBER + '15' }}>
              <CalendarDays size={20} style={{ color: AMBER }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Este Mes</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{esteMes}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: RED + '15' }}>
              <DollarSign size={20} style={{ color: RED }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor Total</p>
              <p className="text-2xl font-bold" style={{ color: RED }}>{formatCurrency(valorTotal)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold" style={{ color: NAVY }}>Historial de Devoluciones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 font-medium text-gray-500">Fecha</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Producto</th>
                <th className="text-center px-6 py-3 font-medium text-gray-500">Cantidad</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Razón</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Local</th>
                <th className="text-center px-6 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {devoluciones.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-600 whitespace-nowrap">{d.fecha}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">{d.producto}</td>
                  <td className="px-6 py-3 text-center text-gray-700">{d.cantidad}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${razonColor(d.razon)}`}>
                      {d.razon}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{d.local}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${estadoBadge(d.estado)}`}>
                      {d.estado}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-gray-900">{formatCurrency(d.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
