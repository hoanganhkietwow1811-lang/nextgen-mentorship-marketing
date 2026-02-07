// File: auth.ts
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
        // Password check tạm bỏ qua để dễ test

        // 1. Logic cho ADMIN (Có chữ admin trong email)
        if (email.toLowerCase().includes("admin")) {
          return {
            id: "admin-id",
            name: "Admin User",
            email: email,
            role: "admin", // <--- Cấp quyền VIP
          };
        }

        // 2. Logic cho USER THƯỜNG (Các email còn lại)
        return {
          id: "user-id",
          name: "Regular User",
          email: email,
          role: "user", // <--- Quyền thường
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 👇 FIX: Ép kiểu user thành 'any' để lấy role mà không lỗi đỏ
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // 👇 FIX QUAN TRỌNG: Kiểm tra và ép kiểu để gán role vào session
      if (session.user && token.role) {
        // Dùng (session.user as any) để TypeScript không chặn lỗi
        (session.user as any).role = token.role; 
      }
      return session;
    }
  }
});