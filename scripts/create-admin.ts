/**
 * 🔐 CREATE ADMIN USER SCRIPT
 *
 * Run this script ONCE to create your first admin user:
 * node scripts/create-admin.js
 */

import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import readline from 'readline';
import env from '@next/env';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return `${salt}:${hash}`;
}

async function createAdmin() {
  try {
    console.log('\n🔐 CREATE ADMIN USER\n');
    console.log('===============================\n');

    const { MONGODB_URI } = env.loadEnvConfig(process.cwd()).combinedEnv;

    console.log(
      `Checking environment variables... \nMONGODB_URI: ${MONGODB_URI}\n`
    );

    if (!MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI not found in environment variables');
      console.error('Please add MONGODB_URI to your .env.local file\n');
      process.exit(1);
    }

    // Get user input
    const username = await question('👤 Enter username: ');
    const email = await question('📧 Enter email: ');
    const password = await question('🔑 Enter password: ');
    const confirmPassword = await question('🔑 Confirm password: ');

    // Validation
    if (!username || username.length < 3) {
      console.error('\n❌ Username must be at least 3 characters');
      rl.close();
      return;
    }

    if (!email || !email.includes('@')) {
      console.error('\n❌ Invalid email address');
      rl.close();
      return;
    }

    if (!password || password.length < 8) {
      console.error('\n❌ Password must be at least 8 characters');
      rl.close();
      return;
    }

    if (password !== confirmPassword) {
      console.error('\n❌ Passwords do not match');
      rl.close();
      return;
    }

    console.log('\n⏳ Connecting to MongoDB...\n');

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('cyprus_invest');

    // Check if username exists
    const existing = await db.collection('admin_users').findOne({ username });
    if (existing) {
      console.error(`❌ Username "${username}" already exists`);
      await client.close();
      rl.close();
      return;
    }

    // Hash password
    const passwordHash = hashPassword(password);

    // Create admin user
    const result = await db.collection('admin_users').insertOne({
      username,
      email,
      passwordHash,
      role: 'admin',
      createdAt: new Date(),
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('================================\n');
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Role: admin`);
    console.log(`ID: ${result.insertedId}\n`);
    console.log('You can now login at: /admin\n');

    await client.close();
    rl.close();
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error);
    rl.close();
    process.exit(1);
  }
}

createAdmin();
