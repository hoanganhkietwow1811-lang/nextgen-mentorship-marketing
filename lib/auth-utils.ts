// Authentication utilities
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Get user from database by email (including password)
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
      emailVerified: true,
      image: true,
    },
  });
}

// Create user with hashed password
export async function createUser(
  email: string,
  password: string,
  name?: string,
  role: string = 'user'
) {
  const hashedPassword = await hashPassword(password);
  
  return prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      password: hashedPassword,
      role: role.toUpperCase(),
    },
  });
}
