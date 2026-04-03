import { NextResponse } from 'next/server';
import { patterns, heatmapData, PATTERN_STATS } from '@/data/mock/patterns';

export async function GET() {
  try {
    return NextResponse.json({
      patterns,
      heatmap: heatmapData,
      stats: PATTERN_STATS,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching patterns' }, { status: 500 });
  }
}
