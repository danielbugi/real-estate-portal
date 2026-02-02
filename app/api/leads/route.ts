import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyAuth, sanitizeInput } from '@/lib/security';

// GET endpoint for retrieving leads (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    const source = searchParams.get('source');

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    // Build query
    const query: any = {};
    if (source) {
      query.source = source;
    }

    // Get leads with pagination
    const leads = await db
      .collection('leads')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('leads').countDocuments(query);

    return NextResponse.json({
      success: true,
      leads,
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// POST endpoint for submitting new leads
export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();

    // First level: Sanitize all input to prevent XSS and injection attacks
    const data = sanitizeInput(rawData);
    const { name, email, phone, budget, message } = data;

    // Validation
    if (!name || !email || !phone || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Validate name (at least 2 characters, max 100, only allowed characters)
    const sanitizedName = String(name).trim();
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 },
      );
    }

    // Reject names with suspicious patterns (HTML tags, scripts, etc.)
    if (/<[^>]*>|javascript:|data:|vbscript:/i.test(sanitizedName)) {
      return NextResponse.json(
        { error: 'Invalid characters in name' },
        { status: 400 },
      );
    }

    // Email validation with stricter regex
    const sanitizedEmail = String(email).toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail) || sanitizedEmail.length > 254) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Phone validation (basic check for at least 9 digits, max 20)
    const sanitizedPhone = String(phone).trim();
    const phoneDigits = sanitizedPhone.replace(/\D/g, '');
    if (phoneDigits.length < 9 || phoneDigits.length > 20) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 },
      );
    }

    // Budget validation - only allow specific values
    const allowedBudgets = ['150-300k', '300-500k', '500-750k', '750k+'];
    if (!allowedBudgets.includes(String(budget))) {
      return NextResponse.json(
        { error: 'Invalid budget selection' },
        { status: 400 },
      );
    }

    // Sanitize and validate message
    let sanitizedMessage = '';
    if (message) {
      sanitizedMessage = String(message).trim();

      // Length validation
      if (sanitizedMessage.length > 2000) {
        sanitizedMessage = sanitizedMessage.substring(0, 2000);
      }

      // Additional XSS protection for message field
      sanitizedMessage = sanitizedMessage
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
        .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
        .replace(/<embed[^>]*>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<img[^>]*>/gi, '')
        .replace(/data:text\/html/gi, '');
    }

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    // Check for duplicate recent submissions (prevent spam)
    const recentLead = await db.collection('leads').findOne({
      email: sanitizedEmail,
      createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // Last 5 minutes
    });

    if (recentLead) {
      return NextResponse.json(
        { error: 'Please wait a few minutes before submitting again' },
        { status: 429 },
      );
    }

    // Insert lead with fully sanitized data
    const result = await db.collection('leads').insertOne({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      budget: String(budget),
      message: sanitizedMessage,
      interestedIn: ['properties'],
      createdAt: new Date(),
      source: 'website-contact-form',
      status: 'new',
      ipAddress:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // Log successful lead submission
    console.log(`New lead submitted: ${email} - ID: ${result.insertedId}`);

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user
    // TODO: Trigger n8n workflow for lead nurturing

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.message
            : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
