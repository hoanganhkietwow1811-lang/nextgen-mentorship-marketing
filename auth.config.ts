import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  // 1. Dòng này giúp code nhận diện đúng giao thức https trên Vercel
  trustHost: true,
  
  pages: {
    signIn: '/api/auth/signin', // Trang đăng nhập mặc định
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // 2. CHỈ BẢO VỆ CÁC TRANG CẦN THIẾT
      // Logic cũ có thể đang chặn cả trang chủ nên gây lỗi loop
      // Ở đây mình chỉ chặn các trang bắt đầu bằng /admin hoặc /dashboard
      const isProtectedRoute = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/dashboard');

      if (isProtectedRoute) {
        // Nếu vào trang mật mà chưa đăng nhập -> Chặn (False)
        if (isLoggedIn) return true;
        return false; 
      }
      
      // 3. QUAN TRỌNG: Các trang còn lại (Home, Signin...) -> CHO PHÉP HẾT (True)
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;