export interface DishAvailability {
  id: string;
  name: string;
  category: string;
  status: 'disponible' | 'limitado' | 'no_disponible';
  porcionesDisponibles: number;
  ingredienteLimitante?: string;
  seAgotaA?: string;
  ventasPerdidas?: number;
}

export const disponibilidadOliviaLaureles: DishAvailability[] = [
  { id: 'da-01', name: 'Pasta Bolognesa', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 85 },
  { id: 'da-02', name: 'Pasta Alfredo con Pollo', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 72 },
  { id: 'da-03', name: 'Pizza Margherita', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 35 },
  { id: 'da-04', name: 'Bowl de Salmón', category: 'Plato Fuerte', status: 'no_disponible', porcionesDisponibles: 0, ingredienteLimitante: 'Salmón Fresco', ventasPerdidas: 380000 },
  { id: 'da-05', name: 'Bowl Buddha Veggie', category: 'Plato Fuerte', status: 'limitado', porcionesDisponibles: 8, ingredienteLimitante: 'Rúgula', seAgotaA: '6:00 PM' },
  { id: 'da-06', name: 'Ensalada César', category: 'Entrada', status: 'limitado', porcionesDisponibles: 12, ingredienteLimitante: 'Queso Parmesano', seAgotaA: '8:00 PM' },
  { id: 'da-07', name: 'Risotto de Hongos', category: 'Plato Fuerte', status: 'limitado', porcionesDisponibles: 15, ingredienteLimitante: 'Queso Parmesano', seAgotaA: '9:00 PM' },
  { id: 'da-08', name: 'Lasagna Clásica', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 22 },
  { id: 'da-09', name: 'Carpaccio de Res', category: 'Entrada', status: 'limitado', porcionesDisponibles: 6, ingredienteLimitante: 'Rúgula', seAgotaA: '5:00 PM' },
  { id: 'da-10', name: 'Filete de Res con Pimienta', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 18 },
  { id: 'da-11', name: 'Sashimi Variado', category: 'Entrada', status: 'no_disponible', porcionesDisponibles: 0, ingredienteLimitante: 'Salmón Fresco', ventasPerdidas: 245000 },
  { id: 'da-12', name: 'Volcán de Chocolate', category: 'Postre', status: 'disponible', porcionesDisponibles: 15 },
  { id: 'da-13', name: 'Torta de Queso Vasca', category: 'Postre', status: 'disponible', porcionesDisponibles: 12 },
  { id: 'da-14', name: 'Pasta Pesto', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 28 },
  { id: 'da-15', name: 'Ravioli de Carne', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 18 },
  { id: 'da-16', name: 'Crema de Tomate', category: 'Entrada', status: 'disponible', porcionesDisponibles: 25 },
  { id: 'da-17', name: 'Tartare de Salmón', category: 'Entrada', status: 'no_disponible', porcionesDisponibles: 0, ingredienteLimitante: 'Salmón Fresco', ventasPerdidas: 156000 },
  { id: 'da-18', name: 'Nigiri Especial', category: 'Entrada', status: 'no_disponible', porcionesDisponibles: 0, ingredienteLimitante: 'Salmón Fresco', ventasPerdidas: 120000 },
  { id: 'da-19', name: 'Bruschetta de Tomate', category: 'Entrada', status: 'disponible', porcionesDisponibles: 20 },
  { id: 'da-20', name: 'Tiramisu', category: 'Postre', status: 'disponible', porcionesDisponibles: 10 },
  { id: 'da-21', name: 'Pasta Carbonara', category: 'Plato Fuerte', status: 'limitado', porcionesDisponibles: 10, ingredienteLimitante: 'Queso Parmesano', seAgotaA: '7:30 PM' },
];

export const disponibilidadClapLaureles: DishAvailability[] = [
  { id: 'da-c01', name: 'Hamburguesa Clásica', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 45 },
  { id: 'da-c02', name: 'Hamburguesa Veggie', category: 'Plato Fuerte', status: 'limitado', porcionesDisponibles: 8, ingredienteLimitante: 'Rúgula', seAgotaA: '6:00 PM' },
  { id: 'da-c03', name: 'Chicken Wings', category: 'Entrada', status: 'disponible', porcionesDisponibles: 40 },
  { id: 'da-c04', name: 'Loaded Fries', category: 'Acompañamiento', status: 'disponible', porcionesDisponibles: 55 },
  { id: 'da-c05', name: 'Milkshake Clásico', category: 'Bebida', status: 'disponible', porcionesDisponibles: 30 },
  { id: 'da-c06', name: 'Hamburguesa BBQ', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 38 },
  { id: 'da-c07', name: 'Nachos Supreme', category: 'Entrada', status: 'disponible', porcionesDisponibles: 28 },
  { id: 'da-c08', name: 'Hot Dog Clásico', category: 'Plato Fuerte', status: 'disponible', porcionesDisponibles: 32 },
  { id: 'da-c09', name: 'Onion Rings', category: 'Acompañamiento', status: 'disponible', porcionesDisponibles: 42 },
  { id: 'da-c10', name: 'Milkshake Oreo', category: 'Bebida', status: 'disponible', porcionesDisponibles: 25 },
  { id: 'da-c11', name: 'Hamburguesa Doble', category: 'Plato Fuerte', status: 'limitado', porcionesDisponibles: 12, ingredienteLimitante: 'Tocineta', seAgotaA: '8:00 PM' },
  { id: 'da-c12', name: 'Ensalada Clap', category: 'Entrada', status: 'disponible', porcionesDisponibles: 20 },
];

export const disponibilidadByPdv: Record<string, DishAvailability[]> = {
  'Olivia Laureles': disponibilidadOliviaLaureles,
  'Clap Laureles': disponibilidadClapLaureles,
};
