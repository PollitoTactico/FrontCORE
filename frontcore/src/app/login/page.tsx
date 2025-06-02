'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('https://backendcrudapiservice20250420164400.azurewebsites.net/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      setMessage('Inicio de sesión exitoso.');
      window.location.href = '/profile';
    } else {
      setMessage('Credenciales incorrectas.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full" />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
      </form>
      <p className="mt-4 text-red-500">{message}</p>
      <p className="mt-6">
        ¿Aún no tienes una cuenta?{' '}
        <button onClick={() => router.push('/register')} className="text-blue-500 underline">Regístrate aquí</button>
      </p>
    </div>
  );
}
