'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Articles Grid */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4 animate-pulse" />
              <p className="text-gray-500 text-lg">טוען מאמרים...</p>
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  המאמרים האחרונים שלנו
                </h2>
                <p className="text-gray-600">
                  מידע מקצועי ועדכני עבור משקיעים חכמים
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, idx) => (
                  <ArticleCard
                    key={article._id?.toString() || idx}
                    article={article}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">אין מאמרים זמינים כרגע</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
