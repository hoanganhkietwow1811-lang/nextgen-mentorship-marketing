// Script to create an admin user
// Run with: npx tsx scripts/create-admin.ts

import { createUser } from '../lib/auth-utils';
import { prisma } from '../lib/prisma';

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin User';

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> <password> [name]');
    console.error('Example: npx tsx scripts/create-admin.ts admin@example.com SecurePass123 Admin User');
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      console.error(`User with email ${email} already exists!`);
      process.exit(1);
    }

    // Create admin user
    const user = await createUser(email, password, name, 'admin');
    console.log(`✅ Admin user created successfully!`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
