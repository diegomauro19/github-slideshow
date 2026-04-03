export interface RecipeIngredient {
  id: string;
  name: string;
  vitatagCode: string;
  quantityPerPortion: number;
  unit: string;
  unitCost: number;
  costPerPortion: number;
  currentStock: number;
  stockUnit: string;
  stockStatus: 'ok' | 'warning' | 'critical';
}

export interface Recipe {
  id: string;
  name: string;
  category: 'Plato Fuerte' | 'Entrada' | 'Postre' | 'Bebida' | 'Acompañamiento';
  brand: ('Olivia' | 'Clap')[];
  ingredients: RecipeIngredient[];
  costPerPortion: number;
  status: 'Activa' | 'En revisión';
  lastUpdated: string;
  imageGradient: string;
}

export const recipes: Recipe[] = [
  {
    id: 'rec-001', name: 'Pasta Bolognesa', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 12350, status: 'Activa', lastUpdated: '2026-04-01',
    imageGradient: 'from-orange-400 to-red-500',
    ingredients: [
      { id: 'i1', name: 'Spaghetti fresco', vitatagCode: 'SPG-215', quantityPerPortion: 150, unit: 'g', unitCost: 12, costPerPortion: 1800, currentStock: 45, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Salsa Bolognesa', vitatagCode: 'BOL-136', quantityPerPortion: 200, unit: 'g', unitCost: 18, costPerPortion: 3600, currentStock: 32, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Queso Parmesano', vitatagCode: 'QPR-578', quantityPerPortion: 30, unit: 'g', unitCost: 85, costPerPortion: 2550, currentStock: 2, stockUnit: 'kg', stockStatus: 'warning' },
      { id: 'i4', name: 'Mantequilla', vitatagCode: 'MNT-325', quantityPerPortion: 15, unit: 'g', unitCost: 28, costPerPortion: 420, currentStock: 15, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Albahaca fresca', vitatagCode: 'ALB-710', quantityPerPortion: 5, unit: 'g', unitCost: 40, costPerPortion: 200, currentStock: 3, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Pan Sourdough', vitatagCode: 'PSD-505', quantityPerPortion: 1, unit: 'und', unitCost: 1200, costPerPortion: 1200, currentStock: 189, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i7', name: 'Mantequilla de ajo', vitatagCode: 'MAJ-415', quantityPerPortion: 10, unit: 'g', unitCost: 35, costPerPortion: 350, currentStock: 10, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i8', name: 'Emulsión Balsámica', vitatagCode: 'EBS-410', quantityPerPortion: 5, unit: 'ml', unitCost: 46, costPerPortion: 230, currentStock: 8, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i9', name: 'Sal y pimienta', vitatagCode: 'SAP-001', quantityPerPortion: 3, unit: 'g', unitCost: 5, costPerPortion: 15, currentStock: 50, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i10', name: 'Aceite de oliva', vitatagCode: 'ACO-002', quantityPerPortion: 10, unit: 'ml', unitCost: 20, costPerPortion: 200, currentStock: 25, stockUnit: 'lt', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-002', name: 'Pasta Alfredo con Pollo', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 14200, status: 'Activa', lastUpdated: '2026-03-28',
    imageGradient: 'from-yellow-300 to-orange-400',
    ingredients: [
      { id: 'i1', name: 'Spaghetti fresco', vitatagCode: 'SPG-215', quantityPerPortion: 150, unit: 'g', unitCost: 12, costPerPortion: 1800, currentStock: 45, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Salsa Alfredo', vitatagCode: 'ALF-150', quantityPerPortion: 180, unit: 'g', unitCost: 22, costPerPortion: 3960, currentStock: 20, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Pollo Pechuga', vitatagCode: 'PCH-301', quantityPerPortion: 180, unit: 'g', unitCost: 32, costPerPortion: 5760, currentStock: 85, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i4', name: 'Queso Parmesano', vitatagCode: 'QPR-578', quantityPerPortion: 25, unit: 'g', unitCost: 85, costPerPortion: 2125, currentStock: 2, stockUnit: 'kg', stockStatus: 'warning' },
      { id: 'i5', name: 'Mantequilla', vitatagCode: 'MNT-325', quantityPerPortion: 10, unit: 'g', unitCost: 28, costPerPortion: 280, currentStock: 15, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Ajo', vitatagCode: 'AJO-003', quantityPerPortion: 5, unit: 'g', unitCost: 15, costPerPortion: 75, currentStock: 8, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i7', name: 'Aceite de oliva', vitatagCode: 'ACO-002', quantityPerPortion: 10, unit: 'ml', unitCost: 20, costPerPortion: 200, currentStock: 25, stockUnit: 'lt', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-003', name: 'Pizza Margherita', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 9800, status: 'Activa', lastUpdated: '2026-04-02',
    imageGradient: 'from-red-400 to-yellow-500',
    ingredients: [
      { id: 'i1', name: 'Masa Pizza', vitatagCode: 'MPZ-510', quantityPerPortion: 1, unit: 'und', unitCost: 2800, costPerPortion: 2800, currentStock: 267, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i2', name: 'Salsa Napolitana', vitatagCode: 'NAP-140', quantityPerPortion: 120, unit: 'g', unitCost: 15, costPerPortion: 1800, currentStock: 28, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Queso Doble Crema', vitatagCode: 'QDC-300', quantityPerPortion: 150, unit: 'g', unitCost: 22, costPerPortion: 3300, currentStock: 14, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i4', name: 'Albahaca fresca', vitatagCode: 'ALB-710', quantityPerPortion: 5, unit: 'g', unitCost: 40, costPerPortion: 200, currentStock: 3, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Aceite de oliva', vitatagCode: 'ACO-002', quantityPerPortion: 15, unit: 'ml', unitCost: 20, costPerPortion: 300, currentStock: 25, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i6', name: 'Queso Parmesano', vitatagCode: 'QPR-578', quantityPerPortion: 15, unit: 'g', unitCost: 85, costPerPortion: 1275, currentStock: 2, stockUnit: 'kg', stockStatus: 'warning' },
      { id: 'i7', name: 'Orégano', vitatagCode: 'ORG-004', quantityPerPortion: 2, unit: 'g', unitCost: 30, costPerPortion: 60, currentStock: 5, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i8', name: 'Sal', vitatagCode: 'SAL-005', quantityPerPortion: 3, unit: 'g', unitCost: 2, costPerPortion: 6, currentStock: 50, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-004', name: 'Bowl de Salmón', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 28500, status: 'Activa', lastUpdated: '2026-04-01',
    imageGradient: 'from-pink-400 to-orange-300',
    ingredients: [
      { id: 'i1', name: 'Salmón fresco', vitatagCode: 'SAL-890', quantityPerPortion: 180, unit: 'g', unitCost: 95, costPerPortion: 17100, currentStock: 1.2, stockUnit: 'kg', stockStatus: 'critical' },
      { id: 'i2', name: 'Aguacate', vitatagCode: 'AGU-700', quantityPerPortion: 0.5, unit: 'und', unitCost: 3500, costPerPortion: 1750, currentStock: 15, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i3', name: 'Rúgula', vitatagCode: 'RGL-705', quantityPerPortion: 30, unit: 'g', unitCost: 45, costPerPortion: 1350, currentStock: 0.8, stockUnit: 'kg', stockStatus: 'critical' },
      { id: 'i4', name: 'Arroz sushi', vitatagCode: 'ARS-006', quantityPerPortion: 200, unit: 'g', unitCost: 8, costPerPortion: 1600, currentStock: 30, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Edamame', vitatagCode: 'EDM-007', quantityPerPortion: 40, unit: 'g', unitCost: 35, costPerPortion: 1400, currentStock: 8, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Vinagreta Olivia', vitatagCode: 'VOL-405', quantityPerPortion: 30, unit: 'ml', unitCost: 25, costPerPortion: 750, currentStock: 16, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i7', name: 'Semillas de sésamo', vitatagCode: 'SSM-008', quantityPerPortion: 5, unit: 'g', unitCost: 50, costPerPortion: 250, currentStock: 5, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i8', name: 'Salsa de soya', vitatagCode: 'SOY-009', quantityPerPortion: 15, unit: 'ml', unitCost: 18, costPerPortion: 270, currentStock: 12, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i9', name: 'Jengibre rallado', vitatagCode: 'JBR-010', quantityPerPortion: 3, unit: 'g', unitCost: 30, costPerPortion: 90, currentStock: 2, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-005', name: 'Bowl Buddha Veggie', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 16800, status: 'Activa', lastUpdated: '2026-03-30',
    imageGradient: 'from-green-400 to-emerald-500',
    ingredients: [
      { id: 'i1', name: 'Garbanzos cocidos', vitatagCode: 'GRB-055', quantityPerPortion: 80, unit: 'g', unitCost: 12, costPerPortion: 960, currentStock: 17, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Hummus', vitatagCode: 'HUM-050', quantityPerPortion: 60, unit: 'g', unitCost: 28, costPerPortion: 1680, currentStock: 23, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Aguacate', vitatagCode: 'AGU-700', quantityPerPortion: 0.5, unit: 'und', unitCost: 3500, costPerPortion: 1750, currentStock: 15, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i4', name: 'Quinoa', vitatagCode: 'QNA-011', quantityPerPortion: 80, unit: 'g', unitCost: 18, costPerPortion: 1440, currentStock: 20, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Rúgula', vitatagCode: 'RGL-705', quantityPerPortion: 25, unit: 'g', unitCost: 45, costPerPortion: 1125, currentStock: 0.8, stockUnit: 'kg', stockStatus: 'critical' },
      { id: 'i6', name: 'Tomate horneado', vitatagCode: 'TMH-012', quantityPerPortion: 50, unit: 'g', unitCost: 15, costPerPortion: 750, currentStock: 10, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i7', name: 'Vinagreta Yogurt Griego', vitatagCode: 'VYG-013', quantityPerPortion: 30, unit: 'ml', unitCost: 30, costPerPortion: 900, currentStock: 8, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i8', name: 'Semillas mix', vitatagCode: 'SMX-014', quantityPerPortion: 10, unit: 'g', unitCost: 55, costPerPortion: 550, currentStock: 6, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-006', name: 'Ensalada César', category: 'Entrada', brand: ['Olivia'], costPerPortion: 11200, status: 'Activa', lastUpdated: '2026-03-29',
    imageGradient: 'from-lime-400 to-green-500',
    ingredients: [
      { id: 'i1', name: 'Pollo Pechuga', vitatagCode: 'PCH-301', quantityPerPortion: 150, unit: 'g', unitCost: 32, costPerPortion: 4800, currentStock: 85, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Lechuga romana', vitatagCode: 'LCR-015', quantityPerPortion: 100, unit: 'g', unitCost: 8, costPerPortion: 800, currentStock: 12, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Queso Parmesano', vitatagCode: 'QPR-578', quantityPerPortion: 20, unit: 'g', unitCost: 85, costPerPortion: 1700, currentStock: 2, stockUnit: 'kg', stockStatus: 'warning' },
      { id: 'i4', name: 'Croutones', vitatagCode: 'CRT-016', quantityPerPortion: 20, unit: 'g', unitCost: 25, costPerPortion: 500, currentStock: 8, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Vinagreta Olivia', vitatagCode: 'VOL-405', quantityPerPortion: 40, unit: 'ml', unitCost: 25, costPerPortion: 1000, currentStock: 16, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i6', name: 'Tocineta', vitatagCode: 'TCN-525', quantityPerPortion: 20, unit: 'g', unitCost: 45, costPerPortion: 900, currentStock: 13, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i7', name: 'Anchoas', vitatagCode: 'ANC-017', quantityPerPortion: 5, unit: 'g', unitCost: 100, costPerPortion: 500, currentStock: 3, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-007', name: 'Risotto de Hongos', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 15600, status: 'Activa', lastUpdated: '2026-04-02',
    imageGradient: 'from-amber-400 to-yellow-600',
    ingredients: [
      { id: 'i1', name: 'Arroz arborio', vitatagCode: 'ARB-018', quantityPerPortion: 120, unit: 'g', unitCost: 15, costPerPortion: 1800, currentStock: 25, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Mix de Hongos', vitatagCode: 'MXH-019', quantityPerPortion: 80, unit: 'g', unitCost: 55, costPerPortion: 4400, currentStock: 8, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Fondo de Vegetales', vitatagCode: 'FVG-400', quantityPerPortion: 200, unit: 'ml', unitCost: 8, costPerPortion: 1600, currentStock: 19, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i4', name: 'Queso Parmesano', vitatagCode: 'QPR-578', quantityPerPortion: 30, unit: 'g', unitCost: 85, costPerPortion: 2550, currentStock: 2, stockUnit: 'kg', stockStatus: 'warning' },
      { id: 'i5', name: 'Mantequilla', vitatagCode: 'MNT-325', quantityPerPortion: 20, unit: 'g', unitCost: 28, costPerPortion: 560, currentStock: 15, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Salsa de Trufas', vitatagCode: 'TRF-160', quantityPerPortion: 10, unit: 'ml', unitCost: 120, costPerPortion: 1200, currentStock: 5, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i7', name: 'Cebolla', vitatagCode: 'CEB-020', quantityPerPortion: 30, unit: 'g', unitCost: 5, costPerPortion: 150, currentStock: 20, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i8', name: 'Vino blanco', vitatagCode: 'VNB-021', quantityPerPortion: 30, unit: 'ml', unitCost: 25, costPerPortion: 750, currentStock: 12, stockUnit: 'lt', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-008', name: 'Lasagna Clásica', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 13500, status: 'Activa', lastUpdated: '2026-03-27',
    imageGradient: 'from-orange-500 to-red-600',
    ingredients: [
      { id: 'i1', name: 'Lasagna Porción', vitatagCode: 'LSG-210', quantityPerPortion: 1, unit: 'und', unitCost: 8500, costPerPortion: 8500, currentStock: 312, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i2', name: 'Salsa Bechamel', vitatagCode: 'BCH-145', quantityPerPortion: 80, unit: 'g', unitCost: 18, costPerPortion: 1440, currentStock: 19, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Queso Parmesano', vitatagCode: 'QPR-578', quantityPerPortion: 20, unit: 'g', unitCost: 85, costPerPortion: 1700, currentStock: 2, stockUnit: 'kg', stockStatus: 'warning' },
      { id: 'i4', name: 'Salsa Bolognesa', vitatagCode: 'BOL-136', quantityPerPortion: 60, unit: 'g', unitCost: 18, costPerPortion: 1080, currentStock: 32, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Albahaca fresca', vitatagCode: 'ALB-710', quantityPerPortion: 3, unit: 'g', unitCost: 40, costPerPortion: 120, currentStock: 3, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-009', name: 'Carpaccio de Res', category: 'Entrada', brand: ['Olivia'], costPerPortion: 18900, status: 'Activa', lastUpdated: '2026-03-25',
    imageGradient: 'from-red-500 to-rose-600',
    ingredients: [
      { id: 'i1', name: 'Carpaccio de Res', vitatagCode: 'CRP-505', quantityPerPortion: 1, unit: 'und', unitCost: 12000, costPerPortion: 12000, currentStock: 156, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i2', name: 'Rúgula', vitatagCode: 'RGL-705', quantityPerPortion: 20, unit: 'g', unitCost: 45, costPerPortion: 900, currentStock: 0.8, stockUnit: 'kg', stockStatus: 'critical' },
      { id: 'i3', name: 'Queso Parmesano', vitatagCode: 'QPR-578', quantityPerPortion: 15, unit: 'g', unitCost: 85, costPerPortion: 1275, currentStock: 2, stockUnit: 'kg', stockStatus: 'warning' },
      { id: 'i4', name: 'Alcaparras', vitatagCode: 'ALC-022', quantityPerPortion: 10, unit: 'g', unitCost: 65, costPerPortion: 650, currentStock: 3, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Emulsión Balsámica', vitatagCode: 'EBS-410', quantityPerPortion: 15, unit: 'ml', unitCost: 46, costPerPortion: 690, currentStock: 8, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i6', name: 'Aceite de oliva', vitatagCode: 'ACO-002', quantityPerPortion: 15, unit: 'ml', unitCost: 20, costPerPortion: 300, currentStock: 25, stockUnit: 'lt', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-010', name: 'Filete de Res con Pimienta', category: 'Plato Fuerte', brand: ['Olivia'], costPerPortion: 32500, status: 'Activa', lastUpdated: '2026-04-01',
    imageGradient: 'from-stone-500 to-red-700',
    ingredients: [
      { id: 'i1', name: 'Solomito', vitatagCode: 'SOL-245', quantityPerPortion: 250, unit: 'g', unitCost: 85, costPerPortion: 21250, currentStock: 40, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Salsa de pimienta', vitatagCode: 'SPM-023', quantityPerPortion: 60, unit: 'ml', unitCost: 35, costPerPortion: 2100, currentStock: 8, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i3', name: 'Papas gratinadas', vitatagCode: 'PGR-024', quantityPerPortion: 150, unit: 'g', unitCost: 12, costPerPortion: 1800, currentStock: 30, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i4', name: 'Espárragos', vitatagCode: 'ESP-025', quantityPerPortion: 80, unit: 'g', unitCost: 45, costPerPortion: 3600, currentStock: 5, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Mantequilla', vitatagCode: 'MNT-325', quantityPerPortion: 20, unit: 'g', unitCost: 28, costPerPortion: 560, currentStock: 15, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Mantequilla de ajo', vitatagCode: 'MAJ-415', quantityPerPortion: 15, unit: 'g', unitCost: 35, costPerPortion: 525, currentStock: 10, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-011', name: 'Hamburguesa Clásica', category: 'Plato Fuerte', brand: ['Clap'], costPerPortion: 18500, status: 'Activa', lastUpdated: '2026-04-02',
    imageGradient: 'from-amber-500 to-orange-600',
    ingredients: [
      { id: 'i1', name: 'Carne de res 80/20', vitatagCode: 'CR8-026', quantityPerPortion: 200, unit: 'g', unitCost: 38, costPerPortion: 7600, currentStock: 45, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Pan brioche', vitatagCode: 'PBR-027', quantityPerPortion: 1, unit: 'und', unitCost: 2500, costPerPortion: 2500, currentStock: 200, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i3', name: 'Queso Cheddar', vitatagCode: 'QCH-305', quantityPerPortion: 2, unit: 'láminas', unitCost: 800, costPerPortion: 1600, currentStock: 189, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i4', name: 'Tocineta', vitatagCode: 'TCN-525', quantityPerPortion: 25, unit: 'g', unitCost: 45, costPerPortion: 1125, currentStock: 13, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Tomate', vitatagCode: 'TMT-028', quantityPerPortion: 40, unit: 'g', unitCost: 8, costPerPortion: 320, currentStock: 15, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Lechuga', vitatagCode: 'LCH-029', quantityPerPortion: 20, unit: 'g', unitCost: 6, costPerPortion: 120, currentStock: 10, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i7', name: 'Cebolla caramelizada', vitatagCode: 'CCM-030', quantityPerPortion: 30, unit: 'g', unitCost: 18, costPerPortion: 540, currentStock: 8, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i8', name: 'Papas fritas', vitatagCode: 'PFS-031', quantityPerPortion: 150, unit: 'g', unitCost: 12, costPerPortion: 1800, currentStock: 50, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i9', name: 'Salsa especial', vitatagCode: 'SEC-032', quantityPerPortion: 25, unit: 'g', unitCost: 22, costPerPortion: 550, currentStock: 12, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i10', name: 'Pickle', vitatagCode: 'PKL-033', quantityPerPortion: 15, unit: 'g', unitCost: 15, costPerPortion: 225, currentStock: 8, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-012', name: 'Hamburguesa Veggie', category: 'Plato Fuerte', brand: ['Clap'], costPerPortion: 16200, status: 'Activa', lastUpdated: '2026-03-28',
    imageGradient: 'from-green-500 to-lime-400',
    ingredients: [
      { id: 'i1', name: 'Patty vegetal', vitatagCode: 'PVG-034', quantityPerPortion: 1, unit: 'und', unitCost: 5500, costPerPortion: 5500, currentStock: 120, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i2', name: 'Pan brioche', vitatagCode: 'PBR-027', quantityPerPortion: 1, unit: 'und', unitCost: 2500, costPerPortion: 2500, currentStock: 200, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i3', name: 'Aguacate', vitatagCode: 'AGU-700', quantityPerPortion: 0.5, unit: 'und', unitCost: 3500, costPerPortion: 1750, currentStock: 15, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i4', name: 'Hummus', vitatagCode: 'HUM-050', quantityPerPortion: 30, unit: 'g', unitCost: 28, costPerPortion: 840, currentStock: 23, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Tomate', vitatagCode: 'TMT-028', quantityPerPortion: 40, unit: 'g', unitCost: 8, costPerPortion: 320, currentStock: 15, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Rúgula', vitatagCode: 'RGL-705', quantityPerPortion: 15, unit: 'g', unitCost: 45, costPerPortion: 675, currentStock: 0.8, stockUnit: 'kg', stockStatus: 'critical' },
      { id: 'i7', name: 'Papas fritas', vitatagCode: 'PFS-031', quantityPerPortion: 150, unit: 'g', unitCost: 12, costPerPortion: 1800, currentStock: 50, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-013', name: 'Chicken Wings', category: 'Entrada', brand: ['Clap'], costPerPortion: 14800, status: 'Activa', lastUpdated: '2026-03-30',
    imageGradient: 'from-orange-500 to-red-500',
    ingredients: [
      { id: 'i1', name: 'Alas de pollo', vitatagCode: 'ALP-035', quantityPerPortion: 8, unit: 'und', unitCost: 1200, costPerPortion: 9600, currentStock: 350, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i2', name: 'Salsa BBQ', vitatagCode: 'BBQ-036', quantityPerPortion: 50, unit: 'ml', unitCost: 15, costPerPortion: 750, currentStock: 15, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i3', name: 'Chile dulce', vitatagCode: 'CHD-037', quantityPerPortion: 30, unit: 'ml', unitCost: 20, costPerPortion: 600, currentStock: 8, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i4', name: 'Apio y zanahoria', vitatagCode: 'AYZ-038', quantityPerPortion: 40, unit: 'g', unitCost: 8, costPerPortion: 320, currentStock: 12, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Salsa ranch', vitatagCode: 'RNC-039', quantityPerPortion: 30, unit: 'ml', unitCost: 25, costPerPortion: 750, currentStock: 10, stockUnit: 'lt', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-014', name: 'Loaded Fries', category: 'Acompañamiento', brand: ['Clap'], costPerPortion: 12400, status: 'Activa', lastUpdated: '2026-03-29',
    imageGradient: 'from-yellow-400 to-amber-500',
    ingredients: [
      { id: 'i1', name: 'Papas fritas', vitatagCode: 'PFS-031', quantityPerPortion: 250, unit: 'g', unitCost: 12, costPerPortion: 3000, currentStock: 50, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i2', name: 'Queso Cheddar', vitatagCode: 'QCH-305', quantityPerPortion: 3, unit: 'láminas', unitCost: 800, costPerPortion: 2400, currentStock: 189, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i3', name: 'Tocineta', vitatagCode: 'TCN-525', quantityPerPortion: 30, unit: 'g', unitCost: 45, costPerPortion: 1350, currentStock: 13, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i4', name: 'Cebolla caramelizada', vitatagCode: 'CCM-030', quantityPerPortion: 25, unit: 'g', unitCost: 18, costPerPortion: 450, currentStock: 8, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Jalapeño', vitatagCode: 'JLP-040', quantityPerPortion: 15, unit: 'g', unitCost: 20, costPerPortion: 300, currentStock: 5, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Salsa especial', vitatagCode: 'SEC-032', quantityPerPortion: 30, unit: 'g', unitCost: 22, costPerPortion: 660, currentStock: 12, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-015', name: 'Volcán de Chocolate', category: 'Postre', brand: ['Olivia'], costPerPortion: 8900, status: 'Activa', lastUpdated: '2026-03-25',
    imageGradient: 'from-amber-800 to-yellow-900',
    ingredients: [
      { id: 'i1', name: 'Volcán de Chocolate', vitatagCode: 'VCH-600', quantityPerPortion: 1, unit: 'und', unitCost: 5500, costPerPortion: 5500, currentStock: 198, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i2', name: 'Helado Vainilla', vitatagCode: 'HVN-620', quantityPerPortion: 80, unit: 'ml', unitCost: 18, costPerPortion: 1440, currentStock: 8, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i3', name: 'Salsa de chocolate', vitatagCode: 'SCH-041', quantityPerPortion: 30, unit: 'ml', unitCost: 25, costPerPortion: 750, currentStock: 6, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i4', name: 'Frutos rojos', vitatagCode: 'FRJ-042', quantityPerPortion: 20, unit: 'g', unitCost: 60, costPerPortion: 1200, currentStock: 4, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-016', name: 'Torta de Queso Vasca', category: 'Postre', brand: ['Olivia'], costPerPortion: 9500, status: 'Activa', lastUpdated: '2026-03-24',
    imageGradient: 'from-yellow-200 to-orange-300',
    ingredients: [
      { id: 'i1', name: 'Torta Queso Vasca', vitatagCode: 'TQV-605', quantityPerPortion: 1, unit: 'und', unitCost: 7200, costPerPortion: 7200, currentStock: 145, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i2', name: 'Compota de frutos rojos', vitatagCode: 'CFR-043', quantityPerPortion: 40, unit: 'g', unitCost: 35, costPerPortion: 1400, currentStock: 5, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Menta fresca', vitatagCode: 'MNF-044', quantityPerPortion: 2, unit: 'g', unitCost: 50, costPerPortion: 100, currentStock: 1, stockUnit: 'kg', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-017', name: 'Milkshake Clásico', category: 'Bebida', brand: ['Clap'], costPerPortion: 7800, status: 'Activa', lastUpdated: '2026-03-28',
    imageGradient: 'from-pink-300 to-purple-400',
    ingredients: [
      { id: 'i1', name: 'Helado Vainilla', vitatagCode: 'HVN-620', quantityPerPortion: 150, unit: 'ml', unitCost: 18, costPerPortion: 2700, currentStock: 8, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i2', name: 'Leche entera', vitatagCode: 'LCE-045', quantityPerPortion: 200, unit: 'ml', unitCost: 4, costPerPortion: 800, currentStock: 30, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i3', name: 'Crema de leche', vitatagCode: 'CDL-046', quantityPerPortion: 50, unit: 'ml', unitCost: 12, costPerPortion: 600, currentStock: 15, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i4', name: 'Galleta Red Velvet', vitatagCode: 'GRV-615', quantityPerPortion: 2, unit: 'und', unitCost: 800, costPerPortion: 1600, currentStock: 189, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i5', name: 'Salsa de chocolate', vitatagCode: 'SCH-041', quantityPerPortion: 20, unit: 'ml', unitCost: 25, costPerPortion: 500, currentStock: 6, stockUnit: 'lt', stockStatus: 'ok' },
      { id: 'i6', name: 'Crema batida', vitatagCode: 'CRB-047', quantityPerPortion: 30, unit: 'ml', unitCost: 15, costPerPortion: 450, currentStock: 10, stockUnit: 'lt', stockStatus: 'ok' },
    ],
  },
  {
    id: 'rec-018', name: 'Sashimi Variado', category: 'Entrada', brand: ['Olivia'], costPerPortion: 35000, status: 'Activa', lastUpdated: '2026-04-01',
    imageGradient: 'from-red-400 to-pink-500',
    ingredients: [
      { id: 'i1', name: 'Salmón fresco', vitatagCode: 'SAL-890', quantityPerPortion: 120, unit: 'g', unitCost: 95, costPerPortion: 11400, currentStock: 1.2, stockUnit: 'kg', stockStatus: 'critical' },
      { id: 'i2', name: 'Atún fresco', vitatagCode: 'ATN-475', quantityPerPortion: 80, unit: 'g', unitCost: 110, costPerPortion: 8800, currentStock: 3, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i3', name: 'Langostinos', vitatagCode: 'LGS-485', quantityPerPortion: 4, unit: 'und', unitCost: 2500, costPerPortion: 10000, currentStock: 43, stockUnit: 'und', stockStatus: 'ok' },
      { id: 'i4', name: 'Jengibre encurtido', vitatagCode: 'JGE-048', quantityPerPortion: 10, unit: 'g', unitCost: 45, costPerPortion: 450, currentStock: 3, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i5', name: 'Wasabi', vitatagCode: 'WSB-049', quantityPerPortion: 5, unit: 'g', unitCost: 80, costPerPortion: 400, currentStock: 2, stockUnit: 'kg', stockStatus: 'ok' },
      { id: 'i6', name: 'Salsa de soya', vitatagCode: 'SOY-009', quantityPerPortion: 20, unit: 'ml', unitCost: 18, costPerPortion: 360, currentStock: 12, stockUnit: 'lt', stockStatus: 'ok' },
    ],
  },
];
