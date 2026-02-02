import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  sanitizeInput,
  verifyPassword,
  generateToken,
  createLogEntry,
  addSecurityHeaders,
} from '@/lib/security';
import { getAdminUser, updateLastLogin, saveLog } from '@/lib/db-admin';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // Rate limiting check
  const rateLimitResult = checkRateLimit(`login:${ip}`);

  if (!rateLimitResult.allowed) {
    const logEntry = createLogEntry(request, {
      status: 429,
      error: 'Rate limit exceeded',
    });
    await saveLog(logEntry);

    const blockedMinutes = rateLimitResult.blockedUntil
      ? Math.ceil((rateLimitResult.blockedUntil - Date.now()) / 60000)
      : 0;

    return NextResponse.json(
      {
        error: 'Too many login attempts',
        message: `Account temporarily blocked for ${blockedMinutes} minutes`,
        retryAfter: rateLimitResult.blockedUntil,
      },
      { status: 429 },
    );
  }

  try {
    const rawBody = await request.json();
    const body = sanitizeInput(rawBody);

    const { username, password } = body;

    // Validation
    if (!username || !password) {
      const logEntry = createLogEntry(request, {
        status: 400,
        error: 'Missing credentials',
      });
      await saveLog(logEntry);

      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 },
      );
    }

    // Get user from database
    const user = await getAdminUser(username);

    if (!user) {
      console.log(`Login failed: User "${username}" not found in database`);
      const logEntry = createLogEntry(request, {
        status: 401,
        error: 'Invalid username',
        username, // Log username only, never password
      });
      await saveLog(logEntry);

      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 },
      );
    }

    console.log(`User "${username}" found, verifying password...`);
    // Verify password
    const passwordValid = verifyPassword(password, user.passwordHash);

    if (!passwordValid) {
      console.log(`Login failed: Invalid password for user "${username}"`);
      const logEntry = createLogEntry(request, {
        status: 401,
        error: 'Invalid password',
        userId: user._id?.toString(),
      });
      await saveLog(logEntry);

      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 },
      );
    }

    console.log(`Login successful for user "${username}"`);
    // Update last login
    await updateLastLogin(username);

    // Generate JWT token
    const token = generateToken({
      userId: user._id?.toString(),
      username: user.username,
      role: user.role,
    });

    // Log successful login
    const logEntry = createLogEntry(request, {
      status: 200,
      userId: user._id?.toString(),
    });
    await saveLog(logEntry);

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id?.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    console.log('Cookie set successfully for user:', username);
    console.log('Cookie options:', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Login error:', error);

    const logEntry = createLogEntry(request, {
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    await saveLog(logEntry);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
