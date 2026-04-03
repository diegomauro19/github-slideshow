'use client';

import { useState, useMemo } from 'react';
import { Users, Shield, UserCheck, Clock, Search, Pencil, Trash2, X } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import { useToast } from '@/components/shared/Toast';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const ACCENT_BLUE = '#2980B9';
const AMBER = '#F39C12';

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  pdv: string;
  estado: 'Activo' | 'Inactivo';
  ultimoAcceso: string;
}

const initialUsers: User[] = [
  { id: 1, nombre: 'Carlos Mejía', email: 'carlos.mejia@mysticfoods.co', rol: 'Administrador', pdv: 'Todos', estado: 'Activo', ultimoAcceso: '2026-04-03 14:32' },
  { id: 2, nombre: 'María López', email: 'maria.lopez@mysticfoods.co', rol: 'Operador CDP', pdv: 'CDP', estado: 'Activo', ultimoAcceso: '2026-04-03 14:28' },
  { id: 3, nombre: 'Andrés García', email: 'andres.garcia@mysticfoods.co', rol: 'Jefe de Local', pdv: 'Olivia Laureles', estado: 'Activo', ultimoAcceso: '2026-04-03 13:55' },
  { id: 4, nombre: 'Diana Torres', email: 'diana.torres@mysticfoods.co', rol: 'Jefe de Local', pdv: 'Clap Laureles', estado: 'Activo', ultimoAcceso: '2026-04-03 13:30' },
  { id: 5, nombre: 'Juan Pérez', email: 'juan.perez@mysticfoods.co', rol: 'Operador', pdv: 'Olivia Viva Envigado', estado: 'Activo', ultimoAcceso: '2026-04-03 12:45' },
  { id: 6, nombre: 'Laura Sánchez', email: 'laura.sanchez@mysticfoods.co', rol: 'Gerente Operaciones', pdv: 'Todos', estado: 'Activo', ultimoAcceso: '2026-04-03 11:20' },
  { id: 7, nombre: 'Felipe Ríos', email: 'felipe.rios@mysticfoods.co', rol: 'Operador', pdv: 'Olivia Arkadia', estado: 'Inactivo', ultimoAcceso: '2026-03-28 09:15' },
  { id: 8, nombre: 'Valentina Muñoz', email: 'valentina.munoz@mysticfoods.co', rol: 'Auditor', pdv: 'Todos', estado: 'Activo', ultimoAcceso: '2026-04-02 16:40' },
];

const ROLES = ['Administrador', 'Gerente Operaciones', 'Jefe de Local', 'Operador CDP', 'Operador', 'Auditor'];
const PDV_OPTIONS = ['Todos', 'CDP', 'Olivia Laureles', 'Clap Laureles', 'Olivia Viva Envigado', 'Olivia Arkadia', 'Clap Envigado'];

