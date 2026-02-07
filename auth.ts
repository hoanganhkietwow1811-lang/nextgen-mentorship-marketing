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
        // Cho phép đăng nhập nhưng role chỉ là 'user'
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
    // Lưu role vào session để dùng ở giao diện
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  }
});