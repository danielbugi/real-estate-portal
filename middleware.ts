import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/security';

// Force middleware to use Node.js runtime instead of Edge runtime
export const runtime = 'nodejs';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except the login page
  if (pathname.startsWith('/admin')) {
    // Allow access to the login page
    if (pathname === '/admin' || pathname === '/admin/') {
      return NextResponse.next();
    }

    // Check for admin token
    const token = request.cookies.get('admin_token')?.value;

    console.log(`[Middleware] Checking ${pathname}, token exists:`, !!token);

    if (!token) {
      console.log('[Middleware] No token found, redirecting to login');
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      console.log('[Middleware] Invalid token, redirecting to login');
      // Redirect to login if token is invalid or expired
      const response = NextResponse.redirect(new URL('/admin', request.url));
      // Clear invalid token
      response.cookies.delete('admin_token');
      return response;
    }

    console.log('[Middleware] Token valid, allowing access');
    // Token is valid, allow access
    return NextResponse.next();
  }

  // Protect all /api/admin routes except auth endpoints
  if (pathname.startsWith('/api/admin')) {
    // Allow auth endpoints
    if (
      pathname.startsWith('/api/admin/auth/login') ||
      pathname.startsWith('/api/admin/auth/logout') ||
      pathname.startsWith('/api/admin/auth/verify')
    ) {
      return NextResponse.next();
    }

    // For all other admin API routes, require authentication
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 },
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or expired token' },
        { status: 401 },
      );
    }

    // Token is valid, allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
