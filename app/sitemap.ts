import { MetadataRoute } from 'next';
import clientPromise from '@/lib/mongodb';
import { getAllCitySlugs } from '@/lib/city-data';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

// Revalidate sitemap every hour
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all articles for dynamic routes directly from database
  let articles: any[] = [];
  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');
    articles = await db
      .collection('articles')
      .find({ published: true, status: 'approved' })
      .project({ slug: 1, updatedAt: 1, createdAt: 1 })
      .toArray();
    
    console.log(`[Sitemap] Successfully fetched ${articles.length} articles from database`);
  } catch (error) {
    console.error('[Sitemap] Error fetching articles:', error);
    console.error('[Sitemap] MONGODB_URI exists:', !!process.env.MONGODB_URI);
  }

  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/investments`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic article pages
  const articlePages = articles.map((article) => ({
    url: `${SITE_URL}/articles/${encodeURIComponent(article.slug)}`,
    lastModified: new Date(article.updatedAt || article.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  console.log(`[Sitemap] Generated ${articlePages.length} article URLs`);

  // Dynamic city investment pages
  const citySlugs = getAllCitySlugs();
  const cityPages = citySlugs.map((slug) => ({
    url: `${SITE_URL}/investments/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...articlePages, ...cityPages];
}
