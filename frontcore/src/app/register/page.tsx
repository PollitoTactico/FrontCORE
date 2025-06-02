'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    numeroTelefono: '',
    cumpleaños: '',
    contraseña: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('https://backendcrudapiservice20250420164400.azurewebsites.net/api/Auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      localStorage.setItem('step', 'registered');
      alert('Registro exitoso. Revisa tu correo para el código de verificación.');
      router.push('/verify');
    } else {
      alert('Error al registrarse. Intenta con otro correo.');
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="firstName" placeholder="Nombre" onChange={handleChange} required className="border p-2 w-full" />
        <input name="lastName" placeholder="Apellido" onChange={handleChange} required className="border p-2 w-full" />
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required className="border p-2 w-full" />
        <input name="numeroTelefono" placeholder="Teléfono" onChange={handleChange} required className="border p-2 w-full" />
        <input title='cum' type="date" name="cumpleaños" onChange={handleChange} required className="border p-2 w-full" />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Registrarse</button>
      </form>
      <p className="mt-6">
        ¿Ya tienes una cuenta?{' '}
        <button onClick={() => router.push('/login')} className="text-blue-500 underline">Inicia sesión aquí</button>
      </p>
    </main>
  );
}
