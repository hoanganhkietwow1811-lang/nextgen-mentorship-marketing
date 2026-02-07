import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  trustHost: true,
  
  // ✅ THÊM LẠI DÒNG NÀY (Nhưng trỏ vào đúng trang giao diện)
  pages: {
    signIn: '/login',  // <--- Điền đúng đường dẫn folder chứa file page.tsx login của bạn
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // Kiểm tra xem người dùng có đang ở trang login không để tránh loop
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      // 1. Nếu đang ở trang Login mà đã đăng nhập rồi -> Đá về Dashboard
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // 2. Bảo vệ trang Dashboard/Admin
      const isProtectedRoute = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/dashboard');
      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Tự động đá về trang '/login' đã khai báo ở trên
      }
      
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;