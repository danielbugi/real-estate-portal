import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCitySlugs } from '@/lib/city-data';
import CTAWithForm from '@/components/CTAWithForm';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

// Generate static params for all cities
export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return slugs.map((slug) => ({
    city: slug,
  }));
}

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

// Generate metadata for each city
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: 'עיר לא נמצאה',
    };
  }

  return {
    title: `${cityData.title} | Cyprus Insights`,
    description: cityData.metaDescription,
    keywords: [
      `השקעות ${cityData.cityHe}`,
      `נדל"ן ${cityData.cityHe}`,
      `נכסים ${cityData.cityHe} קפריסין`,
      `קניית דירה ${cityData.cityHe}`,
      `דירות למכירה ${cityData.cityHe}`,
      `תשואה ${cityData.cityHe}`,
      `מחירי נדלן ${cityData.cityHe}`,
      cityData.city,
      'Cyprus real estate',
      `${cityData.city} property investment`,
    ],
    alternates: {
      canonical: `${siteUrl}/investments/${city}`,
    },
    openGraph: {
      title: cityData.title,
      description: cityData.metaDescription,
      url: `${siteUrl}/investments/${city}`,
      siteName: 'Cyprus Insights',
      images: [
        {
          url: cityData.featuredImage,
          width: 1200,
          height: 630,
          alt: `${cityData.cityHe} - ${cityData.title}`,
        },
      ],
      locale: 'he_IL',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: cityData.title,
      description: cityData.metaDescription,
      images: [cityData.featuredImage],
    },
  };
}

export default async function CityInvestmentPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const { content } = cityData;

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'דף הבית', url: '/' },
    { name: 'השקעות בקפריסין', url: '/investments' },
    { name: cityData.cityHe, url: `/investments/${city}` },
  ]);

  // Article Schema for City Investment Guide
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cityData.title,
    description: cityData.metaDescription,
    image: cityData.featuredImage,
    author: {
      '@type': 'Organization',
      name: 'Cyprus Insights',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cyprus Insights',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/cyprus_png.png`,
      },
    },
    datePublished: '2024-06-01',
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/investments/${city}`,
    },
  };

  // Place Schema for the City
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${cityData.cityHe} (${cityData.city})`,
    description: content.overview,
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'CY',
    },
    containedInPlace: {
      '@type': 'Country',
      name: 'Cyprus',
    },
  };

  // Investment Opportunity Schema
  const investmentSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `השקעות נדל"ן ב${cityData.cityHe}`,
    description: cityData.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Cyprus Insights',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: cityData.city,
      addressCountry: 'CY',
    },
    serviceType: 'Real Estate Investment Consulting',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investmentSchema) }}
      />
      <article className="min-h-screen">
        {/* Hero Section */}
        <header className="relative h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${cityData.featuredImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/80 via-ocean-800/70 to-ocean-900/80" />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <p className="text-gold-400 font-semibold text-lg mb-4">
              {cityData.cityHe}, קפריסין
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {cityData.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl">
              {cityData.excerpt}
            </p>
          </div>
        </header>

        {/* Main Article Content */}
        <div className="bg-white py-12">
          <div className="container-custom max-w-4xl">
            {/* Overview Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-ocean-900">
                סקירה כללית על {cityData.cityHe}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.overview}
              </p>
            </section>

            {/* Why Invest Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ocean-900">
                למה להשקיע ב{cityData.cityHe}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-3">
                  השקעה בנדל"ן ב{cityData.cityHe} מציעה מספר יתרונות משמעותיים
                  למשקיעים:
                </p>
                <ul className="list-disc list-inside space-y-1.5">
                  {content.whyInvest.map((reason, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Property Types Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ocean-900">
                סוגי נכסים מומלצים להשקעה
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-3">
                  שוק הנדל"ן ב{cityData.cityHe} מציע מגוון אפשרויות השקעה:
                </p>
                <ul className="list-disc list-inside space-y-1.5">
                  {content.propertyTypes.map((type, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Neighborhoods Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ocean-900">
                שכונות ואזורים מובילים להשקעה
              </h2>
              <div className="space-y-4">
                {content.neighborhoods.map((neighborhood, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-ocean-800 mb-2">
                      {neighborhood.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {neighborhood.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Price Range & ROI Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ocean-900">
                מחירים ותשואות
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-ocean-800 mb-3">
                    טווח מחירים
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {content.priceRange}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ocean-800 mb-3">
                    תשואות והערכת ערך
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{content.roi}</p>
                </div>
              </div>
            </section>

            {/* Infrastructure Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ocean-900">
                תשתיות ופיתוח עירוני
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-3">
                  {cityData.cityHe} נהנית מתשתיות מפותחות ופרויקטי פיתוח
                  מתמשכים:
                </p>
                <ul className="list-disc list-inside space-y-1.5">
                  {content.infrastructure.map((item, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Pros & Cons Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ocean-900">
                שיקולים להשקעה
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pros */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-900 mb-4">
                    יתרונות
                  </h3>
                  <ul className="list-disc list-inside space-y-3">
                    {content.prosAndCons.pros.map((pro, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed">
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">
                    נקודות לתשומת לב
                  </h3>
                  <ul className="list-disc list-inside space-y-3">
                    {content.prosAndCons.cons.map((con, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed">
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Investor Tips Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ocean-900">
                המלצות למשקיעים
              </h2>
              <div className="space-y-3">
                {content.investorTips.map((tip, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {tip}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <CTAWithForm
          title={`מעוניינים להשקיע ב${cityData.cityHe}?`}
          subtitle="השאירו פרטים ונחזור אליכם עם מידע מקיף והמלצות מותאמות אישית"
        />
      </article>
    </>
  );
}
