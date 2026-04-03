export interface Location {
  id: string;
  name: string;
  brand: 'Olivia' | 'Clap';
  city: string;
  address?: string;
  lat?: number;
  lng?: number;
  status: 'active' | 'inactive';
  lastUpdate: string;
  devicesOnline: number;
  devicesTotal: number;
}

export const locations: Location[] = [
  { id: 'oli-laureles', name: 'Olivia Laureles', brand: 'Olivia', city: 'Medellín', lat: 6.2442, lng: -75.5912, status: 'active', lastUpdate: '2026-04-03T14:32:00', devicesOnline: 3, devicesTotal: 3 },
  { id: 'oli-viva', name: 'Olivia Viva Envigado', brand: 'Olivia', city: 'Envigado', lat: 6.1684, lng: -75.5874, status: 'active', lastUpdate: '2026-04-03T14:28:00', devicesOnline: 2, devicesTotal: 3 },
  { id: 'oli-arkadia', name: 'Olivia Arkadia', brand: 'Olivia', city: 'Medellín', lat: 6.1877, lng: -75.5827, status: 'active', lastUpdate: '2026-04-03T14:30:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'oli-10b', name: 'Olivia 10b', brand: 'Olivia', city: 'Medellín', lat: 6.2518, lng: -75.5636, status: 'active', lastUpdate: '2026-04-03T14:25:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'oli-amsterdam', name: 'Olivia Amsterdam', brand: 'Olivia', city: 'Medellín', lat: 6.2105, lng: -75.5702, status: 'active', lastUpdate: '2026-04-03T14:31:00', devicesOnline: 1, devicesTotal: 2 },
  { id: 'oli-sanlucas', name: 'Olivia San Lucas', brand: 'Olivia', city: 'Medellín', lat: 6.1959, lng: -75.5621, status: 'active', lastUpdate: '2026-04-03T14:29:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'oli-mayorca', name: 'Olivia Mayorca', brand: 'Olivia', city: 'Sabaneta', lat: 6.1515, lng: -75.6173, status: 'active', lastUpdate: '2026-04-03T14:27:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'oli-oviedo', name: 'Olivia Oviedo', brand: 'Olivia', city: 'Medellín', lat: 6.1994, lng: -75.5572, status: 'active', lastUpdate: '2026-04-03T14:26:00', devicesOnline: 1, devicesTotal: 2 },
  { id: 'oli-fabricato', name: 'Olivia Fabricato', brand: 'Olivia', city: 'Bello', lat: 6.3356, lng: -75.5553, status: 'active', lastUpdate: '2026-04-03T14:24:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'oli-tesoro', name: 'Olivia Tesoro', brand: 'Olivia', city: 'Medellín', lat: 6.1967, lng: -75.5649, status: 'active', lastUpdate: '2026-04-03T14:33:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'oli-zona2', name: 'Olivia Zona 2', brand: 'Olivia', city: 'Medellín', lat: 6.2300, lng: -75.5750, status: 'active', lastUpdate: '2026-04-03T14:20:00', devicesOnline: 1, devicesTotal: 2 },
  { id: 'oli-lennon', name: 'Olivia Lennon', brand: 'Olivia', city: 'Medellín', lat: 6.2080, lng: -75.5680, status: 'active', lastUpdate: '2026-04-03T14:22:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'oli-manila', name: 'Olivia Manila', brand: 'Olivia', city: 'Medellín', lat: 6.2150, lng: -75.5730, status: 'active', lastUpdate: '2026-04-03T14:18:00', devicesOnline: 1, devicesTotal: 2 },
  { id: 'oli-baq', name: 'Barranquilla Olivia Viva', brand: 'Olivia', city: 'Barranquilla', lat: 10.9878, lng: -74.7889, status: 'active', lastUpdate: '2026-04-03T14:15:00', devicesOnline: 2, devicesTotal: 3 },
  { id: 'clap-laureles', name: 'Clap Laureles', brand: 'Clap', city: 'Medellín', lat: 6.2448, lng: -75.5905, status: 'active', lastUpdate: '2026-04-03T14:34:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'clap-envigado', name: 'Clap Envigado', brand: 'Clap', city: 'Envigado', lat: 6.1690, lng: -75.5880, status: 'active', lastUpdate: '2026-04-03T14:30:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'clap-visitacion', name: 'Clap Visitación', brand: 'Clap', city: 'Medellín', lat: 6.2055, lng: -75.5668, status: 'active', lastUpdate: '2026-04-03T14:28:00', devicesOnline: 1, devicesTotal: 2 },
  { id: 'clap-industriales', name: 'Clap Industriales', brand: 'Clap', city: 'Medellín', lat: 6.2375, lng: -75.5763, status: 'active', lastUpdate: '2026-04-03T14:25:00', devicesOnline: 2, devicesTotal: 2 },
  { id: 'clap-sebastiana', name: 'Clap Sebastiana', brand: 'Clap', city: 'Medellín', lat: 6.2130, lng: -75.5710, status: 'inactive', lastUpdate: '2026-04-02T22:45:00', devicesOnline: 0, devicesTotal: 2 },
];

export const CDP_LOCATION = {
  id: 'cdp-main',
  name: 'Centro de Producción (CDP)',
  city: 'Medellín',
  lat: 6.2200,
  lng: -75.5800,
  zones: ['Nevera 1', 'Nevera 2', 'Nevera 3', 'Logística', 'Picking', 'Despacho'],
};
