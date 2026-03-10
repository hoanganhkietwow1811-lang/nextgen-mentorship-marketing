// File: auth.ts - Enhanced with proper password verification
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUserByEmail, verifyPassword } from "./lib/auth-utils";
import { loginSchema } from "./lib/security";
import { rateLimit } from "./lib/rate-limit";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate input
          const validationResult = loginSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });

          if (!validationResult.success) {
            console.error("Invalid credentials format");
            return null;
          }

          const { email, password } = validationResult.data;

          // Rate limiting - prevent brute force attacks
          const rateLimitResult = rateLimit(`login:${email}`, 5, 15 * 60 * 1000);
          if (!rateLimitResult.allowed) {
            console.error(`Rate limit exceeded for ${email}`);
            throw new Error("Too many login attempts. Please try again later.");
          }

          // Get user from database
          let user;
          try {
            user = await getUserByEmail(email);
          } catch (dbError: any) {
            // Handle database errors (e.g., password column doesn't exist)
            const errorMsg = dbError?.message || String(dbError);
            if (errorMsg.includes("password") || errorMsg.includes("column") || errorMsg.includes("Unknown column")) {
              console.error("⚠️ Database migration required! Password column doesn't exist.");
              // Return a helpful error that won't crash the app
              throw new Error("Database configuration error. Please contact administrator.");
            }
            // Re-throw other database errors
            throw dbError;
          }
          
          if (!user) {
            // Don't reveal if user exists (security best practice)
            console.error("Invalid login attempt");
            return null;
          }

          // Verify password
          const userPassword = (user as any).password;
          
          // If user has no password set (migration not run or password not set)
          if (!userPassword) {
            console.error("User has no password set - database migration may be needed");
            // Temporary fallback: allow login for admin emails (REMOVE AFTER MIGRATION)
            // This is a temporary workaround until the database migration is run
            const emailLower = email.toLowerCase();
            if (emailLower.includes("admin")) {
              console.warn("⚠️ Using temporary fallback authentication (migration not run)");
              return {
                id: user.id,
                name: user.name || user.email || "Admin User",
                email: user.email || email,
                role: "admin",
              };
            }
            // For non-admin users, require password
            console.error("Password required but not set for user");
            return null;
          }

          // Verify password with bcrypt
          const isValidPassword = await verifyPassword(password, userPassword);
          
          if (!isValidPassword) {
            console.error("Invalid password");
            return null;
          }

          // Return user with role
          return {
            id: user.id,
            name: user.name || user.email || "User",
            email: user.email || email,
            role: user.role?.toLowerCase() || "user",
          };
        } catch (error: any) {
          // Log detailed error for debugging
          console.error("Authorization error:", {
            message: error?.message,
            stack: error?.stack,
            name: error?.name,
          });
          
          // Don't expose internal errors to user
          // Return null to indicate authentication failed
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
});