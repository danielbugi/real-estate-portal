import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, budget, message } = data;

    // Validation
    if (!name || !email || !phone || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    // Insert lead
    const result = await db.collection('leads').insertOne({
      name,
      email,
      phone,
      budget,
      message: message || '',
      interestedIn: ['properties'],
      createdAt: new Date(),
      source: 'website-contact-form',
    });

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
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
