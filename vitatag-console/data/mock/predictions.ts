export interface Prediction {
  id: string;
  ingredient: string;
  stockActual: number;
  stockUnit: string;
  consumoDia: number;
  diasRestantes: number;
  horaAgotamiento: string;
  status: 'critical' | 'warning' | 'ok';
  recetasAfectadas: number;
  recetasNombres: string[];
  riesgoCOP: number;
  projectionData: { hora: string; stock: number }[];
}

export const predictions: Prediction[] = [
  {
    id: 'pred-1', ingredient: 'Salmón Fresco', stockActual: 1.2, stockUnit: 'kg', consumoDia: 4.5, diasRestantes: 0.27, horaAgotamiento: 'Hoy ~6:00 PM', status: 'critical', recetasAfectadas: 4,
    recetasNombres: ['Bowl de Salmón', 'Sashimi Variado', 'Nigiri especial', 'Tartare de Salmón'],
    riesgoCOP: 1200000,
    projectionData: [
      { hora: '10:00', stock: 1.2 }, { hora: '12:00', stock: 0.9 }, { hora: '14:00', stock: 0.65 },
      { hora: '16:00', stock: 0.35 }, { hora: '18:00', stock: 0.05 }, { hora: '20:00', stock: 0 },
    ],
  },
  {
    id: 'pred-2', ingredient: 'Queso Parmesano', stockActual: 3.5, stockUnit: 'kg', consumoDia: 2.7, diasRestantes: 1.3, horaAgotamiento: 'Mañana ~2:00 PM', status: 'warning', recetasAfectadas: 8,
    recetasNombres: ['Pasta Bolognesa', 'Pasta Alfredo', 'Pizza Margherita', 'Ensalada César', 'Risotto', 'Lasagna', 'Carpaccio', 'Pasta Pesto'],
    riesgoCOP: 850000,
    projectionData: [
      { hora: 'Hoy 10AM', stock: 3.5 }, { hora: 'Hoy 2PM', stock: 2.8 }, { hora: 'Hoy 8PM', stock: 1.7 },
      { hora: 'Mañ 10AM', stock: 0.9 }, { hora: 'Mañ 2PM', stock: 0.1 }, { hora: 'Mañ 8PM', stock: 0 },
    ],
  },
  {
    id: 'pred-3', ingredient: 'Rúgula', stockActual: 0.8, stockUnit: 'kg', consumoDia: 0.9, diasRestantes: 0.89, horaAgotamiento: 'Mañana ~10:00 AM', status: 'warning', recetasAfectadas: 3,
    recetasNombres: ['Bowl de Salmón', 'Carpaccio de Res', 'Hamburguesa Veggie'],
    riesgoCOP: 320000,
    projectionData: [
      { hora: 'Hoy 10AM', stock: 0.8 }, { hora: 'Hoy 2PM', stock: 0.55 }, { hora: 'Hoy 8PM', stock: 0.3 },
      { hora: 'Mañ 10AM', stock: 0.05 }, { hora: 'Mañ 2PM', stock: 0 },
    ],
  },
  {
    id: 'pred-4', ingredient: 'Pollo Pechuga', stockActual: 45, stockUnit: 'kg', consumoDia: 10.8, diasRestantes: 4.2, horaAgotamiento: 'Lun 7 abril', status: 'ok', recetasAfectadas: 5,
    recetasNombres: ['Pasta Alfredo', 'Ensalada César', 'Chicken Wings', 'Milanesa', 'Filete de Pollo'],
    riesgoCOP: 0,
    projectionData: [
      { hora: 'Hoy', stock: 45 }, { hora: 'Vie', stock: 34.2 }, { hora: 'Sáb', stock: 23.4 },
      { hora: 'Dom', stock: 12.6 }, { hora: 'Lun', stock: 1.8 }, { hora: 'Mar', stock: 0 },
    ],
  },
  {
    id: 'pred-5', ingredient: 'Pasta Spaghetti', stockActual: 30, stockUnit: 'kg', consumoDia: 4.9, diasRestantes: 6.1, horaAgotamiento: 'Mié 9 abril', status: 'ok', recetasAfectadas: 3,
    recetasNombres: ['Pasta Bolognesa', 'Pasta Alfredo', 'Pasta Pesto'],
    riesgoCOP: 0,
    projectionData: [
      { hora: 'Hoy', stock: 30 }, { hora: 'Vie', stock: 25.1 }, { hora: 'Sáb', stock: 20.2 },
      { hora: 'Dom', stock: 15.3 }, { hora: 'Lun', stock: 10.4 }, { hora: 'Mar', stock: 5.5 }, { hora: 'Mié', stock: 0.6 },
    ],
  },
  {
    id: 'pred-6', ingredient: 'Masa Pizza', stockActual: 232, stockUnit: 'und', consumoDia: 38, diasRestantes: 6.1, horaAgotamiento: 'Mié 9 abril', status: 'ok', recetasAfectadas: 1,
    recetasNombres: ['Pizza Margherita'],
    riesgoCOP: 0,
    projectionData: [
      { hora: 'Hoy', stock: 232 }, { hora: 'Vie', stock: 194 }, { hora: 'Sáb', stock: 156 },
      { hora: 'Dom', stock: 118 }, { hora: 'Lun', stock: 80 }, { hora: 'Mar', stock: 42 }, { hora: 'Mié', stock: 4 },
    ],
  },
  {
    id: 'pred-7', ingredient: 'Aguacate', stockActual: 126, stockUnit: 'und', consumoDia: 35, diasRestantes: 3.6, horaAgotamiento: 'Dom 6 abril', status: 'ok', recetasAfectadas: 3,
    recetasNombres: ['Bowl de Salmón', 'Bowl Buddha', 'Hamburguesa Veggie'],
    riesgoCOP: 0,
    projectionData: [
      { hora: 'Hoy', stock: 126 }, { hora: 'Vie', stock: 91 }, { hora: 'Sáb', stock: 56 },
      { hora: 'Dom', stock: 21 }, { hora: 'Lun', stock: 0 },
    ],
  },
];

