import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Trang đăng nhập của bạn
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // Kiểm tra xem user có đang ở trang dashboard không
      // (Nếu bạn đã xóa dashboard thì logic này không quan trọng lắm, nhưng cứ để cho an toàn)
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Chưa đăng nhập mà vào dashboard -> Chặn
      } else if (isLoggedIn) {
        
        // --- ĐÂY LÀ CHỖ GÂY RA LỖI ---
        // Code cũ: return Response.redirect(new URL('/dashboard', nextUrl));
        // Code mới: Nếu đang ở trang Login mà đã đăng nhập -> Về trang chủ
        
        if (nextUrl.pathname.startsWith('/login')) {
             return Response.redirect(new URL('/', nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], // Giữ nguyên array rỗng ở đây
} satisfies NextAuthConfig;