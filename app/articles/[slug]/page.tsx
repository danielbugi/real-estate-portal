import SingleArticlePage from '@/components/SingleArticlePage';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

// This will generate static pages for all articles at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(`${siteUrl}/api/articles`, {
      cache: 'no-store',
    });
    const data = await res.json();

    if (data.success && data.articles) {
      return data.articles
        .filter((article: any) => article.published)
        .map((article: any) => ({
          slug: article.slug,
        }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }

  return [];
}

// Dynamic metadata with enhanced SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const res = await fetch(`${siteUrl}/api/articles/${slug}`, {
      cache: 'no-store',
    });
    const data = await res.json();

    if (data.success && data.article) {
      const article = data.article;
      const title = article.titleHe || article.title;
      const description =
        article.excerptHe || article.excerpt || 'מאמר על השקעות נדל"ן בקפריסין';
      const image = article.featuredImageUrl || article.image;

      return {
        title: `${title} | נדל"ן בקפריסין`,
        description: description,
        keywords: article.keywords || [
          'נדלן קפריסין',
          'השקעות קפריסין',
          'נכסים בקפריסין',
        ],
        authors: [{ name: 'Cyprus Insights' }],
        openGraph: {
          type: 'article',
          locale: 'he_IL',
          url: `${siteUrl}/articles/${slug}`,
          siteName: 'Cyprus Insights',
          title: title,
          description: description,
          images: image
            ? [
                {
                  url: image,
                  width: 1200,
                  height: 630,
                  alt: title,
                },
              ]
            : [],
          publishedTime: article.createdAt,
          modifiedTime: article.updatedAt || article.createdAt,
        },
        twitter: {
          card: 'summary_large_image',
          title: title,
          description: description,
          images: image ? [image] : [],
        },
        alternates: {
          canonical: `${siteUrl}/articles/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'מאמר | נדל"ן בקפריסין',
    description: 'מאמר על השקעות נדל"ן בקפריסין',
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SingleArticlePage slug={slug} />;
}
