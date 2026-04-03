import { NextRequest, NextResponse } from 'next/server';
import { alerts, alertThresholds } from '@/data/mock/alerts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get('type');

    let filtered = [...alerts];

    if (type) {
      filtered = filtered.filter((a) => a.type === type);
    }

    return NextResponse.json({
      alerts: filtered,
      thresholds: alertThresholds,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching alerts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newAlert = {
      id: `a-${Date.now()}`,
      timestamp: new Date().toISOString(),
      timeAgo: 'Justo ahora',
      ...body,
    };
    return NextResponse.json({ alert: newAlert }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating alert' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedThresholds = { ...alertThresholds, ...body };
    return NextResponse.json({ thresholds: updatedThresholds });
  } catch {
    return NextResponse.json({ error: 'Error updating thresholds' }, { status: 500 });
  }
}
