import { NextRequest, NextResponse } from 'next/server';
import { movements } from '@/data/mock/movements';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const date = searchParams.get('date');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    let filtered = [...movements];

    if (date) {
      filtered = filtered.filter((m) => m.timestamp.startsWith(date));
    }
    if (type) {
      filtered = filtered.filter((m) => m.type === type);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.product.toLowerCase().includes(q) ||
          m.productCode.toLowerCase().includes(q) ||
          m.user.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      movements: filtered,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching movements' }, { status: 500 });
  }
}
