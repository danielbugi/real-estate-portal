import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Security check - verify webhook secret (optional, uncomment to enable)
    const secret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.N8N_WEBHOOK_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid webhook secret' },
        { status: 401 },
      );
    }

    const data = await request.json();

    // Handle both array and single object formats
    const articles = Array.isArray(data) ? data : [data];

    if (articles.length === 0) {
      return NextResponse.json(
        { error: 'No content provided' },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db('cyprus_invest');
    const results = [];

    for (const article of articles) {
      // Validate required fields
      if (!article.title || !article.contentHtml || !article.slug) {
        return NextResponse.json(
          {
            error:
              'Missing required fields: title, contentHtml, and slug are required',
          },
          { status: 400 },
        );
      }

      // Prepare article document for MongoDB
      const articleDocument = {
        title: article.title,
        contentHtml: article.contentHtml,
        excerpt: article.excerpt || '',
        keywords: article.keywords || [],
        slug: article.slug,
        featuredImageUrl:
          article.featuredImageUrl?.imageUrl || article.featuredImageUrl || '',
        imageGenerated: article.imageGenerated || false,
        originalLink: article.originalLink || '',
        pubDate: article.pubDate || '',
        country: article.country || 'Cyprus',
        status: article.status || 'ready_for_review',
        processedAt: article.processedAt
          ? new Date(article.processedAt)
          : new Date(),
        createdAt: new Date(),
        published: false, // Set to draft status - requires manual approval
        source: 'n8n-automation',
      };

      // Insert article as draft
      const result = await db.collection('articles').insertOne(articleDocument);

      results.push({
        id: result.insertedId,
        slug: article.slug,
        title: article.title,
      });
    }

    // Note: We don't revalidate pages since articles are in draft status
    // Pages will be revalidated when articles are published through admin panel

    return NextResponse.json({
      success: true,
      message: `${results.length} article(s) created successfully in draft status`,
      articles: results,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
