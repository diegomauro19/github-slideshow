export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'variance' | 'info' | 'success';
  title: string;
  message: string;
  recommendation: string;
  timestamp: string;
  timeAgo: string;
  actions: string[];
}

export const alerts: Alert[] = [
  {
    id: 'a1', type: 'critical', title: 'Agotado inminente — Salmón Fresco',
    message: 'Salmón fresco se agota a las 6PM. 4 recetas afectadas. $1.2M en riesgo.',
    recommendation: 'Solicitar reposición urgente al CDP.',
    timestamp: '2026-04-03T14:15:00', timeAgo: 'Hace 15 min',
    actions: ['Solicitar reposición', 'Desactivar platos', 'Ignorar'],
  },
  {
    id: 'a2', type: 'critical', title: 'Rúgula — Stock crítico',
    message: 'Rúgula con solo 0.8 kg en stock. 3 recetas dependen de este ingrediente.',
    recommendation: 'Compra de emergencia o sustituto temporal.',
    timestamp: '2026-04-03T13:45:00', timeAgo: 'Hace 45 min',
    actions: ['Solicitar reposición', 'Sugerir sustituto', 'Ignorar'],
  },
  {
    id: 'a3', type: 'variance', title: 'Varianza alta — Solomito',
    message: 'Solomito: varianza +23% esta semana en Olivia Laureles. Patrón detectado: sobreconsumo en turno noche. Impacto: $450K/mes.',
    recommendation: 'Verificar porcionamiento con chef de turno.',
    timestamp: '2026-04-03T12:30:00', timeAgo: 'Hace 2h',
    actions: ['Ver detalle', 'Marcar como revisado'],
  },
  {
    id: 'a4', type: 'warning', title: 'Queso Parmesano — Stock bajo',
    message: 'Queso Parmesano: 2 kg restantes. Se agota mañana a las 2:00 PM. 8 recetas afectadas.',
    recommendation: 'Incluir en próximo pedido al proveedor.',
    timestamp: '2026-04-03T11:00:00', timeAgo: 'Hace 3h 30min',
    actions: ['Agregar a pedido', 'Ver recetas afectadas'],
  },
  {
    id: 'a5', type: 'info', title: 'Conteo de cierre completado',
    message: 'Conteo de cierre de Olivia Viva Envigado completado. Varianza del día: $85,000 (3.2%). Dentro del rango aceptable.',
    recommendation: '',
    timestamp: '2026-04-03T10:30:00', timeAgo: 'Hace 4h',
    actions: ['Ver detalle'],
  },
  {
    id: 'a6', type: 'variance', title: 'Varianza — Tocineta en Clap Envigado',
    message: 'Tocineta muestra sobreporcionamiento constante en turno mañana. Varianza +21.5%. Impacto: $89K/mes.',
    recommendation: 'Revisar gramaje en hamburguesas.',
    timestamp: '2026-04-03T09:15:00', timeAgo: 'Hace 5h 15min',
    actions: ['Ver patrón', 'Marcar como revisado'],
  },
  {
    id: 'a7', type: 'success', title: 'Pedido recibido — Olivia Laureles',
    message: 'Pedido PED-2856 recibido y verificado. 45 productos, 0 diferencias.',
    recommendation: '',
    timestamp: '2026-04-03T08:00:00', timeAgo: 'Hace 6h 30min',
    actions: ['Ver pedido'],
  },
  {
    id: 'a8', type: 'warning', title: 'Masa Pizza — Vencimiento próximo',
    message: '32 unidades de Masa Pizza vencen el 15 de abril. Uso prioritario recomendado.',
    recommendation: 'Programar promoción o uso interno.',
    timestamp: '2026-04-03T07:30:00', timeAgo: 'Hace 7h',
    actions: ['Marcar prioridad', 'Ignorar'],
  },
  {
    id: 'a9', type: 'info', title: 'Nuevo patrón detectado',
    message: 'Motor de patrones detectó nuevo patrón: Merma por corte en Aguacate en Olivia Laureles. Confianza: 82%.',
    recommendation: 'Capacitar en técnica de corte.',
    timestamp: '2026-04-02T22:00:00', timeAgo: 'Hace 16h',
    actions: ['Ver patrón', 'Descartar'],
  },
  {
    id: 'a10', type: 'critical', title: 'Ventas perdidas — Sábado 29 marzo',
    message: 'Se perdieron $680,000 en ventas el sábado pasado por agotados de Salmón y Aguacate.',
    recommendation: 'Ajustar pedido para próximos fines de semana.',
    timestamp: '2026-04-02T18:00:00', timeAgo: 'Hace 20h',
    actions: ['Ver análisis', 'Ajustar pedido'],
  },
];

export const alertThresholds = {
  varianzaPct: 10,
  stockDias: 2,
  ventasPerdidasCOP: 500000,
};
