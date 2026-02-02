import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security';

export async function GET(request: NextRequest) {
  const authResult = requireAuth(request);

  if (!authResult.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      userId: authResult.userId,
    },
    { status: 200 },
  );
}
