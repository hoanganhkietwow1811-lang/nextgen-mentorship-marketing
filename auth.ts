import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        
        // Convert email sang chuỗi để kiểm tra
        const emailStr = email as string;

        // --- LOGIC CŨ CỦA BẠN ĐÂY ---
        // Chỉ cần email có chữ "admin" (ví dụ: adminvip@gmail.com, myadmin@test.com...)
        if (emailStr.toLowerCase().includes("admin")) {
          return {
            id: "admin-auto-id",
            name: "Admin User",
            email: emailStr,
            role: "admin", // <--- Cấp quyền Admin ngay lập tức
          };
        }

        // Nếu không có chữ admin -> Trả về null (Không cho đăng nhập)
        return null; 
      },
    }),
  ],
});