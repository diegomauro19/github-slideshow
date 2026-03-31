'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationInputs } from '@/lib/types';
import { SOLUTIONS } from '@/lib/solutions';
import { PARAMETERS } from '@/lib/parameters';
import { calculateSimulation } from '@/lib/calculator';
import {
  formatCurrencyShort,
  formatDays,
  formatROI,
  formatCurrencyFull,
} from '@/lib/format';
import SolutionToggle from '@/components/SolutionToggle';
import ParameterSlider from '@/components/ParameterSlider';
import KPICard from '@/components/KPICard';
import ComparisonBar from '@/components/ComparisonBar';
import EconomicTable from '@/components/EconomicTable';
import CounterfactualComparison from '@/components/CounterfactualComparison';
import InsightBox from '@/components/InsightBox';

function getDefaultInputs(): SimulationInputs {
  const inputs: Record<string, number> = {};
  PARAMETERS.forEach((p) => {
    inputs[p.key] = p.default;
  });
  return inputs as unknown as SimulationInputs;
}

export default function SimuladorPage() {
  const [inputs, setInputs] = useState<SimulationInputs>(getDefaultInputs);
  const [activeSolutionIds, setActiveSolutionIds] = useState<Set<string>>(
    new Set()
  );
  const [saving, setSaving] = useState(false);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [simName, setSimName] = useState('');

  const activeSolutions = useMemo(
    () => SOLUTIONS.filter((s) => activeSolutionIds.has(s.id)),
    [activeSolutionIds]
  );

  const results = useMemo(
    () => calculateSimulation(inputs, activeSolutions),
    [inputs, activeSolutions]
  );

  const toggleSolution = useCallback((id: string) => {
    setActiveSolutionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const updateInput = useCallback((key: keyof SimulationInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        nombre_simulacion: simName || 'Simulación Mystic Foods',
        ...inputs,
        s1_activa: activeSolutionIds.has('s1'),
        s2_activa: activeSolutionIds.has('s2'),
        s3_activa: activeSolutionIds.has('s3'),
        s4_activa: activeSolutionIds.has('s4'),
        perdida_manual_mensual: results.totalPerdidaManual,
        valor_neto_mensual: results.valorNetoMensual,
        payback_dias: results.paybackDias,
        roi_anual: results.roiAnual,
        inversion_total: results.inversionTotalInicial,
      };
      const res = await fetch('/api/simulacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.id) {
        setSavedUrl(`${window.location.origin}/simulador?id=${data.id}`);
      }
    } catch {
      // Silently handle - Supabase may not be configured
      setSavedUrl('Error: Configure Supabase para guardar simulaciones');
    }
    setSaving(false);
  };

  const operativos = PARAMETERS.filter((p) => p.group === 'operativo');
  const financieros = PARAMETERS.filter((p) => p.group === 'financiero');

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="shrink-0">
              <div className="font-heading font-bold text-navy leading-none">
                <span className="text-base">Winter</span>
                <br />
                <span className="text-base">
                  Kpital<span className="text-[8px] align-super">®</span>
                </span>
              </div>
            </a>
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            <h1 className="font-heading font-semibold text-sm text-text-primary hidden sm:block">
              Simulador de Impacto Operativo
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/simulador/reporte"
              target="_blank"
              className="text-xs font-medium text-text-secondary hover:text-accent transition-colors hidden sm:inline"
            >
              Ver Reporte
            </a>
            <button
              onClick={() => setShowSaveModal(true)}
              className="bg-accent hover:bg-accent/90 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:w-[340px] xl:w-[380px] shrink-0 space-y-6">
            {/* Solutions */}
            <div>
              <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-3">
                Soluciones
              </h2>
              <div className="space-y-2.5">
                {SOLUTIONS.map((sol) => (
                  <SolutionToggle
                    key={sol.id}
                    solution={sol}
                    active={activeSolutionIds.has(sol.id)}
                    onToggle={() => toggleSolution(sol.id)}
                  />
                ))}
              </div>
            </div>

            {/* Operational Parameters */}
            <div>
              <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-3">
                Parámetros Operativos
              </h2>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                {operativos.map((param) => (
                  <ParameterSlider
                    key={param.key}
                    config={param}
                    value={inputs[param.key]}
                    onChange={(v) => updateInput(param.key, v)}
                  />
                ))}
              </div>
            </div>

            {/* Financial Parameters */}
            <div>
              <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-3">
                Parámetros Financieros
              </h2>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                {financieros.map((param) => (
                  <ParameterSlider
                    key={param.key}
                    config={param}
                    value={inputs[param.key]}
                    onChange={(v) => updateInput(param.key, v)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard
                label="Valor Neto Mensual"
                value={formatCurrencyShort(results.valorNetoMensual)}
                numericValue={results.valorNetoMensual}
                color={results.valorNetoMensual > 0 ? '#1E8449' : '#C0392B'}
                sublabel="Ahorro - costos operativos"
              />
              <KPICard
                label="Payback"
                value={formatDays(results.paybackDias)}
                numericValue={results.paybackDias}
                color="#2980B9"
                sublabel="Tiempo de recuperación"
              />
              <KPICard
                label="Valor Neto Anual"
                value={formatCurrencyShort(results.valorNetoAnual)}
                numericValue={results.valorNetoAnual}
                color="#148F77"
                sublabel="Proyección 12 meses"
              />
              <KPICard
                label="ROI Anual"
                value={formatROI(results.roiAnual)}
                numericValue={results.roiAnual}
                color="#303C42"
                sublabel="Retorno sobre inversión"
              />
            </div>

            {/* Comparison Bars */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-heading font-semibold text-sm text-text-primary mb-4">
                Comparativa: Manual vs. Propuesto
              </h3>
              <ComparisonBar
                label="Varianza AvT"
                manualValue={results.perdidaAvtManual}
                proposedValue={results.perdidaAvtPropuesto}
              />
              <ComparisonBar
                label="Merma en tránsito"
                manualValue={results.perdidaTransitoManual}
                proposedValue={results.perdidaTransitoPropuesto}
              />
              <ComparisonBar
                label="Ventas perdidas (disponibilidad)"
                manualValue={results.perdidaDisponibilidadManual}
                proposedValue={results.perdidaDisponibilidadPropuesto}
              />
              <ComparisonBar
                label="Costo horas manuales"
                manualValue={results.costoHorasManual}
                proposedValue={results.costoHorasPropuesto}
              />
              <ComparisonBar
                label="Sobrecompra"
                manualValue={results.perdidaSobrecompraManual}
                proposedValue={results.perdidaSobrecompraPropuesto}
              />
            </div>

            {/* Economic Table */}
            <EconomicTable results={results} />

            {/* Investment breakdown */}
            {activeSolutions.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading font-semibold text-sm text-text-primary mb-3">
                  Estructura de Inversión
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
                      Hardware
                    </p>
                    <p className="font-mono-num text-lg font-bold text-text-primary">
                      {formatCurrencyShort(results.inversionHw)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
                      Software
                    </p>
                    <p className="font-mono-num text-lg font-bold text-text-primary">
                      {formatCurrencyShort(results.inversionSw)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
                      Suscripción /mes
                    </p>
                    <p className="font-mono-num text-lg font-bold text-accent">
                      {formatCurrencyShort(results.costoSuscripcionMensual)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
                      Consumibles /mes
                    </p>
                    <p className="font-mono-num text-lg font-bold text-text-secondary">
                      {formatCurrencyShort(results.costoConsumablesMensual)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Counterfactual Comparison */}
            <CounterfactualComparison results={results} />

            {/* Insight Box */}
            <InsightBox results={results} activeSolutions={activeSolutions} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-8">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-text-secondary">
            © Winter Kpital + Lorax · 2026
          </p>
          <p className="text-[10px] text-text-secondary">
            Documento confidencial · Preparado exclusivamente para Mystic Foods
          </p>
        </div>
      </footer>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                Guardar Simulación
              </h3>
              <input
                type="text"
                placeholder="Nombre de la simulación"
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent mb-4"
              />
              {savedUrl && (
                <div className="mb-4 p-3 bg-positive/5 border border-positive/20 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">URL compartible:</p>
                  <p className="text-xs font-mono-num text-accent break-all">{savedUrl}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 text-sm font-medium text-text-secondary hover:text-text-primary border border-gray-200 rounded-lg py-2.5 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
