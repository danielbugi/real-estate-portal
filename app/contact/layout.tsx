import type { Metadata } from 'next';
import { generateFAQSchema } from '@/lib/structured-data';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://cyprus-insights.co.il';

const contactFaqs = [
  {
    question: 'כמה זמן לוקח תהליך הרכישה?',
    answer:
      'תהליך הרכישה בקפריסין לוקח בממוצע 2-3 חודשים, תלוי בסוג הנכס ובמורכבות העסקה.',
  },
  {
    question: 'האם יש הגבלות על זרים לרכוש נכסים?',
    answer:
      'אזרחי ישראל ואזרחי האיחוד האירופי יכולים לרכוש נכסים בקפריסין ללא הגבלה.',
  },
  {
    question: 'מה עם מיסוי על הנכס?',
    answer:
      'מס חברות בקפריסין הוא 12.5%, ואין מס ירושה. המיסוי המלא תלוי במבנה ההשקעה.',
  },
  {
    question: 'האם אתם מספקים ליווי משפטי?',
    answer:
      'כן, אנו עובדים עם עורכי דין מקומיים ומספקים ליווי מלא לאורך כל התהליך.',
  },
];

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
        url: `${siteUrl}/cyprus_png.png`,
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
    images: [`${siteUrl}/cyprus_png.png`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqSchema = generateFAQSchema(contactFaqs);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
