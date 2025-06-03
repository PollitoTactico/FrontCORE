"use client";

import { useState } from "react";

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
  frequentWords: KeywordWeight[];
}

interface ComparationResponse {
  profileName: string;
  results: ComparationResult[];
}

export default function ComparePage() {
  const [requestData, setRequestData] = useState({
    profileId: "",
    cvIds: "",
  });
  const [result, setResult] = useState<ComparationResponse | null>(null);
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cvIdsArray = requestData.cvIds.split(",").map((id) => parseInt(id.trim(), 10));

    if (cvIdsArray.some(isNaN)) {
      setNotification("Error: Los IDs de CVs deben ser números separados por comas.");
      return;
    }

    try {
      const response = await fetch(
        "https://backendcrudapiservice20250420164400.azurewebsites.net/api/comparation/compare",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId: requestData.profileId, cvIds: cvIdsArray }),
        }
      );

      if (response.ok) {
        const data: ComparationResponse = await response.json();
        setResult(data);
        setNotification("Comparación realizada correctamente.");
      } else {
        const errorMessage = await response.text();
        setNotification(`Error: ${errorMessage}`);
      }
    } catch {
      setNotification("Error de conexión al realizar la comparación.");
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Comparar
        </button>
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
                <strong>Palabras Clave Coincidentes:</strong>{" "}
                {cvResult.matchedKeywords.map((kw, index) => (
                  <span key={`${kw.keyword}-${index}`}>{kw.keyword} ({kw.weight}), </span>
                ))}
              </p>
              <p>
                <strong>Palabras Clave del Perfil:</strong>{" "}
                {cvResult.profileKeywords.map((kw, index) => (
                  <span key={`${kw.keyword}-${index}`}>{kw.keyword} ({kw.weight}), </span>
                ))}
              </p>
              <p>
                <strong>Palabras Frecuentes:</strong>{" "}
                {cvResult.frequentWords.map((kw, index) => (
                  <span key={`${kw.keyword}-${index}`}>{kw.keyword} ({kw.weight}), </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
