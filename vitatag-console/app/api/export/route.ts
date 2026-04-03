import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/mock/products';
import { orders } from '@/data/mock/orders';
import { recipes } from '@/data/mock/recipes';
import { varianceData } from '@/data/mock/variance';
import { movements } from '@/data/mock/movements';
import { returns } from '@/data/mock/returns';
import { devices } from '@/data/mock/devices';

function toCsv(data: Record<string, unknown>[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
      return `"${str.replace(/"/g, '""')}"`;
    }).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get('type');

    let csv = '';
    let filename = 'export.csv';

    switch (type) {
      case 'products':
        csv = toCsv(products.map(({ distribution, breakdown, ...rest }) => ({
          ...rest,
          distribution: JSON.stringify(distribution),
          breakdown: JSON.stringify(breakdown),
        })));
        filename = 'productos.csv';
        break;
      case 'orders':
        csv = toCsv(orders as unknown as Record<string, unknown>[]);
        filename = 'pedidos.csv';
        break;
      case 'recipes':
        csv = toCsv(recipes.map((r) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          brand: r.brand.join(', '),
          costPerPortion: r.costPerPortion,
          status: r.status,
          lastUpdated: r.lastUpdated,
          ingredientCount: r.ingredients.length,
        })));
        filename = 'recetas.csv';
        break;
      case 'variance':
        csv = toCsv(varianceData as unknown as Record<string, unknown>[]);
        filename = 'varianza.csv';
        break;
      case 'movements':
        csv = toCsv(movements as unknown as Record<string, unknown>[]);
        filename = 'movimientos.csv';
        break;
      case 'returns':
        csv = toCsv(returns as unknown as Record<string, unknown>[]);
        filename = 'devoluciones.csv';
        break;
      case 'devices':
        csv = toCsv(devices as unknown as Record<string, unknown>[]);
        filename = 'dispositivos.csv';
        break;
      default:
        return NextResponse.json({ error: 'Invalid export type. Use: products, orders, recipes, variance, movements, returns, devices' }, { status: 400 });
    }

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Error exporting data' }, { status: 500 });
  }
}
