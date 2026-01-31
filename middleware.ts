import NextAuth from "next-auth"
import { authConfig } from "./auth.config" // <--- CHỈ IMPORT FILE NHẸ NÀY

export default NextAuth(authConfig).auth

export const config = {
  // Matcher để chạy middleware trên các route cần thiết
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}