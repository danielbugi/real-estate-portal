'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ToggleLeft,
  ToggleRight,
  Loader2,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import ArticleEditor from '@/components/ArticleEditor';

interface Article {
  _id: string;
  title: string;
  titleHe: string;
  excerpt?: string;
  status: 'pending' | 'approved' | 'rejected';
  published: boolean;
  createdAt: string;
  contentHtml?: string;
  featuredImageUrl?: string;
}

export default function ArticleManagementPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [publishedFilter, setPublishedFilter] = useState<string>('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<
    string | undefined
  >();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, statusFilter, publishedFilter]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/articles?limit=100', {
        credentials: 'include',
      });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = [...articles];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.titleHe.includes(searchTerm),
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((article) => article.status === statusFilter);
    }

    // Published filter
    if (publishedFilter !== 'all') {
      filtered = filtered.filter(
        (article) => article.published === (publishedFilter === 'published'),
      );
    }

    setFilteredArticles(filtered);
  };

  const handleCreateNew = () => {
    setEditingArticleId(undefined);
    setShowEditor(true);
  };

  const handleEdit = (articleId: string) => {
    setEditingArticleId(articleId);
    setShowEditor(true);
  };

  const handleDelete = async (articleId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this article? This cannot be undone.',
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        alert('Article deleted successfully!');
        fetchArticles();
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      alert('Error deleting article');
    }
  };

  const handleTogglePublish = async (
    articleId: string,
    currentlyPublished: boolean,
  ) => {
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ published: !currentlyPublished }),
      });

      if (res.ok) {
        fetchArticles();
      } else {
        alert('Failed to update article');
      }
    } catch (error) {
      alert('Error updating article');
    }
  };

  const handlePreview = (article: Article) => {
    setSelectedArticle(article);
    setShowPreview(true);
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-gray-600 py-8 px-4">
        <ArticleEditor
          articleId={editingArticleId}
          onSave={() => {
            setShowEditor(false);
            fetchArticles();
          }}
          onCancel={() => setShowEditor(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-600 pt-20 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="w-6 h-6" />}
            title="Total Articles"
            value={articles.length}
            color="blue"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            title="Pending"
            value={articles.filter((a) => a.status === 'pending').length}
            color="yellow"
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6" />}
            title="Published"
            value={articles.filter((a) => a.published).length}
            color="green"
          />
          <StatCard
            icon={<XCircle className="w-6 h-6" />}
            title="Drafts"
            value={articles.filter((a) => !a.published).length}
            color="gray"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Published Filter */}
            <select
              value={publishedFilter}
              onChange={(e) => setPublishedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
            >
              <option value="all">All Articles</option>
              <option value="published">Published Only</option>
              <option value="draft">Drafts Only</option>
            </select>
          </div>
        </div>

        {/* Articles Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-ocean-600" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No articles found</p>
            <button
              onClick={handleCreateNew}
              className="mt-4 px-6 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition"
            >
              Create Your First Article
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {article.featuredImageUrl && (
                          <img
                            src={article.featuredImageUrl}
                            alt=""
                            className="w-16 h-16 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 dir-rtl">
                            {article.titleHe}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={article.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleTogglePublish(article._id, article.published)
                        }
                        className="flex items-center gap-2"
                      >
                        {article.published ? (
                          <>
                            <ToggleRight className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-green-600">
                              Published
                            </span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-500">Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handlePreview(article)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(article._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-gray-500 mt-1 dir-rtl">
                    {selectedArticle.titleHe}
                  </p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedArticle.featuredImageUrl && (
                <img
                  src={selectedArticle.featuredImageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: selectedArticle.contentHtml || '',
                }}
              />
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  handleEdit(selectedArticle._id);
                }}
                className="px-6 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition"
              >
                Edit Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, color }: any) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div
          className={`p-3 rounded-lg ${colors[color as keyof typeof colors]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
