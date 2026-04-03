import { NextRequest, NextResponse } from 'next/server';
import { devices } from '@/data/mock/devices';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const location = searchParams.get('location');

    let filtered = [...devices];

    if (type) {
      filtered = filtered.filter((d) => d.type === type);
    }
    if (status) {
      filtered = filtered.filter((d) => d.status === status);
    }
    if (location) {
      filtered = filtered.filter((d) => d.location.toLowerCase().includes(location.toLowerCase()));
    }

    return NextResponse.json({
      devices: filtered,
      total: filtered.length,
      online: devices.filter((d) => d.status === 'online').length,
      offline: devices.filter((d) => d.status === 'offline').length,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching devices' }, { status: 500 });
  }
}
