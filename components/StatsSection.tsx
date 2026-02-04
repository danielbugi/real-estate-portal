'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: 8.3, suffix: '%', label: 'צמיחה שנתית בשוק הנדל"ן' },
  { value: 300, suffix: '+', label: 'נכסים יוקרתיים במאגר' },
  { value: 5.2, suffix: '%', label: 'תשואה ממוצעת מהשכרה' },
  { value: 12.5, suffix: '%', label: 'מס חברות בקפריסין' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="section-padding bg-gradient-to-r from-ocean-600 to-ocean-700 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brown-400 rounded-full filter blur-3xl" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">
            המספרים מדברים בעד עצמם
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80">
            נתונים אמיתיים משוק הנדל״ן בקפריסין 2024-2025
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
                <p className="text-white/80 mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({
  end,
  suffix,
  isInView,
}: {
  end: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(end); // Start with the final value for SEO

  useEffect(() => {
    if (!isInView) return;

    // Reset to 0 for animation only when in view
    setCount(0);

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, isInView]);

  return (
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gold-300">
      {count.toFixed(end % 1 === 0 ? 0 : 1)}
      {suffix}
    </div>
  );
}
