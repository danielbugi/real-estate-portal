import { NextRequest, NextResponse } from 'next/server';
import {
  requireAuth,
  createLogEntry,
  addSecurityHeaders,
  sanitizeInput,
} from '@/lib/security';
import { saveLog } from '@/lib/db-admin';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
      const logEntry = createLogEntry(request, {
        status: 401,
        error: 'Unauthorized create attempt',
      });
      await saveLog(logEntry);

      return auth.response!;
    }

    const rawBody = await request.json();
    const articleData = sanitizeInput(rawBody);

    // Validation
    if (
      !articleData.title ||
      !articleData.titleHe ||
      !articleData.contentHtml
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: title, titleHe, contentHtml' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    // Create article
    const result = await db.collection('articles').insertOne({
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date(),
      source: 'admin-panel',
    });

    const logEntry = createLogEntry(request, {
      status: 200,
      userId: auth.userId,
      body: { articleId: result.insertedId, action: 'create' },
    });
    await saveLog(logEntry);

    const response = NextResponse.json({
      success: true,
      message: 'Article created successfully',
      id: result.insertedId,
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Create article error:', error);

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
