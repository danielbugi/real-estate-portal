import { NextRequest, NextResponse } from 'next/server';
import {
  requireAuth,
  createLogEntry,
  addSecurityHeaders,
} from '@/lib/security';
import { getArticles, saveLog } from '@/lib/db-admin';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      const logEntry = createLogEntry(request, {
        status: 401,
        error: 'Unauthorized access attempt',
      });
      await saveLog(logEntry);

      return auth.response!;
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as
      | 'pending'
      | 'approved'
      | 'rejected'
      | null;
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Get articles from database
    const filter: any = { limit, skip };
    if (status) filter.status = status;
    if (published !== null) filter.published = published === 'true';

    const { articles, total } = await getArticles(filter);

    // Log successful access
    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      articles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Get articles error:', error);

    const logEntry = createLogEntry(request, {
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    await saveLog(logEntry);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
