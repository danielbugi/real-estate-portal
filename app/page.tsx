import PropertyCard from '@/components/PropertyCard';
import ArticleCard from '@/components/ArticleCard';
import StatsSection from '@/components/StatsSection';
import ContactForm from '@/components/ContactForm';
import { Property, Article } from '@/types';
import clientPromise from '@/lib/mongodb';
import { mockProperties } from '@/lib/mock-data';
import HeroSection from '@/components/HeroSection';
import WhyCyprusSection from '@/components/WhyCyprusSection';
import ProfessionalPathSection from '@/components/ProfessionalPathSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'נדל"ן בקפריסין והשקעות נדל"ן | Cyprus Insights - פורטל ההשקעות',
  description:
    'מחפשים השקעה חכמה בקפריסין? מגוון וילות, דירות ופרויקטים חדשים במיקומי שיא. תשואה של 5-9% בשנה, הטבות מס משמעותיות וליווי מקצועי מקצה לקצה. היכנסו עכשיו!',
  keywords:
    'נדלן בקפריסין, השקעות בקפריסין, נכסים בקפריסין, דירות בקפריסין, דירות למכירה בקפריסין, נדלן באירופה, השקעות נדלן',
  alternates: {
    canonical: 'https://www.cyprus-insights.co.il',
  },
  openGraph: {
    title: 'השקעות נדל"ן בקפריסין - Cyprus Insights',
    description:
      'דירות, וילות ופרויקטים להשקעה בקפריסין עם פוטנציאל תשואה גבוה והטבות מס למשקיעים זרים. כל המידע והנכסים במקום אחד.',
    url: 'https://www.cyprus-insights.co.il',
    siteName: 'Cyprus Insights',
    images: [
      {
        url: '/favicon.svg', // וודא שיש לך תמונה כזו בתיקיית public
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
    images: ['https://www.cyprus-insights.co.il/og-image.jpg'],
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
      .limit(2)
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

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Cyprus Insights',
    description:
      'פורטל השקעות נדל"ן בקפריסין - ייעוץ מקצועי והזדמנויות השקעה יוקרתיות',
    url: 'https://cyprus-insights.com',
    areaServed: 'Cyprus',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CY',
    },
  };

  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Why Cyprus Section */}
      <WhyCyprusSection />

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

      {/* Professional Path Section */}
      <ProfessionalPathSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Articles Section */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">
              מאמרים <span className="text-gold-500">מובילים</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              כל מה שצריך לדעת על השקעה בקפריסין
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, idx) => (
                <ArticleCard
                  key={article._id?.toString() || idx}
                  article={article}
                />
              ))}
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
