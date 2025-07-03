"use client";

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [nombreCandidato, setNombreCandidato] = useState('');
  const [notification, setNotification] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setNotification('Por favor, seleccione un archivo PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('nombreCandidato', nombreCandidato);

    try {
      const response = await fetch(`${apiUrl}/PDF/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setNotification(`Archivo subido correctamente. ID: ${data.id}`);
        setFile(null);
        setNombreCandidato('');
      } else {
        const errorMessage = await response.text();
        setNotification(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setNotification(`Error al subir el archivo: ${error}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Carga de PDFs</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          aria-label="Seleccionar archivo PDF"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Nombre del Candidato"
          value={nombreCandidato}
          onChange={(e) => setNombreCandidato(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Subir PDF</button>
      </form>
      {notification && <p className="mt-4 text-green-500">{notification}</p>}
    </div>
  );
}
