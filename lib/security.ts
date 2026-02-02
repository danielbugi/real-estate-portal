import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ============================================
// 🔒 RATE LIMITER (Brute Force Protection)
// ============================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Max 5 login attempts per 15 min
const BLOCK_DURATION = 30 * 60 * 1000; // Block for 30 minutes

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  blockedUntil?: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Check if currently blocked
  if (entry?.blockedUntil && entry.blockedUntil > now) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      blockedUntil: entry.blockedUntil,
    };
  }

  // Reset if window expired
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
  }

  // Increment count
  entry.count++;

  // Block if exceeded
  if (entry.count > MAX_REQUESTS) {
    entry.blockedUntil = now + BLOCK_DURATION;
    rateLimitStore.set(identifier, entry);
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      blockedUntil: entry.blockedUntil,
    };
  }

  rateLimitStore.set(identifier, entry);
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
  };
}

// Cleanup old entries every hour
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of Array.from(rateLimitStore.entries())) {
      if (
        value.resetTime < now &&
        (!value.blockedUntil || value.blockedUntil < now)
      ) {
        rateLimitStore.delete(key);
      }
    }
  },
  60 * 60 * 1000,
);

// ============================================
// 🧹 INPUT SANITIZATION (Injection Protection)
// ============================================

export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove potential XSS attempts - comprehensive protection
    return (
      input
        // Remove script tags
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove iframe tags
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        // Remove object/embed tags
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
        .replace(/<embed[^>]*>/gi, '')
        // Remove javascript: protocol
        .replace(/javascript:/gi, '')
        // Remove data: protocol (can be used for XSS)
        .replace(/data:text\/html/gi, '')
        // Remove vbscript: protocol
        .replace(/vbscript:/gi, '')
        // Remove event handlers
        .replace(/on\w+\s*=/gi, '')
        // Remove style tags
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        // Remove meta tags
        .replace(/<meta[^>]*>/gi, '')
        // Remove link tags
        .replace(/<link[^>]*>/gi, '')
        .trim()
    );
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }

  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      // Prevent NoSQL injection via special operators
      if (key.startsWith('$') || key.includes('.')) {
        continue; // Skip dangerous keys
      }
      // Prevent prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }

  return input;
}

// HTML entity encoding for display (additional XSS protection)
export function escapeHtml(text: string): string {
  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char]);
}

// ============================================
// 🔑 PASSWORD HASHING
// ============================================

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === verifyHash;
}

// ============================================
// 🎫 JWT TOKEN GENERATION (Simple)
// ============================================

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';

export function generateToken(payload: any): string {
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
  ).toString('base64url');
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 }),
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): any | null {
  try {
    const [header, body, signature] = token.split('.');

    if (!header || !body || !signature) {
      console.log('[verifyToken] Invalid token format');
      return null;
    }

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      console.log('[verifyToken] Signature mismatch');
      console.log('Expected:', expectedSignature.substring(0, 20));
      console.log('Received:', signature.substring(0, 20));
      return null;
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());

    // Check expiration
    if (payload.exp < Date.now()) {
      console.log('[verifyToken] Token expired');
      return null;
    }

    console.log('[verifyToken] Token valid for user:', payload.username);
    return payload;
  } catch (error) {
    console.log('[verifyToken] Error:', error);
    return null;
  }
}

// ============================================
// 📝 REQUEST LOGGER
// ============================================

export interface LogEntry {
  timestamp: Date;
  ip: string;
  method: string;
  url: string;
  userAgent?: string;
  userId?: string;
  status?: number;
  error?: string;
  username?: string;
}

export function createLogEntry(
  request: NextRequest,
  additionalData?: Partial<LogEntry>,
): LogEntry {
  // Try multiple sources for IP address
  let ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') || // Cloudflare
    request.headers.get('x-client-ip') ||
    'unknown';

  // Normalize IPv6 localhost to IPv4
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    ip = '127.0.0.1';
  }

  // For local development, use localhost IP
  if (ip === 'unknown' && process.env.NODE_ENV === 'development') {
    ip = '127.0.0.1';
  }

  return {
    timestamp: new Date(),
    ip,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent') || undefined,
    ...additionalData,
  };
}

// ============================================
// 🛡️ SECURITY HEADERS
// ============================================

export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  );
  return response;
}

// ============================================
// 🔐 AUTH MIDDLEWARE
// ============================================

export function requireAuth(request: NextRequest): {
  authenticated: boolean;
  userId?: string;
  response?: NextResponse;
} {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 },
      ),
    };
  }

  const payload = verifyToken(token);

  if (!payload) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Invalid or expired token' },
        { status: 401 },
      ),
    };
  }

  return {
    authenticated: true,
    userId: payload.userId,
  };
}

// Alias for consistency
export const verifyAuth = requireAuth;
