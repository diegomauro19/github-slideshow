import { NextRequest, NextResponse } from 'next/server';
import { recipes } from '@/data/mock/recipes';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
    return NextResponse.json({ recipe });
  } catch {
    return NextResponse.json({ error: 'Error fetching recipe' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
    const body = await request.json();
    const updated = { ...recipe, ...body, lastUpdated: new Date().toISOString().split('T')[0] };
    return NextResponse.json({ recipe: updated });
  } catch {
    return NextResponse.json({ error: 'Error updating recipe' }, { status: 500 });
  }
}
