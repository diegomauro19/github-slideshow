export interface Device {
  id: string;
  name: string;
  type: 'scanner' | 'printer' | 'tablet' | 'phone';
  location: string;
  status: 'online' | 'offline';
  battery: number;
  lastSeen: string;
  model: string;
  serialNumber: string;
}

export const devices: Device[] = [
  { id: 'dev-001', name: 'Scanner CDP-1', type: 'scanner', location: 'CDP Nevera 1', status: 'online', battery: 87, lastSeen: '2026-04-03T14:30:00', model: 'Zebra TC21', serialNumber: 'ZBR-TC21-00145' },
  { id: 'dev-002', name: 'Scanner CDP-2', type: 'scanner', location: 'CDP Nevera 2', status: 'online', battery: 62, lastSeen: '2026-04-03T14:28:00', model: 'Zebra TC21', serialNumber: 'ZBR-TC21-00146' },
  { id: 'dev-003', name: 'Scanner Logística', type: 'scanner', location: 'CDP Logística', status: 'online', battery: 94, lastSeen: '2026-04-03T14:32:00', model: 'Zebra TC26', serialNumber: 'ZBR-TC26-00089' },
  { id: 'dev-004', name: 'Printer CDP-1', type: 'printer', location: 'CDP Despacho', status: 'online', battery: 100, lastSeen: '2026-04-03T14:31:00', model: 'Zebra ZD421', serialNumber: 'ZBR-ZD421-00312' },
  { id: 'dev-005', name: 'Printer CDP-2', type: 'printer', location: 'CDP Picking', status: 'online', battery: 100, lastSeen: '2026-04-03T14:29:00', model: 'Zebra ZD421', serialNumber: 'ZBR-ZD421-00313' },
  { id: 'dev-006', name: 'Tablet Olivia Laureles', type: 'tablet', location: 'Olivia Laureles', status: 'online', battery: 73, lastSeen: '2026-04-03T14:33:00', model: 'Samsung Galaxy Tab A8', serialNumber: 'SAM-TBA8-01287' },
  { id: 'dev-007', name: 'Tablet Olivia Viva', type: 'tablet', location: 'Olivia Viva Envigado', status: 'online', battery: 45, lastSeen: '2026-04-03T14:25:00', model: 'Samsung Galaxy Tab A8', serialNumber: 'SAM-TBA8-01288' },
  { id: 'dev-008', name: 'Tablet Clap Laureles', type: 'tablet', location: 'Clap Laureles', status: 'online', battery: 58, lastSeen: '2026-04-03T14:30:00', model: 'Samsung Galaxy Tab A8', serialNumber: 'SAM-TBA8-01289' },
  { id: 'dev-009', name: 'Phone Gerente CDP', type: 'phone', location: 'CDP', status: 'online', battery: 81, lastSeen: '2026-04-03T14:34:00', model: 'Samsung Galaxy A54', serialNumber: 'SAM-A54-05672' },
  { id: 'dev-010', name: 'Phone Gerente Olivia', type: 'phone', location: 'Olivia Laureles', status: 'online', battery: 34, lastSeen: '2026-04-03T14:20:00', model: 'Samsung Galaxy A54', serialNumber: 'SAM-A54-05673' },
  { id: 'dev-011', name: 'Scanner Olivia Laureles', type: 'scanner', location: 'Olivia Laureles', status: 'offline', battery: 12, lastSeen: '2026-04-03T08:45:00', model: 'Zebra TC21', serialNumber: 'ZBR-TC21-00147' },
  { id: 'dev-012', name: 'Printer Olivia Laureles', type: 'printer', location: 'Olivia Laureles', status: 'online', battery: 100, lastSeen: '2026-04-03T14:32:00', model: 'Zebra ZD421', serialNumber: 'ZBR-ZD421-00314' },
  { id: 'dev-013', name: 'Tablet Olivia Arkadia', type: 'tablet', location: 'Olivia Arkadia', status: 'online', battery: 91, lastSeen: '2026-04-03T14:28:00', model: 'Samsung Galaxy Tab A8', serialNumber: 'SAM-TBA8-01290' },
  { id: 'dev-014', name: 'Scanner Clap Envigado', type: 'scanner', location: 'Clap Envigado', status: 'offline', battery: 0, lastSeen: '2026-04-02T22:15:00', model: 'Zebra TC21', serialNumber: 'ZBR-TC21-00148' },
  { id: 'dev-015', name: 'Tablet Olivia 10b', type: 'tablet', location: 'Olivia 10b', status: 'online', battery: 67, lastSeen: '2026-04-03T14:26:00', model: 'Samsung Galaxy Tab A8', serialNumber: 'SAM-TBA8-01291' },
];
