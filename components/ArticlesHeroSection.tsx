'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function ArticlesHeroSection() {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/90 via-gold-800/80 to-gold-900/90" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            מדריכים ומאמרים
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            כל מה שצריך לדעת על השקעה בנדל״ן בקפריסין
          </p>
        </motion.div>
      </div>
    </section>
  );
}
