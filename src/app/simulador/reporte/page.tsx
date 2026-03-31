'use client';

import { useState, useMemo } from 'react';
import { SimulationInputs } from '@/lib/types';
import { SOLUTIONS } from '@/lib/solutions';
import { PARAMETERS } from '@/lib/parameters';
import { calculateSimulation } from '@/lib/calculator';
import {
  formatCurrencyShort,
  formatCurrencyFull,
  formatDays,
  formatROI,
  formatValue,
} from '@/lib/format';

function getDefaultInputs(): SimulationInputs {
  const inputs: Record<string, number> = {};
  PARAMETERS.forEach((p) => {
    inputs[p.key] = p.default;
  });
  return inputs as unknown as SimulationInputs;
}

export default function ReportePage() {
  const [inputs] = useState<SimulationInputs>(getDefaultInputs);
  // For the report, activate all solutions by default
  const activeSolutions = SOLUTIONS;
  const results = useMemo(
    () => calculateSimulation(inputs, activeSolutions),
    [inputs, activeSolutions]
  );

  const rows = [
    { label: 'Varianza AvT', manual: results.perdidaAvtManual, proposed: results.perdidaAvtPropuesto, saving: results.ahorroAvt },
    { label: 'Merma en tránsito', manual: results.perdidaTransitoManual, proposed: results.perdidaTransitoPropuesto, saving: results.ahorroTransito },
    { label: 'Ventas perdidas (disponibilidad)', manual: results.perdidaDisponibilidadManual, proposed: results.perdidaDisponibilidadPropuesto, saving: results.ahorroDisponibilidad },
    { label: 'Costo horas manuales', manual: results.costoHorasManual, proposed: results.costoHorasPropuesto, saving: results.ahorroHoras },
    { label: 'Sobrecompra', manual: results.perdidaSobrecompraManual, proposed: results.perdidaSobrecompraPropuesto, saving: results.ahorroSobrecompra },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Print button */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="bg-accent text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:bg-accent/90 transition-colors"
        >
          Imprimir como PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 pb-6 border-b-2 border-navy">
          <div>
            <div className="font-heading font-bold text-navy leading-none mb-4">
              <div className="text-2xl">Winter</div>
              <div className="text-2xl">
                Kpital<span className="text-xs align-super">®</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary">Lorax × Winter Kpital</p>
          </div>
          <div className="text-right">
            <h1 className="font-heading font-bold text-xl text-navy mb-1">
              Simulador de Impacto Operativo
            </h1>
            <p className="text-sm text-text-secondary">Mystic Foods — Medellín, Colombia</p>
            <p className="text-xs text-text-secondary mt-1">
              Fecha: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Soluciones Activas */}
        <section className="mb-10">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            Soluciones Incluidas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {activeSolutions.map((sol) => (
              <div
                key={sol.id}
                className="border-2 rounded-xl p-4"
                style={{ borderColor: sol.color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{sol.icon}</span>
                  <span className="font-heading font-semibold text-sm">{sol.name}</span>
                  <span
                    className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${sol.color}15`, color: sol.color }}
                  >
                    {sol.type}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{sol.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* KPIs */}
        <section className="mb-10">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            Indicadores Clave
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-positive/5 rounded-xl p-4 text-center border border-positive/20">
              <p className="font-mono-num text-2xl font-bold text-positive">
                {formatCurrencyShort(results.valorNetoMensual)}
              </p>
              <p className="text-[10px] text-text-secondary mt-1">Valor Neto / Mes</p>
            </div>
            <div className="bg-accent/5 rounded-xl p-4 text-center border border-accent/20">
              <p className="font-mono-num text-2xl font-bold text-accent">
                {formatDays(results.paybackDias)}
              </p>
              <p className="text-[10px] text-text-secondary mt-1">Payback</p>
            </div>
            <div className="bg-teal/5 rounded-xl p-4 text-center border border-teal/20">
              <p className="font-mono-num text-2xl font-bold text-teal">
                {formatCurrencyShort(results.valorNetoAnual)}
              </p>
              <p className="text-[10px] text-text-secondary mt-1">Valor Neto Anual</p>
            </div>
            <div className="bg-navy/5 rounded-xl p-4 text-center border border-navy/20">
              <p className="font-mono-num text-2xl font-bold text-navy">
                {formatROI(results.roiAnual)}
              </p>
              <p className="text-[10px] text-text-secondary mt-1">ROI Anual</p>
            </div>
          </div>
        </section>

        {/* Parámetros */}
        <section className="mb-10">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            Parámetros de Entrada
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {PARAMETERS.map((p) => (
              <div key={p.key} className="flex justify-between items-baseline py-1.5 border-b border-gray-100">
                <span className="text-xs text-text-secondary">{p.label}</span>
                <span className="font-mono-num text-sm font-semibold text-text-primary">
                  {formatValue(inputs[p.key], p.format)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tabla Económica */}
        <section className="mb-10 print-break">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            Desglose Económico Mensual
          </h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-navy">
                <th className="text-left py-2 text-xs font-heading font-semibold">Fuente de pérdida</th>
                <th className="text-right py-2 text-xs font-heading font-semibold">Manual</th>
                <th className="text-right py-2 text-xs font-heading font-semibold">Con soluciones</th>
                <th className="text-right py-2 text-xs font-heading font-semibold">Ahorro</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 text-xs">{row.label}</td>
                  <td className="py-2 text-right font-mono-num text-xs text-negative">{formatCurrencyFull(row.manual)}</td>
                  <td className="py-2 text-right font-mono-num text-xs text-amber">{formatCurrencyFull(row.proposed)}</td>
                  <td className="py-2 text-right font-mono-num text-xs text-positive font-semibold">{formatCurrencyFull(row.saving)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-navy font-bold">
                <td className="py-2 text-xs font-heading">TOTAL MENSUAL</td>
                <td className="py-2 text-right font-mono-num text-sm text-negative">{formatCurrencyFull(results.totalPerdidaManual)}</td>
                <td className="py-2 text-right font-mono-num text-sm text-amber">{formatCurrencyFull(results.totalPerdidaPropuesto)}</td>
                <td className="py-2 text-right font-mono-num text-sm text-positive">{formatCurrencyFull(results.totalAhorroBruto)}</td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Contrafactuales */}
        <section className="mb-10">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            Análisis Contrafactual — 12 Meses
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="border-2 border-negative/30 rounded-xl p-5">
              <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-negative" />
                Sin intervención
              </h3>
              <p className="font-mono-num text-3xl font-bold text-negative mb-1">
                {formatCurrencyShort(results.perdidaAnualManual)}
              </p>
              <p className="text-xs text-text-secondary">Pérdida acumulada anual</p>
            </div>
            <div className="border-2 border-positive/30 rounded-xl p-5">
              <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-positive" />
                Con soluciones
              </h3>
              <p className="font-mono-num text-3xl font-bold text-positive mb-1">
                {formatCurrencyShort(results.valorNetoAnual)}
              </p>
              <p className="text-xs text-text-secondary">Valor neto recuperado anual</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center py-3 bg-gray-50 rounded-xl">
              <p className="font-mono-num text-xl font-bold text-accent">{results.multiplicador}×</p>
              <p className="text-[10px] text-text-secondary">Multiplicador</p>
            </div>
            <div className="text-center py-3 bg-gray-50 rounded-xl">
              <p className="font-mono-num text-xl font-bold text-positive">{formatDays(results.paybackDias)}</p>
              <p className="text-[10px] text-text-secondary">Payback</p>
            </div>
            <div className="text-center py-3 bg-gray-50 rounded-xl">
              <p className="font-mono-num text-xl font-bold text-teal">{formatROI(results.roiAnual)}</p>
              <p className="text-[10px] text-text-secondary">ROI Anual</p>
            </div>
          </div>
        </section>

        {/* Inversión */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            Estructura de Inversión
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Inversión Inicial (Hardware)</p>
              <p className="font-mono-num text-xl font-bold">{formatCurrencyFull(results.inversionHw)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Inversión Inicial (Software)</p>
              <p className="font-mono-num text-xl font-bold">{formatCurrencyFull(results.inversionSw)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Suscripción Mensual</p>
              <p className="font-mono-num text-xl font-bold text-accent">{formatCurrencyFull(results.costoSuscripcionMensual)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Consumibles Mensual</p>
              <p className="font-mono-num text-xl font-bold">{formatCurrencyFull(results.costoConsumablesMensual)}</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-navy pt-4 flex justify-between items-center">
          <div className="font-heading font-bold text-navy leading-none">
            <span className="text-sm">Winter Kpital</span>
            <span className="text-[8px] align-super">®</span>
            <span className="text-xs font-normal text-text-secondary ml-2">+ Lorax</span>
          </div>
          <p className="text-[10px] text-text-secondary">
            Documento confidencial · Mystic Foods · 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
