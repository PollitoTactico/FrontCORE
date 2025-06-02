
'use client';

import Sidebar from '@/components/Sidebar'; // asumiendo que Sidebar está aquí

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}

