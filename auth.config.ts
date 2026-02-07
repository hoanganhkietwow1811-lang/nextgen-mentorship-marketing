import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  // 1. Giữ nguyên dòng này để chạy trên Vercel
  trustHost: true,
  
  // ❌ ĐÃ XÓA PHẦN 'pages' GÂY LỖI
  // Khi xóa đi, NextAuth sẽ tự động dùng giao diện đăng nhập mặc định (màu đen) rất đẹp và chuẩn.

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // Chỉ chặn trang Dashboard hoặc Admin
      const isProtectedRoute = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/dashboard');

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; 
      }
      
      // Các trang còn lại cho qua hết
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;