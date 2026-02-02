'use client';

export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch('/api/admin/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // Ignore errors during logout
  }
}
