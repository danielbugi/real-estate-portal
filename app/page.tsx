'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  Shield,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import ArticleCard from '@/components/ArticleCard';
import StatsSection from '@/components/StatsSection';
import ContactForm from '@/components/ContactForm';
import { Property, Article } from '@/types';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch properties
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data.properties || []))
      .catch(console.error);

    // Fetch articles
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [propertiesRes, articlesRes] = await Promise.all([
          fetch('/api/properties'),
          fetch('/api/articles'),
        ]);

        if (!propertiesRes.ok || !articlesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [propertiesData, articlesData] = await Promise.all([
          propertiesRes.json(),
          articlesRes.json(),
        ]);

        setProperties(propertiesData.properties || []);
        setArticles(articlesData.articles || []);
      } catch (err) {
        setError('שגיאה בטעינת הנתונים. אנא נסו שוב מאוחר יותר.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Fixed Background */}
      <section className="relative h-[90vh] sm:h-[85vh] overflow-hidden">
        {/* Fixed Background */}
        {/* Fixed Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/80 via-ocean-800/70 to-brown-900/60" />
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10 h-full flex flex-col items-start justify-center text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start font-display font-bold text-white mb-4 sm:mb-6 text-shadow-lg">
              <span className="uppercase font-light text-xl sm:text-2xl md:text-3xl">
                Cyprus Insights
              </span>
              <br />
              <span className="text-gold-400">
                פורטל המידע וההשקעות של ישראל
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-12 max-w-3xl text-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            קפריסין מציעה לישראלים הזדמנות השקעה אידיאלית בנדל"ן אירופאי איכותי,
            עם שילוב של יתרונות כלכליים, קרבה גיאוגרפית ותרבותית, ואיכות חיים
            גבוהה.
          </motion.p>

          <motion.ul
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 text-start list-disc list-inside space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 md:mb-12 max-w-3xl text-shadow mr-4 sm:mr-6"
            dir="rtl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <li>תשואה גבוהה ויציבה על השקעה בנדל"ן</li>
            <li>יציבות כלכלית ומערכת משפטית אמינה</li>
            <li>מיסוי מועדף למשקיעים זרים</li>
            <li>קרבה גיאוגרפית ותרבותית לישראל</li>
            <li>איכות חיים גבוהה ותשתיות מודרניות</li>
          </motion.ul>

          <motion.div
            className="mt-6 sm:mt-8 md:absolute md:bottom-28 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* <button className="btn-primary text-base sm:text-lg">גלו נכסים יוקרתיים</button> */}
            <button className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              דברו איתנו
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Why Cyprus Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-ocean-100/30 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Right Side - Content with Icons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-6">
                <span className="px-4 py-2 bg-ocean-100 text-ocean-700 rounded-full text-sm font-semibold tracking-wide">
                  יתרונות השקעה
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 text-gradient leading-tight">
                יתרונות השקעה בקפריסין
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                קפריסין מציעה שילוב ייחודי של יתרונות שהופכים אותה ליעד ההשקעה
                המועדף על משקיעים ישראלים
              </p>

              {/* List with icons */}
              <div className="space-y-6">
                {[
                  {
                    // icon: TrendingUp,
                    title: 'תשואה גבוהה ויציבה',
                    desc: 'שוק הנדל"ן בקפריסין מציע תשואה מדודה ויציבה שנה אחר שנה. דירות להשכרה מניבות 5-9% תשואה שנתית נטו, בעוד שהביקוש הגובר מאירופה והמזרח התיכון יוצר פוטנציאל ריאלי לעליית ערך משמעותית. זו השקעה שמניבה גם הכנסה שוטפת וגם צמיחה הונית.',
                    color: 'text-green-600',
                    bg: 'bg-green-50',
                    delay: 0,
                  },
                  {
                    // icon: Shield,
                    title: 'יציבות ובטחון',
                    desc: 'קפריסין היא חלק מהאיחוד האירופי מאז 2004, עם מערכת משפט מבוססת על המשפט הבריטי המוכר. הבנקאות המקומית מוסדרת לפי תקני ECB האירופי, והכלכלה יציבה ושקופה. זה אומר שההשקעה שלכם מוגנת במסגרת חוקית ברורה ואמינה.',
                    color: 'text-ocean-600',
                    bg: 'bg-ocean-50',
                    delay: 0.1,
                  },
                  {
                    // icon: Sparkles,
                    title: 'מיסוי מועדף ביותר',
                    desc: 'המיסוי בקפריסין הוא מהנמוכים באירופה - מס חברות של 12.5% בלבד. משקיעים זרים נהנים מפטור ממס רכישה, אין מס ירושה, ומס רווחי הון אפסי על מכירת נכסים. זה אומר שיותר מהרווחים שלכם נשארים בכיס שלכם.',
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                    delay: 0.2,
                  },
                  {
                    // icon: Building2,
                    title: 'נגישות מקסימלית',
                    desc: 'קפריסין נמצאת פשוט ממש מעבר לפינה - 45 דקות טיסה בלבד מישראל, באותו אזור זמן. קהילה ישראלית גדולה ופעילה, שפה עברית נפוצה, ותרבות קרובה הופכים את ההסתגלות לקלה במיוחד. אפשר לנהל את ההשקעה מקרוב מבלי להרגיש רחוק מהבית.',
                    color: 'text-purple-600',
                    bg: 'bg-purple-50',
                    delay: 0.3,
                  },
                  {
                    // icon: Phone,
                    title: 'תשתיות ואיכות חיים',
                    desc: 'קפריסין משלבת תשתית מודרנית ברמה אירופאית עם מזג אוויר ים תיכוני מעולה - 340 ימי שמש בשנה. רמת החיים גבוהה, עלויות מחיה סבירות, וסביבה בטוחה ונעימה. בין אם אתם משכירים או שוקלים עתיד למגורים, זה מקום שאנשים רוצים להיות בו.',
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                    delay: 0.4,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay, duration: 0.5 }}
                    className="flex gap-3 sm:gap-4 group"
                  >
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                {/* Main image */}
                <img
                  src="https://images.unsplash.com/photo-1602523362493-529ae4e7e4ea?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Cyprus coastal view"
                  className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 via-transparent to-transparent" />
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-400 rounded-full blur-3xl opacity-20 -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-ocean-400 rounded-full blur-3xl opacity-20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">
              נכסים <span className="text-ocean-500">נבחרים</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              הזדמנויות השקעה יוקרתיות בקפריסין
            </p>
          </motion.div>

          {properties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 6).map((property, idx) => (
                <PropertyCard
                  key={property._id?.toString() || idx}
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">טוען נכסים...</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a href="/properties" className="btn-primary">
              צפו בכל הנכסים
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            הדרך המקצועית להשקעה חכמה בקפריסין
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto py-4 sm:py-6">
            השקעה נבונה בנדל"ן מתחילה בנתונים מדויקים ומסתיימת בליווי חסר פשרות.
            הצוות המקצועי שלנו מביא עמו <strong>ניסיון עשיר ומוכח</strong>{' '}
            בניתוח שוק הנדל"ן הקפריסאי, מתוך מחויבות עמוקה לערכים של{' '}
            <strong>אמינות, שקיפות ודיוק אבסולוטי.</strong>
          </p>

          <ul className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto space-y-4">
            <li>
              <strong>תשואה ומקצועיות:</strong> איתור פוטנציאל תשואה מקסימלי על
              בסיס נתונים ריאליים וניתוח מגמות.
            </li>
            <li>
              <strong>ניסיון בשטח:</strong> חיבור ישיר ליועצים ומשרדי הנדל"ן
              המובילים בישראל, המומחים בשוק המקומי.
            </li>
            <li>
              <strong>ביטחון מוחלט:</strong> מעטפת מקצועית וערכית המלווה אתכם
              לאורך כל הדרך, מהבדיקה הראשונית ועד לסגירה.
            </li>
          </ul>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Articles Section */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">
              מאמרים <span className="text-gold-500">מובילים</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              כל מה שצריך לדעת על השקעה בקפריסין
            </p>
          </motion.div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {articles.slice(0, 2).map((article, idx) => (
                <ArticleCard
                  key={article._id?.toString() || idx}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">טוען מאמרים...</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a href="/articles" className="btn-primary">
              לכל המאמרים
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding luxury-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                בואו נדבר על <span className="text-ocean-500">ההשקעה</span> שלכם
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                אל תסתפקו במידע חלקי. אנו מזמינים אתכם לתיאום{' '}
                <strong>שיחת ייעוץ ללא עלות</strong>, בה נבחן את אסטרטגיית
                ההשקעה שלכם ונתאם <strong>פגישה מקצועית</strong> עם המומחים
                הרלוונטיים עבורכם.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
