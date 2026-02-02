'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowRight,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Share2,
  BookOpen,
  Tag,
} from 'lucide-react';
import { Article } from '@/types';
import CTAWithForm from './CTAWithForm';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/structured-data';

interface SingleArticlePageProps {
  slug: string;
}

export default function SingleArticlePage({ slug }: SingleArticlePageProps) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Lead form state
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const res = await fetch(`/api/articles/${slug}`);
      const data = await res.json();
      if (data.success) {
        setArticle(data.article);
      } else {
        router.push('/articles');
      }
    } catch (error) {
      console.error('Failed to fetch article:', error);
      router.push('/articles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          interestedIn: article ? [article.titleHe] : ['כתבה'],
        }),
      });

      if (res.ok) {
        setFormSubmitted(true);
        setLeadForm({
          name: '',
          email: '',
          phone: '',
          budget: '',
          message: '',
        });
        setTimeout(() => {
          setFormSubmitted(false);
          setShowLeadForm(false);
        }, 3000);
      }
    } catch (error) {
      alert('שגיאה בשליחת הטופס. אנא נסה שוב.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.titleHe || article?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('הקישור הועתק ללוח!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto text-ocean-600 animate-pulse mb-4" />
          <p className="text-gray-500 text-lg">טוען מאמר...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  // Generate structured data
  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'ראשי', url: '/' },
    { name: 'מאמרים', url: '/articles' },
    {
      name: article.titleHe || article.title,
      url: `/articles/${article.slug}`,
    },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div
        className=" min-h-screen bg-gradient-to-b from-slate-50 to-white pt-12"
        dir="rtl"
      >
        {/* Back Navigation */}
        {/* <div className="bg-white border-b border-gray-200  top-0 z-40 shadow-sm">
        <div className="container-custom py-4">
          <button
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-ocean-600 hover:text-ocean-700 transition group"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">חזרה לכל המאמרים</span>
          </button>
        </div>
      </div> */}

        {/* Article Content */}
        <article className="section-padding">
          <div className="container-custom">
            <button
              onClick={() => router.push('/articles')}
              className="flex items-center gap-2 text-ocean-600 hover:text-ocean-700 transition group"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className="font-medium">חזרה לכל המאמרים</span>
            </button>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2">
                {/* Featured Image */}
                {article.featuredImageUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <img
                      src={article.featuredImageUrl}
                      alt={article.titleHe || article.title}
                      className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
                    />
                  </motion.div>
                )}

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                >
                  {article.titleHe || article.title}
                </motion.h1>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b-2 border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-ocean-600" />
                    <span className="font-medium">
                      {new Date(article.createdAt).toLocaleDateString('he-IL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {article.readTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-ocean-600" />
                      <span className="font-medium">
                        {article.readTime} דקות קריאה
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 mr-auto text-ocean-600 hover:text-ocean-700 transition"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">שתף</span>
                  </button>
                </motion.div>

                {/* Keywords/Tags */}
                {article.keywords && article.keywords.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    <Tag className="w-5 h-5 text-gray-400" />
                    {article.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-4 py-2 bg-ocean-100 text-ocean-700 rounded-full text-sm font-medium hover:bg-ocean-200 transition"
                      >
                        {keyword}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="article-content mb-12"
                  dangerouslySetInnerHTML={{
                    __html: article.contentHtml || article.content || '',
                  }}
                />

                {/* Bottom CTA - Mobile Only */}
                <div className="lg:hidden">
                  <BottomCTA onClick={() => setShowLeadForm(true)} />
                </div>
              </div>

              {/* Sidebar - 1 column - Desktop Only */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <LeadFormSidebar
                    formData={leadForm}
                    setFormData={setLeadForm}
                    onSubmit={handleLeadSubmit}
                    submitted={formSubmitted}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container-custom mt-16">
            <CTAWithForm
              title="מתעניינים בהזדמנויות השקעה בקפריסין?"
              subtitle="השאירו פרטים ונחזור אליכם עם מידע מפורט"
            />
          </div>
        </article>

        {/* Lead Form Modal - Mobile */}
        {showLeadForm && (
          <LeadFormModal
            formData={leadForm}
            setFormData={setLeadForm}
            onSubmit={handleLeadSubmit}
            onClose={() => setShowLeadForm(false)}
            submitted={formSubmitted}
          />
        )}
      </div>
    </>
  );
}

// Sidebar Lead Form (Desktop)
function LeadFormSidebar({ formData, setFormData, onSubmit, submitted }: any) {
  return (
    <div className="bg-gradient-to-br from-ocean-600 to-blue-600 rounded-2xl p-6 shadow-xl text-white">
      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">תודה רבה!</h3>
          <p className="text-blue-100">נחזור אליך בהקדם האפשרי</p>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-2">
            מתעניינים בהזדמנויות השקעה בקפריסין?
          </h3>
          <p className="text-blue-100 mb-6 text-sm">
            השאירו פרטים ונחזור אליכם עם מידע מפורט
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                שם מלא *
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pr-10 pl-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
                  placeholder="הכנס שם מלא"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                אימייל *
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pr-10 pl-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                טלפון *
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pr-10 pl-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
                  placeholder="050-1234567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                תקציב השקעה *
              </label>
              <select
                required
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
              >
                <option value="">בחר תקציב</option>
                <option value="150-300k">€150,000 - €300,000</option>
                <option value="300-500k">€300,000 - €500,000</option>
                <option value="500-750k">€500,000 - €750,000</option>
                <option value="750k+">€750,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                הודעה (אופציונלי)
              </label>
              <div className="relative">
                <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className="w-full pr-10 pl-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
                  placeholder="ספר לנו מה מעניין אותך..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-ocean-600 px-6 py-4 rounded-lg font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-5 h-5" />
              שלח פרטים
            </button>
          </form>
        </>
      )}
    </div>
  );
}

// Bottom CTA (Mobile)
function BottomCTA({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-ocean-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl text-center"
    >
      <h3 className="text-2xl font-bold mb-4">רוצים לקבל מידע נוסף?</h3>
      <p className="text-blue-100 mb-6">
        השאירו פרטים ונחזור אליכם בהקדם עם כל המידע שאתם צריכים
      </p>
      <button
        onClick={onClick}
        className="bg-white text-ocean-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg"
      >
        השאירו פרטים עכשיו
      </button>
    </motion.div>
  );
}

// Lead Form Modal (Mobile)
function LeadFormModal({
  formData,
  setFormData,
  onSubmit,
  onClose,
  submitted,
}: any) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full p-8"
        dir="rtl"
      >
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">תודה רבה!</h3>
            <p className="text-gray-600">נחזור אליך בהקדם האפשרי</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              השאירו פרטים
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם מלא *
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                    placeholder="הכנס שם מלא"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  אימייל *
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  טלפון *
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                    placeholder="050-1234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תקציב השקעה *
                </label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                >
                  <option value="">בחר תקציב</option>
                  <option value="150-300k">€150,000 - €300,000</option>
                  <option value="300-500k">€300,000 - €500,000</option>
                  <option value="500-750k">€500,000 - €750,000</option>
                  <option value="750k+">€750,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  הודעה (אופציונלי)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                    placeholder="ספר לנו קצת על מה שמעניין אותך..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  שלח
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
