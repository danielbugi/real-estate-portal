'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, Map, Compass, Waves } from 'lucide-react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const waveAnimation = {
    x: [0, -50, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-100">
      {/* Animated Mediterranean waves background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={waveAnimation}
          className="absolute bottom-0 left-0 right-0"
        >
          <svg
            className="w-[200%] h-48 opacity-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
              fill="rgb(0, 135, 175)"
            />
          </svg>
        </motion.div>
        <motion.div
          animate={{ ...waveAnimation, transition: { ...waveAnimation.transition, delay: 1 } }}
          className="absolute bottom-0 left-0 right-0"
        >
          <svg
            className="w-[200%] h-40 opacity-15"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 C200,80 400,20 600,60 C800,100 1000,40 1200,80 L1200,120 L0,120 Z"
              fill="rgb(212, 175, 55)"
            />
          </svg>
        </motion.div>
      </div>

      {/* Floating Cyprus island icon */}
      <motion.div
        animate={mounted ? floatingAnimation : {}}
        className="absolute top-20 right-10 opacity-10"
      >
        <Map size={200} className="text-[rgb(0,135,175)]" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* 404 Number with Cyprus colors */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1
              className="text-[180px] md:text-[250px] font-bold leading-none"
              style={{
                background: 'linear-gradient(135deg, rgb(0, 135, 175) 0%, rgb(212, 175, 55) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </h1>
          </motion.div>

          {/* Cyprus-themed message in Hebrew */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              אופס! התענו בים התיכון
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              הדף שחיפשת אינו קיים, אבל יש לנו הרבה אפשרויות אחרות בקפריסין!
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-32 h-1 mx-auto mb-8 rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgb(0, 135, 175), rgb(212, 175, 55))',
            }}
          />

          {/* Navigation options */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <Link
              href="/"
              className="group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-[rgb(0,135,175)] hover:to-[rgb(0,115,155)] text-gray-800 hover:text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-[rgb(0,135,175)]"
            >
              <Home size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">חזרה לעמוד הבית</span>
            </Link>

            <Link
              href="/properties"
              className="group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-[rgb(212,175,55)] hover:to-[rgb(192,155,35)] text-gray-800 hover:text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-[rgb(212,175,55)]"
            >
              <Search size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">חיפוש נכסים</span>
            </Link>

            <Link
              href="/articles"
              className="group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-[rgb(0,135,175)] hover:to-[rgb(0,115,155)] text-gray-800 hover:text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-[rgb(0,135,175)]"
            >
              <Compass size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">מדריכים ומאמרים</span>
            </Link>

            <Link
              href="/contact"
              className="group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-[rgb(212,175,55)] hover:to-[rgb(192,155,35)] text-gray-800 hover:text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-[rgb(212,175,55)]"
            >
              <Waves size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">צור קשר</span>
            </Link>
          </motion.div>

          {/* Fun fact about Cyprus */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-blue-200"
          >
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-bold text-[rgb(0,135,175)]">💡 ידעת?</span> קפריסין היא
              האי השלישי בגודלו בים התיכון, ומציעה למעלה מ-300 ימי שמש בשנה! 🌞
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-10 text-6xl opacity-20"
        >
          🏖️
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-10 text-6xl opacity-20"
        >
          🏛️
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-1/2 left-1/4 text-5xl opacity-20"
        >
          ☀️
        </motion.div>
      </div>
    </div>
  );
}
