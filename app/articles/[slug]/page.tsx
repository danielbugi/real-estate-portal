import SingleArticlePage from '@/components/SingleArticlePage';

// This will generate static pages for all articles at build time
export async function generateStaticParams() {
  // You can fetch all article slugs here
  // For now, return empty array to enable dynamic rendering
  return [];
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/articles/${params.slug}`,
    );
    const data = await res.json();

    if (data.success && data.article) {
      return {
        title: `${data.article.titleHe || data.article.title} | נדל"ן בקפריסין`,
        description:
          data.article.excerptHe ||
          data.article.excerpt ||
          'מאמר על השקעות נדל"ן בקפריסין',
        keywords: data.article.keywords || [],
        openGraph: {
          title: data.article.titleHe || data.article.title,
          description: data.article.excerptHe || data.article.excerpt,
          images: data.article.featuredImageUrl
            ? [data.article.featuredImageUrl]
            : [],
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

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <SingleArticlePage slug={params.slug} />;
}
