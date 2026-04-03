import { NextRequest, NextResponse } from 'next/server';
import { orders, ORDER_STATS, ordersByLocal } from '@/data/mock/orders';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const local = searchParams.get('local');
    const date = searchParams.get('date');
    const search = searchParams.get('search');

    let filtered = [...orders];

    if (local) {
      filtered = filtered.filter((o) => o.sucursalId === local || o.sucursal === local);
    }
    if (date) {
      filtered = filtered.filter((o) => o.fecha === date);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.descripcion.toLowerCase().includes(q) ||
          o.referencia.toLowerCase().includes(q) ||
          o.numPedido.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      orders: filtered,
      stats: ORDER_STATS,
      byLocal: ordersByLocal,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}
