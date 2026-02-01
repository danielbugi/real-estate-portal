import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    // Find article by slug - only published articles for public view
    const article = await db.collection('articles').findOne({
      slug,
      published: true,
      status: 'approved',
    });

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error('Get article error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
