import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export const metadata: Metadata = {
  title: 'אודות | Cyprus Insights',
  description:
    'Cyprus Insights - פורטל המידע וההשקעות המוביל של ישראל לנדל"ן יוקרתי בקפריסין. צוות מקצועי עם ניסיון של שנים בשוק הנדל"ן הקפריסאי',
  keywords: [
    'אודות',
    'נדלן קפריסין',
    'מומחי נדלן',
    'השקעות קפריסין',
    'Cyprus Insights',
    'real estate experts',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
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
    url: `${siteUrl}/about`,
    siteName: 'Cyprus Insights',
    title: 'אודות Cyprus Insights - מומחים לנדל"ן בקפריסין',
    description: 'פורטל המידע וההשקעות המוביל של ישראל לנדל"ן יוקרתי בקפריסין',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cyprus Insights - אודותינו',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'אודות Cyprus Insights',
    description: 'פורטל המידע וההשקעות המוביל של ישראל לנדל"ן יוקרתי בקפריסין',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
