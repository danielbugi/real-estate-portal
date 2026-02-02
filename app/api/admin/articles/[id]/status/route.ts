import { NextRequest, NextResponse } from 'next/server';
import {
  requireAuth,
  createLogEntry,
  addSecurityHeaders,
  sanitizeInput,
} from '@/lib/security';
import { updateArticleStatus, saveLog } from '@/lib/db-admin';

// POST approve/reject article
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      const logEntry = createLogEntry(request, {
        status: 401,
        error: 'Unauthorized approval attempt',
      });
      await saveLog(logEntry);

      return auth.response!;
    }

    const { id } = await params;

    const rawBody = await request.json();
    const body = sanitizeInput(rawBody);

    const { status } = body;

    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: pending, approved, or rejected' },
        { status: 400 },
      );
    }

    // Update article status
    const result = await updateArticleStatus(id, status);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
      body: { articleId: id, newStatus: status },
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      message: `Article ${status} successfully`,
      published: status === 'approved',
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Update status error:', error);

    const logEntry = createLogEntry(request, {
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    await saveLog(logEntry);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
