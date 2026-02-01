import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Security check - verify webhook secret
    const secret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.N8N_WEBHOOK_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid webhook secret' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { type, content } = data;

    if (!type || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: type and content' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    let result;

    if (type === 'property') {
      // Insert property
      result = await db.collection('properties').insertOne({
        ...content,
        createdAt: new Date(),
        published: true,
        source: 'n8n-automation',
      });

      // Revalidate property pages
      revalidatePath('/');
      revalidatePath('/properties');

      return NextResponse.json({
        success: true,
        message: 'Property created successfully',
        id: result.insertedId,
        type: 'property',
      });
    } else if (type === 'article') {
      // Insert article
      result = await db.collection('articles').insertOne({
        ...content,
        createdAt: new Date(),
        published: true,
      });

      // Revalidate article pages
      revalidatePath('/');
      revalidatePath('/articles');

      return NextResponse.json({
        success: true,
        message: 'Article created successfully',
        id: result.insertedId,
        type: 'article',
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "property" or "article"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Example usage:
/*
POST https://your-domain.vercel.app/api/content
Headers:
  x-webhook-secret: your-secret-key
  Content-Type: application/json

Body (Property):
{
  "type": "property",
  "content": {
    "title": "Luxury Villa",
    "titleHe": "וילת יוקרה",
    "price": 500000,
    "priceILS": 1875000,
    "location": {
      "city": "Limassol",
      "cityHe": "לימסול",
      "area": "Tourist Area",
      "areaHe": "אזור תיירות",
      "coordinates": [34.707817, 33.022469]
    },
    "features": {
      "bedrooms": 3,
      "bathrooms": 2,
      "sqm": 150,
      "pool": true
    },
    "description": "Beautiful villa...",
    "descriptionHe": "וילה מהממת...",
    "images": ["url1", "url2"],
    "roi": {
      "rentalYield": 5.5,
      "appreciation": 7.0
    },
    "propertyType": "villa",
    "propertyTypeHe": "וילה",
    "slug": "luxury-villa-limassol"
  }
}

Body (Article):
{
  "type": "article",
  "content": {
    "title": "Investment Guide",
    "titleHe": "מדריך השקעה",
    "content": "Full article content...",
    "contentHe": "תוכן המאמר המלא...",
    "category": "investment-guide",
    "categoryHe": "מדריך השקעה",
    "slug": "investment-guide-cyprus",
    "excerpt": "Short summary...",
    "excerptHe": "תקציר קצר...",
    "readTime": 5,
    "image": "https://..."
  }
}
*/
