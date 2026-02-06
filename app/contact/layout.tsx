import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export const metadata: Metadata = {
  title: 'צור קשר | Cyprus Insights',
  description:
    'צור קשר עם Cyprus Insights לייעוץ מקצועי בנושא השקעות נדל"ן בקפריסין. נשמח לעזור לך למצוא את הנכס המושלם',
  keywords: [
    'צור קשר',
    'ייעוץ נדלן קפריסין',
    'יועץ נדלן',
    'השקעות קפריסין',
    'contact Cyprus',
    'real estate consulting',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
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
    url: `${siteUrl}/contact`,
    siteName: 'Cyprus Insights',
    title: 'צור קשר - Cyprus Insights',
    description: 'צור קשר לייעוץ מקצועי בנושא השקעות נדל"ן בקפריסין',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cyprus Insights - צור קשר',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'צור קשר - Cyprus Insights',
    description: 'צור קשר לייעוץ מקצועי בנושא השקעות נדל"ן בקפריסין',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
