export interface Solution {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  type: 'HW+SW' | '100% SW';
  color: string;
  description: string;
  hwCost: number;
  swCost: number;
  consumableMonthly: number;
  impacts: {
    avtReduction: number;
    transitReduction: number;
    dispImprovement: number;
    horasReduction: number;
    sobrecompraReduction: number;
  };
}

export interface SimulationInputs {
  ventasMensuales: number;
  costoAlimentosPct: number;
  ticketPromedio: number;
  varianzaAvtActual: number;
  mermaTransito: number;
  disponibilidadCarta: number;
  horasManualDia: number;
  costoHoraHombre: number;
  sobrecompraPct: number;
  sustitucionPct: number;
  suscripcionMensual: number;
}

export interface SimulationResults {
  // Manual losses
  perdidaAvtManual: number;
  perdidaTransitoManual: number;
  perdidaDisponibilidadManual: number;
  costoHorasManual: number;
  perdidaSobrecompraManual: number;
  totalPerdidaManual: number;

  // Proposed losses (with solutions)
  perdidaAvtPropuesto: number;
  perdidaTransitoPropuesto: number;
  perdidaDisponibilidadPropuesto: number;
  costoHorasPropuesto: number;
  perdidaSobrecompraPropuesto: number;
  totalPerdidaPropuesto: number;

  // Savings per source
  ahorroAvt: number;
  ahorroTransito: number;
  ahorroDisponibilidad: number;
  ahorroHoras: number;
  ahorroSobrecompra: number;
  totalAhorroBruto: number;

  // Investment
  inversionHw: number;
  inversionSw: number;
  costoConsumablesMensual: number;
  costoSuscripcionMensual: number;
  inversionTotalInicial: number;
  costoOperativoMensual: number;

  // KPIs
  valorNetoMensual: number;
  paybackDias: number;
  roiAnual: number;
  multiplicador: number;

  // Projections
  perdidaAnualManual: number;
  valorNetoAnual: number;
}

export interface ParameterConfig {
  key: keyof SimulationInputs;
  label: string;
  default: number;
  min: number;
  max: number;
  step: number;
  format: 'currency' | 'percentage' | 'hours';
  sublabel?: string;
  group: 'financiero' | 'operativo';
}
