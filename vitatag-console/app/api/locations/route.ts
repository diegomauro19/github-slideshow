import { NextResponse } from 'next/server';
import { locations, CDP_LOCATION } from '@/data/mock/locations';

export async function GET() {
  try {
    return NextResponse.json({ locations, cdp: CDP_LOCATION });
  } catch {
    return NextResponse.json({ error: 'Error fetching locations' }, { status: 500 });
  }
}
