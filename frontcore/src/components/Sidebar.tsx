'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    `block px-4 py-2 rounded hover:bg-gray-700 ${
      pathname === path ? 'bg-gray-700 text-white' : 'text-gray-300'
    }`;

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Menú</h2>
      <nav className="space-y-2">
        <Link href="/profile" className={linkStyle('/profile')}>Perfil de Usuario</Link>
        <Link href="/upload" className={linkStyle('/upload')}>Carga de PDFs</Link>
        <Link href="/compare" className={linkStyle('/compare')}>Comparación</Link>
        <Link href="/crudprofile" className={linkStyle('/crudprofile')}>CRUDProfile</Link>
      </nav>
    </aside>
  );
}
