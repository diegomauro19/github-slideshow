'use client';

import { SimulationResults } from '@/lib/types';
import { formatCurrencyFull } from '@/lib/format';

interface Props {
  results: SimulationResults;
}

export default function EconomicTable({ results }: Props) {
  const rows = [
    {
      label: 'Varianza AvT (consumo teórico vs. real)',
      manual: results.perdidaAvtManual,
      proposed: results.perdidaAvtPropuesto,
      saving: results.ahorroAvt,
    },
    {
      label: 'Merma en tránsito (CDP → PdV)',
      manual: results.perdidaTransitoManual,
      proposed: results.perdidaTransitoPropuesto,
      saving: results.ahorroTransito,
    },
    {
      label: 'Ventas perdidas por disponibilidad',
      manual: results.perdidaDisponibilidadManual,
      proposed: results.perdidaDisponibilidadPropuesto,
      saving: results.ahorroDisponibilidad,
    },
    {
      label: 'Costo horas manuales',
      manual: results.costoHorasManual,
      proposed: results.costoHorasPropuesto,
      saving: results.ahorroHoras,
    },
    {
      label: 'Sobrecompra de inventario',
      manual: results.perdidaSobrecompraManual,
      proposed: results.perdidaSobrecompraPropuesto,
      saving: results.ahorroSobrecompra,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <h3 className="font-heading font-semibold text-sm text-text-primary">
          Desglose Económico Mensual
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-text-secondary">
              <th className="text-left py-2.5 px-4 font-medium">Fuente de pérdida</th>
              <th className="text-right py-2.5 px-4 font-medium">Manual</th>
              <th className="text-right py-2.5 px-4 font-medium">Con soluciones</th>
              <th className="text-right py-2.5 px-4 font-medium">Ahorro</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-2.5 px-4 text-xs text-text-primary">{row.label}</td>
                <td className="py-2.5 px-4 text-right font-mono-num text-xs text-negative font-medium">
                  {formatCurrencyFull(row.manual)}
                </td>
                <td className="py-2.5 px-4 text-right font-mono-num text-xs text-amber font-medium">
                  {formatCurrencyFull(row.proposed)}
                </td>
                <td className="py-2.5 px-4 text-right font-mono-num text-xs text-positive font-semibold">
                  {formatCurrencyFull(row.saving)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50/80">
              <td className="py-3 px-4 font-heading font-semibold text-xs text-text-primary">
                TOTAL MENSUAL
              </td>
              <td className="py-3 px-4 text-right font-mono-num text-sm text-negative font-bold">
                {formatCurrencyFull(results.totalPerdidaManual)}
              </td>
              <td className="py-3 px-4 text-right font-mono-num text-sm text-amber font-bold">
                {formatCurrencyFull(results.totalPerdidaPropuesto)}
              </td>
              <td className="py-3 px-4 text-right font-mono-num text-sm text-positive font-bold">
                {formatCurrencyFull(results.totalAhorroBruto)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