function rolBadge(rol: string) {
  if (rol === 'Administrador') return 'bg-red-100 text-red-700';
  if (rol === 'Gerente Operaciones') return 'bg-purple-100 text-purple-700';
  if (rol === 'Jefe de Local') return 'bg-blue-100 text-blue-700';
  if (rol === 'Operador CDP') return 'bg-teal-100 text-teal-700';
  if (rol === 'Auditor') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-700';
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function PerfilesPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  // Form state
  const [formNombre, setFormNombre] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRol, setFormRol] = useState('Operador');
  const [formPdv, setFormPdv] = useState('Todos');

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) => u.nombre.toLowerCase().includes(q) || u.rol.toLowerCase().includes(q)
    );
  }, [users, search]);

  const active = users.filter((u) => u.estado === 'Activo').length;

  const resetForm = () => {
    setFormNombre('');
    setFormEmail('');
    setFormRol('Operador');
    setFormPdv('Todos');
  };

  const handleCreate = () => {
    if (!formNombre.trim() || !formEmail.trim()) return;
    const newUser: User = {
      id: Date.now(),
      nombre: formNombre.trim(),
      email: formEmail.trim(),
      rol: formRol,
      pdv: formPdv,
      estado: 'Activo',
      ultimoAcceso: 'Nuevo usuario',
    };
    setUsers((prev) => [...prev, newUser]);
    setShowNewModal(false);
    resetForm();
    toast('success', `Usuario "${newUser.nombre}" creado exitosamente`);
  };

  const openEdit = (user: User) => {
    setEditTarget(user);
    setFormNombre(user.nombre);
    setFormEmail(user.email);
    setFormRol(user.rol);
    setFormPdv(user.pdv);
    setShowEditModal(true);
  };

  const handleEdit = () => {
    if (!editTarget || !formNombre.trim() || !formEmail.trim()) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editTarget.id ? { ...u, nombre: formNombre.trim(), email: formEmail.trim(), rol: formRol, pdv: formPdv } : u
      )
    );
    setShowEditModal(false);
    setEditTarget(null);
    resetForm();
    toast('success', 'Usuario actualizado exitosamente');
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    setShowDeleteModal(false);
    toast('success', `Usuario "${deleteTarget.nombre}" eliminado`);
    setDeleteTarget(null);
  };

  const toggleStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newEstado = u.estado === 'Activo' ? 'Inactivo' : 'Activo';
        toast('info', `${u.nombre} ahora está ${newEstado.toLowerCase()}`);
        return { ...u, estado: newEstado as 'Activo' | 'Inactivo' };
      })
    );
  };

  const formFields = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
        <input
          type="text" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} placeholder="Ej: Juan Pérez"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
        <input
          type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="correo@mysticfoods.co"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
        <select
          value={formRol} onChange={(e) => setFormRol(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        >
          {ROLES.map((r) => (<option key={r} value={r}>{r}</option>))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">PdV asignado</label>
        <select
          value={formPdv} onChange={(e) => setFormPdv(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        >
          {PDV_OPTIONS.map((p) => (<option key={p} value={p}>{p}</option>))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Gestión de Perfiles</h1>
          <p className="text-gray-500 mt-1">{active} usuarios activos de {users.length} registrados</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowNewModal(true); }}
          className="px-4 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ACCENT_BLUE }}
        >
          + Nuevo Usuario
        </button>
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o rol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        />
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
                <th className="text-center px-6 py-3 font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
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
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${rolBadge(u.rol)}`}>{u.rol}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{u.pdv}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        u.estado === 'Activo' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${u.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {u.estado}
                    </button>
                  </td>
                  <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-gray-400" />
                      {u.ultimoAcceso}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEdit(u)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => { setDeleteTarget(u); setShowDeleteModal(true); }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No se encontraron usuarios</p>
          </div>
        )}
      </div>

      {/* New User Modal */}
      <Modal isOpen={showNewModal} onClose={() => { setShowNewModal(false); resetForm(); }} title="Nuevo Usuario" size="md">
        {formFields}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => { setShowNewModal(false); resetForm(); }} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">Cancelar</button>
          <button onClick={handleCreate} disabled={!formNombre.trim() || !formEmail.trim()} className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: ACCENT_BLUE }}>Crear Usuario</button>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); setEditTarget(null); resetForm(); }} title="Editar Usuario" size="md">
        {formFields}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => { setShowEditModal(false); setEditTarget(null); resetForm(); }} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">Cancelar</button>
          <button onClick={handleEdit} disabled={!formNombre.trim() || !formEmail.trim()} className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: GREEN }}>Guardar Cambios</button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setDeleteTarget(null); }} title="Confirmar eliminación" size="sm">
        <div>
          <p className="text-sm text-gray-600 mb-6">
            ¿Estás seguro de que deseas eliminar al usuario <strong>{deleteTarget?.nombre}</strong>? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-3">
            <button onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">Cancelar</button>
            <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700">Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
