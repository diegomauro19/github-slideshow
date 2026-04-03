'use client';

import { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChefHat,
  TrendingDown,
  Clock,
  DollarSign,
} from 'lucide-react';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const tabs = ['Olivia Laureles', 'Olivia Viva Envigado', 'Clap Laureles'];

interface Dish {
  name: string;
  status: 'disponible' | 'limitado' | 'no_disponible';
  porciones?: number;
  note?: string;
  ventas?: string;
}

const dishes: Dish[] = [
  { name: 'Pasta Bolognesa', status: 'disponible', porciones: 45, note: 'Todos los ingredientes disponibles' },
  { name: 'Pizza Margherita', status: 'disponible', porciones: 38, note: 'Todos los ingredientes disponibles' },
  { name: 'Lasagna Clásica', status: 'disponible', porciones: 52, note: 'Todos los ingredientes disponibles' },
  { name: 'Risotto de Hongos', status: 'disponible', porciones: 28, note: 'Todos los ingredientes disponibles' },
  { name: 'Ensalada César', status: 'disponible', porciones: 65, note: 'Todos los ingredientes disponibles' },
  { name: 'Filete de Res', status: 'disponible', porciones: 22, note: 'Todos los ingredientes disponibles' },
  { name: 'Bowl de Salmón', status: 'limitado', porciones: 8, note: 'Salmón: solo 8 porciones — Se agota aprox. 6:00 PM' },
  { name: 'Carpaccio de Res', status: 'limitado', porciones: 12, note: 'Rúgula limitada' },
  { name: 'Bowl Buddha', status: 'limitado', porciones: 15, note: 'Rúgula limitada' },
  { name: 'Sashimi Variado', status: 'no_disponible', note: 'Salmón agotado', ventas: '$456,000' },
  { name: 'Tartare de Salmón', status: 'no_disponible', note: 'Salmón agotado' },
  { name: 'Nigiri Especial', status: 'no_disponible', note: 'Salmón agotado' },
];

const criticalIngredients = [
  { ingrediente: 'Salmón Fresco', stock: '0.4 kg', recetas: 'Sashimi, Tartare, Nigiri, Bowl de Salmón', porciones: 8, seAgota: 'Agotado', impacto: '$1,280,000' },
  { ingrediente: 'Rúgula', stock: '1.2 kg', recetas: 'Carpaccio, Bowl Buddha, Ensaladas', porciones: 27, seAgota: '7:30 PM', impacto: '$540,000' },
  { ingrediente: 'Queso Parmesano', stock: '3.5 kg', recetas: 'Pasta, Lasagna, Risotto, César', porciones: 45, seAgota: 'Mañana 11 AM', impacto: '$890,000' },
  { ingrediente: 'Carne de Res', stock: '4.8 kg', recetas: 'Filete, Carpaccio, Bolognesa', porciones: 34, seAgota: 'Mañana 2 PM', impacto: '$720,000' },
  { ingrediente: 'Masa para Pizza', stock: '2.1 kg', recetas: 'Pizza Margherita', porciones: 38, seAgota: 'Mañana 12 PM', impacto: '$456,000' },
];

function StatusIcon({ status }: { status: Dish['status'] }) {
  if (status === 'disponible') return <CheckCircle size={20} style={{ color: GREEN }} />;
  if (status === 'limitado') return <AlertTriangle size={20} style={{ color: AMBER }} />;
  return <XCircle size={20} style={{ color: RED }} />;
}

function statusLabel(status: Dish['status']) {
  if (status === 'disponible') return 'DISPONIBLE';
  if (status === 'limitado') return 'LIMITADO';
  return 'NO DISPONIBLE';
}

function statusBg(status: Dish['status']) {
  if (status === 'disponible') return 'bg-green-50 border-green-200';
  if (status === 'limitado') return 'bg-amber-50 border-amber-200';
  return 'bg-red-50 border-red-200';
}

function statusBadge(status: Dish['status']) {
  if (status === 'disponible') return 'bg-green-100 text-green-800';
  if (status === 'limitado') return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}

export default function DisponibilidadCartaPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
              Disponibilidad de Carta en Tiempo Real
            </h1>
            <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: GREEN }}>
              Capa 3
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            ¿Qué puede servir cada PdV ahora mismo?
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          Actualizado hace 2 min
        </div>
      </div>

      {/* PdV Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: GREEN + '15' }}>
              <ChefHat size={20} style={{ color: GREEN }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Platos Disponibles</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>42<span className="text-sm text-gray-400 font-normal">/52</span></p>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full" style={{ width: '81%', backgroundColor: GREEN }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">81% de la carta</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: AMBER + '15' }}>
              <AlertTriangle size={20} style={{ color: AMBER }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Platos Limitados</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>7</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">Ingredientes escasos</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: RED + '15' }}>
              <XCircle size={20} style={{ color: RED }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">No Disponibles</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>3</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">Ingredientes agotados</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: RED + '15' }}>
              <DollarSign size={20} style={{ color: RED }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ventas en riesgo</p>
              <p className="text-2xl font-bold" style={{ color: RED }}>$2.1M</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            <TrendingDown size={12} className="inline mr-1" />
            Si no se repone inventario
          </p>
        </div>
      </div>

      {/* Dish Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {dishes.map((dish) => (
          <div
            key={dish.name}
            className={`rounded-xl border p-4 ${statusBg(dish.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <StatusIcon status={dish.status} />
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusBadge(dish.status)}`}>
                  {statusLabel(dish.status)}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">{dish.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{dish.note}</p>
            {dish.porciones !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Porciones posibles: <span className="font-bold">{dish.porciones}</span>
                </span>
              </div>
            )}
            {dish.ventas && (
              <div className="mt-2">
                <span className="text-sm font-medium" style={{ color: RED }}>
                  Ventas perdidas: {dish.ventas}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Critical Ingredients Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg" style={{ color: NAVY }}>
            Ingredientes Críticos
          </h2>
          <p className="text-sm text-gray-500">Ingredientes que limitan la disponibilidad de platos</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 font-medium text-gray-500">Ingrediente</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Stock</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Recetas que limita</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Porciones restantes</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Se agota</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Impacto si se agota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {criticalIngredients.map((item) => (
                <tr key={item.ingrediente} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{item.ingrediente}</td>
                  <td className="px-6 py-3">
                    <span className={`font-medium ${item.stock === '0.4 kg' ? 'text-red-600' : 'text-amber-600'}`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600 max-w-xs truncate">{item.recetas}</td>
                  <td className="px-6 py-3 text-right font-medium text-gray-900">{item.porciones}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      item.seAgota === 'Agotado' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      <Clock size={10} />
                      {item.seAgota}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-bold" style={{ color: RED }}>{item.impacto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
