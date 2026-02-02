import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export const metadata: Metadata = {
  title: 'מאמרים ומדריכים | Cyprus Insights',
  description:
    'מאמרים, מדריכים וניתוחי שוק מקצועיים על השקעות נדל"ן בקפריסין. כל מה שצריך לדעת לפני השקעה בנדל"ן בחו"ל',
  keywords: [
    'מאמרים נדלן קפריסין',
    'מדריכי השקעה',
    'ניתוח שוק נדלן',
    'השקעות בחול',
    'Cyprus real estate articles',
    'investment guides',
    'market analysis',
  ],
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
    url: `${siteUrl}/articles`,
    siteName: 'Cyprus Insights',
    title: 'מאמרים ומדריכים - Cyprus Insights',
    description: 'מאמרים וניתוחי שוק מקצועיים על השקעות נדל"ן בקפריסין',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cyprus Insights - מאמרים ומדריכים',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מאמרים ומדריכים - Cyprus Insights',
    description: 'מאמרים וניתוחי שוק מקצועיים על השקעות נדל"ן בקפריסין',
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/articles`,
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
