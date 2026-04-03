import { NextRequest, NextResponse } from 'next/server';
import { predictions, lostSalesData } from '@/data/mock/predictions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');

    let filtered = [...predictions];

    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }

    return NextResponse.json({
      predictions: filtered,
      lostSales: lostSalesData,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching predictions' }, { status: 500 });
  }
}
