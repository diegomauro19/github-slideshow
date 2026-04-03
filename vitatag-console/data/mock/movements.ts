export interface Movement {
  id: string;
  timestamp: string;
  product: string;
  productCode: string;
  fromZone: string;
  toZone: string;
  quantity: number;
  unit: string;
  user: string;
  type: 'entrada' | 'salida' | 'transferencia' | 'ajuste';
}

export const movements: Movement[] = [
  { id: 'mov-001', timestamp: '2026-04-03T14:30:00', product: 'Solomito x 5 und', productCode: 'SOL-245', fromZone: 'CDP Nevera 2', toZone: 'Olivia Laureles', quantity: 12, unit: 'und', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-002', timestamp: '2026-04-03T14:15:00', product: 'Pollo Pechuga x 10 und', productCode: 'PCH-301', fromZone: 'CDP Nevera 1', toZone: 'Clap Laureles', quantity: 8, unit: 'und', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-003', timestamp: '2026-04-03T13:45:00', product: 'Salmón Fresco x kg', productCode: 'SAL-890', fromZone: 'Proveedor', toZone: 'CDP Nevera 1', quantity: 15, unit: 'kg', user: 'Ana Torres', type: 'entrada' },
  { id: 'mov-004', timestamp: '2026-04-03T13:30:00', product: 'Queso Parmesano Rallado x 250g', productCode: 'QPR-578', fromZone: 'CDP Nevera 1', toZone: 'Olivia Viva Envigado', quantity: 5, unit: 'und', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-005', timestamp: '2026-04-03T13:00:00', product: 'Masa Pizza x und', productCode: 'MPZ-510', fromZone: 'CDP Nevera 2', toZone: 'Olivia Laureles', quantity: 20, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-006', timestamp: '2026-04-03T12:45:00', product: 'Salsa Bolognesa x 500g', productCode: 'BOL-136', fromZone: 'CDP Nevera 2', toZone: 'Olivia Arkadia', quantity: 10, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-007', timestamp: '2026-04-03T12:30:00', product: 'Hummus x 500g', productCode: 'HUM-050', fromZone: 'CDP Nevera 1', toZone: 'Clap Laureles', quantity: 6, unit: 'und', user: 'Ana Torres', type: 'salida' },
  { id: 'mov-008', timestamp: '2026-04-03T12:00:00', product: 'Lasagna Porción x 350g', productCode: 'LSG-210', fromZone: 'CDP Nevera 2', toZone: 'Olivia Laureles', quantity: 15, unit: 'und', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-009', timestamp: '2026-04-03T11:45:00', product: 'Aguacate Hass x und', productCode: 'AGU-700', fromZone: 'Proveedor', toZone: 'CDP Nevera 1', quantity: 80, unit: 'und', user: 'Ana Torres', type: 'entrada' },
  { id: 'mov-010', timestamp: '2026-04-03T11:30:00', product: 'Pan Multicereal x 6 und', productCode: 'PMC-500', fromZone: 'CDP Nevera 2', toZone: 'Olivia Viva Envigado', quantity: 10, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-011', timestamp: '2026-04-03T11:00:00', product: 'Rúgula x 250g', productCode: 'RGL-705', fromZone: 'Proveedor', toZone: 'CDP Nevera 1', quantity: 20, unit: 'und', user: 'Ana Torres', type: 'entrada' },
  { id: 'mov-012', timestamp: '2026-04-03T10:45:00', product: 'Tocineta Ahumada x kg', productCode: 'TCN-525', fromZone: 'CDP Nevera 1', toZone: 'Clap Envigado', quantity: 4, unit: 'kg', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-013', timestamp: '2026-04-03T10:30:00', product: 'Volcán de Chocolate x und', productCode: 'VCH-600', fromZone: 'CDP Nevera 2', toZone: 'Olivia Laureles', quantity: 8, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-014', timestamp: '2026-04-03T10:00:00', product: 'Spaghetti Fresco x 500g', productCode: 'SPG-215', fromZone: 'CDP Nevera 1', toZone: 'Olivia Laureles', quantity: 15, unit: 'und', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-015', timestamp: '2026-04-03T09:30:00', product: 'Milanesa de Res x 6 und', productCode: 'MIL-456', fromZone: 'CDP Nevera 2', toZone: 'Olivia 10b', quantity: 6, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-016', timestamp: '2026-04-03T09:00:00', product: 'Queso Cheddar Láminas x 500g', productCode: 'QCH-305', fromZone: 'CDP Nevera 1', toZone: 'Clap Laureles', quantity: 10, unit: 'und', user: 'Ana Torres', type: 'salida' },
  { id: 'mov-017', timestamp: '2026-04-03T08:45:00', product: 'Solomito x 5 und', productCode: 'SOL-245', fromZone: 'CDP Nevera 2', toZone: 'CDP Picking', quantity: 24, unit: 'und', user: 'Carlos Mejía', type: 'transferencia' },
  { id: 'mov-018', timestamp: '2026-04-03T08:30:00', product: 'Pollo Pechuga x 10 und', productCode: 'PCH-301', fromZone: 'CDP Nevera 1', toZone: 'CDP Picking', quantity: 16, unit: 'und', user: 'Carlos Mejía', type: 'transferencia' },
  { id: 'mov-019', timestamp: '2026-04-03T08:00:00', product: 'Garbanzos Cocidos x 1kg', productCode: 'GRB-055', fromZone: 'Proveedor', toZone: 'CDP Almacén', quantity: 50, unit: 'kg', user: 'Ana Torres', type: 'entrada' },
  { id: 'mov-020', timestamp: '2026-04-02T18:00:00', product: 'Salmón Fresco x kg', productCode: 'SAL-890', fromZone: 'CDP Nevera 1', toZone: 'Desecho', quantity: 0.5, unit: 'kg', user: 'María López', type: 'ajuste' },
  { id: 'mov-021', timestamp: '2026-04-02T17:30:00', product: 'Ravioli de Carne x 500g', productCode: 'RVC-200', fromZone: 'CDP Nevera 2', toZone: 'Olivia Laureles', quantity: 12, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-022', timestamp: '2026-04-02T17:00:00', product: 'Salsa Alfredo x 500g', productCode: 'ALF-150', fromZone: 'CDP Nevera 2', toZone: 'Olivia Viva Envigado', quantity: 8, unit: 'und', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-023', timestamp: '2026-04-02T16:30:00', product: 'Mantequilla sin sal x 500g', productCode: 'MNT-325', fromZone: 'Proveedor', toZone: 'CDP Nevera 1', quantity: 30, unit: 'und', user: 'Ana Torres', type: 'entrada' },
  { id: 'mov-024', timestamp: '2026-04-02T16:00:00', product: 'Pepperoni x 500g', productCode: 'PPR-520', fromZone: 'CDP Nevera 1', toZone: 'Olivia Laureles', quantity: 6, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-025', timestamp: '2026-04-02T15:30:00', product: 'Helado Vainilla x lt', productCode: 'HVN-620', fromZone: 'CDP Nevera 2', toZone: 'Clap Laureles', quantity: 3, unit: 'lt', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-026', timestamp: '2026-04-02T15:00:00', product: 'Chorizo Español x 6 und', productCode: 'CHE-510', fromZone: 'CDP Nevera 1', toZone: 'Olivia Laureles', quantity: 8, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-027', timestamp: '2026-04-02T14:30:00', product: 'Pulpa Fresa-Mango x lt', productCode: 'PFM-800', fromZone: 'CDP Nevera 2', toZone: 'Clap Laureles', quantity: 5, unit: 'lt', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-028', timestamp: '2026-04-02T14:00:00', product: 'Atún Fresco x kg', productCode: 'ATN-475', fromZone: 'Proveedor', toZone: 'CDP Nevera 1', quantity: 10, unit: 'kg', user: 'Ana Torres', type: 'entrada' },
  { id: 'mov-029', timestamp: '2026-04-02T13:30:00', product: 'Queso Doble Crema x kg', productCode: 'QDC-300', fromZone: 'CDP Nevera 1', toZone: 'Olivia Laureles', quantity: 5, unit: 'kg', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-030', timestamp: '2026-04-02T13:00:00', product: 'Panceta Ahumada x kg', productCode: 'PNC-500', fromZone: 'CDP Nevera 1', toZone: 'Olivia Laureles', quantity: 3, unit: 'kg', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-031', timestamp: '2026-04-02T12:00:00', product: 'Carpaccio de Res x 200g', productCode: 'CRP-505', fromZone: 'CDP Nevera 2', toZone: 'Olivia Arkadia', quantity: 8, unit: 'und', user: 'Diego Ríos', type: 'salida' },
  { id: 'mov-032', timestamp: '2026-04-02T11:00:00', product: 'Camarón Grande x kg', productCode: 'CMR-480', fromZone: 'CDP Nevera 2', toZone: 'Olivia Viva Envigado', quantity: 4, unit: 'kg', user: 'Carlos Mejía', type: 'salida' },
  { id: 'mov-033', timestamp: '2026-04-02T10:00:00', product: 'Yogurt Griego Natural x lt', productCode: 'YGN-320', fromZone: 'Proveedor', toZone: 'CDP Nevera 1', quantity: 20, unit: 'lt', user: 'Ana Torres', type: 'entrada' },
];
