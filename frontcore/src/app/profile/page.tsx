'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  numeroTelefono: string;
  cumpleaños: string;
  isActive: boolean;
  createdAt: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      router.push('/login');
      return;
    }

    fetch(`https:/backendcrudapiservice20250420164400.azurewebsites.net/api/Users`)
      .then(res => res.json())
      .then((users: User[]) => {
        const foundUser = users.find(u => u.email === email);
        if (!foundUser) {
          alert('Usuario no encontrado');
          router.push('/login');
        } else {
          setUser(foundUser);
        }
      });
  }, [router]);

  if (!user) return <p className="p-8">Cargando...</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
      <div className="space-y-2">
        <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.numeroTelefono}</p>
        <p><strong>Cumpleaños:</strong> {new Date(user.cumpleaños).toLocaleDateString()}</p>
        <p><strong>Activo:</strong> {user.isActive ? 'Sí' : 'No'}</p>
        <p><strong>Creado en:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>
    </main>
  );
}
