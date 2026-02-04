import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center px-4">
        <BookOpen className="w-20 h-20 mx-auto text-gray-300 mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          המאמר לא נמצא
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          המאמר שחיפשת אינו קיים או הוסר מהאתר
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 btn-primary"
        >
          <BookOpen className="w-5 h-5" />
          לכל המאמרים
        </Link>
      </div>
    </div>
  );
}
