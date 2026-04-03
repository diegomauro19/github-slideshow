'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  FileSpreadsheet,
  FileText,
  FileDown,
  ChevronDown,
  Plus,
  ChefHat,
  DollarSign,
  Leaf,
  RefreshCw,
} from 'lucide-react';
import { recipes } from '@/data/mock/recipes';
import type { Recipe } from '@/data/mock/recipes';

const NAVY = '#0D1B2A';
const TEAL = '#148F77';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Plato Fuerte': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Entrada': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Postre': { bg: 'bg-pink-50', text: 'text-pink-700' },
  'Bebida': { bg: 'bg-cyan-50', text: 'text-cyan-700' },
  'Acompañamiento': { bg: 'bg-amber-50', text: 'text-amber-700' },
};

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Activa': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  'En revisión': { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
};

function formatCOP(value: number): string {
  return '$' + value.toLocaleString('es-CO');
}

const ALL_CATEGORIES = ['Todas', 'Plato Fuerte', 'Entrada', 'Postre', 'Bebida', 'Acompañamiento'];

export default function RecetasPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'Todas' || r.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  // KPI calculations
  const totalRecetas = 87;
  const costoPromedio = 8450;
  const ingredientesUnicos = 156;
  const actualizadasHoy = 3;

  const kpis = [
    { label: 'Total Recetas', value: totalRecetas.toString(), icon: ChefHat, color: TEAL },
    { label: 'Costo Promedio por Porción', value: formatCOP(costoPromedio), icon: DollarSign, color: '#1E8449' },
    { label: 'Ingredientes Únicos', value: ingredientesUnicos.toString(), icon: Leaf, color: '#2980B9' },
    { label: 'Recetas Actualizadas Hoy', value: actualizadasHoy.toString(), icon: RefreshCw, color: '#F39C12' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
                Gestión de Recetas
              </h1>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: TEAL }}
              >
                Capa 2
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Base de recetas vinculada a inventario y costos
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar receta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>

          {/* Nueva Receta */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: TEAL }}
          >
            <Plus className="w-4 h-4" />
            Nueva Receta
          </button>

          {/* Category filter */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 min-w-[140px]"
            >
              <span className="text-gray-600">
                {categoryFilter === 'Todas' ? 'Categoría' : categoryFilter}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-20 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      categoryFilter === cat ? 'font-semibold text-teal-700 bg-teal-50' : 'text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PdV filter placeholder */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            PdV
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Costo filter placeholder */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            Costo
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Export buttons */}
          <div className="flex items-center gap-1 ml-auto">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Exportar Excel">
              <FileSpreadsheet className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Exportar PDF">
              <FileText className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Descargar">
              <FileDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: kpi.color + '15' }}
              >
                <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>
                  {kpi.value}
                </p>
                <p className="text-xs text-gray-500">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((recipe) => {
            const catColor = CATEGORY_COLORS[recipe.category] || { bg: 'bg-gray-50', text: 'text-gray-700' };
            const statusColor = STATUS_COLORS[recipe.status] || STATUS_COLORS['Activa'];

            return (
              <Link
                key={recipe.id}
                href={`/recetas/${recipe.id}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
              >
                {/* Gradient Image */}
                <div
                  className={`h-36 bg-gradient-to-br ${recipe.imageGradient} relative`}
                >
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusColor.bg} ${statusColor.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
                      {recipe.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="font-semibold text-base group-hover:text-teal-700 transition-colors"
                      style={{ color: NAVY }}
                    >
                      {recipe.name}
                    </h3>
                  </div>

                  {/* Category Badge */}
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${catColor.bg} ${catColor.text}`}
                  >
                    {recipe.category}
                  </span>

                  {/* Info Row */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{recipe.ingredients.length} ingredientes</span>
                    <span className="font-semibold" style={{ color: NAVY }}>
                      {formatCOP(recipe.costPerPortion)}
                    </span>
                  </div>

                  {/* Brand Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    {recipe.brand.map((b) => (
                      <span
                        key={b}
                        className="text-xs font-medium px-2 py-0.5 rounded-full border"
                        style={{
                          borderColor: b === 'Olivia' ? '#148F77' : '#F39C12',
                          color: b === 'Olivia' ? '#148F77' : '#F39C12',
                          backgroundColor: b === 'Olivia' ? '#148F7710' : '#F39C1210',
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Last Updated */}
                  <p className="text-xs text-gray-400">
                    Actualizada: {recipe.lastUpdated}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No se encontraron recetas con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
