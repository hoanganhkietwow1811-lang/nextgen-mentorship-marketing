// File: auth.ts (Copy đè lên toàn bộ code cũ)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

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
        const email = credentials.email as string;
        
        // Cấp quyền Admin nếu email có chứa chữ "admin"
        if (email.toLowerCase().includes("admin")) {
          return {
            id: "admin-id",
            name: "Admin User",
            email: email,
            role: "admin",
          };
        }

        // User thường
        return {
          id: "user-id",
          name: "User",
          email: email,
          role: "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 👇 QUAN TRỌNG: Thêm 'as any' để sửa lỗi build đỏ lòm
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        // 👇 QUAN TRỌNG: Thêm 'as any' ở đây nữa
        (session.user as any).role = token.role; 
      }
      return session;
    }
  }
});