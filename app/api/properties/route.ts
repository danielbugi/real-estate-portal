import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { mockProperties } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');
    
    // Try to fetch from MongoDB
    let properties = await db
      .collection('properties')
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    // If no properties in DB, use mock data
    if (properties.length === 0) {
      console.log('No properties in DB, using mock data');
      properties = mockProperties as any;
    }

    return NextResponse.json({ 
      properties,
      count: properties.length 
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Return mock data on error
    return NextResponse.json({ 
      properties: mockProperties,
      count: mockProperties.length 
    });
  }
}
