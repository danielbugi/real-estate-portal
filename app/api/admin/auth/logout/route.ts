import { NextRequest, NextResponse } from 'next/server';
import { createLogEntry, addSecurityHeaders } from '@/lib/security';
import { saveLog } from '@/lib/db-admin';

export async function POST(request: NextRequest) {
  try {
    // Log logout
    const logEntry = createLogEntry(request, {
      status: 200,
    });
    await saveLog(logEntry);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear cookie
    response.cookies.delete('admin_token');

    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
