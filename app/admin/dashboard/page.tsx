'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
  LogOut,
  BarChart3,
  Users,
  Activity,
  Loader2,
  AlertTriangle,
  Search,
  Filter,
} from 'lucide-react';

interface Stats {
  articles: {
    total: number;
    pending: number;
    approved: number;
    published: number;
  };
  leads: number;
  requests24h: number;
}

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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch stats
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.status === 401) {
        router.push('/admin');
        return;
      }
      const statsData = await statsRes.json();
      setStats(statsData.stats);

      // Fetch articles
      const articlesRes = await fetch(
        `/api/admin/articles?status=${filter}&limit=100`
      );
      const articlesData = await articlesRes.json();
      setArticles(articlesData.articles || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (articleId: string) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (res.ok) {
        fetchData();
        setShowPreview(false);
        alert('✅ Article approved and published!');
      }
    } catch (error) {
      alert('Failed to approve article');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (articleId: string) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (res.ok) {
        fetchData();
        setShowPreview(false);
        alert('Article rejected');
      }
    } catch (error) {
      alert('Failed to reject article');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (articleId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this article? This cannot be undone.'
      )
    ) {
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchData();
        setShowPreview(false);
        alert('Article deleted');
      }
    } catch (error) {
      alert('Failed to delete article');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.titleHe.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-600 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Clock className="w-6 h-6" />}
              title="Pending"
              value={stats.articles.pending}
              color="yellow"
            />
            <StatCard
              icon={<CheckCircle className="w-6 h-6" />}
              title="Approved"
              value={stats.articles.approved}
              color="green"
            />
            <StatCard
              icon={<FileText className="w-6 h-6" />}
              title="Published"
              value={stats.articles.published}
              color="blue"
            />
            <StatCard
              icon={<Users className="w-6 h-6" />}
              title="Total Leads"
              value={stats.leads}
              color="purple"
            />
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
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
            </div>
            <div className="flex gap-2">
              {(['pending', 'approved', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === status
                      ? 'bg-ocean-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-ocean-600" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No articles found</p>
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
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedArticle(article);
                            setShowPreview(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                          disabled={isProcessing}
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
            {/* Modal Header */}
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

            {/* Modal Content */}
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

            {/* Modal Footer - Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                disabled={isProcessing}
              >
                Close
              </button>
              {selectedArticle.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleReject(selectedArticle._id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedArticle._id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Approve & Publish
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StatCard({ icon, title, value, color }: any) {
  const colors = {
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
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
