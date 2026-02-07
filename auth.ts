import NextAuth from "next-auth"
// ... các import khác

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,   // <--- THÊM DÒNG NÀY (Quan trọng nhất)
  secret: process.env.AUTH_SECRET, // Đảm bảo có dòng này
  providers: [
    // ... các provider của bạn (Google, Credentials...)
  ],
  pages: {
    signIn: '/api/auth/signin', // (Nếu bạn có custom page)
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Cho phép redirect về trang chủ sau khi đăng nhập
      return baseUrl;
    }
  }
})