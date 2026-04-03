import { NextRequest, NextResponse } from 'next/server';
import { recipes } from '@/data/mock/recipes';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let filtered = [...recipes];

    if (category) {
      filtered = filtered.filter((r) => r.category === category);
    }
    if (brand) {
      filtered = filtered.filter((r) => r.brand.includes(brand as 'Olivia' | 'Clap'));
    }
    if (status) {
      filtered = filtered.filter((r) => r.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((r) => r.name.toLowerCase().includes(q));
    }

    return NextResponse.json({ recipes: filtered, total: filtered.length });
  } catch {
    return NextResponse.json({ error: 'Error fetching recipes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newRecipe = {
      id: `rec-${Date.now()}`,
      ...body,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    return NextResponse.json({ recipe: newRecipe }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 });
  }
}
