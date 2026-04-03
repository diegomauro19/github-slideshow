import { NextRequest, NextResponse } from 'next/server';
import { returns } from '@/data/mock/returns';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const reason = searchParams.get('reason');
    const local = searchParams.get('local');

    let filtered = [...returns];

    if (status) {
      filtered = filtered.filter((r) => r.status === status);
    }
    if (reason) {
      filtered = filtered.filter((r) => r.reason === reason);
    }
    if (local) {
      filtered = filtered.filter((r) => r.local.toLowerCase().includes(local.toLowerCase()));
    }

    const totalValue = filtered.reduce((sum, r) => sum + r.value, 0);

    return NextResponse.json({
      returns: filtered,
      total: filtered.length,
      totalValue,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching returns' }, { status: 500 });
  }
}
