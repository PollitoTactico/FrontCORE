'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState('');

  useEffect(() => {
    const step = localStorage.getItem('step');
    if (step !== 'registered') {
      router.push('/register');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('https://backendcrudapiservice20250420164400.azurewebsites.net/api/Auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: code }),
    });

    if (res.ok) {
      alert('Verificado con éxito');
      localStorage.setItem('step', 'verified');
      router.push('/login');
    } else {
      alert('Código incorrecto o expirado');
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Verificar Código</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de verificación"
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Verificar</button>
      </form>
    </main>
  );
}
