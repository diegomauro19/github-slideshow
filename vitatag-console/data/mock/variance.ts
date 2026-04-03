export interface VarianceItem {
  id: string;
  ingredient: string;
  consumoTeorico: number;
  consumoReal: number;
  varianzaKg: number;
  varianzaPct: number;
  varianzaCOP: number;
  tendencia: 'empeorando' | 'estable' | 'mejorando';
}

export const varianceData: VarianceItem[] = [
  { id: 'v1', ingredient: 'Solomito', consumoTeorico: 45.2, consumoReal: 55.6, varianzaKg: 10.4, varianzaPct: 23.0, varianzaCOP: 450000, tendencia: 'empeorando' },
  { id: 'v2', ingredient: 'Pollo Pechuga', consumoTeorico: 120.5, consumoReal: 138.2, varianzaKg: 17.7, varianzaPct: 14.7, varianzaCOP: 380000, tendencia: 'estable' },
  { id: 'v3', ingredient: 'Queso Parmesano', consumoTeorico: 8.3, consumoReal: 10.5, varianzaKg: 2.2, varianzaPct: 26.5, varianzaCOP: 210000, tendencia: 'empeorando' },
  { id: 'v4', ingredient: 'Salmón Fresco', consumoTeorico: 22.1, consumoReal: 26.8, varianzaKg: 4.7, varianzaPct: 21.3, varianzaCOP: 445000, tendencia: 'empeorando' },
  { id: 'v5', ingredient: 'Tocineta', consumoTeorico: 15.8, consumoReal: 19.2, varianzaKg: 3.4, varianzaPct: 21.5, varianzaCOP: 153000, tendencia: 'estable' },
  { id: 'v6', ingredient: 'Mantequilla', consumoTeorico: 12.4, consumoReal: 14.8, varianzaKg: 2.4, varianzaPct: 19.4, varianzaCOP: 67200, tendencia: 'mejorando' },
  { id: 'v7', ingredient: 'Aguacate', consumoTeorico: 95, consumoReal: 108, varianzaKg: 13, varianzaPct: 13.7, varianzaCOP: 195000, tendencia: 'estable' },
  { id: 'v8', ingredient: 'Queso Cheddar', consumoTeorico: 18.5, consumoReal: 21.3, varianzaKg: 2.8, varianzaPct: 15.1, varianzaCOP: 89600, tendencia: 'estable' },
  { id: 'v9', ingredient: 'Helado Vainilla', consumoTeorico: 25.0, consumoReal: 29.5, varianzaKg: 4.5, varianzaPct: 18.0, varianzaCOP: 81000, tendencia: 'mejorando' },
  { id: 'v10', ingredient: 'Masa Pizza', consumoTeorico: 180, consumoReal: 195, varianzaKg: 15, varianzaPct: 8.3, varianzaCOP: 42000, tendencia: 'estable' },
  { id: 'v11', ingredient: 'Rúgula', consumoTeorico: 5.2, consumoReal: 4.8, varianzaKg: -0.4, varianzaPct: -7.7, varianzaCOP: -18000, tendencia: 'estable' },
  { id: 'v12', ingredient: 'Pan Sourdough', consumoTeorico: 120, consumoReal: 112, varianzaKg: -8, varianzaPct: -6.7, varianzaCOP: -9600, tendencia: 'mejorando' },
  { id: 'v13', ingredient: 'Chorizo Español', consumoTeorico: 8.5, consumoReal: 10.2, varianzaKg: 1.7, varianzaPct: 20.0, varianzaCOP: 136000, tendencia: 'empeorando' },
  { id: 'v14', ingredient: 'Carpaccio', consumoTeorico: 78, consumoReal: 85, varianzaKg: 7, varianzaPct: 9.0, varianzaCOP: 84000, tendencia: 'estable' },
  { id: 'v15', ingredient: 'Langostinos', consumoTeorico: 12.3, consumoReal: 14.1, varianzaKg: 1.8, varianzaPct: 14.6, varianzaCOP: 162000, tendencia: 'estable' },
];

export const varianceDailyTrend = [
  { date: 'Mar 7', value: 285000 },
  { date: 'Mar 8', value: 312000 },
  { date: 'Mar 9', value: 298000 },
  { date: 'Mar 10', value: 345000 },
  { date: 'Mar 11', value: 278000 },
  { date: 'Mar 12', value: 325000 },
  { date: 'Mar 13', value: 356000 },
  { date: 'Mar 14', value: 410000 },
  { date: 'Mar 15', value: 389000 },
  { date: 'Mar 16', value: 445000 },
  { date: 'Mar 17', value: 367000 },
  { date: 'Mar 18', value: 312000 },
  { date: 'Mar 19', value: 298000 },
  { date: 'Mar 20', value: 378000 },
  { date: 'Mar 21', value: 423000 },
  { date: 'Mar 22', value: 512000 },
  { date: 'Mar 23', value: 489000 },
  { date: 'Mar 24', value: 356000 },
  { date: 'Mar 25', value: 334000 },
  { date: 'Mar 26', value: 312000 },
  { date: 'Mar 27', value: 378000 },
  { date: 'Mar 28', value: 345000 },
  { date: 'Mar 29', value: 467000 },
  { date: 'Mar 30', value: 523000 },
  { date: 'Mar 31', value: 412000 },
  { date: 'Abr 1', value: 389000 },
  { date: 'Abr 2', value: 345000 },
  { date: 'Abr 3', value: 298000 },
];

export const varianceByLocation = [
  { pdv: 'Olivia Viva Envigado', varianzaTotal: 1250000, topIngredient: 'Solomito', tendencia: 'empeorando' as const },
  { pdv: 'Olivia Laureles', varianzaTotal: 980000, topIngredient: 'Queso Parmesano', tendencia: 'estable' as const },
  { pdv: 'Clap Laureles', varianzaTotal: 720000, topIngredient: 'Tocineta', tendencia: 'mejorando' as const },
  { pdv: 'Olivia Arkadia', varianzaTotal: 450000, topIngredient: 'Pollo Pechuga', tendencia: 'estable' as const },
  { pdv: 'Clap Envigado', varianzaTotal: 320000, topIngredient: 'Queso Cheddar', tendencia: 'mejorando' as const },
];

export const VARIANCE_STATS = {
  totalCOP: 2847000,
  totalPct: 8.3,
  topIngredient: 'Solomito (+23%)',
  topPdV: 'Olivia Viva Envigado',
};
