'use client';
import { useState, useEffect } from 'react';

interface User {
  Id: number;
  NombrePerfil: string;
  MisionCargo: string;
  Empresa: string;
  TituloCargo: string;
  Departamento: string;
  FormacionAcademica: string;
  ConocimientosCargo: string;
  Experiencia: string;
  FuncionesEsenciales: string;
  ConocimientoTecnologico: string;
}

interface FormData {
  NombrePerfil: string;
  MisionCargo: string;
  Empresa: string;
  TituloCargo: string;
  Departamento: string;
  FormacionAcademica: string;
  ConocimientosCargo: string;
  Experiencia: string;
  FuncionesEsenciales: string;
  ConocimientoTecnologico: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>({
    NombrePerfil: '',
    MisionCargo: '',
    Empresa: '',
    TituloCargo: '',
    Departamento: '',
    FormacionAcademica: '',
    ConocimientosCargo: '',
    Experiencia: '',
    FuncionesEsenciales: '',
    ConocimientoTecnologico: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    const response = await fetch('/api/ProfileUser');
    const data: User[] = await response.json();
    setUsers(data);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await fetch('/api/ProfileUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchUsers();
  };

  const handleDelete = async (id: number): Promise<void> => {
    await fetch(`/api/ProfileUser/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nombre Perfil"
          value={formData.NombrePerfil}
          onChange={(e) => setFormData({ ...formData, NombrePerfil: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Misión Cargo"
          value={formData.MisionCargo}
          onChange={(e) => setFormData({ ...formData, MisionCargo: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Empresa"
          value={formData.Empresa}
          onChange={(e) => setFormData({ ...formData, Empresa: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Título Cargo"
          value={formData.TituloCargo}
          onChange={(e) => setFormData({ ...formData, TituloCargo: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Departamento"
          value={formData.Departamento}
          onChange={(e) => setFormData({ ...formData, Departamento: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Formación Académica"
          value={formData.FormacionAcademica}
          onChange={(e) => setFormData({ ...formData, FormacionAcademica: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Conocimientos Cargo"
          value={formData.ConocimientosCargo}
          onChange={(e) => setFormData({ ...formData, ConocimientosCargo: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Experiencia"
          value={formData.Experiencia}
          onChange={(e) => setFormData({ ...formData, Experiencia: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Funciones Esenciales"
          value={formData.FuncionesEsenciales}
          onChange={(e) => setFormData({ ...formData, FuncionesEsenciales: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Conocimiento Tecnológico"
          value={formData.ConocimientoTecnologico}
          onChange={(e) => setFormData({ ...formData, ConocimientoTecnologico: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear Usuario</button>
      </form>

      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.Id} className="border p-4 mb-4">
            <p><strong>Nombre:</strong> {user.NombrePerfil}</p>
            <button
              onClick={() => handleDelete(user.Id)}
              className="bg-red-600 text-white px-4 py-2 rounded mt-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProfilePage() {
  const [formData, setFormData] = useState<FormData>({
    NombrePerfil: '',
    MisionCargo: '',
    Empresa: '',
    TituloCargo: '',
    Departamento: '',
    FormacionAcademica: '',
    ConocimientosCargo: '',
    Experiencia: '',
    FuncionesEsenciales: '',
    ConocimientoTecnologico: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre Perfil"
          value={formData.NombrePerfil}
          onChange={(e) => setFormData({ ...formData, NombrePerfil: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Misión Cargo"
          value={formData.MisionCargo}
          onChange={(e) => setFormData({ ...formData, MisionCargo: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <select
          aria-label="Empresa"
          value={formData.Empresa}
          onChange={(e) => setFormData({ ...formData, Empresa: e.target.value })}
          required
          className="border p-2 w-full"
        >
          <option value="">Seleccione una empresa</option>
          <option value="SG CONSULTING">SG CONSULTING</option>
          <option value="EMPORIUM">EMPORIUM</option>
          <option value="INCOOP">INCOOP</option>
          <option value="ADWA">ADWA</option>
        </select>
        <input
          type="text"
          placeholder="Título Cargo"
          value={formData.TituloCargo}
          onChange={(e) => setFormData({ ...formData, TituloCargo: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Departamento"
          value={formData.Departamento}
          onChange={(e) => setFormData({ ...formData, Departamento: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <select
          aria-label="Formación Académica"
          value={formData.FormacionAcademica}
          onChange={(e) => setFormData({ ...formData, FormacionAcademica: e.target.value })}
          required
          className="border p-2 w-full"
        >
          <option value="">Seleccione formación académica</option>
          <option value="Bachillerato">Bachillerato</option>
          <option value="Licenciatura">Licenciatura</option>
          <option value="Maestría">Maestría</option>
          <option value="Doctorado">Doctorado</option>
        </select>
        <input
          type="text"
          placeholder="Conocimientos Cargo"
          value={formData.ConocimientosCargo}
          onChange={(e) => setFormData({ ...formData, ConocimientosCargo: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Experiencia"
          value={formData.Experiencia}
          onChange={(e) => setFormData({ ...formData, Experiencia: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Funciones Esenciales"
          value={formData.FuncionesEsenciales}
          onChange={(e) => setFormData({ ...formData, FuncionesEsenciales: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Conocimiento Tecnológico"
          value={formData.ConocimientoTecnologico}
          onChange={(e) => setFormData({ ...formData, ConocimientoTecnologico: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </div>
  );
}
