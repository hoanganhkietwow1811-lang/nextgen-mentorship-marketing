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
  try {
    // Fetch user without select to get all fields including password
    // Using type assertion since Prisma client may not have updated types yet
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      return null;
    }
    
    // Return with password field included (type assertion for build compatibility)
    // Handle case where password column might not exist in database yet
    const userWithPassword = user as any;
    return {
      ...user,
      password: userWithPassword.password || null,
    };
  } catch (error: any) {
    // Handle database errors gracefully (e.g., column doesn't exist)
    const errorMessage = error?.message || String(error);
    console.error("Error fetching user:", errorMessage);
    
    // If it's a column error, the migration hasn't been run
    if (errorMessage.includes("password") || errorMessage.includes("column") || errorMessage.includes("Unknown column")) {
      console.error("⚠️ Database migration may not have been run. Password column might not exist.");
      console.error("Please run: npx prisma migrate deploy (for production) or npx prisma migrate dev (for development)");
    }
    
    // Re-throw to be handled by caller
    throw error;
  }
}

// Create user with hashed password
export async function createUser(
  email: string,
  password: string,
  name?: string,
  role: string = 'user'
) {
  const hashedPassword = await hashPassword(password);
  
  // Use type assertion to include password field during build
  return prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      password: hashedPassword,
      role: role.toUpperCase(),
    } as any, // Type assertion needed until Prisma client is regenerated
  });
}
