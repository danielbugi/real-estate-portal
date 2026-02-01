'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 8.3, suffix: '%', label: 'צמיחה שנתית בשוק הנדל"ן' },
    { value: 300, suffix: '+', label: 'נכסים יוקרתיים במאגר' },
    { value: 5.2, suffix: '%', label: 'תשואה ממוצעת מהשכרה' },
    { value: 12.5, suffix: '%', label: 'מס חברות בקפריסין' },
  ];

  return (
    <section className="section-padding bg-gradient-to-r from-ocean-600 to-ocean-700 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brown-400 rounded-full filter blur-3xl" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            המספרים מדברים בעד עצמם
          </h2>
          <p className="text-xl text-white/80">
            נתונים אמיתיים משוק הנדל״ן בקפריסין 2024-2025
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
                <p className="text-white/80 mt-4">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ end, suffix, isInView }: { end: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

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
    <div className="text-5xl md:text-6xl font-display font-bold text-gold-300">
      {count.toFixed(end % 1 === 0 ? 0 : 1)}{suffix}
    </div>
  );
}
