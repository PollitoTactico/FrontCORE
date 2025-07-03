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
        'https://backendcrudapiservice20250420164400.azurewebsites.net/api/comparation/compare',
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
    } catch (error) {
      setNotification(`Error en la comparación: ${error}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comparar CVs con Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="ID del Perfil"
          value={requestData.profileId}
          onChange={(e) => setRequestData({ ...requestData, profileId: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="IDs de CVs (separados por coma)"
          value={requestData.cvIds}
          onChange={(e) => setRequestData({ ...requestData, cvIds: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Comparar</button>
      </form>
      {notification && <div className="mt-4 text-red-600">{notification}</div>}
      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Resultado para perfil: {result.profileName}</h3>
          {result.results.map((res) => (
            <div key={res.cvId} className="mb-4 p-4 border rounded bg-white">
              <h4 className="font-bold">CV: {res.cvName} (ID: {res.cvId})</h4>
              <p>Porcentaje de coincidencia: {res.matchPercentage}%</p>
              <div>
                <strong>Palabras clave coincidentes:</strong>
                <ul>
                  {res.matchedKeywords.map((kw, idx) => (
                    <li key={idx}>{kw.keyword} ({kw.weight})</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Palabras clave del perfil:</strong>
                <ul>
                  {res.profileKeywords.map((kw, idx) => (
                    <li key={idx}>{kw.keyword} ({kw.weight})</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Palabras frecuentes:</strong>
                <ul>
                  {res.frequentWords.map((kw, idx) => (
                    <li key={idx}>{kw.keyword} ({kw.weight})</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
