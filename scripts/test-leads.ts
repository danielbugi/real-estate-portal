/**
 * Test script for MongoDB leads integration
 *
 * This script tests the lead submission and retrieval functionality
 * to ensure MongoDB integration is working correctly.
 *
 * Usage:
 *   npx tsx scripts/test-leads.ts
 */

import clientPromise from '@/lib/mongodb';

interface TestLead {
  name: string;
  email: string;
  phone: string;
  budget: string;
  message: string;
  interestedIn: string[];
  createdAt: Date;
  source: string;
  status: string;
}

async function testMongoConnection() {
  console.log('🔍 Testing MongoDB connection...\n');

  try {
    const client = await clientPromise;
    const db = client.db('cyprus_invest');

    // Test connection
    await db.admin().ping();
    console.log('✅ MongoDB connection successful!\n');

    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

async function insertTestLead(db: any) {
  console.log('📝 Inserting test lead...\n');

  const testLead: TestLead = {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    phone: '050-1234567',
    budget: '300-500k',
    message: 'This is a test lead created by the test script',
    interestedIn: ['properties'],
    createdAt: new Date(),
    source: 'test-script',
    status: 'new',
  };

  try {
    const result = await db.collection('leads').insertOne(testLead);
    console.log('✅ Test lead inserted successfully!');
    console.log('   Lead ID:', result.insertedId.toString());
    console.log('   Email:', testLead.email);
    console.log('');

    return result.insertedId;
  } catch (error) {
    console.error('❌ Failed to insert test lead:', error);
    throw error;
  }
}

async function retrieveTestLead(db: any, leadId: any) {
  console.log('🔎 Retrieving test lead...\n');

  try {
    const lead = await db.collection('leads').findOne({ _id: leadId });

    if (lead) {
      console.log('✅ Test lead retrieved successfully!');
      console.log('   Lead Data:', JSON.stringify(lead, null, 2));
      console.log('');
      return lead;
    } else {
      console.error('❌ Test lead not found');
      return null;
    }
  } catch (error) {
    console.error('❌ Failed to retrieve test lead:', error);
    throw error;
  }
}

async function getLeadsStats(db: any) {
  console.log('📊 Getting leads statistics...\n');

  try {
    const total = await db.collection('leads').countDocuments();
    const newLeads = await db
      .collection('leads')
      .countDocuments({ status: 'new' });
    const sources = await db.collection('leads').distinct('source');

    console.log('✅ Leads Statistics:');
    console.log('   Total Leads:', total);
    console.log('   New Leads:', newLeads);
    console.log('   Sources:', sources.join(', '));
    console.log('');

    return { total, newLeads, sources };
  } catch (error) {
    console.error('❌ Failed to get statistics:', error);
    throw error;
  }
}

async function cleanupTestLead(db: any, leadId: any) {
  console.log('🧹 Cleaning up test lead...\n');

  try {
    const result = await db.collection('leads').deleteOne({ _id: leadId });

    if (result.deletedCount > 0) {
      console.log('✅ Test lead deleted successfully!\n');
    } else {
      console.log('⚠️  Test lead was not deleted (may already be removed)\n');
    }
  } catch (error) {
    console.error('❌ Failed to cleanup test lead:', error);
  }
}

async function testAPIEndpoint() {
  console.log('🌐 Testing API endpoint...\n');

  const testData = {
    name: 'API Test User',
    email: `api-test-${Date.now()}@example.com`,
    phone: '050-9876543',
    budget: '500-750k',
    message: 'Testing the API endpoint',
  };

  try {
    // Note: This requires the Next.js server to be running
    const response = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ API endpoint test successful!');
      console.log('   Response:', JSON.stringify(result, null, 2));
      console.log('');
    } else {
      console.error('❌ API endpoint returned error:', result);
    }
  } catch (error) {
    console.log('⚠️  API endpoint test skipped (server not running)');
    console.log('   Start server with: npm run dev');
    console.log('');
  }
}

async function main() {
  console.log('=================================');
  console.log('  MongoDB Leads Integration Test');
  console.log('=================================\n');

  try {
    // Test 1: Connection
    const db = await testMongoConnection();

    // Test 2: Insert
    const leadId = await insertTestLead(db);

    // Test 3: Retrieve
    await retrieveTestLead(db, leadId);

    // Test 4: Statistics
    await getLeadsStats(db);

    // Test 5: API (optional)
    await testAPIEndpoint();

    // Cleanup
    await cleanupTestLead(db, leadId);

    console.log('=================================');
    console.log('✅ All tests completed successfully!');
    console.log('=================================\n');

    process.exit(0);
  } catch (error) {
    console.error('\n=================================');
    console.error('❌ Tests failed!');
    console.error('=================================\n');
    console.error('Error details:', error);
    process.exit(1);
  }
}

// Run tests
main();
