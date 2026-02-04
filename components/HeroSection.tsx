'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] sm:h-[85vh] overflow-hidden">
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
            <span>השקעות נדל"ן בקפריסין </span>
            <br />
            <span className="text-gold-400">פורטל והזדמנויות השקעה</span>
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
  );
}
