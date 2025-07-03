"use client";

import { useState, useEffect } from "react";

interface ProfileUser {
  id: number;
  nombrePerfil: string;
  misionCargo: string;
  empresa: string;
  tituloCargo: string;
  departamento: string;
  formacionAcademica: string;
  conocimientosCargo: string;
  experiencia: string;
  funcionesEsenciales: string;
  conocimientoTecnologico: string;
}

export default function CrudProfilePage() {
  const [profiles, setProfiles] = useState<ProfileUser[]>([]);
  const [notification, setNotification] = useState("");
  const [editingProfile, setEditingProfile] = useState<ProfileUser | null>(null);

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(
        `https://backendcrudapiservice20250420164400.azurewebsites.net/api/ProfileUser`
      );
      const data: ProfileUser[] = await response.json();
      setProfiles(data);
    } catch (error) {
      setNotification(`Error al cargar los perfiles: ${error}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://backendcrudapiservice20250420164400.azurewebsites.net/api/ProfileUser/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setNotification(`Perfil con ID ${id} eliminado correctamente.`);
        fetchProfiles();
      } else {
        setNotification("Error al eliminar el perfil.");
      }
    } catch (error) {
      setNotification(`Error en la conexion al eliminar el perfil: ${error}`);
    }
  };

  const handleEdit = (profile: ProfileUser) => {
    setEditingProfile(profile);
  };

  const handleSave = async () => {
    if (!editingProfile) return;
    try {
      const response = await fetch(
        `https://backendcrudapiservice20250420164400.azurewebsites.net/api/ProfileUser/${editingProfile.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProfile),
        }
      );
      if (response.ok) {
        setNotification("Perfil actualizado correctamente.");
        setEditingProfile(null);
        fetchProfiles();
      } else {
        setNotification("Error al actualizar el perfil.");
      }
    } catch (error) {
      setNotification(`Error en la conexion al actualizar el perfil: ${error}`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">CRUD de Perfiles</h2>
      {notification && <div className="mb-4 text-red-600">{notification}</div>}
      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.nombrePerfil}</td>
              <td>
                <button className="text-blue-600 mr-2" onClick={() => handleEdit(profile)}>
                  Editar
                </button>
                <button className="text-red-600" onClick={() => handleDelete(profile.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProfile && (
        <div className="mb-4 p-4 border rounded bg-white">
          <h3 className="font-semibold mb-2">Editar Perfil</h3>
          <input
            title="Nombre del Perfil"
            type="text"
            value={editingProfile.nombrePerfil}
            onChange={(e) => setEditingProfile({ ...editingProfile, nombrePerfil: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          {/* Agrega más campos según sea necesario */}
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSave}>
            Guardar
          </button>
        </div>
      )}
    </div>
  );
}
