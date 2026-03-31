'use client';

import { SimulationResults } from '@/lib/types';
import { formatCurrencyShort, formatDays, formatROI } from '@/lib/format';

interface Props {
  results: SimulationResults;
}

export default function CounterfactualComparison({ results }: Props) {
  return (
    <div className="space-y-4">
      {/* Two scenario cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario A: Manual */}
        <div className="bg-white rounded-xl p-5 border-2 border-negative/30 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-negative" />
            <h4 className="font-heading font-semibold text-sm text-text-primary">
              Escenario A: Proceso Manual
            </h4>
          </div>
          <p className="text-[11px] text-text-secondary mb-4">
            Continuar con el proceso actual sin intervención tecnológica
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-secondary">Pérdida mensual</span>
              <span className="font-mono-num text-lg font-bold text-negative">
                {formatCurrencyShort(results.totalPerdidaManual)}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-secondary">Pérdida anual proyectada</span>
              <span className="font-mono-num text-xl font-bold text-negative">
                {formatCurrencyShort(results.perdidaAnualManual)}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-negative/10">
            <p className="text-[10px] text-negative/70 italic">
              Costo de no hacer nada: {formatCurrencyShort(results.perdidaAnualManual)}/año
            </p>
          </div>
        </div>

        {/* Scenario B: Proposed */}
        <div className="bg-white rounded-xl p-5 border-2 border-positive/30 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-positive" />
            <h4 className="font-heading font-semibold text-sm text-text-primary">
              Escenario B: Con Soluciones
            </h4>
          </div>
          <p className="text-[11px] text-text-secondary mb-4">
            Implementar las soluciones seleccionadas de la plataforma
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-secondary">Valor neto mensual</span>
              <span className="font-mono-num text-lg font-bold text-positive">
                {formatCurrencyShort(results.valorNetoMensual)}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-secondary">Valor neto anual</span>
              <span className="font-mono-num text-xl font-bold text-positive">
                {formatCurrencyShort(results.valorNetoAnual)}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-positive/10">
            <p className="text-[10px] text-positive/70 italic">
              Inversión inicial: {formatCurrencyShort(results.inversionTotalInicial)}
            </p>
          </div>
        </div>
      </div>

      {/* Big numbers row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-accent/5 rounded-xl p-4 text-center border border-accent/10">
          <p className="font-mono-num text-3xl font-bold text-accent">
            {results.multiplicador}×
          </p>
          <p className="text-[10px] font-medium text-text-secondary mt-1 uppercase tracking-wider">
            Multiplicador
          </p>
        </div>
        <div className="bg-positive/5 rounded-xl p-4 text-center border border-positive/10">
          <p className="font-mono-num text-3xl font-bold text-positive">
            {formatDays(results.paybackDias)}
          </p>
          <p className="text-[10px] font-medium text-text-secondary mt-1 uppercase tracking-wider">
            Payback
          </p>
        </div>
        <div className="bg-teal/5 rounded-xl p-4 text-center border border-teal/10">
          <p className="font-mono-num text-3xl font-bold text-teal">
            {formatROI(results.roiAnual)}
          </p>
          <p className="text-[10px] font-medium text-text-secondary mt-1 uppercase tracking-wider">
            ROI Anual
          </p>
        </div>
      </div>
    </div>
  );
}
