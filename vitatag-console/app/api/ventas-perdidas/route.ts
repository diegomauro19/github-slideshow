import { NextRequest, NextResponse } from 'next/server';
import { lostSalesData, lostSalesTable, lostSalesDaily } from '@/data/mock/predictions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const period = searchParams.get('period');

    let filteredDaily = [...lostSalesDaily];

    if (period === '7d') {
      filteredDaily = filteredDaily.slice(-7);
    } else if (period === '14d') {
      filteredDaily = filteredDaily.slice(-14);
    }

    return NextResponse.json({
      summary: lostSalesData,
      table: lostSalesTable,
      daily: filteredDaily,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching ventas perdidas' }, { status: 500 });
  }
}
