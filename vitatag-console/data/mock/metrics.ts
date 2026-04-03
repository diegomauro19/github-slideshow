export interface FlowMetric {
  product: string;
  saltos: number;
  pasoOmitido: string;
  local: string;
  categoria: string;
}

export const flowMetrics: FlowMetric[] = [
  { product: 'Solomito x 5 und', saltos: 8, pasoOmitido: 'Verificación de temperatura', local: 'Olivia Laureles', categoria: 'Congelados' },
  { product: 'Pollo Pechuga x 10 und', saltos: 5, pasoOmitido: 'Escaneo en recepción', local: 'Olivia Viva Envigado', categoria: 'Congelados' },
  { product: 'Salmón Fresco x kg', saltos: 12, pasoOmitido: 'Control de cadena de frío', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Queso Parmesano x 250g', saltos: 3, pasoOmitido: 'Verificación de lote', local: 'Clap Laureles', categoria: 'Refrigerados' },
  { product: 'Masa Pizza x und', saltos: 6, pasoOmitido: 'Escaneo en despacho', local: 'Olivia Arkadia', categoria: 'Congelados' },
  { product: 'Salsa Bolognesa x 500g', saltos: 4, pasoOmitido: 'Confirmación de cantidad', local: 'Olivia Laureles', categoria: 'Congelados' },
  { product: 'Aguacate Hass x und', saltos: 9, pasoOmitido: 'Inspección de calidad', local: 'Clap Laureles', categoria: 'Refrigerados' },
  { product: 'Hummus x 500g', saltos: 2, pasoOmitido: 'Escaneo en almacén', local: 'Olivia Viva Envigado', categoria: 'Refrigerados' },
  { product: 'Lasagna Porción x 350g', saltos: 7, pasoOmitido: 'Verificación de temperatura', local: 'Olivia Laureles', categoria: 'Congelados' },
  { product: 'Tocineta Ahumada x kg', saltos: 5, pasoOmitido: 'Escaneo en recepción', local: 'Clap Envigado', categoria: 'Refrigerados' },
  { product: 'Rúgula x 250g', saltos: 11, pasoOmitido: 'Inspección de calidad', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Volcán de Chocolate x und', saltos: 3, pasoOmitido: 'Escaneo en despacho', local: 'Olivia Arkadia', categoria: 'Congelados' },
  { product: 'Chorizo Español x 6 und', saltos: 4, pasoOmitido: 'Verificación de temperatura', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Milanesa de Res x 6 und', saltos: 6, pasoOmitido: 'Confirmación de cantidad', local: 'Olivia 10b', categoria: 'Congelados' },
  { product: 'Spaghetti Fresco x 500g', saltos: 2, pasoOmitido: 'Escaneo en recepción', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Ravioli de Carne x 500g', saltos: 5, pasoOmitido: 'Verificación de lote', local: 'Olivia Viva Envigado', categoria: 'Congelados' },
  { product: 'Pan Multicereal x 6 und', saltos: 3, pasoOmitido: 'Escaneo en despacho', local: 'Olivia Laureles', categoria: 'Congelados' },
  { product: 'Camarón Grande x kg', saltos: 8, pasoOmitido: 'Control de cadena de frío', local: 'Olivia Viva Envigado', categoria: 'Congelados' },
  { product: 'Atún Fresco x kg', saltos: 10, pasoOmitido: 'Verificación de temperatura', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Queso Cheddar x 500g', saltos: 2, pasoOmitido: 'Escaneo en almacén', local: 'Clap Laureles', categoria: 'Refrigerados' },
  { product: 'Carpaccio de Res x 200g', saltos: 4, pasoOmitido: 'Verificación de temperatura', local: 'Olivia Arkadia', categoria: 'Congelados' },
  { product: 'Pepperoni x 500g', saltos: 3, pasoOmitido: 'Escaneo en recepción', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Langostinos x kg', saltos: 7, pasoOmitido: 'Control de cadena de frío', local: 'Olivia Laureles', categoria: 'Congelados' },
  { product: 'Salsa Alfredo x 500g', saltos: 1, pasoOmitido: 'Confirmación de cantidad', local: 'Olivia Viva Envigado', categoria: 'Congelados' },
  { product: 'Mantequilla sin sal x 500g', saltos: 2, pasoOmitido: 'Escaneo en recepción', local: 'Clap Laureles', categoria: 'Refrigerados' },
  { product: 'Helado Vainilla x lt', saltos: 4, pasoOmitido: 'Verificación de temperatura', local: 'Clap Laureles', categoria: 'Congelados' },
  { product: 'Pulpa Fresa-Mango x lt', saltos: 3, pasoOmitido: 'Escaneo en despacho', local: 'Clap Laureles', categoria: 'Congelados' },
  { product: 'Yogurt Griego x lt', saltos: 5, pasoOmitido: 'Inspección de calidad', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Pan Sourdough x und', saltos: 1, pasoOmitido: 'Escaneo en recepción', local: 'Olivia Laureles', categoria: 'Congelados' },
  { product: 'Bondiola de Cerdo x kg', saltos: 6, pasoOmitido: 'Verificación de temperatura', local: 'Olivia Laureles', categoria: 'Congelados' },
  { product: 'Queso Azul x 250g', saltos: 2, pasoOmitido: 'Verificación de lote', local: 'Olivia Laureles', categoria: 'Refrigerados' },
  { product: 'Salsa Pesto x 250g', saltos: 1, pasoOmitido: 'Escaneo en almacén', local: 'Olivia Laureles', categoria: 'Refrigerados' },
];
