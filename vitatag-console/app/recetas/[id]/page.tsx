'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit3,
  Copy,
  History,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { recipes } from '@/data/mock/recipes';

const NAVY = '#0D1B2A';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Plato Fuerte': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Entrada': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Postre': { bg: 'bg-pink-50', text: 'text-pink-700' },
  'Bebida': { bg: 'bg-cyan-50', text: 'text-cyan-700' },
  'Acompañamiento': { bg: 'bg-amber-50', text: 'text-amber-700' },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  'Activa': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  'En revisión': { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
};

function formatCOP(value: number): string {
  return '$' + value.toLocaleString('es-CO');
}

const STOCK_ICON: Record<string, React.ReactNode> = {
  ok: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
  critical: <XCircle className="w-4 h-4 text-red-500" />,
};

export default function RecetaDetallePage() {
  const params = useParams();
  const id = params.id as string;

  const recipe = useMemo(() => recipes.find((r) => r.id === id), [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600 mb-4">Receta no encontrada</p>
          <Link
            href="/recetas"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: TEAL }}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Recetas
          </Link>
        </div>
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[recipe.category] || { bg: 'bg-gray-50', text: 'text-gray-700' };
  const statusStyle = STATUS_STYLES[recipe.status] || STATUS_STYLES['Activa'];

  const totalCost = recipe.ingredients.reduce((sum, ing) => sum + ing.costPerPortion, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back button */}
        <Link
          href="/recetas"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Recetas
        </Link>

        {/* Hero: Gradient image + Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className={`h-48 bg-gradient-to-br ${recipe.imageGradient} relative`}>
            <div className="absolute bottom-4 left-6">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: TEAL }}
              >
                Capa 2
              </span>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>
              {recipe.name}
            </h1>

            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {/* Category */}
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-medium ${catColor.bg} ${catColor.text}`}>
                {recipe.category}
              </span>

              <span className="text-gray-300">|</span>

              {/* Brands */}
              <div className="flex items-center gap-2">
                {recipe.brand.map((b) => (
                  <span
                    key={b}
                    className="text-xs font-medium px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: b === 'Olivia' ? TEAL : AMBER,
                      color: b === 'Olivia' ? TEAL : AMBER,
                      backgroundColor: b === 'Olivia' ? '#148F7710' : '#F39C1210',
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <span className="text-gray-300">|</span>

              {/* Status */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {recipe.status}
              </span>

              <span className="text-gray-300">|</span>

              {/* Last Updated */}
              <span className="text-gray-500">
                Actualizada: {recipe.lastUpdated}
              </span>

              <span className="text-gray-300">|</span>

              {/* Cost per portion (big) */}
              <span className="text-lg font-bold" style={{ color: NAVY }}>
                {formatCOP(recipe.costPerPortion)}{' '}
                <span className="text-xs font-normal text-gray-400">/porción</span>
              </span>
            </div>
          </div>
        </div>

        {/* Ingredients Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold" style={{ color: NAVY }}>
              Ingredientes ({recipe.ingredients.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                    #
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ingrediente
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Código VitaTag
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Cant/Porción
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Unidad
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Costo Unit.
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Costo/Porción
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Stock actual
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ing, idx) => (
                  <tr
                    key={ing.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-3 text-gray-400 font-medium">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: NAVY }}>
                      {ing.name}
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">
                        {ing.vitatagCode}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {ing.quantityPerPortion}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{ing.unit}</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {formatCOP(ing.unitCost)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium" style={{ color: NAVY }}>
                      {formatCOP(ing.costPerPortion)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {STOCK_ICON[ing.stockStatus]}
                        <span className="text-gray-600">
                          {ing.currentStock} {ing.stockUnit}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-gray-50 border-t-2 border-gray-200">
                  <td className="px-6 py-3" />
                  <td
                    className="px-4 py-3 font-bold text-sm"
                    colSpan={5}
                    style={{ color: NAVY }}
                  >
                    TOTAL
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-sm" style={{ color: NAVY }}>
                    {formatCOP(totalCost)}
                  </td>
                  <td className="px-4 py-3" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: TEAL }}
          >
            <Edit3 className="w-4 h-4" />
            Editar receta
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Copy className="w-4 h-4" />
            Duplicar
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <History className="w-4 h-4" />
            Historial de cambios
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <MapPin className="w-4 h-4" />
            Ver en qué PdV está activa
          </button>
        </div>
      </div>
    </div>
  );
}
