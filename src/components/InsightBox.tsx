'use client';

import { Solution, SimulationResults } from '@/lib/types';
import { formatCurrencyShort, formatDays, formatROI } from '@/lib/format';

interface Props {
  results: SimulationResults;
  activeSolutions: Solution[];
}

export default function InsightBox({ results, activeSolutions }: Props) {
  if (activeSolutions.length === 0) {
    return (
      <div className="bg-navy rounded-xl p-6 text-white/80">
        <h3 className="font-heading font-semibold text-base text-white mb-3">
          Resumen Ejecutivo
        </h3>
        <p className="text-sm leading-relaxed">
          Active al menos una solución para ver el análisis de impacto económico.
          Use los toggles del panel izquierdo para explorar diferentes combinaciones.
        </p>
      </div>
    );
  }

  const solutionNames = activeSolutions.map((s) => s.shortName).join(', ');
  const hasHw = activeSolutions.some((s) => s.hwCost > 0);
  const hasSw = activeSolutions.some((s) => s.swCost > 0);

  return (
    <div className="bg-navy rounded-xl p-6 text-white/90">
      <h3 className="font-heading font-semibold text-base text-white mb-3">
        Resumen Ejecutivo
      </h3>
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          Con la implementación de <strong className="text-white">{solutionNames}</strong>,
          Mystic Foods recuperaría{' '}
          <strong className="text-mint font-mono-num">
            {formatCurrencyShort(results.valorNetoMensual)}
          </strong>{' '}
          netos cada mes, después de descontar todos los costos operativos de la plataforma.
        </p>

        <p>
          La inversión inicial de{' '}
          <strong className="font-mono-num text-white">
            {formatCurrencyShort(results.inversionTotalInicial)}
          </strong>
          {hasHw && hasSw && (
            <span className="text-white/60">
              {' '}
              ({formatCurrencyShort(results.inversionHw)} en hardware +{' '}
              {formatCurrencyShort(results.inversionSw)} en software)
            </span>
          )}
          {' '}se recupera en{' '}
          <strong className="text-mint font-mono-num">
            {formatDays(results.paybackDias)}
          </strong>
          , con un ROI anual del{' '}
          <strong className="text-mint font-mono-num">
            {formatROI(results.roiAnual)}
          </strong>.
        </p>

        <div className="pt-2 mt-2 border-t border-white/10">
          <p className="text-white/50 text-xs">
            <strong className="text-amber">Costo de no hacer nada:</strong>{' '}
            Mystic Foods pierde{' '}
            <span className="font-mono-num text-white/70">
              {formatCurrencyShort(results.perdidaAnualManual)}
            </span>{' '}
            al año en ineficiencias operativas que estas soluciones pueden capturar.
          </p>
        </div>
      </div>
    </div>
  );
}
