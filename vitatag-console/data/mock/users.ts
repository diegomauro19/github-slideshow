export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Gerente' | 'Operador' | 'Chef' | 'Viewer';
  pdvs: string[];
  status: 'Activo' | 'Inactivo';
  lastAccess: string;
  avatar?: string;
}

export const users: User[] = [
  { id: 'usr-001', name: 'Carlos Mejía', email: 'carlos.mejia@olivia.co', role: 'Administrador', pdvs: ['Todos'], status: 'Activo', lastAccess: '2026-04-03T14:30:00' },
  { id: 'usr-002', name: 'Ana Torres', email: 'ana.torres@olivia.co', role: 'Gerente', pdvs: ['Olivia Laureles', 'Olivia Viva Envigado'], status: 'Activo', lastAccess: '2026-04-03T14:15:00' },
  { id: 'usr-003', name: 'Diego Ríos', email: 'diego.rios@olivia.co', role: 'Operador', pdvs: ['CDP'], status: 'Activo', lastAccess: '2026-04-03T13:45:00' },
  { id: 'usr-004', name: 'Valentina Gómez', email: 'valentina.gomez@olivia.co', role: 'Chef', pdvs: ['Olivia Laureles'], status: 'Activo', lastAccess: '2026-04-03T12:30:00' },
  { id: 'usr-005', name: 'María López', email: 'maria.lopez@olivia.co', role: 'Gerente', pdvs: ['Olivia Arkadia', 'Olivia 10b'], status: 'Activo', lastAccess: '2026-04-03T11:00:00' },
  { id: 'usr-006', name: 'Andrés Marín', email: 'andres.marin@olivia.co', role: 'Chef', pdvs: ['Olivia Viva Envigado'], status: 'Activo', lastAccess: '2026-04-03T10:30:00' },
  { id: 'usr-007', name: 'Laura Restrepo', email: 'laura.restrepo@clap.co', role: 'Gerente', pdvs: ['Clap Laureles', 'Clap Envigado'], status: 'Activo', lastAccess: '2026-04-03T09:15:00' },
  { id: 'usr-008', name: 'Camilo Duque', email: 'camilo.duque@olivia.co', role: 'Operador', pdvs: ['CDP'], status: 'Activo', lastAccess: '2026-04-02T22:00:00' },
  { id: 'usr-009', name: 'Juliana Vélez', email: 'juliana.velez@clap.co', role: 'Chef', pdvs: ['Clap Envigado'], status: 'Activo', lastAccess: '2026-04-02T18:00:00' },
  { id: 'usr-010', name: 'Santiago Pérez', email: 'santiago.perez@olivia.co', role: 'Operador', pdvs: ['Olivia 10b'], status: 'Activo', lastAccess: '2026-04-02T16:00:00' },
  { id: 'usr-011', name: 'Fernando Castro', email: 'fernando.castro@olivia.co', role: 'Viewer', pdvs: ['Todos'], status: 'Activo', lastAccess: '2026-04-01T10:00:00' },
  { id: 'usr-012', name: 'Patricia Henao', email: 'patricia.henao@olivia.co', role: 'Gerente', pdvs: ['Olivia Amsterdam', 'Olivia San Lucas'], status: 'Inactivo', lastAccess: '2026-03-28T14:00:00' },
];
