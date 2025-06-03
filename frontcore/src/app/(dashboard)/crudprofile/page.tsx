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
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(
        "https://backendcrudapiservice20250420164400.azurewebsites.net/api/ProfileUser"
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setNotification(`Perfil con ID ${editingProfile.id} actualizado correctamente.`);
        setEditingProfile(null);
        fetchProfiles();
      } else {
        const errorMessage = await response.text();
        setNotification(`Error al actualizar el perfil: ${errorMessage}`);
      }
    } catch (error) {
      setNotification(`Error al actualizar el perfil: ${error}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CRUD de Perfiles</h1>
      {notification && <p className="text-green-500 mb-4">{notification}</p>}
      {editingProfile ? (
        <form onSubmit={handleUpdate} className="space-y-4 bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-bold">Editar Perfil</h2>
          <input
            type="text"
            placeholder="Nombre Perfil"
            value={editingProfile.nombrePerfil}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, nombrePerfil: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Misión Cargo"
            value={editingProfile.misionCargo}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, misionCargo: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
          {/* Agrega más campos según sea necesario */}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => setEditingProfile(null)}
            className="bg-gray-600 text-white px-4 py-2 rounded ml-2"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <ul className="space-y-4">
          {profiles.map((profile) => (
            <li key={profile.id} className="border p-4 rounded">
              <p>
                <strong>Nombre:</strong> {profile.nombrePerfil}
              </p>
              <p>
                <strong>Misión Cargo:</strong> {profile.misionCargo}
              </p>
              <button
                onClick={() => setEditingProfile(profile)}
                className="bg-yellow-600 text-white px-4 py-2 rounded mt-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(profile.id)}
                className="bg-red-600 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}