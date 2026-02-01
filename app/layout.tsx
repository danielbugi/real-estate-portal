import type { Metadata } from 'next';
import { Heebo, Assistant } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import { AccessibilityWrapper } from '@/components/AccessibilityWrapper';

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

export const metadata: Metadata = {
  title: 'Cyprus Insights – פורטל המידע וההשקעות של ישראל',
  description:
    'השקעות נדל"ן יוקרתיות בקפריסין למשקיעים ישראלים. וילות, פנטהאוזים ודירות עם תשואה גבוהה',
  keywords:
    'נדלן קפריסין, השקעות קפריסין, נכסים בקפריסין, Cyprus real estate, property Cyprus',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
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
