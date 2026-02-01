import { NextRequest, NextResponse } from 'next/server';
import {
  requireAuth,
  createLogEntry,
  addSecurityHeaders,
} from '@/lib/security';
import { getLogs, saveLog } from '@/lib/db-admin';

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const userId = searchParams.get('userId');
    const ip = searchParams.get('ip');

    const options: any = { limit, skip };
    if (startDate) options.startDate = new Date(startDate);
    if (endDate) options.endDate = new Date(endDate);
    if (userId) options.userId = userId;
    if (ip) options.ip = ip;

    const { logs, total } = await getLogs(options);

    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Get logs error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
