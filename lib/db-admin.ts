import clientPromise from './mongodb';
import { LogEntry } from './security';
import { ObjectId } from 'mongodb';

// ============================================
// 📝 LOGGING FUNCTIONS
// ============================================

export async function saveLog(logEntry: LogEntry): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    await db.collection('request_logs').insertOne({
      ...logEntry,
      _id: new ObjectId(),
    });
  } catch (error) {
    // Fail silently for logs to not break the main flow
    console.error('Failed to save log:', error);
  }
}

export async function getLogs(options: {
  limit?: number;
  skip?: number;
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  ip?: string;
}) {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  const filter: any = {};

  if (options.startDate || options.endDate) {
    filter.timestamp = {};
    if (options.startDate) filter.timestamp.$gte = options.startDate;
    if (options.endDate) filter.timestamp.$lte = options.endDate;
  }

  if (options.userId) filter.userId = options.userId;
  if (options.ip) filter.ip = options.ip;

  const logs = await db
    .collection('request_logs')
    .find(filter)
    .sort({ timestamp: -1 })
    .skip(options.skip || 0)
    .limit(options.limit || 100)
    .toArray();

  const total = await db.collection('request_logs').countDocuments(filter);

  return { logs, total };
}

// ============================================
// 👤 ADMIN USER FUNCTIONS
// ============================================

export interface AdminUser {
  _id?: ObjectId;
  username: string;
  passwordHash: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  lastLogin?: Date;
}

export async function createAdminUser(
  user: Omit<AdminUser, '_id' | 'createdAt'>
): Promise<ObjectId> {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  // Check if username exists
  const existing = await db
    .collection('admin_users')
    .findOne({ username: user.username });
  if (existing) {
    throw new Error('Username already exists');
  }

  const result = await db.collection('admin_users').insertOne({
    ...user,
    createdAt: new Date(),
  });

  return result.insertedId;
}

export async function getAdminUser(
  username: string
): Promise<AdminUser | null> {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  return db
    .collection('admin_users')
    .findOne({ username }) as Promise<AdminUser | null>;
}

export async function updateLastLogin(username: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  await db
    .collection('admin_users')
    .updateOne({ username }, { $set: { lastLogin: new Date() } });
}

// ============================================
// 📄 CONTENT MANAGEMENT FUNCTIONS
// ============================================

export async function getArticles(filter: {
  status?: 'pending' | 'approved' | 'rejected';
  published?: boolean;
  limit?: number;
  skip?: number;
}) {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  const query: any = {};
  if (filter.status) query.status = filter.status;
  if (filter.published !== undefined) query.published = filter.published;

  const articles = await db
    .collection('articles')
    .find(query)
    .sort({ createdAt: -1 })
    .skip(filter.skip || 0)
    .limit(filter.limit || 50)
    .toArray();

  const total = await db.collection('articles').countDocuments(query);

  return { articles, total };
}

export async function getArticleById(id: string) {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  return db.collection('articles').findOne({ _id: new ObjectId(id) });
}

export async function updateArticle(id: string, updates: any) {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  // Remove _id from updates if present
  delete updates._id;

  const result = await db.collection('articles').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  );

  return result;
}

export async function updateArticleStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected',
  published?: boolean
) {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  const updateData: any = {
    status,
    updatedAt: new Date(),
  };

  if (published !== undefined) {
    updateData.published = published;
  }

  // Auto-publish when approved
  if (status === 'approved') {
    updateData.published = true;
    updateData.approvedAt = new Date();
  }

  const result = await db
    .collection('articles')
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return result;
}

export async function deleteArticle(id: string) {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  const result = await db
    .collection('articles')
    .deleteOne({ _id: new ObjectId(id) });

  return result;
}

// ============================================
// 📊 STATISTICS
// ============================================

export async function getAdminStats() {
  const client = await clientPromise;
  const db = client.db('cyprus_invest');

  const [
    totalArticles,
    pendingArticles,
    approvedArticles,
    publishedArticles,
    totalLeads,
    recentLogs,
  ] = await Promise.all([
    db.collection('articles').countDocuments(),
    db.collection('articles').countDocuments({ status: 'pending' }),
    db.collection('articles').countDocuments({ status: 'approved' }),
    db.collection('articles').countDocuments({ published: true }),
    db.collection('leads').countDocuments(),
    db.collection('request_logs').countDocuments({
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    }),
  ]);

  return {
    articles: {
      total: totalArticles,
      pending: pendingArticles,
      approved: approvedArticles,
      published: publishedArticles,
    },
    leads: totalLeads,
    requests24h: recentLogs,
  };
}