export const lostSalesData = {
  totalMes: 4280000,
  platosNoServidos: 342,
  platoMasAfectado: 'Bowl de Salmón (87 porciones)',
  diaMasCostoso: 'Sábado 22 marzo ($680K)',
};

export const lostSalesTable = [
  { ingredient: 'Salmón fresco', horasSinStock: '6h (sáb 22 mar)', recetasAfectadas: 'Bowl de Salmón, Sashimi', porcionesPerdidas: 87, precioPromedio: 38000, copPerdidos: 3306000 },
  { ingredient: 'Aguacate', horasSinStock: '4h (dom 23 mar)', recetasAfectadas: 'Bowl Buddha, Guacamole', porcionesPerdidas: 45, precioPromedio: 22000, copPerdidos: 990000 },
  { ingredient: 'Rúgula', horasSinStock: '3h (sáb 29 mar)', recetasAfectadas: 'Carpaccio, Bowl Salmón', porcionesPerdidas: 32, precioPromedio: 28000, copPerdidos: 896000 },
  { ingredient: 'Queso Parmesano', horasSinStock: '2h (vie 28 mar)', recetasAfectadas: 'Pasta Bolognesa, César', porcionesPerdidas: 28, precioPromedio: 25000, copPerdidos: 700000 },
  { ingredient: 'Atún fresco', horasSinStock: '5h (sáb 22 mar)', recetasAfectadas: 'Sashimi, Tataki', porcionesPerdidas: 18, precioPromedio: 42000, copPerdidos: 756000 },
];

export const lostSalesDaily = [
  { date: 'Mar 5', value: 120000 }, { date: 'Mar 6', value: 85000 }, { date: 'Mar 7', value: 0 },
  { date: 'Mar 8', value: 250000 }, { date: 'Mar 9', value: 180000 }, { date: 'Mar 10', value: 0 },
  { date: 'Mar 11', value: 0 }, { date: 'Mar 12', value: 95000 }, { date: 'Mar 13', value: 0 },
  { date: 'Mar 14', value: 0 }, { date: 'Mar 15', value: 350000 }, { date: 'Mar 16', value: 420000 },
  { date: 'Mar 17', value: 0 }, { date: 'Mar 18', value: 0 }, { date: 'Mar 19', value: 75000 },
  { date: 'Mar 20', value: 0 }, { date: 'Mar 21', value: 0 }, { date: 'Mar 22', value: 680000 },
  { date: 'Mar 23', value: 520000 }, { date: 'Mar 24', value: 0 }, { date: 'Mar 25', value: 0 },
  { date: 'Mar 26', value: 0 }, { date: 'Mar 27', value: 110000 }, { date: 'Mar 28', value: 185000 },
  { date: 'Mar 29', value: 450000 }, { date: 'Mar 30', value: 380000 }, { date: 'Mar 31', value: 0 },
  { date: 'Abr 1', value: 0 }, { date: 'Abr 2', value: 95000 }, { date: 'Abr 3', value: 0 },
];
