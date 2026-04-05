'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronDown,
  Plus,
  ChefHat,
  DollarSign,
  Leaf,
  RefreshCw,
  MoreVertical,
  Copy,
  Pencil,
  Trash2,
} from 'lucide-react';
import { recipes as initialRecipes } from '@/data/mock/recipes';
import type { Recipe } from '@/data/mock/recipes';
import ExportButtons from '@/components/shared/ExportButtons';
import Modal from '@/components/shared/Modal';
import { useToast } from '@/components/shared/Toast';

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

const GRADIENTS = [
  'from-orange-400 to-red-500',
  'from-yellow-300 to-orange-400',
  'from-teal-400 to-green-500',
  'from-purple-400 to-pink-500',
  'from-blue-400 to-indigo-500',
  'from-rose-400 to-pink-500',
];

function formatCOP(value: number): string {
  return '$' + value.toLocaleString('es-CO');
}

const ALL_CATEGORIES = ['Todas', 'Plato Fuerte', 'Entrada', 'Postre', 'Bebida', 'Acompañamiento'] as const;

function RecipeMenu({ onEdit, onDuplicate, onDelete }: { onEdit: () => void; onDuplicate: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}
        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MoreVertical size={16} className="text-gray-400" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-30 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); onEdit(); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Pencil size={14} /> Editar
          </button>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); onDuplicate(); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Copy size={14} /> Duplicar
          </button>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); onDelete(); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            <Trash2 size={14} /> Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default function RecetasPage() {
  const { toast } = useToast();
  const [recipeList, setRecipeList] = useState<Recipe[]>(initialRecipes);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Modal state
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // New recipe form
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Recipe['category']>('Plato Fuerte');
  const [formBrands, setFormBrands] = useState<string[]>(['Olivia']);
  const [formIngredients, setFormIngredients] = useState('');

  const filtered = useMemo(() => {
    return recipeList.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'Todas' || r.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter, recipeList]);

  const totalRecetas = recipeList.length;
  const costoPromedio = recipeList.length > 0 ? Math.round(recipeList.reduce((s, r) => s + r.costPerPortion, 0) / recipeList.length) : 0;
  const ingredientesUnicos = new Set(recipeList.flatMap((r) => r.ingredients.map((i) => i.name))).size;
  const actualizadasHoy = recipeList.filter((r) => r.lastUpdated === '2026-04-03').length;

  const kpis = [
    { label: 'Total Recetas', value: totalRecetas.toString(), icon: ChefHat, color: TEAL },
    { label: 'Costo Promedio por Porción', value: formatCOP(costoPromedio), icon: DollarSign, color: '#1E8449' },
    { label: 'Ingredientes Únicos', value: ingredientesUnicos.toString(), icon: Leaf, color: '#2980B9' },
    { label: 'Recetas Actualizadas Hoy', value: actualizadasHoy.toString(), icon: RefreshCw, color: '#F39C12' },
  ];

  const exportData = filtered.map((r) => ({
    Nombre: r.name,
    Categoría: r.category,
    Marca: r.brand.join(', '),
    Costo: r.costPerPortion,
    Estado: r.status,
    Ingredientes: r.ingredients.length,
    Actualizada: r.lastUpdated,
  }));

  const resetForm = () => {
    setFormName('');
    setFormCategory('Plato Fuerte');
    setFormBrands(['Olivia']);
    setFormIngredients('');
  };

  const handleCreate = () => {
    if (!formName.trim()) return;
    const newRecipe: Recipe = {
      id: `rec-${Date.now()}`,
      name: formName.trim(),
      category: formCategory,
      brand: formBrands as ('Olivia' | 'Clap')[],
      costPerPortion: 0,
      status: 'En revisión',
      lastUpdated: '2026-04-03',
      imageGradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
      ingredients: formIngredients
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((name, i) => ({
          id: `ni-${i}`,
          name,
          vitatagCode: 'NEW-000',
          quantityPerPortion: 0,
          unit: 'g',
          unitCost: 0,
          costPerPortion: 0,
          currentStock: 0,
          stockUnit: 'kg',
          stockStatus: 'ok' as const,
        })),
    };
    setRecipeList((prev) => [newRecipe, ...prev]);
    setShowNewModal(false);
    resetForm();
    toast('success', 'Receta creada exitosamente');
  };

  const handleDuplicate = (recipe: Recipe) => {
    const dup: Recipe = {
      ...recipe,
      id: `rec-${Date.now()}`,
      name: `${recipe.name} (copia)`,
      status: 'En revisión',
      lastUpdated: '2026-04-03',
    };
    setRecipeList((prev) => [dup, ...prev]);
    toast('info', `Receta "${recipe.name}" duplicada`);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const name = recipeList.find((r) => r.id === deleteTarget)?.name;
    setRecipeList((prev) => prev.filter((r) => r.id !== deleteTarget));
    setShowDeleteModal(false);
    setDeleteTarget(null);
    toast('success', `Receta "${name}" eliminada`);
  };

  const toggleBrand = (b: string) => {
    setFormBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

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
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: TEAL }}>
                Capa 2
              </span>
            </div>
            <p className="text-sm text-gray-500">Base de recetas vinculada a inventario y costos</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-3">
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

          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: TEAL }}
          >
            <Plus className="w-4 h-4" />
            Nueva Receta
          </button>

          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 min-w-[140px]"
            >
              <span className="text-gray-600">{categoryFilter === 'Todas' ? 'Categoría' : categoryFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-20 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategoryFilter(cat); setShowCategoryDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${categoryFilter === cat ? 'font-semibold text-teal-700 bg-teal-50' : 'text-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto">
            <ExportButtons data={exportData} filename="recetas" columns={[
              { key: 'Nombre', label: 'Nombre' },
              { key: 'Categoría', label: 'Categoría' },
              { key: 'Marca', label: 'Marca' },
              { key: 'Costo', label: 'Costo por Porción' },
              { key: 'Estado', label: 'Estado' },
              { key: 'Ingredientes', label: '# Ingredientes' },
              { key: 'Actualizada', label: 'Actualizada' },
            ]} />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: kpi.color + '15' }}>
                <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{kpi.value}</p>
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
              <div key={recipe.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 relative">
                <div className="cursor-pointer" onClick={() => window.location.href = `/recetas/${recipe.id}`}>
                  <div className={`h-36 bg-gradient-to-br ${recipe.imageGradient} relative`}>
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusColor.bg} ${statusColor.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
                        {recipe.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-base group-hover:text-teal-700 transition-colors" style={{ color: NAVY }}>{recipe.name}</h3>
                    </div>
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${catColor.bg} ${catColor.text}`}>{recipe.category}</span>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{recipe.ingredients.length} ingredientes</span>
                      <span className="font-semibold" style={{ color: NAVY }}>{formatCOP(recipe.costPerPortion)}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {recipe.brand.map((b) => (
                        <span key={b} className="text-xs font-medium px-2 py-0.5 rounded-full border" style={{
                          borderColor: b === 'Olivia' ? '#148F77' : '#F39C12',
                          color: b === 'Olivia' ? '#148F77' : '#F39C12',
                          backgroundColor: b === 'Olivia' ? '#148F7710' : '#F39C1210',
                        }}>{b}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">Actualizada: {recipe.lastUpdated}</p>
                  </div>
                </div>
                {/* Context menu overlay */}
                <div className="absolute top-40 right-3">
                  <RecipeMenu
                    onEdit={() => toast('info', `Editar "${recipe.name}" - funcionalidad en desarrollo`)}
                    onDuplicate={() => handleDuplicate(recipe)}
                    onDelete={() => { setDeleteTarget(recipe.id); setShowDeleteModal(true); }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No se encontraron recetas con los filtros seleccionados.</p>
          </div>
        )}
      </div>

      {/* New Recipe Modal */}
      <Modal isOpen={showNewModal} onClose={() => { setShowNewModal(false); resetForm(); }} title="Nueva Receta" size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la receta</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Ej: Pasta Carbonara"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value as Recipe['category'])}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
            >
              <option value="Plato Fuerte">Plato Fuerte</option>
              <option value="Entrada">Entrada</option>
              <option value="Postre">Postre</option>
              <option value="Bebida">Bebida</option>
              <option value="Acompañamiento">Acompañamiento</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <div className="flex gap-3">
              {(['Olivia', 'Clap'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBrand(b)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    formBrands.includes(b)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredientes (separados por coma)</label>
            <textarea
              value={formIngredients}
              onChange={(e) => setFormIngredients(e.target.value)}
              placeholder="Ej: Pasta, Queso Parmesano, Huevo, Tocineta"
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => { setShowNewModal(false); resetForm(); }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              disabled={!formName.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: TEAL }}
            >
              Crear Receta
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setDeleteTarget(null); }} title="Confirmar eliminación" size="sm">
        <div>
          <p className="text-sm text-gray-600 mb-6">
            ¿Estás seguro de que deseas eliminar la receta <strong>{recipeList.find((r) => r.id === deleteTarget)?.name}</strong>? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
