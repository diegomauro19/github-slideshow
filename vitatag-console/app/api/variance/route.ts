import { NextRequest, NextResponse } from 'next/server';
import { varianceData, varianceDailyTrend, varianceByLocation, VARIANCE_STATS } from '@/data/mock/variance';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pdv = searchParams.get('pdv');
    const period = searchParams.get('period');

    let filteredData = [...varianceData];
    let filteredByLocation = [...varianceByLocation];

    if (pdv) {
      filteredByLocation = filteredByLocation.filter((v) => v.pdv === pdv);
    }

    let filteredTrend = [...varianceDailyTrend];
    if (period === '7d') {
      filteredTrend = filteredTrend.slice(-7);
    } else if (period === '14d') {
      filteredTrend = filteredTrend.slice(-14);
    }

    return NextResponse.json({
      data: filteredData,
      dailyTrend: filteredTrend,
      byLocation: filteredByLocation,
      stats: VARIANCE_STATS,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching variance data' }, { status: 500 });
  }
}
