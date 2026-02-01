import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { mockArticles } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');
    
    // Try to fetch from MongoDB
    let articles = await db
      .collection('articles')
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    // If no articles in DB, use mock data
    if (articles.length === 0) {
      console.log('No articles in DB, using mock data');
      articles = mockArticles as any;
    }

    return NextResponse.json({ 
      articles,
      count: articles.length 
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return mock data on error
    return NextResponse.json({ 
      articles: mockArticles,
      count: mockArticles.length 
    });
  }
}
