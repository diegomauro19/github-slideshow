'use client';

import { Users, Shield, UserCheck, Clock } from 'lucide-react';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const ACCENT_BLUE = '#2980B9';
const AMBER = '#F39C12';

const users = [
  { id: 1, nombre: 'Carlos Mejía', email: 'carlos.mejia@mysticfoods.co', rol: 'Administrador', pdv: 'Todos', estado: 'Activo', ultimoAcceso: '2026-04-03 14:32' },
  { id: 2, nombre: 'María López', email: 'maria.lopez@mysticfoods.co', rol: 'Operador CDP', pdv: 'CDP', estado: 'Activo', ultimoAcceso: '2026-04-03 14:28' },
  { id: 3, nombre: 'Andrés García', email: 'andres.garcia@mysticfoods.co', rol: 'Jefe de Local', pdv: 'Olivia Laureles', estado: 'Activo', ultimoAcceso: '2026-04-03 13:55' },
  { id: 4, nombre: 'Diana Torres', email: 'diana.torres@mysticfoods.co', rol: 'Jefe de Local', pdv: 'Clap Laureles', estado: 'Activo', ultimoAcceso: '2026-04-03 13:30' },
  { id: 5, nombre: 'Juan Pérez', email: 'juan.perez@mysticfoods.co', rol: 'Operador', pdv: 'Olivia Viva Envigado', estado: 'Activo', ultimoAcceso: '2026-04-03 12:45' },
  { id: 6, nombre: 'Laura Sánchez', email: 'laura.sanchez@mysticfoods.co', rol: 'Gerente Operaciones', pdv: 'Todos', estado: 'Activo', ultimoAcceso: '2026-04-03 11:20' },
  { id: 7, nombre: 'Felipe Ríos', email: 'felipe.rios@mysticfoods.co', rol: 'Operador', pdv: 'Olivia Arkadia', estado: 'Inactivo', ultimoAcceso: '2026-03-28 09:15' },
  { id: 8, nombre: 'Valentina Muñoz', email: 'valentina.munoz@mysticfoods.co', rol: 'Auditor', pdv: 'Todos', estado: 'Activo', ultimoAcceso: '2026-04-02 16:40' },
];

function rolBadge(rol: string) {
  if (rol === 'Administrador') return 'bg-red-100 text-red-700';
  if (rol === 'Gerente Operaciones') return 'bg-purple-100 text-purple-700';
  if (rol === 'Jefe de Local') return 'bg-blue-100 text-blue-700';
  if (rol === 'Operador CDP') return 'bg-teal-100 text-teal-700';
  if (rol === 'Auditor') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-700';
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function PerfilesPage() {
  const active = users.filter(u => u.estado === 'Activo').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Gestión de Perfiles</h1>
          <p className="text-gray-500 mt-1">
            {active} usuarios activos de {users.length} registrados
          </p>
        </div>
        <button
          className="px-4 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ACCENT_BLUE }}
        >
          + Nuevo Usuario
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 font-medium text-gray-500">Nombre</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Email</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Rol</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">PdV asignado</th>
                <th className="text-center px-6 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Último acceso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: u.estado === 'Activo' ? ACCENT_BLUE : '#9CA3AF' }}
                      >
                        {initials(u.nombre)}
                      </div>
                      <span className="font-medium text-gray-900">{u.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{u.email}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${rolBadge(u.rol)}`}>
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{u.pdv}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                      u.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${u.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-gray-400" />
                      {u.ultimoAcceso}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
