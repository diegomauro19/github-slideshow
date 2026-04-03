export interface Pattern {
  id: string;
  name: string;
  tipo: string;
  ingredient: string;
  pdv: string;
  frecuencia: string;
  impactoMensual: number;
  confianza: number;
  accionSugerida: string;
  selected?: boolean;
}

export const patterns: Pattern[] = [
  { id: 'p1', name: 'Sobreconsumo sistemático', tipo: 'Turno noche', ingredient: 'Solomito', pdv: 'Olivia Laureles', frecuencia: 'Diario', impactoMensual: 450000, confianza: 92, accionSugerida: 'Verificar porcionamiento' },
  { id: 'p2', name: 'Pico semanal', tipo: 'Viernes-Sábado', ingredient: 'Queso Parmesano', pdv: 'Todos', frecuencia: 'Semanal', impactoMensual: 180000, confianza: 88, accionSugerida: 'Ajustar pedido viernes' },
  { id: 'p3', name: 'Merma en tránsito', tipo: 'CDP→PdV', ingredient: 'Pollo Pechuga', pdv: 'Viva Envigado', frecuencia: '3x/semana', impactoMensual: 120000, confianza: 76, accionSugerida: 'Verificar cadena de frío' },
  { id: 'p4', name: 'Sobreconsumo salsas', tipo: 'Turno tarde', ingredient: 'Salsa Bolognesa', pdv: 'Olivia Arkadia', frecuencia: 'Diario', impactoMensual: 95000, confianza: 84, accionSugerida: 'Estandarizar porciones salsa' },
  { id: 'p5', name: 'Desperdicio bebidas', tipo: 'Fin de semana', ingredient: 'Pulpa Fresa-Mango', pdv: 'Clap Laureles', frecuencia: 'Semanal', impactoMensual: 67000, confianza: 71, accionSugerida: 'Preparar bajo demanda' },
  { id: 'p6', name: 'Merma por corte', tipo: 'Todo el día', ingredient: 'Aguacate', pdv: 'Olivia Laureles', frecuencia: 'Diario', impactoMensual: 156000, confianza: 82, accionSugerida: 'Capacitar en corte de aguacate' },
  { id: 'p7', name: 'Sobreporcionamiento', tipo: 'Turno mañana', ingredient: 'Tocineta', pdv: 'Clap Envigado', frecuencia: 'Diario', impactoMensual: 89000, confianza: 79, accionSugerida: 'Revisar gramaje hamburguesas' },
];

export const heatmapData = [
  // [day, hour, intensity]
  { day: 'Lun', hour: '10:00', value: 15 },
  { day: 'Lun', hour: '12:00', value: 35 },
  { day: 'Lun', hour: '14:00', value: 25 },
  { day: 'Lun', hour: '18:00', value: 45 },
  { day: 'Lun', hour: '20:00', value: 65 },
  { day: 'Mar', hour: '10:00', value: 12 },
  { day: 'Mar', hour: '12:00', value: 38 },
  { day: 'Mar', hour: '14:00', value: 22 },
  { day: 'Mar', hour: '18:00', value: 48 },
  { day: 'Mar', hour: '20:00', value: 70 },
  { day: 'Mié', hour: '10:00', value: 18 },
  { day: 'Mié', hour: '12:00', value: 42 },
  { day: 'Mié', hour: '14:00', value: 28 },
  { day: 'Mié', hour: '18:00', value: 52 },
  { day: 'Mié', hour: '20:00', value: 68 },
  { day: 'Jue', hour: '10:00', value: 14 },
  { day: 'Jue', hour: '12:00', value: 36 },
  { day: 'Jue', hour: '14:00', value: 24 },
  { day: 'Jue', hour: '18:00', value: 50 },
  { day: 'Jue', hour: '20:00', value: 72 },
  { day: 'Vie', hour: '10:00', value: 22 },
  { day: 'Vie', hour: '12:00', value: 55 },
  { day: 'Vie', hour: '14:00', value: 38 },
  { day: 'Vie', hour: '18:00', value: 75 },
  { day: 'Vie', hour: '20:00', value: 92 },
  { day: 'Sáb', hour: '10:00', value: 28 },
  { day: 'Sáb', hour: '12:00', value: 62 },
  { day: 'Sáb', hour: '14:00', value: 45 },
  { day: 'Sáb', hour: '18:00', value: 85 },
  { day: 'Sáb', hour: '20:00', value: 98 },
  { day: 'Dom', hour: '10:00', value: 20 },
  { day: 'Dom', hour: '12:00', value: 48 },
  { day: 'Dom', hour: '14:00', value: 32 },
  { day: 'Dom', hour: '18:00', value: 58 },
  { day: 'Dom', hour: '20:00', value: 45 },
];

export const PATTERN_STATS = {
  activos: 7,
  alertasSemana: 12,
  ingredientesMonitoreados: 156,
  precisionModelo: 87,
};
