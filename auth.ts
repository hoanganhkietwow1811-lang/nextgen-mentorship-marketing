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
          const user = await getUserByEmail(email);
          
          if (!user) {
            // Don't reveal if user exists (security best practice)
            console.error("Invalid login attempt");
            return null;
          }

          // Verify password
          const userPassword = (user as any).password;
          if (!userPassword) {
            console.error("User has no password set");
            return null;
          }

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
        } catch (error) {
          console.error("Authorization error:", error);
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