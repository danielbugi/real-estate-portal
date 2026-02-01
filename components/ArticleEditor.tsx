'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  X,
  Eye,
  Image as ImageIcon,
  Loader2,
  Plus,
  Tag,
} from 'lucide-react';

interface ArticleFormData {
  title: string;
  titleHe: string;
  contentHtml: string;
  excerpt: string;
  excerptHe?: string;
  featuredImageUrl: string;
  keywords: string[];
  slug: string;
  category?: string;
  published: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

interface ArticleEditorProps {
  articleId?: string;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function ArticleEditor({
  articleId,
  onSave,
  onCancel,
}: ArticleEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    titleHe: '',
    contentHtml: '',
    excerpt: '',
    excerptHe: '',
    featuredImageUrl: '',
    keywords: [],
    slug: '',
    category: '',
    published: false,
    status: 'pending',
  });

  // Load article if editing
  useEffect(() => {
    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  const loadArticle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`);
      const data = await res.json();
      if (data.success) {
        setFormData(data.article);
      }
    } catch (error) {
      alert('Failed to load article');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleAddKeyword = () => {
    if (
      keywordInput.trim() &&
      !formData.keywords.includes(keywordInput.trim())
    ) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((k) => k !== keyword),
    });
  };

  const handleSave = async (publish: boolean = false) => {
    if (!formData.title || !formData.titleHe || !formData.contentHtml) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);

    try {
      const dataToSave = {
        ...formData,
        published: publish,
        status: publish ? 'approved' : formData.status,
      };

      const url = articleId
        ? `/api/admin/articles/${articleId}`
        : `/api/admin/articles/create`;

      const method = articleId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      const data = await res.json();

      if (res.ok) {
        alert(articleId ? 'Article updated!' : 'Article created!');
        if (onSave) {
          onSave();
        } else {
          router.push('/admin/articles');
        }
      } else {
        alert(data.error || 'Failed to save article');
      }
    } catch (error) {
      alert('Error saving article');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-ocean-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-20">
      {showPreview ? (
        // Preview Mode
        <div className="bg-white rounded-lg shadow-sm p-8">
          {formData.featuredImageUrl && (
            <img
              src={formData.featuredImageUrl}
              alt={formData.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {formData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-2 dir-rtl">
            {formData.titleHe}
          </p>
          <p className="text-gray-500 mb-6">{formData.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {formData.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: formData.contentHtml }}
          />
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (English) *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                placeholder="Enter article title in English"
              />
            </div>

            {/* Title Hebrew */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (Hebrew) *
              </label>
              <input
                type="text"
                value={formData.titleHe}
                onChange={(e) =>
                  setFormData({ ...formData, titleHe: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none dir-rtl"
                placeholder="הכנס כותרת המאמר בעברית"
              />
            </div>

            {/* Slug */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                placeholder="article-url-slug"
              />
            </div>

            {/* Excerpt */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (English)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                placeholder="Short summary of the article"
              />
            </div>

            {/* Excerpt Hebrew */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Hebrew)
              </label>
              <textarea
                value={formData.excerptHe}
                onChange={(e) =>
                  setFormData({ ...formData, excerptHe: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none dir-rtl"
                placeholder="תקציר קצר של המאמר"
              />
            </div>

            {/* Featured Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.featuredImageUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredImageUrl: e.target.value,
                    })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                  placeholder="https://example.com/image.jpg"
                />
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
              {formData.featuredImageUrl && (
                <img
                  src={formData.featuredImageUrl}
                  alt="Preview"
                  className="mt-2 w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (SEO)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), handleAddKeyword())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
                  placeholder="Add keyword and press Enter"
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-4 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Content (HTML) *
            </h2>
            <textarea
              value={formData.contentHtml}
              onChange={(e) =>
                setFormData({ ...formData, contentHtml: e.target.value })
              }
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none font-mono text-sm"
              placeholder="<p>Write your article content in HTML...</p>"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Tip: Use HTML tags for formatting. Preview to see how it looks.
            </p>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4 text-ocean-600 border-gray-300 rounded focus:ring-ocean-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Published
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
