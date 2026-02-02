'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Activity,
  Users,
  Globe,
  AlertCircle,
  TrendingUp,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Loader2,
  Shield,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface LogEntry {
  _id: string;
  timestamp: string;
  ip: string;
  method: string;
  url: string;
  userAgent?: string;
  userId?: string;
  status?: number;
  error?: string;
}

interface TrafficStats {
  totalRequests: number;
  uniqueIPs: number;
  successRate: number;
  errorRate: number;
  topIPs: Array<{ ip: string; count: number }>;
  topEndpoints: Array<{ url: string; count: number }>;
  requestsByHour: Array<{ hour: number; count: number }>;
  statusCodes: { [key: number]: number };
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<TrafficStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [ipFilter, setIpFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // Calculate date range
      const now = new Date();
      const startDate = new Date();

      switch (timeRange) {
        case '1h':
          startDate.setHours(now.getHours() - 1);
          break;
        case '24h':
          startDate.setHours(now.getHours() - 24);
          break;
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
      }

      // Fetch logs
      const params = new URLSearchParams({
        limit: '500',
        startDate: startDate.toISOString(),
      });

      const res = await fetch(`/api/admin/logs?${params}`, {
        credentials: 'include',
      });

      if (res.status === 401) {
        router.push('/admin');
        return;
      }

      const data = await res.json();
      const fetchedLogs = data.logs || [];
      setLogs(fetchedLogs);

      // Calculate stats
      calculateStats(fetchedLogs);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (logData: LogEntry[]) => {
    // Unique IPs
    const uniqueIPs = new Set(logData.map((log) => log.ip));

    // Success/Error rates
    const successRequests = logData.filter(
      (log) => log.status && log.status < 400,
    ).length;
    const errorRequests = logData.filter(
      (log) => log.status && log.status >= 400,
    ).length;
    const totalRequests = logData.length;

    // Top IPs
    const ipCounts: { [key: string]: number } = {};
    logData.forEach((log) => {
      ipCounts[log.ip] = (ipCounts[log.ip] || 0) + 1;
    });
    const topIPs = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top Endpoints
    const urlCounts: { [key: string]: number } = {};
    logData.forEach((log) => {
      const path = new URL(log.url).pathname;
      urlCounts[path] = (urlCounts[path] || 0) + 1;
    });
    const topEndpoints = Object.entries(urlCounts)
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Requests by hour
    const hourCounts: { [key: number]: number } = {};
    logData.forEach((log) => {
      const hour = new Date(log.timestamp).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    const requestsByHour = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: hourCounts[i] || 0,
    }));

    // Status codes
    const statusCodes: { [key: number]: number } = {};
    logData.forEach((log) => {
      if (log.status) {
        statusCodes[log.status] = (statusCodes[log.status] || 0) + 1;
      }
    });

    setStats({
      totalRequests,
      uniqueIPs: uniqueIPs.size,
      successRate:
        totalRequests > 0 ? (successRequests / totalRequests) * 100 : 0,
      errorRate: totalRequests > 0 ? (errorRequests / totalRequests) * 100 : 0,
      topIPs,
      topEndpoints,
      requestsByHour,
      statusCodes,
    });
  };

