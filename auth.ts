import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { authConfig } from "./auth.config" // Import cấu hình chuẩn bạn vừa sửa

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Kế thừa toàn bộ cấu hình chuẩn (trustHost, callbacks...)
  
  // Khai báo Provider Google ở đây (thay vì để trống như bên config)
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
})