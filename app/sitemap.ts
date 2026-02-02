import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all articles for dynamic routes
  let articles: any[] = [];
  try {
    const articlesRes = await fetch(`${SITE_URL}/api/articles`, {
      cache: 'no-store',
    });
    if (articlesRes.ok) {
      const data = await articlesRes.json();
      articles = data.articles || [];
    }
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
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
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic article pages
  const articlePages = articles
    .filter((article) => article.published)
    .map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [...staticPages, ...articlePages];
}
