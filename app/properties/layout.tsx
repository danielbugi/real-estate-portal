import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export const metadata: Metadata = {
  title: 'נכסים למכירה | Cyprus Insights',
  description:
    'גלה נכסי נדל"ן יוקרתיים בקפריסין - וילות, פנטהאוזים ודירות מובחרות. נכסים עם תשואה גבוהה למשקיעים ישראלים',
  keywords: [
    'נכסים למכירה קפריסין',
    'וילות קפריסין',
    'דירות בקפריסין',
    'פנטהאוזים קפריסין',
    'נדלן יוקרתי',
    'Cyprus properties',
    'luxury real estate',
    'villas Cyprus',
  ],
  alternates: {
    canonical: `${siteUrl}/properties`,
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
    type: 'website',
    locale: 'he_IL',
    url: `${siteUrl}/properties`,
    siteName: 'Cyprus Insights',
    title: 'נכסים למכירה בקפריסין - Cyprus Insights',
    description:
      'נכסי נדל"ן יוקרתיים בקפריסין - וילות, פנטהאוזים ודירות מובחרות',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cyprus Insights - נכסים למכירה',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'נכסים למכירה בקפריסין',
    description:
      'נכסי נדל"ן יוקרתיים בקפריסין - וילות, פנטהאוזים ודירות מובחרות',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
