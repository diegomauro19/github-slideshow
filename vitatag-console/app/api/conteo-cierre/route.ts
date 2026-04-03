import { NextRequest, NextResponse } from 'next/server';
import { conteoItems, conteoHistorico } from '@/data/mock/conteo-cierre';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pdv = searchParams.get('pdv');
    const fecha = searchParams.get('fecha');

    let filteredHistorico = [...conteoHistorico];

    if (pdv) {
      filteredHistorico = filteredHistorico.filter((c) => c.pdv === pdv);
    }
    if (fecha) {
      filteredHistorico = filteredHistorico.filter((c) => c.fecha === fecha);
    }

    const contados = conteoItems.filter((i) => i.status === 'contado').length;
    const pendientes = conteoItems.filter((i) => i.status === 'pendiente').length;

    return NextResponse.json({
      items: conteoItems,
      historico: filteredHistorico,
      stats: { total: conteoItems.length, contados, pendientes },
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching conteo data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = {
      id: `ch-${Date.now()}`,
      fecha: new Date().toISOString().split('T')[0],
      status: 'Completado' as const,
      ...body,
    };
    return NextResponse.json({ conteo: result }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error submitting conteo' }, { status: 500 });
  }
}
