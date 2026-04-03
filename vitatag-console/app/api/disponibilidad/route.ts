import { NextRequest, NextResponse } from 'next/server';
import { disponibilidadByPdv, disponibilidadOliviaLaureles } from '@/data/mock/disponibilidad';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pdv = searchParams.get('pdv');

    if (pdv && disponibilidadByPdv[pdv]) {
      const dishes = disponibilidadByPdv[pdv];
      const disponibles = dishes.filter((d) => d.status === 'disponible').length;
      const limitados = dishes.filter((d) => d.status === 'limitado').length;
      const noDisponibles = dishes.filter((d) => d.status === 'no_disponible').length;

      return NextResponse.json({
        dishes,
        stats: { total: dishes.length, disponibles, limitados, noDisponibles },
      });
    }

    // Default to Olivia Laureles
    const dishes = disponibilidadOliviaLaureles;
    const disponibles = dishes.filter((d) => d.status === 'disponible').length;
    const limitados = dishes.filter((d) => d.status === 'limitado').length;
    const noDisponibles = dishes.filter((d) => d.status === 'no_disponible').length;

    return NextResponse.json({
      dishes,
      pdvs: Object.keys(disponibilidadByPdv),
      stats: { total: dishes.length, disponibles, limitados, noDisponibles },
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching disponibilidad' }, { status: 500 });
  }
}