  const filteredLogs = logs.filter((log) => {
    if (ipFilter && !log.ip.includes(ipFilter)) return false;
    if (statusFilter !== 'all') {
      if (statusFilter === 'success' && (!log.status || log.status >= 400))
        return false;
      if (statusFilter === 'error' && log.status && log.status < 400)
        return false;
    }
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [ipFilter, statusFilter, itemsPerPage]);

  const exportCSV = () => {
    const headers = [
      'Timestamp',
      'IP',
      'Method',
      'URL',
      'Status',
      'User ID',
      'Error',
    ];
    const rows = filteredLogs.map((log) => [
      log.timestamp,
      log.ip,
      log.method,
      log.url,
      log.status || '',
      log.userId || '',
      log.error || '',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-600 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              {['1h', '24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    timeRange === range
                      ? 'bg-ocean-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === '1h' && 'Last Hour'}
                  {range === '24h' && 'Last 24 Hours'}
                  {range === '7d' && 'Last 7 Days'}
                  {range === '30d' && 'Last 30 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-ocean-600" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={<Activity className="w-6 h-6" />}
                  title="Total Requests"
                  value={stats.totalRequests.toLocaleString()}
                  color="blue"
                  subtitle={`${stats.successRate.toFixed(1)}% success rate`}
                />
                <StatCard
                  icon={<Users className="w-6 h-6" />}
                  title="Unique IPs"
                  value={stats.uniqueIPs.toLocaleString()}
                  color="green"
                  subtitle="Unique visitors"
                />
                <StatCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Success Rate"
                  value={`${stats.successRate.toFixed(1)}%`}
                  color="green"
                  subtitle={`${stats.totalRequests - Math.floor((stats.errorRate / 100) * stats.totalRequests)} successful`}
                />
                <StatCard
                  icon={<AlertCircle className="w-6 h-6" />}
                  title="Error Rate"
                  value={`${stats.errorRate.toFixed(1)}%`}
                  color="red"
                  subtitle={`${Math.floor((stats.errorRate / 100) * stats.totalRequests)} errors`}
                />
              </div>
            )}

            {/* Top IPs and Endpoints */}
            {stats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Top IPs */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Top IP Addresses
                  </h2>
                  <div className="space-y-3">
                    {stats.topIPs.map((item, index) => (
                      <div
                        key={item.ip}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500">
                            #{index + 1}
                          </span>
                          <span className="text-sm text-gray-900 font-mono">
                            {item.ip}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-ocean-600 h-2 rounded-full"
                              style={{
                                width: `${(item.count / stats.topIPs[0].count) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Endpoints */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Top Endpoints
                  </h2>
                  <div className="space-y-3">
                    {stats.topEndpoints.map((item, index) => (
                      <div
                        key={item.url}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-sm font-medium text-gray-500">
                            #{index + 1}
                          </span>
                          <span className="text-sm text-gray-900 font-mono truncate">
                            {item.url}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 ml-4">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Hourly Activity Chart */}
            {stats && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Requests by Hour (Last 24h)
                </h2>
                <div className="flex items-end justify-between h-64 gap-2">
                  {stats.requestsByHour.map((item) => {
                    const maxCount = Math.max(
                      ...stats.requestsByHour.map((h) => h.count),
                    );
                    const height =
                      maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                    return (
                      <div
                        key={item.hour}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full bg-ocean-600 rounded-t hover:bg-ocean-700 transition-all relative group"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            {item.count} requests
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {item.hour.toString().padStart(2, '0')}:00
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Request Logs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Request Logs
                  <span className="text-sm font-normal text-gray-500">
                    ({filteredLogs.length} total)
                  </span>
                </h2>
                <div className="flex items-center gap-3">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none text-sm"
                  >
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                    <option value={200}>200 per page</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Filter by IP..."
                    value={ipFilter}
                    onChange={(e) => setIpFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none text-sm"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="success">Success (2xx-3xx)</option>
                    <option value="error">Errors (4xx-5xx)</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        IP Address
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Method
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Endpoint
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        User ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedLogs.map((log) => (
                      <tr key={log._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                          {log.ip}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              log.method === 'GET'
                                ? 'bg-blue-100 text-blue-700'
                                : log.method === 'POST'
                                  ? 'bg-green-100 text-green-700'
                                  : log.method === 'PUT'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {log.method}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono max-w-xs truncate">
                          {new URL(log.url).pathname}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {log.status && (
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                log.status < 300
                                  ? 'bg-green-100 text-green-700'
                                  : log.status < 400
                                    ? 'bg-blue-100 text-blue-700'
                                    : log.status < 500
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {log.status}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                          {log.userId || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {filteredLogs.length > 0 && (
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to{' '}
                    {Math.min(endIndex, filteredLogs.length)} of{' '}
                    {filteredLogs.length} logs
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          // Show first page, last page, current page, and pages around current
                          if (page === 1 || page === totalPages) return true;
                          if (Math.abs(page - currentPage) <= 1) return true;
                          return false;
                        })
                        .map((page, index, array) => {
                          // Add ellipsis between non-consecutive pages
                          const prevPage = array[index - 1];
                          const showEllipsis = prevPage && page - prevPage > 1;

                          return (
                            <div key={page} className="flex items-center gap-1">
                              {showEllipsis && (
                                <span className="px-2 text-gray-400">...</span>
                              )}
                              <button
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                                  currentPage === page
                                    ? 'bg-ocean-600 text-white'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            </div>
                          );
                        })}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, subtitle }: any) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div
          className={`p-2 rounded-lg ${colors[color as keyof typeof colors]}`}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
