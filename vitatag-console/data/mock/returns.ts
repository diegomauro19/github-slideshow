export interface Return {
  id: string;
  date: string;
  product: string;
  productCode: string;
  quantity: number;
  reason: 'Vencimiento próximo' | 'Daño en transporte' | 'Error en pedido' | 'Calidad' | 'Temperatura inadecuada';
  local: string;
  status: 'Aprobada' | 'Pendiente' | 'Rechazada';
  value: number;
  notes: string;
}

export const returns: Return[] = [
  { id: 'ret-001', date: '2026-04-03', product: 'Salmón Fresco x kg', productCode: 'SAL-890', quantity: 2, reason: 'Temperatura inadecuada', local: 'Olivia Viva Envigado', status: 'Aprobada', value: 190000, notes: 'Temperatura al recibir fue 8°C, fuera de rango' },
  { id: 'ret-002', date: '2026-04-03', product: 'Rúgula x 250g', productCode: 'RGL-705', quantity: 5, reason: 'Calidad', local: 'Olivia Laureles', status: 'Aprobada', value: 56250, notes: 'Hojas marchitas y amarillentas' },
  { id: 'ret-003', date: '2026-04-03', product: 'Aguacate Hass x und', productCode: 'AGU-700', quantity: 8, reason: 'Calidad', local: 'Clap Laureles', status: 'Pendiente', value: 28000, notes: 'Sobre maduros al recibir' },
  { id: 'ret-004', date: '2026-04-02', product: 'Masa Pizza x und', productCode: 'MPZ-510', quantity: 15, reason: 'Vencimiento próximo', local: 'Olivia Arkadia', status: 'Aprobada', value: 42000, notes: 'Vencen en 2 días, no se alcanzarán a usar' },
  { id: 'ret-005', date: '2026-04-02', product: 'Pollo Pechuga x 10 und', productCode: 'PCH-301', quantity: 3, reason: 'Daño en transporte', local: 'Olivia 10b', status: 'Aprobada', value: 96000, notes: 'Empaque roto durante transporte' },
  { id: 'ret-006', date: '2026-04-02', product: 'Queso Parmesano Rallado x 250g', productCode: 'QPR-578', quantity: 4, reason: 'Error en pedido', local: 'Clap Envigado', status: 'Aprobada', value: 85000, notes: 'Se pidió queso azul, llegó parmesano' },
  { id: 'ret-007', date: '2026-04-01', product: 'Spaghetti Fresco x 500g', productCode: 'SPG-215', quantity: 10, reason: 'Vencimiento próximo', local: 'Olivia Laureles', status: 'Aprobada', value: 60000, notes: 'Lote cercano a vencimiento' },
  { id: 'ret-008', date: '2026-04-01', product: 'Hummus x 500g', productCode: 'HUM-050', quantity: 6, reason: 'Temperatura inadecuada', local: 'Olivia Viva Envigado', status: 'Rechazada', value: 84000, notes: 'Se verificó cadena de frío correcta' },
  { id: 'ret-009', date: '2026-04-01', product: 'Volcán de Chocolate x und', productCode: 'VCH-600', quantity: 4, reason: 'Daño en transporte', local: 'Olivia Arkadia', status: 'Aprobada', value: 22000, notes: 'Aplastados en la caja' },
  { id: 'ret-010', date: '2026-03-31', product: 'Tocineta Ahumada x kg', productCode: 'TCN-525', quantity: 2, reason: 'Calidad', local: 'Clap Laureles', status: 'Aprobada', value: 90000, notes: 'Color oscuro anormal' },
  { id: 'ret-011', date: '2026-03-31', product: 'Salsa Bolognesa x 500g', productCode: 'BOL-136', quantity: 8, reason: 'Error en pedido', local: 'Olivia Laureles', status: 'Pendiente', value: 72000, notes: 'Cantidad duplicada en despacho' },
  { id: 'ret-012', date: '2026-03-30', product: 'Milanesa de Res x 6 und', productCode: 'MIL-456', quantity: 6, reason: 'Daño en transporte', local: 'Clap Envigado', status: 'Aprobada', value: 108000, notes: 'Descongelamiento parcial' },
  { id: 'ret-013', date: '2026-03-30', product: 'Pan Sourdough x und', productCode: 'PSD-505', quantity: 12, reason: 'Vencimiento próximo', local: 'Olivia Viva Envigado', status: 'Aprobada', value: 14400, notes: 'Vencen mañana' },
  { id: 'ret-014', date: '2026-03-29', product: 'Chorizo Español x 6 und', productCode: 'CHE-510', quantity: 3, reason: 'Temperatura inadecuada', local: 'Olivia Laureles', status: 'Aprobada', value: 54000, notes: 'Embutidos fuera de cadena de frío por 2h' },
  { id: 'ret-015', date: '2026-03-29', product: 'Yogurt Griego Natural x lt', productCode: 'YGN-320', quantity: 5, reason: 'Calidad', local: 'Olivia Arkadia', status: 'Rechazada', value: 40000, notes: 'Yogurt en buen estado tras revisión' },
  { id: 'ret-016', date: '2026-03-28', product: 'Camarón Grande x kg', productCode: 'CMR-480', quantity: 3, reason: 'Temperatura inadecuada', local: 'Olivia Laureles', status: 'Aprobada', value: 270000, notes: 'Temperatura 6°C al recibir' },
  { id: 'ret-017', date: '2026-03-28', product: 'Lasagna Porción x 350g', productCode: 'LSG-210', quantity: 5, reason: 'Daño en transporte', local: 'Clap Laureles', status: 'Aprobada', value: 42500, notes: 'Porciones aplastadas' },
];
