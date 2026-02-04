'use client';

import { motion } from 'framer-motion';

export default function WhyCyprusSection() {
  return (
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
                  title: 'תשואה גבוהה ויציבה',
                  desc: 'שוק הנדל"ן בקפריסין מציע תשואה מדודה ויציבה שנה אחר שנה. דירות להשכרה מניבות 5-9% תשואה שנתית נטו, בעוד שהביקוש הגובר מאירופה והמזרח התיכון יוצר פוטנציאל ריאלי לעליית ערך משמעותית. זו השקעה שמניבה גם הכנסה שוטפת וגם צמיחה הונית.',
                  delay: 0,
                },
                {
                  title: 'יציבות ובטחון',
                  desc: 'קפריסין היא חלק מהאיחוד האירופי מאז 2004, עם מערכת משפט מבוססת על המשפט הבריטי המוכר. הבנקאות המקומית מוסדרת לפי תקני ECB האירופי, והכלכלה יציבה ושקופה. זה אומר שההשקעה שלכם מוגנת במסגרת חוקית ברורה ואמינה.',
                  delay: 0.1,
                },
                {
                  title: 'מיסוי מועדף ביותר',
                  desc: 'המיסוי בקפריסין הוא מהנמוכים באירופה - מס חברות של 12.5% בלבד. משקיעים זרים נהנים מפטור ממס רכישה, אין מס ירושה, ומס רווחי הון אפסי על מכירת נכסים. זה אומר שיותר מהרווחים שלכם נשארים בכיס שלכם.',
                  delay: 0.2,
                },
                {
                  title: 'נגישות מקסימלית',
                  desc: 'קפריסין נמצאת פשוט ממש מעבר לפינה - 45 דקות טיסה בלבד מישראל, באותו אזור זמן. קהילה ישראלית גדולה ופעילה, שפה עברית נפוצה, ותרבות קרובה הופכים את ההסתגלות לקלה במיוחד. אפשר לנהל את ההשקעה מקרוב מבלי להרגיש רחוק מהבית.',
                  delay: 0.3,
                },
                {
                  title: 'תשתיות ואיכות חיים',
                  desc: 'קפריסין משלבת תשתית מודרנית ברמה אירופאית עם מזג אוויר ים תיכוני מעולה - 340 ימי שמש בשנה. רמת החיים גבוהה, עלויות מחיה סבירות, וסביבה בטוחה ונעימה. בין אם אתם משכירים או שוקלים עתיד למגורים, זה מקום שאנשים רוצים להיות בו.',
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
  );
}
