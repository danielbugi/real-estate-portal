import { NextRequest, NextResponse } from 'next/server';
import {
  requireAuth,
  createLogEntry,
  addSecurityHeaders,
} from '@/lib/security';
import { getAdminStats, saveLog } from '@/lib/db-admin';

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }

    const stats = await getAdminStats();

    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      stats,
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Get stats error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
