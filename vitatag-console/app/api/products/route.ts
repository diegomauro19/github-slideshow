import { NextRequest, NextResponse } from 'next/server';
import { products, PRODUCT_STATS } from '@/data/mock/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const familia = searchParams.get('familia');
    const estado = searchParams.get('estado');
    const search = searchParams.get('search');
    const centroCosto = searchParams.get('centroCosto');

    let filtered = [...products];

    if (familia) {
      filtered = filtered.filter((p) => p.familia === familia);
    }
    if (estado) {
      filtered = filtered.filter((p) => p.estado === estado);
    }
    if (centroCosto) {
      filtered = filtered.filter((p) => p.centroCosto === centroCosto);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.internalCode.includes(q) ||
          p.reference.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ products: filtered, stats: PRODUCT_STATS, total: filtered.length });
  } catch {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}
