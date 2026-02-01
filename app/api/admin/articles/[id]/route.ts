import { NextRequest, NextResponse } from 'next/server';
import {
  requireAuth,
  createLogEntry,
  addSecurityHeaders,
  sanitizeInput,
} from '@/lib/security';
import {
  getArticleById,
  updateArticle,
  deleteArticle,
  saveLog,
} from '@/lib/db-admin';

// GET single article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }

    const article = await getArticleById(params.id);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      article,
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Get article error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// UPDATE article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      const logEntry = createLogEntry(request, {
        status: 401,
        error: 'Unauthorized update attempt',
      });
      await saveLog(logEntry);

      return auth.response!;
    }

    const rawBody = await request.json();
    const updates = sanitizeInput(rawBody);

    // Validate updates
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No updates provided' },
        { status: 400 }
      );
    }

    const result = await updateArticle(params.id, updates);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
      body: { articleId: params.id, updates: Object.keys(updates) },
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      message: 'Article updated successfully',
      modified: result.modifiedCount,
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Update article error:', error);

    const logEntry = createLogEntry(request, {
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    await saveLog(logEntry);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      const logEntry = createLogEntry(request, {
        status: 401,
        error: 'Unauthorized delete attempt',
      });
      await saveLog(logEntry);

      return auth.response!;
    }

    const result = await deleteArticle(params.id);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
      body: { articleId: params.id, action: 'delete' },
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Delete article error:', error);

    const logEntry = createLogEntry(request, {
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    await saveLog(logEntry);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
