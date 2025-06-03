"use client";

import { useState } from 'react';

interface KeywordWeight {
  keyword: string;
  weight: number;
}

interface ComparationResult {
  cvId: number;
  cvName: string;
  matchPercentage: number;
  matchedKeywords: KeywordWeight[];
  profileKeywords: KeywordWeight[];
}

interface ComparationResponse {
  profileName: string;
  results: ComparationResult[];
}

export default function ComparePage() {
  const [requestData, setRequestData] = useState({
    profileId: '',
    cvIds: '',
  });
  const [result, setResult] = useState<ComparationResponse | null>(null);
  const [notification, setNotification] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cvIdsArray = requestData.cvIds.split(',').map((id) => parseInt(id.trim(), 10));

    if (cvIdsArray.some(isNaN)) {
      setNotification('Error: Los IDs de CVs deben ser números separados por comas.');
      return;
    }

    try {
      const response = await fetch('https://backendcrudapiservice20250420164400.azurewebsites.net/api/Comparation/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: requestData.profileId, cvIds: cvIdsArray }),
      });

      if (response.ok) {
        const data: ComparationResponse = await response.json();
        setResult(data);
        setNotification('Comparación realizada correctamente.');
      } else {
        const errorMessage = await response.text();
        setNotification(`Error: ${errorMessage}`);
      }
    } catch {
      setNotification('Error de conexión al realizar la comparación.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Comparación de Perfiles</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="ID del Perfil"
          value={requestData.profileId}
          onChange={(e) => setRequestData({ ...requestData, profileId: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="IDs de CVs (separados por comas)"
          value={requestData.cvIds}
          onChange={(e) => setRequestData({ ...requestData, cvIds: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Comparar</button>
      </form>
      {notification && <p className="mt-4 text-green-500">{notification}</p>}
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Resultados para el perfil: {result.profileName}</h2>
          {result.results.map((cvResult) => (
            <div key={cvResult.cvId} className="bg-gray-100 p-4 rounded mb-4">
              <p>
                <strong>CV ID:</strong> {cvResult.cvId}
              </p>
              <p>
                <strong>Nombre del CV:</strong> {cvResult.cvName}
              </p>
              <p>
                <strong>Porcentaje de Coincidencia:</strong> {cvResult.matchPercentage}%
              </p>
              <p>
                <strong>Palabras Clave Coincidentes:</strong>{' '}
                {cvResult.matchedKeywords.map((kw) => `${kw.keyword} (${kw.weight})`).join(', ')}
              </p>
              <p>
                <strong>Palabras Clave del Perfil:</strong>{' '}
                {cvResult.profileKeywords.map((kw) => `${kw.keyword} (${kw.weight})`).join(', ')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProfilePage() {
  const [formData, setFormData] = useState({
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
  const [notification, setNotification] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backendcrudapiservice20250420164400.azurewebsites.net/api/ProfileUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // Obtener el ID del perfil creado
        setNotification(`Perfil guardado correctamente. ID: ${data.id}`);
        setFormData({
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
      } else {
        const errorMessage = await response.text();
        setNotification(`Error al guardar el perfil: ${errorMessage}`);
      }
    } catch (error) {
      setNotification (`Error al guardar el perfil: ${error}`)
    }
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
      {notification && <p className="mt-4 text-green-500">{notification}</p>}
    </div>
  );
}
