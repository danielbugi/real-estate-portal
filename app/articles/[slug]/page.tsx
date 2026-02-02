import SingleArticlePage from '@/components/SingleArticlePage';
import clientPromise from '@/lib/mongodb';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

// Dynamic rendering to avoid file system issues with Hebrew characters
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Dynamic metadata with enhanced SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    const article = await db.collection('articles').findOne({
      slug,
      published: true,
      status: 'approved',
    });

    if (article) {
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
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
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
