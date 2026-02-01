import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '50');

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    // Query only published articles for public view
    const query: any = {};
    if (published === 'true') {
      query.published = true;
      query.status = 'approved'; // Only show approved articles
    }

    const articles = await db
      .collection('articles')
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error('Get articles error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        articles: [],
      },
      { status: 500 },
    );
  }
}
