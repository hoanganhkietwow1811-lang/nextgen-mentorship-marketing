import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth

export const config = {
  // Matcher chuẩn: Chạy trên tất cả routes TRỪ các file tĩnh, api, ảnh, favicon...
  // Điều này giúp tránh việc Middleware chạy nhầm vào file hệ thống gây lỗi loop
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)'],
}