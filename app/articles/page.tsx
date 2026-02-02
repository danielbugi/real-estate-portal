// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { BookOpen, Calendar, User } from 'lucide-react';
// import ArticleCard from '@/components/ArticleCard';
// import { Article } from '@/types';

// export default function ArticlesPage() {
//   const [articles, setArticles] = useState<Article[]>([]);

//   useEffect(() => {
//     fetch('/api/articles')
//       .then((res) => res.json())
//       .then((data) => setArticles(data.articles || []))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative h-[60vh] overflow-hidden">
//         <div
//           className="absolute inset-0 z-0"
//           style={{
//             backgroundImage:
//               'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundAttachment: 'fixed',
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-gold-900/90 via-gold-800/80 to-gold-900/90" />
//         </div>

//         <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//               מדריכים ומאמרים
//             </h1>
//             <p className="text-xl text-white/90 max-w-2xl">
//               כל מה שצריך לדעת על השקעה בנדל״ן בקפריסין
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Articles Grid */}
//       <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
//         <div className="container-custom">
//           {articles.length > 0 ? (
//             <>
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl font-bold mb-4">
//                   המאמרים האחרונים שלנו
//                 </h2>
//                 <p className="text-gray-600">
//                   מידע מקצועי ועדכני עבור משקיעים חכמים
//                 </p>
//               </div>
//               <div className="grid md:grid-cols-2 gap-8">
//                 {articles.map((article, idx) => (
//                   <ArticleCard
//                     key={article._id?.toString() || idx}
//                     article={article}
//                   />
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-20">
//               <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//               <p className="text-gray-500 text-lg">טוען מאמרים...</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Newsletter Signup */}
//       <section className="section-padding luxury-gradient">
//         <div className="container-custom max-w-3xl text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl font-bold mb-4">הישארו מעודכנים</h2>
//             <p className="text-xl text-gray-600 mb-8">
//               קבלו מדריכים ועדכונים על שוק הנדל״ן בקפריסין ישירות למייל
//             </p>
//             <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
//               <input
//                 type="email"
//                 placeholder="כתובת המייל שלכם"
//                 className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ocean-500"
//               />
//               <button type="submit" className="btn-primary whitespace-nowrap">
//                 הרשמו עכשיו
//               </button>
//             </form>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  User,
  X,
  ArrowLeft,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
} from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import CTAWithForm from '@/components/CTAWithForm';
import { Article } from '@/types';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Lead form state
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    fetch('/api/articles?published=true')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .catch(console.error);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          budget: 'interested',
          interestedIn: selectedArticle ? [selectedArticle.titleHe] : ['כתבות'],
        }),
      });

      if (res.ok) {
        setFormSubmitted(true);
        setLeadForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          setFormSubmitted(false);
          setShowLeadForm(false);
        }, 3000);
      }
    } catch (error) {
      alert('שגיאה בשליחת הטופס. אנא נסה שוב.');
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

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
          {articles.length > 0 ? (
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
                  <div
                    key={article._id?.toString() || idx}
                    onClick={() => handleArticleClick(article)}
                    className="cursor-pointer"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">טוען מאמרים...</p>
            </div>
          )}
        </div>
      </section>

      {/* Lead Form Section - Replaces Newsletter */}
      <CTAWithForm
        title="מעוניינים לקבל מידע נוסף?"
        subtitle="השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על הזדמנויות השקעה בקפריסין"
      />

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            {/* Close Button */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-ocean-600 hover:text-ocean-700 transition"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
                <span className="font-medium">חזרה לכתבות</span>
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Featured Image */}
              {selectedArticle.featuredImageUrl && (
                <img
                  src={selectedArticle.featuredImageUrl}
                  alt={selectedArticle.titleHe}
                  className="w-full h-96 object-cover rounded-2xl shadow-xl mb-8"
                />
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {selectedArticle.titleHe || selectedArticle.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-gray-500 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(selectedArticle.createdAt).toLocaleDateString(
                      'he-IL',
                    )}
                  </span>
                </div>
                {selectedArticle.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {selectedArticle.readTime} דקות קריאה
                    </span>
                  </div>
                )}
              </div>

              {/* Keywords */}
              {selectedArticle.keywords &&
                selectedArticle.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedArticle.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-ocean-100 text-ocean-700 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedArticle.contentHtml ||
                    selectedArticle.content ||
                    '',
                }}
              />

              {/* CTA */}
              <div className="bg-gradient-to-br from-ocean-600 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">רוצים לדעת יותר?</h3>
                <p className="text-blue-100 mb-6">
                  השאירו פרטים ונחזור אליכם עם מידע מפורט על הזדמנויות השקעה
                </p>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setShowLeadForm(true);
                  }}
                  className="bg-white text-ocean-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  השאירו פרטים
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLeadForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-8"
            dir="rtl"
          >
            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  תודה רבה!
                </h3>
                <p className="text-gray-600">נחזור אליך בהקדם האפשרי</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    השאירו פרטים
                  </h3>
                  <button
                    onClick={() => setShowLeadForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      שם מלא *
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, name: e.target.value })
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
                        value={leadForm.email}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, email: e.target.value })
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
                        value={leadForm.phone}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, phone: e.target.value })
                        }
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                        placeholder="050-1234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      הודעה (אופציונלי)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        value={leadForm.message}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, message: e.target.value })
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
                      onClick={() => setShowLeadForm(false)}
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
      )}
    </div>
  );
}
