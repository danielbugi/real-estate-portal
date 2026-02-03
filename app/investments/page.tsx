import { Metadata } from 'next';
import Link from 'next/link';
import { citiesData } from '@/lib/city-data';
import { MapPin, ArrowLeft, TrendingUp } from 'lucide-react';
import CTAWithForm from '@/components/CTAWithForm';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export const metadata: Metadata = {
  title:
    'השקעות בקפריסין לפי ערים - מדריך מקיף למשקיעים ישראלים | Cyprus Insights',
  description:
    'מדריך מקיף להשקעות נדל"ן בערים המרכזיות בקפריסין - לימסול, פאפוס, לרנקה וניקוסיה. השוו מחירים, תשואות ואזורי השקעה. ייעוץ מקצועי למשקיעים ישראלים.',
  keywords: [
    'השקעות קפריסין',
    'נדל"ן קפריסין',
    'השקעות לימסול',
    'השקעות פאפוס',
    'השקעות לרנקה',
    'השקעות ניקוסיה',
    'קניית דירה בקפריסין',
    'השקעות נדלן בחול',
    'תשואות השקעה קפריסין',
    'איפה להשקיע בקפריסין',
  ],
  alternates: {
    canonical: `${siteUrl}/investments`,
  },
  openGraph: {
    title: 'השקעות בקפריסין לפי ערים - מדריך מקיף למשקיעים ישראלים',
    description:
      'מדריך מקיף להשקעות נדל"ן בערים המרכזיות בקפריסין - לימסול, פאפוס, לרנקה וניקוסיה. השוו מחירים, תשואות ואזורי השקעה.',
    url: `${siteUrl}/investments`,
    siteName: 'Cyprus Insights',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096',
        width: 2096,
        height: 1400,
        alt: 'השקעות נדל"ן בקפריסין',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'השקעות בקפריסין לפי ערים - מדריך מקיף',
    description:
      'מדריך מקיף להשקעות נדל"ן בערים המרכזיות בקפריסין - לימסול, פאפוס, לרנקה וניקוסיה.',
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096',
    ],
  },
};

export default function InvestmentsIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'דף הבית', url: '/' },
    { name: 'השקעות בקפריסין', url: '/investments' },
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'השקעות נדל"ן בקפריסין לפי ערים',
    description:
      'מדריך מקיף להשקעות נדל"ן בערים המרכזיות בקפריסין - לימסול, פאפוס, לרנקה וניקוסיה',
    url: `${siteUrl}/investments`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: citiesData.map((city, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Place',
          name: city.cityHe,
          description: city.excerpt,
          url: `${siteUrl}/investments/${city.slug}`,
          geo: {
            '@type': 'GeoCoordinates',
            addressCountry: 'CY',
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/90 via-ocean-800/80 to-ocean-900/90" />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              השקעות נדל"ן בקפריסין
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl">
              מדריך מקיף להשקעות בערים המרכזיות של קפריסין עבור משקיעים ישראלים
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              בחרו את העיר המתאימה להשקעה שלכם
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              קפריסין מציעה מגוון רחב של אפשרויות השקעה בערים שונות, כל אחת עם
              אופי, יתרונות ופוטנציאל תשואה ייחודיים. לימסול מתמקדת בפיננסים
              ועסקים, פאפוס בתיירות ואיכות חיים, לרנקה בנגישות ופיתוח עתידי,
              וניקוסיה במגורים ומסחר עירוני. לכל עיר מאפיינים שונים במחירים,
              תשואות וסוגי נכסים.
            </p>
            <div className="flex items-center justify-center gap-2 text-ocean-600">
              <TrendingUp className="w-6 h-6" />
              <span className="font-semibold text-lg">
                בחרו את העיר המתאימה לכם ולמטרות ההשקעה שלכם
              </span>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              {citiesData.map((city) => (
                <Link
                  key={city.slug}
                  href={`/investments/${city.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={city.featuredImage}
                      alt={city.cityHe}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5" />
                      <span className="font-bold text-xl">{city.cityHe}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-ocean-600 mb-3 group-hover:text-ocean-700">
                      {city.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {city.excerpt}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-2 mb-4">
                      {city.content.whyInvest.slice(0, 3).map((reason, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="text-green-600 font-bold">✓</span>
                          <span className="line-clamp-1">{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-ocean-600 font-semibold group-hover:gap-3 transition-all">
                      <span>למידע מפורט</span>
                      <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              השוואה מהירה בין הערים
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-ocean-600 text-white">
                    <th className="p-4 text-right font-bold">עיר</th>
                    <th className="p-4 text-right font-bold">אופי</th>
                    <th className="p-4 text-right font-bold">מחיר ממוצע</th>
                    <th className="p-4 text-right font-bold">תשואה</th>
                    <th className="p-4 text-right font-bold">מתאים ל</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold text-ocean-600">לימסול</td>
                    <td className="p-4">פיננסי ועסקי</td>
                    <td className="p-4">€250k - €500k</td>
                    <td className="p-4">4-6%</td>
                    <td className="p-4">משקיעים מקצועיים</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold text-ocean-600">פאפוס</td>
                    <td className="p-4">תיירותי ונופש</td>
                    <td className="p-4">€150k - €400k</td>
                    <td className="p-4">5-8%</td>
                    <td className="p-4">השכרה תיירותית</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold text-ocean-600">לרנקה</td>
                    <td className="p-4">פיתוח ונגישות</td>
                    <td className="p-4">€100k - €250k</td>
                    <td className="p-4">5-7%</td>
                    <td className="p-4">משקיעים מתחילים</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold text-ocean-600">ניקוסיה</td>
                    <td className="p-4">מגורים ומסחר</td>
                    <td className="p-4">€120k - €280k</td>
                    <td className="p-4">5-7%</td>
                    <td className="p-4">השכרה ארוכה</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTAWithForm
          title="מעוניינים להשקיע בקפריסין?"
          subtitle="השאירו פרטים ונחזור אליכם עם ייעוץ מקצועי והמלצות מותאמות אישית"
        />
      </div>
    </>
  );
}
