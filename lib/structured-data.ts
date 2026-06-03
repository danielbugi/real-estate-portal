// Structured Data (Schema.org) helpers for SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Cyprus Insights',
    alternateName: 'Cyprus Insights - פורטל המידע וההשקעות',
    description: 'פורטל המידע וההשקעות המוביל של ישראל לנדל"ן יוקרתי בקפריסין',
    url: process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il',
    logo: `${process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il'}/logo.png`,
    areaServed: {
      '@type': 'Country',
      name: 'Cyprus',
    },
    knowsAbout: [
      'Real Estate Investment',
      'Cyprus Property',
      'Luxury Villas',
      'Real Estate Market Analysis',
    ],
  };
}

export function generateArticleSchema(article: {
  title: string;
  titleHe: string;
  excerpt?: string;
  excerptHe?: string;
  featuredImageUrl?: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
  slug: string;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';
  const title = article.titleHe || article.title;
  const description = article.excerptHe || article.excerpt || '';
  const image = article.featuredImageUrl || article.image;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || `${siteUrl}/default-article-image.jpg`,
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
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
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/articles/${article.slug}`,
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  const siteUrl =
    process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function generateRealEstateListingSchema(property: {
  title: string;
  titleHe: string;
  price: number;
  description: string;
  descriptionHe: string;
  location: {
    city: string;
    cityHe: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    sqm: number;
  };
  images: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.titleHe || property.title,
    description: property.descriptionHe || property.description,
    image: property.images,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location.cityHe || property.location.city,
      addressCountry: 'CY',
    },
    numberOfRooms: property.features.bedrooms,
    numberOfBathroomsTotal: property.features.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.features.sqm,
      unitCode: 'MTK',
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateCityInvestmentSchema(cityData: {
  city: string;
  cityHe: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  featuredImage: string;
  slug: string;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `השקעות נדל"ן ב${cityData.cityHe}`,
    description: cityData.metaDescription,
    image: cityData.featuredImage,
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Cyprus Insights',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: cityData.city,
      addressCountry: 'CY',
    },
    serviceType: 'Real Estate Investment Consulting',
    url: `${siteUrl}/investments/${cityData.slug}`,
  };
}
