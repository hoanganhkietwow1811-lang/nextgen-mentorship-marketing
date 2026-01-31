import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Chỉ chứa logic Credentials và các cấu hình nhẹ
export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Logic check user giả lập hoặc gọi API bên ngoài (không gọi trực tiếp Prisma ở đây nếu có thể)
        const user = { id: "1", name: "Mentor Demo", email: "demo@example.com" }
        return user
      },
    }),
  ],
  pages: {
    signIn: '/api/auth/signin', // Đường dẫn trang đăng nhập (tùy chọn)
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Ví dụ: Logic bảo vệ routes
      // if (nextUrl.pathname.startsWith('/dashboard')) return isLoggedIn;
      return true;
    },
  },
} satisfies NextAuthConfig