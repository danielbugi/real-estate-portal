'use client';

import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  Award,
  Target,
  Heart,
  Globe,
  TrendingUp,
  Shield,
} from 'lucide-react';
import StatsSection from '@/components/StatsSection';
import CTAWithForm from '@/components/CTAWithForm';

// Note: Metadata export doesn't work with 'use client' - will need to move to parent or use next/head
// For now, SEO is handled by the root layout
// export const metadata: Metadata = {...};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brown-900/90 via-brown-800/80 to-brown-900/90" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
              אודות CYPRUS INSIGHTS
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl">
              פורטל המידע וההשקעות המוביל של ישראל לנדל"ן יוקרתי בקפריסין
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                המשימה <span className="text-ocean-500">שלנו</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                אנו מתמחים בהשקעות נדל״ן יוקרתיות בקפריסין עבור משקיעים ישראלים.
                המטרה שלנו היא לספק מידע מקצועי ומקיף עבור המשקיע הישראלי
                המתעניין בשוק הקפריסאי.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                עולם ההשקעות בנדל״ן, ובפרט מעבר לים, מלא ברעש, אינטרסים ומידע
                חלקי. אנחנו כאן כדי לעשות סדר. המאמרים, הסקירות והניתוחים באתר
                נבנים על בסיס מחקר שיטתי, הצלבת מקורות, וניתוח מגמות.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                עולם ההשקעות בנדל״ן, ובפרט מעבר לים, מלא ברעש, אינטרסים ומידע
                חלקי. אנחנו כאן כדי לעשות סדר. המאמרים, הסקירות והניתוחים באתר
                נבנים על בסיס מחקר שיטתי, הצלבת מקורות, וניתוח מגמות.
              </p>
              {/* <div className="flex gap-4">
                <div className="bg-ocean-100 p-4 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-ocean-600" />
                </div>
                <div className="bg-gold-100 p-4 rounded-lg">
                  <Shield className="w-8 h-8 text-gold-600" />
                </div>
                <div className="bg-brown-100 p-4 rounded-lg">
                  <Heart className="w-8 h-8 text-brown-600" />
                </div>
              </div> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              // className=""
            >
              {/* {[
                { icon: Users, value: '500+', label: 'לקוחות מרוצים' },
                { icon: Building2, value: '1,200+', label: 'נכסים שנמכרו' },
                { icon: Award, value: '15+', label: 'שנות ניסיון' },
                { icon: Globe, value: '3', label: 'משרדים בינלאומיים' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-effect p-6 rounded-2xl text-center"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-ocean-500" />
                  <div className="text-3xl font-bold text-ocean-600 mb-2">
                    {item.value}
                  </div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))} */}
              <img
                src="https://cdn.pixabay.com/photo/2017/08/30/12/42/cyprus-2696930_1280.jpg"
                alt="Team working"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Why Cyprus Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              למה <span className="text-ocean-500">השוק הקפריסאי?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              השוק הקפריסאי הפך בשנים האחרונות ליעד מועדף עבור משקיעים זרים,
              בזכות שילוב של נגישות, שקיפות ומאפיינים מבניים המאפשרים הבנה רחבה
              של אופן פעילות השוק – גם עבור מי שאינו פועל מתוך המדינה.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                number: '01',
                title: 'שוק ברור וקריא',
                desc: 'רגולציה מסודרת, מבנה עסקאות מוגדר ותהליכים שניתן ללמוד, לנתח ולהשוות בצורה מושכלת.',
                delay: 0,
              },
              {
                number: '02',
                title: 'נגישות למשקיעים זרים',
                desc: 'מסגרות משפטיות וכלכליות המאפשרות פעילות מסודרת ושקופה למשקיעים בינלאומיים.',
                delay: 0.1,
              },
              {
                number: '03',
                title: 'התפתחות מתמשכת',
                desc: 'שילוב של פיתוח תשתיות, פעילות תיירותית ועניין בינלאומי התורמים לדינמיקה עקבית בשוק.',
                delay: 0.2,
              },
              {
                number: '04',
                title: 'קירבה גאוגרפית ותרבותית',
                desc: 'מיקום נוח, זמני טיסה קצרים ותרבות עסקית מערבית המקלים על היכרות, למידה ותקשורת.',
                delay: 0.3,
              },
              {
                number: '05',
                title: 'מגוון אפשרויות',
                desc: 'אזורים שונים, סוגי נכסים מגוונים ודינמיקה משתנה בין ערים ואזורים, המאפשרים בחינה רחבה של השוק.',
                delay: 0.4,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className="relative bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-ocean-500"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {item.number}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-4 sm:space-y-6"
          >
            <div className="glass-effect p-6 sm:p-8 rounded-2xl">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                <strong className="text-ocean-600">המפתח</strong> אינו רק בבחירת
                היעד, אלא בהבנת ההקשר: כיצד השוק פועל, מה מניע אותו ואילו
                שיקולים יש להביא בחשבון לפני קבלת החלטה.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <strong className="text-ocean-600">לשם כך נבנה האתר</strong> –
                כדי להנגיש מידע מבוסס, הצגה מדויקת והבנה רחבה של השוק הקפריסאי.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding luxury-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              מה מייחד <span className="text-ocean-500">אותנו? </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              העקרונות המנחים אותנו בכל פעילות
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: 'אמינות ושקיפות מקצועיות לפני הכול',
                desc: 'התוכן נוצר ומפוקח על ידי גורמים בעלי היכרות מעמיקה עם שוק הנדל״ן הקפריסאי, הרגולציה המקומית ומגמות ההשקעה.',
                delay: 0,
              },
              {
                icon: Heart,
                title: 'מחויבות ללקוח דיוק ושקיפות',
                desc: 'אנו מקפידים על הצגה מדויקת של נתונים, מגמות ותהליכים, תוך הסתמכות על מקורות, בדיקות והצלבת מידע, ללא הפרזה או מסרים מטעים.',
                delay: 0.1,
              },
              {
                icon: Target,
                title: 'ערכיות ואחריות',
                desc: 'המידע באתר מוצג ככלי להבנה מעמיקה וקבלת החלטות מושכלת, ואינו מחליף ייעוץ אישי או מקצועי.',
                delay: 0.2,
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: value.delay }}
                className="glass-effect p-6 sm:p-8 rounded-2xl text-center card-hover"
              >
                <value.icon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-ocean-500" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Team Section */}
      {/* <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              הצוות <span className="text-ocean-500">המקצועי</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              מומחים עם ניסיון עשיר בשוק הנדל״ן הבינלאומי
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'דוד כהן',
                role: 'מנכ״ל ומייסד',
                image:
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
              },
              {
                name: 'שרה לוי',
                role: 'מנהלת מכירות',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
              },
              {
                name: 'יוסי אברהם',
                role: 'יועץ השקעות',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300',
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect rounded-2xl overflow-hidden card-hover"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-ocean-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <CTAWithForm
        title="מתעניינים להשקיע בקפריסין?"
        subtitle="השאירו פרטים ויועץ בכיר יצור איתכם קשר בהקדם לשיחת ייעוץ ראשונית ללא עלות!"
      />
    </div>
  );
}
