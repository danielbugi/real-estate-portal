'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import { checkAuth } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      // Skip auth check for the login page itself
      if (pathname === '/admin' || pathname === '/admin/') {
        setIsLoading(false);
        return;
      }

      const authenticated = await checkAuth();

      if (!authenticated) {
        // Redirect to login if not authenticated
        router.push('/admin');
      } else {
        setIsAuthenticated(authenticated);
      }

      setIsLoading(false);
    };

    verifyAuth();
  }, [pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading && pathname !== '/admin' && pathname !== '/admin/') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't show admin nav on login page
  if (pathname === '/admin' || pathname === '/admin/') {
    return <>{children}</>;
  }

  // Only render admin content if authenticated
  if (!isAuthenticated && !isLoading) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}
