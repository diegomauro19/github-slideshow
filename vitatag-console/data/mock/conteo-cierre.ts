export interface ConteoItem {
  id: string;
  ingrediente: string;
  unidad: string;
  cantidadEsperada: number;
  cantidadContada: number | null;
  status: 'contado' | 'pendiente';
}

export interface ConteoHistorico {
  id: string;
  fecha: string;
  pdv: string;
  responsable: string;
  items: number;
  status: 'Completado' | 'En proceso' | 'Pendiente';
  varianza: number;
}

export const conteoItems: ConteoItem[] = [
  { id: 'ci-01', ingrediente: 'Solomito', unidad: 'kg', cantidadEsperada: 5.2, cantidadContada: 4.8, status: 'contado' },
  { id: 'ci-02', ingrediente: 'Pollo Pechuga', unidad: 'kg', cantidadEsperada: 12.5, cantidadContada: 12.3, status: 'contado' },
  { id: 'ci-03', ingrediente: 'Salmón Fresco', unidad: 'kg', cantidadEsperada: 1.5, cantidadContada: 1.2, status: 'contado' },
  { id: 'ci-04', ingrediente: 'Queso Parmesano', unidad: 'kg', cantidadEsperada: 2.8, cantidadContada: 2.1, status: 'contado' },
  { id: 'ci-05', ingrediente: 'Rúgula', unidad: 'kg', cantidadEsperada: 1.2, cantidadContada: 0.8, status: 'contado' },
  { id: 'ci-06', ingrediente: 'Aguacate Hass', unidad: 'und', cantidadEsperada: 25, cantidadContada: 22, status: 'contado' },
  { id: 'ci-07', ingrediente: 'Tocineta Ahumada', unidad: 'kg', cantidadEsperada: 3.5, cantidadContada: 3.2, status: 'contado' },
  { id: 'ci-08', ingrediente: 'Mantequilla sin sal', unidad: 'kg', cantidadEsperada: 4.0, cantidadContada: 3.8, status: 'contado' },
  { id: 'ci-09', ingrediente: 'Queso Cheddar', unidad: 'und', cantidadEsperada: 45, cantidadContada: 43, status: 'contado' },
  { id: 'ci-10', ingrediente: 'Queso Doble Crema', unidad: 'kg', cantidadEsperada: 3.2, cantidadContada: 3.0, status: 'contado' },
  { id: 'ci-11', ingrediente: 'Salsa Bolognesa', unidad: 'kg', cantidadEsperada: 8.0, cantidadContada: 7.5, status: 'contado' },
  { id: 'ci-12', ingrediente: 'Salsa Alfredo', unidad: 'kg', cantidadEsperada: 5.5, cantidadContada: 5.3, status: 'contado' },
  { id: 'ci-13', ingrediente: 'Salsa Napolitana', unidad: 'kg', cantidadEsperada: 6.0, cantidadContada: 5.8, status: 'contado' },
  { id: 'ci-14', ingrediente: 'Masa Pizza', unidad: 'und', cantidadEsperada: 35, cantidadContada: 34, status: 'contado' },
  { id: 'ci-15', ingrediente: 'Spaghetti Fresco', unidad: 'kg', cantidadEsperada: 8.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-16', ingrediente: 'Lasagna Porción', unidad: 'und', cantidadEsperada: 22, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-17', ingrediente: 'Ravioli de Carne', unidad: 'und', cantidadEsperada: 18, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-18', ingrediente: 'Hummus', unidad: 'kg', cantidadEsperada: 4.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-19', ingrediente: 'Pan Multicereal', unidad: 'und', cantidadEsperada: 30, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-20', ingrediente: 'Pan Sourdough', unidad: 'und', cantidadEsperada: 18, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-21', ingrediente: 'Volcán de Chocolate', unidad: 'und', cantidadEsperada: 15, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-22', ingrediente: 'Torta de Queso Vasca', unidad: 'und', cantidadEsperada: 10, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-23', ingrediente: 'Helado Vainilla', unidad: 'lt', cantidadEsperada: 3.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-24', ingrediente: 'Carpaccio de Res', unidad: 'und', cantidadEsperada: 12, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-25', ingrediente: 'Chorizo Español', unidad: 'und', cantidadEsperada: 15, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-26', ingrediente: 'Jamón Serrano', unidad: 'kg', cantidadEsperada: 1.8, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-27', ingrediente: 'Pepperoni', unidad: 'kg', cantidadEsperada: 2.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-28', ingrediente: 'Panceta Ahumada', unidad: 'kg', cantidadEsperada: 1.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-29', ingrediente: 'Milanesa de Res', unidad: 'und', cantidadEsperada: 20, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-30', ingrediente: 'Milanesa de Pollo', unidad: 'und', cantidadEsperada: 25, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-31', ingrediente: 'Filete de Pollo', unidad: 'und', cantidadEsperada: 18, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-32', ingrediente: 'Camarón Grande', unidad: 'kg', cantidadEsperada: 2.0, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-33', ingrediente: 'Langostinos', unidad: 'kg', cantidadEsperada: 1.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-34', ingrediente: 'Atún Fresco', unidad: 'kg', cantidadEsperada: 1.8, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-35', ingrediente: 'Vinagreta Olivia', unidad: 'lt', cantidadEsperada: 3.0, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-36', ingrediente: 'Emulsión Balsámica', unidad: 'lt', cantidadEsperada: 1.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-37', ingrediente: 'Mantequilla de Ajo', unidad: 'kg', cantidadEsperada: 2.0, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-38', ingrediente: 'Salsa Pesto', unidad: 'kg', cantidadEsperada: 2.2, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-39', ingrediente: 'Salsa de Trufas', unidad: 'lt', cantidadEsperada: 0.8, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-40', ingrediente: 'Fondo de Vegetales', unidad: 'lt', cantidadEsperada: 5.0, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-41', ingrediente: 'Crema de Tomate', unidad: 'lt', cantidadEsperada: 3.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-42', ingrediente: 'Garbanzos Cocidos', unidad: 'kg', cantidadEsperada: 4.0, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-43', ingrediente: 'Pulpa Fresa-Mango', unidad: 'lt', cantidadEsperada: 4.5, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-44', ingrediente: 'Galleta Pistacho', unidad: 'und', cantidadEsperada: 24, cantidadContada: null, status: 'pendiente' },
  { id: 'ci-45', ingrediente: 'Galleta Red Velvet', unidad: 'und', cantidadEsperada: 20, cantidadContada: null, status: 'pendiente' },
];

export const conteoHistorico: ConteoHistorico[] = [
  { id: 'ch-01', fecha: '2026-04-03', pdv: 'Olivia Laureles', responsable: 'Valentina Gómez', items: 45, status: 'En proceso', varianza: 0 },
  { id: 'ch-02', fecha: '2026-04-02', pdv: 'Olivia Laureles', responsable: 'Valentina Gómez', items: 45, status: 'Completado', varianza: 3.2 },
  { id: 'ch-03', fecha: '2026-04-02', pdv: 'Olivia Viva Envigado', responsable: 'Andrés Marín', items: 42, status: 'Completado', varianza: 4.1 },
  { id: 'ch-04', fecha: '2026-04-02', pdv: 'Clap Laureles', responsable: 'Laura Restrepo', items: 38, status: 'Completado', varianza: 2.8 },
  { id: 'ch-05', fecha: '2026-04-01', pdv: 'Olivia Laureles', responsable: 'Valentina Gómez', items: 45, status: 'Completado', varianza: 5.5 },
  { id: 'ch-06', fecha: '2026-04-01', pdv: 'Olivia Arkadia', responsable: 'Camilo Duque', items: 40, status: 'Completado', varianza: 3.9 },
  { id: 'ch-07', fecha: '2026-04-01', pdv: 'Clap Envigado', responsable: 'Juliana Vélez', items: 36, status: 'Completado', varianza: 2.1 },
  { id: 'ch-08', fecha: '2026-03-31', pdv: 'Olivia Laureles', responsable: 'Valentina Gómez', items: 45, status: 'Completado', varianza: 4.7 },
  { id: 'ch-09', fecha: '2026-03-31', pdv: 'Olivia Viva Envigado', responsable: 'Andrés Marín', items: 42, status: 'Completado', varianza: 6.2 },
  { id: 'ch-10', fecha: '2026-03-31', pdv: 'Olivia 10b', responsable: 'Santiago Pérez', items: 38, status: 'Completado', varianza: 3.5 },
  { id: 'ch-11', fecha: '2026-03-30', pdv: 'Olivia Laureles', responsable: 'Valentina Gómez', items: 45, status: 'Completado', varianza: 2.9 },
  { id: 'ch-12', fecha: '2026-03-30', pdv: 'Clap Laureles', responsable: 'Laura Restrepo', items: 38, status: 'Completado', varianza: 1.8 },
];
