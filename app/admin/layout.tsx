'use client';

import AdminNav from '@/components/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}
