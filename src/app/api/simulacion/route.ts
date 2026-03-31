import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Return a mock response if Supabase is not configured
      const mockId = crypto.randomUUID();
      return NextResponse.json({
        id: mockId,
        url: `/simulador?id=${mockId}`,
        note: 'Supabase no configurado — simulación no persistida',
      });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/simulaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        nombre_simulacion: body.nombre_simulacion,
        cliente: 'Mystic Foods',
        ventas_mensuales: body.ventasMensuales,
        costo_alimentos_pct: body.costoAlimentosPct,
        ticket_promedio: body.ticketPromedio,
        varianza_avt_actual: body.varianzaAvtActual,
        merma_transito: body.mermaTransito,
        disponibilidad_carta: body.disponibilidadCarta,
        horas_manual_dia: body.horasManualDia,
        costo_hora_hombre: body.costoHoraHombre,
        sobrecompra_pct: body.sobrecompraPct,
        sustitucion_pct: body.sustitucionPct,
        suscripcion_mensual: body.suscripcionMensual,
        s1_activa: body.s1_activa,
        s2_activa: body.s2_activa,
        s3_activa: body.s3_activa,
        s4_activa: body.s4_activa,
        perdida_manual_mensual: body.perdida_manual_mensual,
        valor_neto_mensual: body.valor_neto_mensual,
        payback_dias: body.payback_dias,
        roi_anual: body.roi_anual,
        inversion_total: body.inversion_total,
      }),
    });

    const data = await res.json();
    const record = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      id: record.id,
      url: `/simulador?id=${record.id}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al guardar la simulación' },
      { status: 500 }
    );
  }
}
