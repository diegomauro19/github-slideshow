import { Solution, SimulationInputs, SimulationResults } from './types';

const DAYS_PER_MONTH = 30;

export function calculateSimulation(
  inputs: SimulationInputs,
  activeSolutions: Solution[]
): SimulationResults {
  // 1. Calculate combined impact factors (multiplicative)
  let avtFactor = 1.0;
  let transitFactor = 1.0;
  let dispBonus = 0;
  let horasFactor = 1.0;
  let sobrecompraFactor = 1.0;

  activeSolutions.forEach((sol) => {
    avtFactor *= sol.impacts.avtReduction;
    transitFactor *= sol.impacts.transitReduction;
    dispBonus += sol.impacts.dispImprovement;
    horasFactor *= sol.impacts.horasReduction;
    sobrecompraFactor *= sol.impacts.sobrecompraReduction;
  });

  // 2. Calculate base values
  const costoAlimentos = inputs.ventasMensuales * inputs.costoAlimentosPct;

  // 3. MANUAL scenario losses
  const perdidaAvtManual = costoAlimentos * inputs.varianzaAvtActual;
  const perdidaTransitoManual = costoAlimentos * inputs.mermaTransito;

  // Disponibilidad: platos no vendidos por falta de disponibilidad
  // (1 - disponibilidad) = % de veces que no hay el plato
  // sustitucionPct = % que pide otra cosa (no se pierde)
  // (1 - sustitucionPct) = % que se va sin comprar
  const tasaNoDisponible = 1 - inputs.disponibilidadCarta;
  const perdidaDisponibilidadManual =
    inputs.ventasMensuales * tasaNoDisponible * (1 - inputs.sustitucionPct);

  const costoHorasManual =
    inputs.horasManualDia * inputs.costoHoraHombre * DAYS_PER_MONTH;

  const perdidaSobrecompraManual = costoAlimentos * inputs.sobrecompraPct;

  const totalPerdidaManual =
    perdidaAvtManual +
    perdidaTransitoManual +
    perdidaDisponibilidadManual +
    costoHorasManual +
    perdidaSobrecompraManual;

  // 4. PROPOSED scenario (with solutions)
  const newAvt = inputs.varianzaAvtActual * avtFactor;
  const newTransit = inputs.mermaTransito * transitFactor;
  const newDisp = Math.min(0.99, inputs.disponibilidadCarta + dispBonus);
  const newHoras = inputs.horasManualDia * horasFactor;
  const newSobrecompra = inputs.sobrecompraPct * sobrecompraFactor;

  const perdidaAvtPropuesto = costoAlimentos * newAvt;
  const perdidaTransitoPropuesto = costoAlimentos * newTransit;

  const tasaNoDisponiblePropuesto = 1 - newDisp;
  const perdidaDisponibilidadPropuesto =
    inputs.ventasMensuales * tasaNoDisponiblePropuesto * (1 - inputs.sustitucionPct);

  const costoHorasPropuesto =
    newHoras * inputs.costoHoraHombre * DAYS_PER_MONTH;

  const perdidaSobrecompraPropuesto = costoAlimentos * newSobrecompra;

  const totalPerdidaPropuesto =
    perdidaAvtPropuesto +
    perdidaTransitoPropuesto +
    perdidaDisponibilidadPropuesto +
    costoHorasPropuesto +
    perdidaSobrecompraPropuesto;

  // 5. Savings
  const ahorroAvt = perdidaAvtManual - perdidaAvtPropuesto;
  const ahorroTransito = perdidaTransitoManual - perdidaTransitoPropuesto;
  const ahorroDisponibilidad = perdidaDisponibilidadManual - perdidaDisponibilidadPropuesto;
  const ahorroHoras = costoHorasManual - costoHorasPropuesto;
  const ahorroSobrecompra = perdidaSobrecompraManual - perdidaSobrecompraPropuesto;
  const totalAhorroBruto =
    ahorroAvt + ahorroTransito + ahorroDisponibilidad + ahorroHoras + ahorroSobrecompra;

  // 6. Investment
  const inversionHw = activeSolutions.reduce((sum, s) => sum + s.hwCost, 0);
  const inversionSw = activeSolutions.reduce((sum, s) => sum + s.swCost, 0);
  const costoConsumablesMensual = activeSolutions.reduce(
    (sum, s) => sum + s.consumableMonthly, 0
  );

  // Subscription is charged once if any solution is active
  const costoSuscripcionMensual =
    activeSolutions.length > 0 ? inputs.suscripcionMensual : 0;

  const inversionTotalInicial = inversionHw + inversionSw;
  const costoOperativoMensual = costoConsumablesMensual + costoSuscripcionMensual;

  // 7. KPIs
  const valorNetoMensual = totalAhorroBruto - costoOperativoMensual;
  const paybackDias =
    valorNetoMensual > 0
      ? Math.ceil((inversionTotalInicial / valorNetoMensual) * DAYS_PER_MONTH)
      : 9999;

  const valorNetoAnual = valorNetoMensual * 12;
  const roiAnual =
    inversionTotalInicial > 0
      ? ((valorNetoAnual - inversionTotalInicial) / inversionTotalInicial) * 100
      : 0;

  const perdidaAnualManual = totalPerdidaManual * 12;
  const costoAnualSoluciones = inversionTotalInicial + costoOperativoMensual * 12;
  const multiplicador =
    costoAnualSoluciones > 0
      ? Math.round(valorNetoAnual / costoAnualSoluciones)
      : 0;

  return {
    perdidaAvtManual,
    perdidaTransitoManual,
    perdidaDisponibilidadManual,
    costoHorasManual,
    perdidaSobrecompraManual,
    totalPerdidaManual,

    perdidaAvtPropuesto,
    perdidaTransitoPropuesto,
    perdidaDisponibilidadPropuesto,
    costoHorasPropuesto,
    perdidaSobrecompraPropuesto,
    totalPerdidaPropuesto,

    ahorroAvt,
    ahorroTransito,
    ahorroDisponibilidad,
    ahorroHoras,
    ahorroSobrecompra,
    totalAhorroBruto,

    inversionHw,
    inversionSw,
    costoConsumablesMensual,
    costoSuscripcionMensual,
    inversionTotalInicial,
    costoOperativoMensual,

    valorNetoMensual,
    paybackDias,
    roiAnual,
    multiplicador,

    perdidaAnualManual,
    valorNetoAnual,
  };
}
