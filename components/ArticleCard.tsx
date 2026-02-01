// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { Clock, ArrowLeft } from 'lucide-react';
// import { Article } from '@/types';

// interface ArticleCardProps {
//   article: Article;
// }

// export default function ArticleCard({ article }: ArticleCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className="glass-effect rounded-2xl overflow-hidden card-hover group"
//     >
//       {/* Article Image */}
//       {article.image && (
//         <div className="relative h-56 overflow-hidden">
//           <Image
//             src={article.image}
//             alt={article.titleHe}
//             fill
//             className="object-cover group-hover:scale-110 transition-transform duration-500"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//           {/* Category Badge */}
//           <div className="absolute top-4 right-4 bg-gold-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
//             {article.categoryHe}
//           </div>
//         </div>
//       )}

//       {/* Article Content */}
//       <div className="p-6">
//         {/* Title */}
//         <h3 className="text-2xl font-display font-bold mb-3 line-clamp-2 group-hover:text-ocean-600 transition-colors">
//           {article.titleHe}
//         </h3>

//         {/* Excerpt */}
//         <p className="text-gray-600 mb-4 line-clamp-3">
//           {article.excerptHe}
//         </p>

//         {/* Meta Info */}
//         <div className="flex items-center justify-between pt-4 border-t">
//           <div className="flex items-center gap-2 text-gray-500 text-sm">
//             <Clock className="w-4 h-4" />
//             <span>{article.readTime} דקות קריאה</span>
//           </div>

//           <button className="flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-semibold transition-colors">
//             <span>קרא עוד</span>
//             <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.featuredImageUrl || article.image;
  const title = article.titleHe || article.title;
  const excerpt = article.excerptHe || article.excerpt;

  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        {/* Image */}
        {imageUrl && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.createdAt).toLocaleDateString('he-IL')}
              </span>
            </div>
            {article.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} דקות</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-ocean-600 transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
          )}

          {/* Keywords */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-ocean-100 text-ocean-700 rounded-full text-xs font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center gap-2 text-ocean-600 font-semibold group-hover:gap-4 transition-all">
            <span>קרא עוד</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </div>
        </div>
      </div>
    </Link>
  );
}
