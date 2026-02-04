import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types';
import clientPromise from '@/lib/mongodb';
import { Metadata } from 'next';
import ArticlesHeroSection from '@/components/ArticlesHeroSection';

export const metadata: Metadata = {
  title: 'מאמרים ומדריכים על נדל"ן בקפריסין | Cyprus Insights',
  description:
    'מדריכים מקיפים, מאמרים מקצועיים וכל המידע שצריך לדעת על השקעה בנדל"ן בקפריסין. ייעוץ מקצועי, ניתוחי שוק ומגמות עדכניות.',
  keywords:
    'מאמרים נדלן קפריסין, מדריך השקעה קפריסין, נדלן בקפריסין, השקעות בחו"ל, נכסים באירופה',
  openGraph: {
    title: 'מאמרים ומדריכים על נדל"ן בקפריסין',
    description:
      'מידע מקצועי ועדכני עבור משקיעים חכמים - מדריכים, ניתוחים והמלצות על השקעה בנדל"ן קפריסאי',
    type: 'website',
    locale: 'he_IL',
  },
};

// Revalidate every hour (3600 seconds) for ISR
export const revalidate = 3600;

// Server-side data fetching
async function getArticles(): Promise<Article[]> {
  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    const articles = await db
      .collection('articles')
      .find({ published: true, status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return JSON.parse(JSON.stringify(articles)) as Article[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ArticlesHeroSection />

      {/* Articles Grid */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          {articles.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  המאמרים האחרונים שלנו
                </h2>
                <p className="text-gray-600">
                  מידע מקצועי ועדכני עבור משקיעים חכמים
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, idx) => (
                  <ArticleCard
                    key={article._id?.toString() || idx}
                    article={article}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">אין מאמרים זמינים כרגע</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
