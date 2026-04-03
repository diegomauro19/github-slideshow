import { NextRequest, NextResponse } from 'next/server';
import { flowMetrics } from '@/data/mock/metrics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const local = searchParams.get('local');
    const categoria = searchParams.get('categoria');

    let filtered = [...flowMetrics];

    if (local) {
      filtered = filtered.filter((m) => m.local.toLowerCase().includes(local.toLowerCase()));
    }
    if (categoria) {
      filtered = filtered.filter((m) => m.categoria === categoria);
    }

    const totalSaltos = filtered.reduce((sum, m) => sum + m.saltos, 0);

    return NextResponse.json({
      metrics: filtered,
      total: filtered.length,
      totalSaltos,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching metrics' }, { status: 500 });
  }
}
