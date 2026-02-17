import type { Metadata } from 'next';
import { Heebo, Assistant } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import { AccessibilityWrapper } from '@/components/AccessibilityWrapper';
import { generateOrganizationSchema } from '@/lib/structured-data';
import Script from 'next/script';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
});

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cyprus Insights – פורטל המידע וההשקעות של ישראל',
    template: '%s | Cyprus Insights',
  },
  description:
    'השקעות נדל"ן יוקרתיות בקפריסין למשקיעים ישראלים. וילות, פנטהאוזים ודירות עם תשואה גבוהה. מדריכים מקצועיים, ניתוח שוק ונכסים מובחרים',
  keywords: [
    'נדלן קפריסין',
    'השקעות קפריסין',
    'נכסים בקפריסין',
    'וילות קפריסין',
    'דירות בקפריסין',
    'Cyprus real estate',
    'property Cyprus',
    'Cyprus investment',
    'נדלן בחול',
    'השקעות נדלן',
    'real estate abroad',
  ],
  authors: [{ name: 'Cyprus Insights' }],
  creator: 'Cyprus Insights',
  publisher: 'Cyprus Insights',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: siteUrl,
    siteName: 'Cyprus Insights',
    title: 'Cyprus Insights – פורטל המידע וההשקעות של ישראל',
    description:
      'השקעות נדל"ן יוקרתיות בקפריסין למשקיעים ישראלים. וילות, פנטהאוזים ודירות עם תשואה גבוהה',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cyprus Insights - נדלן יוקרתי בקפריסין',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyprus Insights – פורטל המידע וההשקעות של ישראל',
    description: 'השקעות נדל"ן יוקרתיות בקפריסין למשקיעים ישראלים',
    images: [`${siteUrl}/og-image.jpg`],
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
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Safari and iOS compatibility meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3FBV51922X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3FBV51922X');
          `}
        </Script>
      </head>
      <body className={`${heebo.variable} ${assistant.variable} font-sans`}>
        <a href="#main-content" className="skip-to-content">
          דלג לתוכן הראשי
        </a>

        {/* Wrapper for main content - filters apply here */}
        <AccessibilityWrapper>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </AccessibilityWrapper>

        {/* Widget OUTSIDE wrapper - position: fixed works! */}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
