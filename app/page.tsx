import PropertyCard from '@/components/PropertyCard';
import StatsSection from '@/components/StatsSection';
import ContactForm from '@/components/ContactForm';
import { Property, Article } from '@/types';
import clientPromise from '@/lib/mongodb';
import { mockProperties } from '@/lib/mock-data';
import HeroSection from '@/components/HeroSection';
import WhyCyprusSection from '@/components/WhyCyprusSection';
import ProfessionalPathSection from '@/components/ProfessionalPathSection';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { generateOrganizationSchema } from '@/lib/structured-data';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export const metadata: Metadata = {
  title: 'נדל"ן בקפריסין והשקעות נדל"ן | Cyprus Insights - פורטל ההשקעות',
  description:
    'מחפשים השקעה חכמה בקפריסין? מגוון וילות, דירות ופרויקטים חדשים במיקומי שיא. תשואה של 5-9% בשנה, הטבות מס משמעותיות וליווי מקצועי מקצה לקצה. היכנסו עכשיו!',
  keywords:
    'נדל"ן בקפריסין, השקעות בקפריסין, נכסים בקפריסין, דירות בקפריסין, דירות למכירה בקפריסין, נדלן באירופה, השקעות נדל"ן, השקעות נדל"ן בקפריסין',
  alternates: {
    canonical: siteUrl,
  },
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
    title: 'השקעות נדל"ן בקפריסין - Cyprus Insights',
    description:
      'דירות, וילות ופרויקטים להשקעה בקפריסין עם פוטנציאל תשואה גבוה והטבות מס למשקיעים זרים. כל המידע והנכסים במקום אחד.',
    url: siteUrl,
    siteName: 'Cyprus Insights',
    images: [
      {
        url: `${siteUrl}/cyprus_png.png`,
        width: 1200,
        height: 630,
        alt: 'נדל"ן בקפריסין - Cyprus Insights',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'השקעות נדל"ן בקפריסין - Cyprus Insights',
    description: 'השקעה חכמה בנדל"ן קפריסאי - תשואה גבוהה ומיסוי מועדף',
    images: [`${siteUrl}/cyprus_png.png`],
  },
};

// Revalidate every hour (3600 seconds) for ISR
export const revalidate = 3600;

// Server-side data fetching
async function getProperties(): Promise<Property[]> {
  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    let properties = await db
      .collection('properties')
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    if (properties.length === 0) {
      return mockProperties.slice(0, 6) as Property[];
    }

    return JSON.parse(JSON.stringify(properties)) as Property[];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return mockProperties.slice(0, 6) as Property[];
  }
}

async function getArticles(): Promise<Article[]> {
  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    const articles = await db
      .collection('articles')
      .find({ published: true, status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    return JSON.parse(JSON.stringify(articles)) as Article[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function HomePage() {
  const [properties, articles] = await Promise.all([
    getProperties(),
    getArticles(),
  ]);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <HeroSection />

      {/* Why Cyprus Section */}
      <WhyCyprusSection />

      {/* Articles Section */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">
              כתבות <span className="text-gold-500">אחרונות</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              כל מה שצריך לדעת על השקעה בקפריסין
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Featured article — spans 2 columns */}
              {articles[0] && (
                <Link
                  href={`/articles/${articles[0].slug}`}
                  className="lg:col-span-2 block group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    {(articles[0].featuredImageUrl || articles[0].image) && (
                      <div className="relative h-72 sm:h-80 overflow-hidden">
                        <Image
                          src={articles[0].featuredImageUrl || articles[0].image!}
                          alt={articles[0].titleHe || articles[0].title}
                          fill
                          sizes="(max-width: 768px) 100vw, 66vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {articles[0].categoryHe && (
                          <span className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {articles[0].categoryHe}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>
                          {new Date(articles[0].createdAt).toLocaleDateString('he-IL')}
                        </span>
                        {articles[0].readTime && (
                          <span>{articles[0].readTime} דקות קריאה</span>
                        )}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-ocean-600 transition-colors">
                        {articles[0].titleHe || articles[0].title}
                      </h3>
                      {(articles[0].excerptHe || articles[0].excerpt) && (
                        <p className="text-gray-600 line-clamp-3 mb-5">
                          {articles[0].excerptHe || articles[0].excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-ocean-600 font-semibold">
                        <span>קרא עוד</span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Smaller articles stacked in 1 column */}
              <div className="flex flex-col gap-6">
                {articles.slice(1).map((article, idx) => (
                  <Link
                    key={article._id?.toString() || idx}
                    href={`/articles/${article.slug}`}
                    className="block group flex-1"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                      {(article.featuredImageUrl || article.image) && (
                        <div className="relative h-44 overflow-hidden">
                          <Image
                            src={article.featuredImageUrl || article.image!}
                            alt={article.titleHe || article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {article.categoryHe && (
                            <span className="absolute top-3 right-3 bg-gold-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                              {article.categoryHe}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                          <span>
                            {new Date(article.createdAt).toLocaleDateString('he-IL')}
                          </span>
                          {article.readTime && (
                            <span>{article.readTime} דקות קריאה</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-ocean-600 transition-colors mb-3">
                          {article.titleHe || article.title}
                        </h3>
                        <div className="flex items-center gap-2 text-ocean-600 text-sm font-semibold">
                          <span>קרא עוד</span>
                          <ArrowLeft className="w-3 h-3 rotate-180" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">אין מאמרים זמינים כרגע</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a href="/articles" className="btn-primary">
              לכל המאמרים
            </a>
          </div>
        </div>
      </section>

      {/* Professional Path Section */}
      <ProfessionalPathSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Properties */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">
              נכסים <span className="text-ocean-500">נבחרים</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              הזדמנויות השקעה יוקרתיות בקפריסין
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, idx) => (
              <PropertyCard
                key={property._id?.toString() || idx}
                property={property}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/properties" className="btn-primary">
              צפו בכל הנכסים
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding luxury-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                בואו נדבר על <span className="text-ocean-500">ההשקעה</span> שלכם
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                אל תסתפקו במידע חלקי. אנו מזמינים אתכם לתיאום{' '}
                <strong>שיחת ייעוץ ללא עלות</strong>, בה נבחן את אסטרטגיית
                ההשקעה שלכם ונתאם <strong>פגישה מקצועית</strong> עם המומחים
                הרלוונטיים עבורכם.
              </p>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
